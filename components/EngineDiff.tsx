"use client";

import { rng, hex, buildStore, useBuild } from "@/lib/build";
import { BtnInner } from "./Icons";

// An illustrative view of what a decompiler sees for the same method in two
// consecutive builds. Generated from the build seed; not real engine output.

function listing(seed: number) {
  const r = rng(seed);
  const id = () => "Δ" + hex(Math.floor(r() * 0xffffff), 6).toLowerCase();
  const n = () => "0x" + hex(Math.floor(r() * 0xffffffff));
  const ops = ["xor", "rol", "mix", "fold", "perm"];
  const op = () => ops[Math.floor(r() * ops.length)];
  return [
    { t: "k", s: `call ${id()}(${n()})` },
    { t: "", s: `ldsfld ${id()}::${id()}` },
    { t: "x", s: `${op()}  ${n()}, ${n()}` },
    { t: "", s: `switch (${Math.floor(r() * 40) + 8} targets)` },
    { t: "", s: `br.dyn ${id()}` },
    { t: "x", s: `${op()}  ${n()}` },
    { t: "k", s: `callvirt ${id()}` },
    { t: "", s: `ldc.i4 ${n()}` },
    { t: "x", s: `${op()}  ${n()}, ${id()}` },
    { t: "", s: `ret.guard ${id()}` },
  ];
}

export default function EngineDiff() {
  const { seed, serial } = useBuild();
  const prev = (seed ^ 0x9e3779b9) >>> 0;

  const col = (label: string, s: number) => (
    <div className="diff-col">
      <span className="diff-col-label">{label}</span>
      {listing(s).map((l, i) => (
        <div key={i} className={l.t}>
          {l.s}
        </div>
      ))}
    </div>
  );

  return (
    <div className="diff" aria-label="Illustrative decompiler view of the same method in two builds">
      <div className="diff-head">
        <span>LicenseCheck.Validate()</span>
        <span>Illustrative</span>
      </div>
      <div className="diff-cols">
        {col(`Build #${String(serial - 1).padStart(4, "0")}`, prev)}
        {col(`Build #${String(serial).padStart(4, "0")}`, seed)}
      </div>
      <div className="diff-foot">
        <span>Same source. Nothing in common.</span>
        <button type="button" className="btn btn-ghost" onClick={() => buildStore.rebuild()}>
          <BtnInner label="Rebuild" arrow={false} />
        </button>
      </div>
    </div>
  );
}
