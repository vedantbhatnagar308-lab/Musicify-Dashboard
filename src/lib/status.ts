import { config } from "@/config/musicify";
import type { ServiceStatus } from "./mock-data";

const MOCK: { uptime: number; services: ServiceStatus[] } = {
  uptime: 99.9,
  services: [
    { name: "Discord Bot", status: "operational", latency: 42 },
    { name: "Music Playback", status: "operational", latency: 18 },
    { name: "API", status: "operational", latency: 64 },
    { name: "Dashboard", status: "operational", latency: 91 },
  ],
};

/** Fetches live status from config.statusEndpoint; falls back to mock data. */
export async function fetchStatus(): Promise<typeof MOCK> {
  if (!config.statusEndpoint) return MOCK;
  try {
    const r = await fetch(config.statusEndpoint);
    if (!r.ok) throw new Error();
    return (await r.json()) as typeof MOCK;
  } catch {
    return MOCK;
  }
}
