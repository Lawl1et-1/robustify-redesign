"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { rng, useBuild } from "@/lib/build";

type Palette = { fg: string; fg3: string; accent: string; ok: string; line: string };

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(n).trim() || "#888";
  return { fg: v("--fg"), fg3: v("--fg-3"), accent: v("--accent"), ok: v("--ok"), line: v("--line-2") };
}

function usePalette() {
  const [p, setP] = useState<Palette | null>(null);
  useEffect(() => {
    setP(readPalette());
    const mo = new MutationObserver(() => setP(readPalette()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return p;
}

const SHELLS = 5;

/** Builds one shell's edge geometry, keeping a random subset of edges so
 *  every build has its own visible pattern. */
function shellGeometry(r: () => number, radius: number) {
  const kinds = [
    () => new THREE.IcosahedronGeometry(radius, 1),
    () => new THREE.DodecahedronGeometry(radius, 0),
    () => new THREE.OctahedronGeometry(radius, 2),
    () => new THREE.IcosahedronGeometry(radius, 0),
    () => new THREE.TetrahedronGeometry(radius, 2),
  ];
  const g = kinds[Math.floor(r() * kinds.length)]();
  const edges = new THREE.EdgesGeometry(g, 1);
  const src = edges.getAttribute("position").array as Float32Array;
  const keep = 0.5 + r() * 0.4;
  const out: number[] = [];
  for (let i = 0; i < src.length; i += 6) {
    if (r() < keep) out.push(src[i], src[i + 1], src[i + 2], src[i + 3], src[i + 4], src[i + 5]);
  }
  const res = new THREE.BufferGeometry();
  res.setAttribute("position", new THREE.Float32BufferAttribute(out, 3));
  g.dispose();
  edges.dispose();
  return res;
}

type ShellSpec = { geo: THREE.BufferGeometry; axis: THREE.Vector3; speed: number; tilt: THREE.Euler };

function Specimen({ palette, still }: { palette: Palette; still: boolean }) {
  const { seed, revoked } = useBuild();
  const group = useRef<THREE.Group>(null);
  const shells = useRef<(THREE.LineSegments | null)[]>([]);
  const core = useRef<THREE.Mesh>(null);
  const born = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  const specs = useMemo<ShellSpec[]>(() => {
    const r = rng(seed);
    return Array.from({ length: SHELLS }, (_, i) => ({
      geo: shellGeometry(r, 0.95 + i * 0.32),
      axis: new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize(),
      speed: (0.08 + r() * 0.22) * (r() > 0.5 ? 1 : -1),
      tilt: new THREE.Euler(r() * Math.PI, r() * Math.PI, r() * Math.PI),
    }));
  }, [seed]);

  useEffect(() => {
    born.current = performance.now();
    return () => specs.forEach((s) => s.geo.dispose());
  }, [specs]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const lineColor = revoked ? palette.fg3 : palette.fg;
  const coreColor = revoked ? palette.fg3 : palette.accent;

  useFrame((_, dt) => {
    const t = (performance.now() - born.current) / 1000;
    const motion = still || revoked ? 0 : 1;
    if (group.current) {
      group.current.rotation.y += (pointer.current.x * 0.35 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (pointer.current.y * 0.2 - group.current.rotation.x) * 0.04;
    }
    shells.current.forEach((m, i) => {
      if (!m) return;
      const s = specs[i];
      m.rotateOnAxis(s.axis, s.speed * dt * motion);
      // Staggered assemble on each rebuild: shells grow in from the core outwards.
      const local = Math.min(1, Math.max(0, (t - i * 0.09) / 0.9));
      const e = still ? 1 : 1 - Math.pow(1 - local, 4);
      m.scale.setScalar(0.35 + 0.65 * e);
      const mat = m.material as THREE.LineBasicMaterial;
      mat.opacity = (0.28 + (SHELLS - i) * 0.12) * e;
    });
    if (core.current) {
      const pulse = revoked ? 0 : Math.max(0, Math.sin(t * 4.4)) ** 12;
      core.current.scale.setScalar(1 + pulse * 0.12);
      core.current.rotation.y += dt * 0.4 * motion;
      core.current.rotation.x += dt * 0.25 * motion;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={coreColor} flatShading roughness={0.35} metalness={0.2} />
      </mesh>
      {specs.map((s, i) => (
        <lineSegments
          key={`${seed}-${i}`}
          ref={(el) => {
            shells.current[i] = el;
          }}
          geometry={s.geo}
          rotation={s.tilt}
        >
          <lineBasicMaterial color={i === 2 && !revoked ? palette.accent : lineColor} transparent depthWrite={false} />
        </lineSegments>
      ))}
    </group>
  );
}

export default function SpecimenCanvas() {
  const palette = usePalette();
  const [still, setStill] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const on = () => setStill(mq.matches);
    mq.addEventListener("change", on);
    try {
      const c = document.createElement("canvas");
      if (!(c.getContext("webgl2") || c.getContext("webgl"))) setFailed(true);
    } catch {
      setFailed(true);
    }
    return () => mq.removeEventListener("change", on);
  }, []);

  if (!palette) return null;
  if (failed) return <FallbackSpecimen />;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} />
      <Specimen palette={palette} still={still} />
    </Canvas>
  );
}

function FallbackSpecimen() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden style={{ width: "100%", height: "100%" }}>
      {[150, 125, 100, 75, 50].map((r, i) => (
        <rect
          key={r}
          x={200 - r}
          y={200 - r}
          width={r * 2}
          height={r * 2}
          transform={`rotate(${i * 18} 200 200)`}
          fill="none"
          stroke={i === 2 ? "var(--accent)" : "var(--fg-3)"}
          strokeDasharray={i % 2 ? "6 6" : undefined}
        />
      ))}
      <rect x="185" y="185" width="30" height="30" fill="var(--accent)" transform="rotate(45 200 200)" />
    </svg>
  );
}
