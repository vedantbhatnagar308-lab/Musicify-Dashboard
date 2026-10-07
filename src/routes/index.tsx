import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { Features, PlayerSection, Commands, DiscordShowcase, Stats, Pricing, Status, FAQ } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Musicify — Your Discord. Your Music." },
      { name: "description", content: "Musicify is a premium Discord music bot: high-quality playback, smart queues, playlists and 24/7 music for your server." },
      { property: "og:title", content: "Musicify — Your Discord. Your Music." },
      { property: "og:description", content: "High-quality music, powerful controls and an incredible listening experience for your Discord server." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Features />
        <PlayerSection />
        <Commands />
        <DiscordShowcase />
        <Pricing />
        <Status />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
