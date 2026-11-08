import {
  ArrowRight,
  Check as LCheck,
  Clock3,
  Star as LStar,
  Sun as LSun,
  Moon as LMoon,
  ShieldCheck,
  ScanLine,
  TriangleAlert,
  Shuffle,
  Layers,
  LockKeyhole,
  Waypoints,
  BrainCircuit,
  Activity,
  Radio,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/site";

const stroke = { strokeWidth: 1.6, absoluteStrokeWidth: false, "aria-hidden": true } as const;

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <rect x="1.5" y="1.5" width="29" height="29" stroke="currentColor" strokeWidth="2" />
      <rect x="9" y="9" width="14" height="14" transform="rotate(45 16 16)" stroke="currentColor" strokeWidth="2" />
      <rect x="13" y="13" width="6" height="6" fill="var(--accent)" />
    </svg>
  );
}

/** Button contents: a label and an optional arrow key cell. */
export function BtnInner({ label, arrow = true }: { label: string; arrow?: boolean }) {
  return (
    <>
      <span className="btn-label">{label}</span>
      {arrow && (
        <span className="btn-key" aria-hidden>
          <ArrowRight strokeWidth={2} />
        </span>
      )}
    </>
  );
}

export const Arrow = (p: LucideProps) => <ArrowRight {...stroke} {...p} />;
export const Check = (p: LucideProps) => <LCheck {...stroke} strokeWidth={2.2} {...p} />;
export const Clock = (p: LucideProps) => <Clock3 {...stroke} {...p} />;
export const Sun = (p: LucideProps) => <LSun {...stroke} {...p} />;
export const Moon = (p: LucideProps) => <LMoon {...stroke} {...p} />;
export const Shield = (p: LucideProps) => <ShieldCheck {...stroke} {...p} />;
export const Gate = (p: LucideProps) => <ScanLine {...stroke} {...p} />;
export const Warning = (p: LucideProps) => <TriangleAlert {...stroke} {...p} />;

export function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: n }, (_, i) => (
        <LStar key={i} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
    </span>
  );
}

const map: Record<IconName, React.ComponentType<LucideProps>> = {
  shuffle: Shuffle,
  layers: Layers,
  lock: LockKeyhole,
  route: Waypoints,
  brain: BrainCircuit,
  pulse: Activity,
  noise: Radio,
};

export function CapIcon({ name }: { name: IconName }) {
  const C = map[name];
  return <C {...stroke} />;
}
