import { Link } from "@tanstack/react-router";
import { ArrowRight, Hash, Volume2 } from "lucide-react";
import album from "@/assets/album.jpg";
import { Equalizer, Logo, StatusDot, buttonCls } from "./primitives";
import { config } from "@/config/musicify";
import { DiscordIcon } from "./DiscordIcon";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[520px] rounded-full bg-primary/30 blur-[120px] animate-blob" />
      <div className="pointer-events-none absolute top-20 right-0 size-[420px] rounded-full bg-cyan/20 blur-[120px] animate-blob" style={{ animationDelay: "-6s" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm">
            <StatusDot /> <span className="text-muted-foreground">Musicify is <span className="text-foreground font-medium">Online</span></span>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            <Logo className="size-14 rounded-2xl" />
            <span className="font-display text-2xl font-bold tracking-tight">Musicify</span>
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[1.02] sm:text-6xl xl:text-7xl">
            Your Discord.<br /><span className="text-gradient">Your Music.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0">
            Bring high-quality music, powerful controls, and an incredible listening experience to your Discord server.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href={config.botInviteUrl} className={buttonCls("primary", "lg")}><DiscordIcon className="size-5" /> Add Musicify to Discord</a>
            <Link to="/" hash="features" className={buttonCls("ghost", "lg")}>Explore Features <ArrowRight className="size-4" /></Link>
          </div>
          <Equalizer bars={40} className="mt-12 h-10 opacity-60" />
        </div>

        <div className="relative mx-auto w-full max-w-md">
          {/* Discord-style embed */}
          <div className="glass glow-border rounded-3xl p-5 shadow-card animate-float">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Hash className="size-4" /> music-requests</div>
            <div className="mt-4 flex gap-3">
              <Logo className="size-10 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><span className="font-semibold">Musicify</span><span className="rounded bg-blurple px-1.5 text-[10px] font-bold text-primary-foreground">BOT</span><span className="text-xs text-muted-foreground">Today at 21:04</span></div>
                <div className="mt-2 overflow-hidden rounded-xl border-l-4 border-primary bg-surface-2 p-4">
                  <p className="text-xs uppercase tracking-wider text-cyan">Now playing</p>
                  <div className="mt-2 flex gap-3">
                    <img src={album} alt="" width={816} height={816} className="size-16 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="truncate font-semibold">Blinding Lights</p>
                      <p className="text-sm text-muted-foreground">The Weeknd · 3:20</p>
                      <p className="mt-1 text-xs text-muted-foreground">Requested by @nova</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/5 bg-brand" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-6 glass rounded-2xl px-4 py-3 shadow-card animate-float hidden sm:flex items-center gap-3" style={{ animationDelay: "-2s" }}>
            <Volume2 className="size-5 text-cyan" />
            <div><p className="text-sm font-semibold">🎧 Lounge</p><p className="text-xs text-muted-foreground">12 listening</p></div>
            <Equalizer bars={6} className="h-6 w-12" />
          </div>
          <div className="absolute -top-6 -right-4 glass rounded-2xl px-4 py-2.5 text-sm shadow-card animate-float hidden sm:block" style={{ animationDelay: "-4s" }}>
            <span className="font-mono text-cyan">/play</span> <span className="text-muted-foreground">midnight city</span>
          </div>
        </div>
      </div>
    </section>
  );
}
