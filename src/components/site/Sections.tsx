import { useEffect, useMemo, useRef, useState } from "react";
import {
  AudioLines, SlidersHorizontal, ListOrdered, Library, Zap, Globe, Clock, Terminal,
  Copy, Check, Search, Hash, Volume2, Crown, ChevronDown, Pause, SkipForward, SkipBack, Users,
} from "lucide-react";
import album from "@/assets/album.jpg";
import { Reveal, SectionHeading, StatusDot, Logo, Equalizer, buttonCls } from "./primitives";
import { Player } from "./Player";
import { commands, listeners, queue, type Command, type ServiceStatus } from "@/lib/mock-data";
import { fetchStatus } from "@/lib/status";
import { config, stats } from "@/config/musicify";
import { cn } from "@/lib/utils";

const features = [
  { icon: AudioLines, title: "High Quality Audio", text: "Enjoy crystal-clear music playback with reliable performance." },
  { icon: SlidersHorizontal, title: "Powerful Music Controls", text: "Play, pause, skip, stop, loop, shuffle and control your queue with ease." },
  { icon: ListOrdered, title: "Smart Queue", text: "Build and manage your perfect music queue without the hassle." },
  { icon: Library, title: "Playlist Support", text: "Create and manage playlists for your Discord community." },
  { icon: Zap, title: "Fast & Reliable", text: "Musicify is designed for fast responses and stable playback." },
  { icon: Globe, title: "Multiple Platforms", text: "Support for popular music sources and platforms." },
  { icon: Clock, title: "24/7 Playback", text: "Keep the music going around the clock." },
  { icon: Terminal, title: "Easy Commands", text: "Simple and intuitive commands anyone can use." },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Features" title={<>Everything your server <span className="text-gradient">needs to vibe</span></>} sub="Built for communities that take their music seriously." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex size-11 items-center justify-center rounded-xl bg-accent text-cyan transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                  <f.icon className="size-5" />
                </div>
                <h3 className="relative mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlayerSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 max-w-4xl -translate-y-1/2 rounded-full bg-violet/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading eyebrow="The Player" title={<>A player that feels <span className="text-gradient">premium</span></>} sub="Control everything from Discord or the dashboard. Try it out." />
        <Reveal><Player /></Reveal>
      </div>
    </section>
  );
}

const cats = ["All", "Music", "Playlist", "General"] as const;
const catColor: Record<Command["category"], string> = { Music: "text-primary", Playlist: "text-cyan", General: "text-success" };

export function Commands() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [copied, setCopied] = useState<string | null>(null);
  const list = useMemo(
    () => commands.filter((c) => (cat === "All" || c.category === cat) && (c.name + c.description).toLowerCase().includes(q.toLowerCase())),
    [q, cat],
  );
  const copy = (n: string) => { navigator.clipboard?.writeText(n); setCopied(n); setTimeout(() => setCopied(null), 1400); };

  return (
    <section id="commands" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Commands" title={<>Simple <span className="text-gradient">slash commands</span></>} sub="Type / in any channel and Musicify does the rest." />
        <Reveal className="glass rounded-3xl p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search commands…" aria-label="Search commands"
                className="w-full rounded-xl border border-input bg-surface py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex gap-1 overflow-x-auto rounded-xl bg-surface p-1">
              {cats.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={cn("rounded-lg px-4 py-1.5 text-sm transition-all", cat === c ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{c}</button>
              ))}
            </div>
          </div>
          <ul className="mt-5 grid gap-2 md:grid-cols-2">
            {list.map((c) => (
              <li key={c.name} className="group flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 transition-colors hover:border-primary/40">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="font-mono text-sm font-semibold">{c.name}</code>
                    <span className={cn("rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", catColor[c.category])}>{c.category}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                </div>
                <button onClick={() => copy(c.name)} aria-label={`Copy ${c.name}`} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  {copied === c.name ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="col-span-full py-10 text-center text-muted-foreground">No commands match “{q}”.</li>}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function DiscordShowcase() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Communities" title={<>Made for <span className="text-gradient">Discord Communities</span></>} sub="Feels native — because it lives right where your friends are." />
        <Reveal className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
          <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_240px]">
            <aside className="hidden border-r border-border bg-background/40 p-4 md:block">
              <p className="font-display font-bold">My Awesome Server</p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Text channels</p>
              {["general", "music-requests", "memes"].map((c) => (
                <div key={c} className={cn("mt-1 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm", c === "music-requests" ? "bg-accent text-foreground" : "text-muted-foreground")}><Hash className="size-4" />{c}</div>
              ))}
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Voice</p>
              <div className="mt-1 flex items-center gap-1.5 px-2 py-1.5 text-sm"><Volume2 className="size-4 text-success" />Lounge</div>
              <div className="ml-6 space-y-1.5 py-1">
                <div className="flex items-center gap-2 text-sm"><Logo className="size-5 rounded-md" animated={false} /> Musicify</div>
                {listeners.slice(0, 4).map((u) => (
                  <div key={u} className="flex items-center gap-2 text-sm text-muted-foreground"><span className="size-5 rounded-full bg-accent" />{u}</div>
                ))}
              </div>
            </aside>
            <div className="p-5 md:p-7">
              <div className="flex items-center gap-2 border-b border-border pb-3 text-sm font-semibold"><Hash className="size-4 text-muted-foreground" />music-requests</div>
              <div className="mt-5 space-y-5">
                <div className="flex gap-3"><span className="size-10 shrink-0 rounded-full bg-accent" /><div><p className="text-sm font-semibold">nova</p><p className="text-sm"><span className="rounded bg-primary/20 px-1 font-mono text-primary">/play</span> blinding lights</p></div></div>
                <div className="flex gap-3">
                  <Logo className="size-10 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">Musicify <span className="ml-1 rounded bg-blurple px-1.5 text-[10px] text-primary-foreground">BOT</span></p>
                    <div className="mt-2 max-w-md rounded-xl border-l-4 border-cyan bg-surface-2 p-4">
                      <div className="flex gap-3">
                        <img src={album} alt="" loading="lazy" width={816} height={816} className="size-20 rounded-lg object-cover" />
                        <div className="min-w-0"><p className="text-xs uppercase tracking-wider text-cyan">Now playing</p><p className="truncate font-semibold">Blinding Lights</p><p className="text-sm text-muted-foreground">The Weeknd</p><Equalizer bars={14} className="mt-2 h-5 w-28" /></div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        {[SkipBack, Pause, SkipForward].map((I, i) => <button key={i} aria-label="control" className="rounded-lg bg-accent px-3 py-1.5 hover:bg-primary/30"><I className="size-4" /></button>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <aside className="hidden border-l border-border bg-background/40 p-4 lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Up next</p>
              <ul className="mt-3 space-y-3">
                {queue.slice(0, 4).map((t) => <li key={t.title} className="text-sm"><p className="truncate">{t.title}</p><p className="text-xs text-muted-foreground">{t.artist}</p></li>)}
              </ul>
              <p className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><Users className="size-3.5" />Listening · {listeners.length}</p>
              <div className="mt-3 flex -space-x-2">{listeners.map((u) => <span key={u} title={u} className="size-8 rounded-full border-2 border-surface bg-brand" />)}</div>
            </aside>
          </div>
        </Reveal>
        <div className="mt-10 text-center"><a href={config.botInviteUrl} className={buttonCls("primary", "lg")}>Add Musicify to Your Server</a></div>
      </div>
    </section>
  );
}

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return; io.disconnect();
      const start = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - start) / 1600); setN(value * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el); return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Reveal key={s.label} className="rounded-2xl glass p-6 text-center">
            <p className="font-display text-4xl font-bold text-gradient md:text-5xl"><Counter {...s} /></p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const plans = [
  { name: "Free", price: "$0", tagline: "Everything to get the party started.", features: ["High-quality music", "Basic queue", "Music controls", "Standard support"], cta: "Add for Free", popular: false },
  { name: "Premium", price: "$4.99", tagline: "For servers that never stop playing.", features: ["Higher audio quality", "Advanced queue", "24/7 playback", "Advanced playlists", "Premium effects", "Priority support"], cta: "Upgrade to Premium", popular: true },
];

/** Hook up payments here later (e.g. call a checkout server function). */
function onUpgrade() { alert("Premium checkout is coming soon!"); }

export function Pricing() {
  return (
    <section id="premium" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Premium" title={<>Turn it <span className="text-gradient">up to 11</span></>} sub="Start free. Upgrade when your server wants more." />
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className={cn("relative h-full rounded-3xl p-8", p.popular ? "glass glow-border shadow-glow" : "glass")}>
                {p.popular && <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-bold text-primary-foreground"><Crown className="size-3.5" />Most Popular</span>}
                <h3 className="text-2xl font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-6"><span className="font-display text-5xl font-bold">{p.price}</span><span className="text-muted-foreground"> /month</span></p>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => <li key={f} className="flex items-center gap-3 text-sm"><Check className={cn("size-4", p.popular ? "text-cyan" : "text-muted-foreground")} />{f}</li>)}
                </ul>
                {p.popular
                  ? <button onClick={onUpgrade} className={cn(buttonCls("primary", "lg"), "mt-10 w-full")}>{p.cta}</button>
                  : <a href={config.botInviteUrl} className={cn(buttonCls("ghost", "lg"), "mt-10 w-full")}>{p.cta}</a>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Status() {
  const [data, setData] = useState<{ uptime: number; services: ServiceStatus[] } | null>(null);
  useEffect(() => { fetchStatus().then(setData); }, []);
  return (
    <section id="status" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Status" title={<>All systems <span className="text-gradient">operational</span></>} />
        <Reveal className="glass rounded-3xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div className="flex items-center gap-3"><StatusDot /><span className="font-semibold">Musicify is running smoothly</span></div>
            <span className="rounded-full bg-success/15 px-3 py-1 font-mono text-sm text-success">Uptime: {data?.uptime ?? 99.9}%</span>
          </div>
          <ul className="mt-2 divide-y divide-border">
            {(data?.services ?? []).map((s) => (
              <li key={s.name} className="flex items-center gap-4 py-4">
                <span className="flex-1 font-medium">{s.name}</span>
                <div className="hidden gap-0.5 sm:flex">{Array.from({ length: 30 }).map((_, i) => <span key={i} className="h-6 w-1.5 rounded-sm bg-success/70" />)}</div>
                <span className="w-16 text-right font-mono text-xs text-muted-foreground">{s.latency}ms</span>
                <span className="flex items-center gap-2 text-sm text-success"><StatusDot />Operational</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

const faqs = [
  ["What is Musicify?", "Musicify is a Discord music bot that plays high-quality music in your voice channels with powerful queue and playlist controls."],
  ["How do I add Musicify to my server?", "Click “Add Musicify to Discord”, pick your server, and authorize. You need the Manage Server permission."],
  ["Is Musicify free?", "Yes! All core features are free forever. Premium unlocks extras like 24/7 playback and higher audio quality."],
  ["Which music platforms are supported?", "Musicify supports popular music sources. Use /play with a song name or link to get started."],
  ["Does Musicify support playlists?", "Yes — create, edit and play playlists with the /playlist commands or from the dashboard."],
  ["Does Musicify support 24/7 playback?", "24/7 mode is available on Premium and keeps Musicify in your voice channel around the clock."],
  ["How do I get support?", "Join our support server on Discord or use /support inside any server."],
  ["How does Premium work?", "Premium is a monthly subscription per server. Upgrade from the dashboard and features unlock instantly."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={<>Questions? <span className="text-gradient">Answered.</span></>} />
        <div className="space-y-3">
          {faqs.map(([q, a], i) => (
            <Reveal key={q} delay={i * 40} className="glass overflow-hidden rounded-2xl">
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                {q}<ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform duration-300", open === i && "rotate-180 text-cyan")} />
              </button>
              <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <p className="overflow-hidden px-6 text-muted-foreground"><span className="block pb-5">{a}</span></p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
