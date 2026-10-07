import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

export function Logo({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <span className={cn("relative inline-flex size-9 items-center justify-center rounded-xl bg-brand shadow-glow", className)}>
      <span className="flex h-4 items-end gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("w-[3px] h-full rounded-full bg-primary-foreground", animated && "animate-eq")}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </span>
  );
}

export function Equalizer({ bars = 32, className }: { bars?: number; className?: string }) {
  return (
    <div className={cn("flex h-16 items-end gap-1", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-1.5 h-full flex-1 rounded-full bg-brand animate-eq opacity-80"
          style={{ animationDelay: `${(i * 0.09) % 1}s`, animationDuration: `${0.8 + ((i * 37) % 7) / 10}s` }}
        />
      ))}
    </div>
  );
}

export function Reveal({ children, className, delay = 0, as: As = "div" }: { children: ReactNode; className?: string; delay?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setIn(true), io.disconnect()), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <As ref={ref} className={cn("reveal", inView && "in", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </As>
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="inline-block rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan">{eyebrow}</span>
      <h2 className="mt-5 text-4xl font-bold md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

const btn = {
  primary: "bg-brand text-primary-foreground shadow-glow hover:brightness-110 hover:-translate-y-0.5",
  ghost: "glass text-foreground hover:bg-accent",
  blurple: "bg-blurple text-primary-foreground hover:brightness-110",
};
export function buttonCls(v: keyof typeof btn = "primary", size: "md" | "lg" = "md") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
    btn[v],
  );
}

export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2.5", className)}>
      <span className="absolute inset-0 rounded-full bg-success animate-ping-soft" />
      <span className="relative size-2.5 rounded-full bg-success" />
    </span>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn("relative h-6 w-11 rounded-full transition-colors", checked ? "bg-brand" : "bg-muted")}
    >
      <span className={cn("absolute top-0.5 left-0.5 size-5 rounded-full bg-foreground transition-transform", checked && "translate-x-5")} />
    </button>
  );
}
