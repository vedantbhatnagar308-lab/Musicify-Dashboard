import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, buttonCls } from "./primitives";
import { config } from "@/config/musicify";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", hash: "" },
  { label: "Features", hash: "features" },
  { label: "Commands", hash: "commands" },
  { label: "Premium", hash: "premium" },
  { label: "Status", hash: "status" },
  { label: "FAQ", hash: "faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav className={cn("mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300", scrolled || open ? "glass shadow-card" : "border border-transparent")}>
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="size-8" />
          <span className="font-display text-lg font-bold">Musicify</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.label} to="/" {...(l.hash ? { hash: l.hash } : {})} className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/dashboard" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Dashboard</Link>
          <a href={config.botInviteUrl} className={buttonCls("primary")}>Add to Discord</a>
        </div>
        <button className="relative size-10 rounded-xl glass lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <Menu className={cn("absolute inset-0 m-auto size-5 transition-all", open && "rotate-90 opacity-0")} />
          <X className={cn("absolute inset-0 m-auto size-5 transition-all", !open && "-rotate-90 opacity-0")} />
        </button>
      </nav>
      <div className={cn("mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl glass transition-all duration-300 lg:hidden", open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0 border-transparent")}>
        <div className="flex flex-col p-3">
          {links.map((l) => (
            <Link key={l.label} to="/" {...(l.hash ? { hash: l.hash } : {})} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base hover:bg-accent">{l.label}</Link>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base hover:bg-accent">Login / Dashboard</Link>
          <a href={config.botInviteUrl} className={cn(buttonCls("primary"), "mt-2")}>Add to Discord</a>
        </div>
      </div>
    </header>
  );
}
