import { Link } from "@tanstack/react-router";
import { Logo } from "./primitives";
import { config } from "@/config/musicify";

export function Footer() {
  const col = "flex flex-col gap-2.5 text-sm text-muted-foreground";
  const a = "transition-colors hover:text-foreground";
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5"><Logo animated={false} /><span className="font-display text-xl font-bold">Musicify</span></div>
          <p className="mt-4 text-gradient font-display text-lg font-semibold">Your Discord. Your Music.</p>
        </div>
        <div className={col}>
          <h4 className="mb-1 text-sm font-semibold text-foreground">Links</h4>
          <Link to="/" className={a}>Home</Link>
          <Link to="/" hash="features" className={a}>Features</Link>
          <Link to="/" hash="commands" className={a}>Commands</Link>
          <Link to="/" hash="premium" className={a}>Premium</Link>
          <Link to="/" hash="status" className={a}>Status</Link>
          <Link to="/dashboard" className={a}>Dashboard</Link>
          <Link to="/" hash="faq" className={a}>FAQ</Link>
        </div>
        <div className={col}>
          <h4 className="mb-1 text-sm font-semibold text-foreground">Community</h4>
          <a href={config.supportServerUrl} className={a}>Discord Server</a>
          <a href={config.supportServerUrl} className={a}>Support</a>
          <a href={config.githubUrl} className={a}>GitHub</a>
        </div>
        <div className={col}>
          <h4 className="mb-1 text-sm font-semibold text-foreground">Legal</h4>
          <a href="#" className={a}>Terms of Service</a>
          <a href="#" className={a}>Privacy Policy</a>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">© 2026 Musicify. All rights reserved.</div>
    </footer>
  );
}
