import { useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, ListMusic, Heart } from "lucide-react";
import album from "@/assets/album.jpg";
import { fmt, nowPlaying, queue } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/** UI-only player demo. Wire `playing`/`pos` to the bot API later. */
export function Player({ compact = false }: { compact?: boolean }) {
  const [playing, setPlaying] = useState(true);
  const [pos, setPos] = useState(72);
  const [vol, setVol] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(true);
  const [showQueue, setShowQueue] = useState(false);
  const d = nowPlaying.duration;

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPos((p) => (p + 1) % d), 1000);
    return () => clearInterval(t);
  }, [playing, d]);

  const iconBtn = (on: boolean) => cn("rounded-full p-2 transition-colors hover:bg-accent", on ? "text-cyan" : "text-muted-foreground");

  return (
    <div className={cn("glass glow-border rounded-3xl shadow-card", compact ? "p-4" : "p-6 md:p-8")}>
      <div className={cn("flex gap-5", compact ? "items-center" : "flex-col md:flex-row md:items-center md:gap-8")}>
        <div className={cn("relative shrink-0", compact ? "size-16" : "mx-auto size-56 md:size-64")}>
          <div className="absolute -inset-4 rounded-3xl bg-brand opacity-40 blur-2xl" />
          <img src={album} alt="Album art" width={816} height={816} className={cn("relative size-full rounded-2xl object-cover", playing && !compact && "animate-float")} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {!compact && <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">Now playing</p>}
              <h3 className={cn("truncate font-bold", compact ? "text-base" : "mt-1 text-3xl")}>{nowPlaying.title}</h3>
              <p className="truncate text-muted-foreground">{nowPlaying.artist}</p>
            </div>
            <button aria-label="Like" className="rounded-full p-2 text-primary hover:bg-accent"><Heart className="size-5 fill-current" /></button>
          </div>

          <div className={compact ? "mt-3" : "mt-6"}>
            <input type="range" min={0} max={d} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Progress"
              className="w-full accent-[var(--primary)] h-1.5 cursor-pointer" />
            <div className="mt-1 flex justify-between font-mono text-xs text-muted-foreground"><span>{fmt(pos)}</span><span>{fmt(d)}</span></div>
          </div>

          <div className={cn("flex flex-wrap items-center justify-between gap-3", compact ? "mt-2" : "mt-4")}>
            <div className="flex items-center gap-1">
              <button aria-label="Shuffle" onClick={() => setShuffle(!shuffle)} className={iconBtn(shuffle)}><Shuffle className="size-4" /></button>
              <button aria-label="Previous" onClick={() => setPos(0)} className={iconBtn(false)}><SkipBack className="size-5" /></button>
              <button aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}
                className="mx-1 flex size-12 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-glow transition-transform hover:scale-105">
                {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 translate-x-0.5 fill-current" />}
              </button>
              <button aria-label="Next" onClick={() => setPos(0)} className={iconBtn(false)}><SkipForward className="size-5" /></button>
              <button aria-label="Repeat" onClick={() => setRepeat(!repeat)} className={iconBtn(repeat)}><Repeat className="size-4" /></button>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="size-4 text-muted-foreground" />
              <input type="range" min={0} max={100} value={vol} onChange={(e) => setVol(+e.target.value)} aria-label="Volume" className="w-24 accent-[var(--cyan)]" />
              <button aria-label="Queue" onClick={() => setShowQueue(!showQueue)} className={iconBtn(showQueue)}><ListMusic className="size-5" /></button>
            </div>
          </div>
        </div>
      </div>
      {showQueue && (
        <ul className="mt-6 space-y-1 border-t border-border pt-4">
          {queue.map((t, i) => (
            <li key={t.title} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-accent">
              <span className="w-4 font-mono text-muted-foreground">{i + 1}</span>
              <span className="flex-1 truncate">{t.title} <span className="text-muted-foreground">— {t.artist}</span></span>
              <span className="font-mono text-xs text-muted-foreground">{fmt(t.duration)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
