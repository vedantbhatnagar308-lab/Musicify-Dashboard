import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, buttonCls } from "@/components/site/primitives";
import { Player } from "@/components/site/Player";
import { getDiscordLoginUrl } from "@/config/musicify";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Musicify" },
      { name: "description", content: "Manage Musicify in your Discord servers." },
      { property: "og:title", content: "Dashboard — Musicify" },
      { property: "og:description", content: "Control music, queue and settings for your Discord servers." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const login = getDiscordLoginUrl();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link to="/" className="flex items-center gap-2.5"><Logo className="size-8" /><span className="font-display text-lg font-bold">Musicify</span></Link>
      <h1 className="mt-10 text-4xl font-bold">My Awesome Server</h1>
      <p className="mt-2 text-muted-foreground">Dashboard preview with sample data.</p>
      <a href={login ?? "#"} className={buttonCls("blurple") + " mt-6"}>Continue with Discord</a>
      <div className="mt-10"><Player /></div>
    </div>
  );
}
