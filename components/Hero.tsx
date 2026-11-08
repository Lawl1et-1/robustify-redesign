"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { buildFacts, buildStore, useBuild } from "@/lib/build";
import { BtnInner, Stars } from "./Icons";

const SpecimenCanvas = dynamic(() => import("./Specimen"), { ssr: false });

const GLYPHS = "0123456789ABCDEF";

/** Text that scrambles through hex glyphs before settling on its value. */
function Scramble({ value }: { value: string }) {
  const [out, setOut] = useState(value);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(value);
      return;
    }
    let frame = 0;
    const total = 16;
    const id = setInterval(() => {
      frame++;
      setOut(
        value
          .split("")
          .map((c, i) => (i < (frame / total) * value.length ? c : GLYPHS[Math.floor(Math.random() * 16)]))
          .join(""),
      );
      if (frame >= total) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [value]);
  return <span className="scramble">{out}</span>;
}

export default function Hero() {
  const { seed, serial, revoked } = useBuild();
  const facts = buildFacts(seed);

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>
            No two builds alike. <em>Nothing to crack twice.</em>
          </h1>
          <p className="lede">
            Build-time protection for .NET software. Every build is randomized against reverse engineering and
            tampering, and checks in with a licensing server you control. Tamper with it, and it stops before a
            window opens.
          </p>
          <div className="hero-actions">
            <a href="#pricing" className="btn btn-primary btn-lg">
              <BtnInner label="Get a licence" />
            </a>
            <a href="#engine" className="btn btn-ghost btn-lg">
              <BtnInner label="See how it works" arrow={false} />
            </a>
          </div>
          <div className="proof-strip">
            <span className="proof-item">
              <Stars /> <strong>5.0</strong> from 20+ Product Hunt reviews
            </span>
            <span className="proof-item">
              <strong>100k+</strong> users on protected builds
            </span>
          </div>
        </div>

        <div className="specimen" aria-label="Live demo: a protected build, re-randomized on every rebuild">
          <div className="specimen-canvas">
            <SpecimenCanvas />
          </div>

          <div className="readout readout-a" aria-live="polite">
            <div className="readout-title">
              <span className={`dot${revoked ? " is-off" : ""}`} aria-hidden />
              {revoked ? "Build revoked" : "Protected build"}
            </div>
            <div className="readout-row">
              <span>build</span>
              <b>#{String(serial).padStart(4, "0")}</b>
            </div>
            <div className="readout-row">
              <span>seed</span>
              <b>
                <Scramble value={facts.seedHex} />
              </b>
            </div>
            <div className="readout-row">
              <span>sha</span>
              <b>
                <Scramble value={facts.hash.slice(0, 8)} />
              </b>
            </div>
          </div>

          <div className="readout readout-b">
            <div className="readout-row">
              <span>configs generated</span>
              <b className="accent">{facts.configs}</b>
            </div>
            <div className="readout-row">
              <span>layers</span>
              <b>5 / 5</b>
            </div>
            <div className="readout-row">
              <span>heartbeat</span>
              <b>{revoked ? "refused" : "live"}</b>
            </div>
            <button type="button" className="btn btn-ghost rebuild" onClick={() => buildStore.rebuild()}>
              <BtnInner label="Rebuild: new protection" arrow={false} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
