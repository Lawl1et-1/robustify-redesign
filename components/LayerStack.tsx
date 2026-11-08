"use client";

import { useEffect, useRef, useState } from "react";
import { layers } from "@/lib/site";
import { Warning } from "./Icons";

export default function LayerStack() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  // Plates spread apart as the section scrolls through the viewport.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stack.current?.style.setProperty("--spread", "0.7");
      return;
    }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = stage.current;
        if (!el || !stack.current) return;
        const r = el.getBoundingClientRect();
        const p = 1 - (r.top + r.height / 2) / (window.innerHeight + r.height / 2);
        const spread = Math.min(1, Math.max(0, (p - 0.15) * 1.6));
        stack.current.style.setProperty("--spread", spread.toFixed(3));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  // The plate order is bottom (core) to top (outer), so the outer layer the
  // attacker meets first sits on top of the stack.
  const plates = layers.map((l, i) => ({ ...l, i, z: layers.length - 1 - i }));

  return (
    <div className="layers-grid">
      <div className="stack-stage" ref={stage} aria-hidden>
        <div className="stack" ref={stack}>
          {[...plates].reverse().map((p) => (
            <div
              key={p.name}
              className={`plate${p.z === 0 ? " is-core" : ""}${active === p.i ? " is-active" : ""}`}
              style={{ ["--i" as string]: p.z }}
            />
          ))}
        </div>
      </div>

      <div>
        <ol className="layer-list">
          {layers.map((l, i) => (
            <li key={l.name}>
              <button
                type="button"
                className={`layer-item${active === i ? " is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span className="n">L{i + 1}</span>
                <span>
                  <strong>{l.name}</strong>
                  {l.detail}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="cost">
          <Warning />
          <p>
            <strong>Attacker cost:</strong> five layers, every one randomized per build. Tooling written against one
            release is worthless against the next.
          </p>
        </div>
      </div>
    </div>
  );
}
