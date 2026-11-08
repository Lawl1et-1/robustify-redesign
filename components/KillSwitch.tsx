"use client";

import { useEffect, useRef, useState } from "react";
import { buildStore, useBuild } from "@/lib/build";

type Line = { id: number; text: string; kind: "ok" | "bad" | "" };

function stamp() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

export default function KillSwitch() {
  const { serial, revoked } = useBuild();
  const canvas = useRef<HTMLCanvasElement>(null);
  const revokedRef = useRef(revoked);
  const [log, setLog] = useState<Line[]>([]);
  const nextId = useRef(0);

  // Seed a few recent check-ins so the log isn't empty on first view.
  useEffect(() => {
    const now = Date.now();
    const at = (ago: number) => new Date(now - ago).toLocaleTimeString("en-GB", { hour12: false });
    setLog(
      [4800, 3200, 1600].map((ago, i) => ({
        id: nextId.current++,
        text: `${at(ago)}  auth ok · build #${buildStore.get().serial} · ${[34, 41, 29][i]}ms`,
        kind: "ok" as const,
      })),
    );
  }, []);

  const push = (text: string, kind: Line["kind"]) =>
    setLog((l) => [...l.slice(-5), { id: nextId.current++, text: `${stamp()}  ${text}`, kind }]);

  useEffect(() => {
    revokedRef.current = revoked;
    if (log.length) {
      push(
        revoked ? `registration revoked for build #${serial}` : `registration restored for build #${serial}`,
        revoked ? "bad" : "ok",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revoked]);

  // Heartbeat trace: a spike for each signed check-in; flat when revoked.
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const points: number[] = [];
    let t = 0;
    let lastBeat = 0;
    const period = 1.6;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const beatShape = (p: number) => {
      // p in [0,1): a compact P-QRS-T complex.
      if (p < 0.08) return Math.sin((p / 0.08) * Math.PI) * 0.12;
      if (p < 0.12) return -0.18 * ((p - 0.08) / 0.04);
      if (p < 0.16) return -0.18 + 1.18 * ((p - 0.12) / 0.04);
      if (p < 0.2) return 1 - 1.35 * ((p - 0.16) / 0.04);
      if (p < 0.24) return -0.35 + 0.35 * ((p - 0.2) / 0.04);
      if (p < 0.4) return Math.sin(((p - 0.24) / 0.16) * Math.PI) * 0.22;
      return 0;
    };

    // Pre-fill the trace across the full width so the monitor is never blank
    // when it scrolls into view. One point = 1/60 s of history.
    {
      const maxPts = Math.ceil(c.clientWidth / 2);
      for (let k = 0; k < maxPts; k++) {
        const tt = -(maxPts - 1 - k) / 60;
        const phase = (((tt % period) + period) % period) / period;
        points.push(beatShape(phase));
      }
    }

    const paint = () => {
      const w = c.clientWidth;
      const h = c.clientHeight;
      const step = 2;
      const off = revokedRef.current;
      const s = getComputedStyle(document.documentElement);
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = s.getPropertyValue("--line").trim();
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let y = 0; y <= h; y += 32) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();

      const mid = h * 0.62;
      const amp = h * 0.48;
      ctx.strokeStyle = s.getPropertyValue(off ? "--accent" : "--ok").trim();
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      points.forEach((v, i) => {
        const x = w - (points.length - 1 - i) * step;
        const y = mid - v * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      const lastV = points[points.length - 1] ?? 0;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillRect(w - 5, mid - lastV * amp - 3, 6, 6);
    };

    // Paint once immediately (and on resize) so the trace shows even before
    // the animation loop runs; only the animation is gated on visibility.
    paint();
    window.addEventListener("resize", paint);

    let last = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const w = c.clientWidth;
      const h = c.clientHeight;
      const step = 2;
      const maxPts = Math.ceil(w / step);
      const off = revokedRef.current;
      const n = still ? maxPts : Math.max(1, Math.round((dt * 120) / step));
      for (let k = 0; k < n; k++) {
        const tt = still ? (k / maxPts) * 4 * period : t - ((n - 1 - k) * dt) / n;
        const phase = (tt % period) / period;
        points.push(off ? (Math.random() - 0.5) * 0.015 : beatShape(phase));
      }
      while (points.length > maxPts) points.shift();

      if (!off && t - lastBeat > period) {
        lastBeat = t;
        push(`auth ok · build #${buildStore.get().serial} · ${28 + Math.floor(Math.random() * 30)}ms`, "ok");
      }
      if (off && t - lastBeat > period) {
        lastBeat = t;
        push(`check-in refused · build #${buildStore.get().serial} · process exits`, "bad");
      }

      paint();
      if (still) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
      window.removeEventListener("resize", paint);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`monitor${revoked ? " is-revoked" : ""}`}>
      <div className="monitor-head">
        <span>Build #{String(serial).padStart(4, "0")} → robustify.xyz</span>
        <span className="status">
          <span className={`dot${revoked ? " is-off" : ""}`} aria-hidden />
          {revoked ? "Revoked" : "Heartbeat live"}
        </span>
      </div>
      <div className="monitor-canvas">
        <canvas ref={canvas} aria-hidden />
        <div className="monitor-state" aria-hidden>
          <span className="revoked-stamp">Revoked</span>
        </div>
      </div>
      <div className="monitor-log" aria-live="polite" aria-label="Check-in log (simulated)">
        {log.map((l) => (
          <div key={l.id} className={l.kind}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="monitor-foot">
        <button
          type="button"
          role="switch"
          aria-checked={revoked}
          className="switch"
          onClick={() => buildStore.setRevoked(!revoked)}
        >
          <span className="switch-track" aria-hidden>
            <span className="switch-thumb" />
          </span>
          {revoked ? "Restore this build" : "Revoke this build"}
        </button>
        <span className="ks-note">Simulated demo. The hero build above follows this switch.</span>
      </div>
    </div>
  );
}
