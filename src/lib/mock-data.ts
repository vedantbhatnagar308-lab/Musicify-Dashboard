export type Track = { title: string; artist: string; duration: number; requestedBy?: string };

export const nowPlaying: Track = { title: "Blinding Lights", artist: "The Weeknd", duration: 200, requestedBy: "nova" };

export const queue: Track[] = [
  { title: "Levitating", artist: "Dua Lipa", duration: 203, requestedBy: "kai" },
  { title: "Midnight City", artist: "M83", duration: 243, requestedBy: "luna" },
  { title: "Starboy", artist: "The Weeknd", duration: 230, requestedBy: "nova" },
  { title: "Electric Feel", artist: "MGMT", duration: 229, requestedBy: "rex" },
  { title: "Get Lucky", artist: "Daft Punk", duration: 248, requestedBy: "kai" },
];

export const servers = [
  { id: "1", name: "My Awesome Server", members: 1284, initials: "MA" },
  { id: "2", name: "Lo-fi Lounge", members: 532, initials: "LL" },
  { id: "3", name: "Gaming Hub", members: 4210, initials: "GH" },
];

export const playlists = [
  { name: "Late Night Drive", tracks: 42 },
  { name: "Gaming Hype", tracks: 87 },
  { name: "Chill Study", tracks: 120 },
];

export const listeners = ["nova", "kai", "luna", "rex", "ivy"];

export type Command = { name: string; description: string; category: "Music" | "Playlist" | "General" };

export const commands: Command[] = [
  { name: "/play", description: "Play a song or add it to the queue.", category: "Music" },
  { name: "/pause", description: "Pause the current track.", category: "Music" },
  { name: "/resume", description: "Resume playback.", category: "Music" },
  { name: "/skip", description: "Skip to the next song in the queue.", category: "Music" },
  { name: "/stop", description: "Stop playback and clear the queue.", category: "Music" },
  { name: "/queue", description: "Show the current queue.", category: "Music" },
  { name: "/nowplaying", description: "Show the song playing right now.", category: "Music" },
  { name: "/volume", description: "Set the playback volume (0–100).", category: "Music" },
  { name: "/loop", description: "Loop the current track or the whole queue.", category: "Music" },
  { name: "/shuffle", description: "Shuffle the queue.", category: "Music" },
  { name: "/playlist create", description: "Create a new playlist.", category: "Playlist" },
  { name: "/playlist add", description: "Add a song to a playlist.", category: "Playlist" },
  { name: "/playlist remove", description: "Remove a song from a playlist.", category: "Playlist" },
  { name: "/playlist play", description: "Queue an entire playlist.", category: "Playlist" },
  { name: "/help", description: "List all commands.", category: "General" },
  { name: "/ping", description: "Check the bot's latency.", category: "General" },
  { name: "/invite", description: "Get the link to add Musicify.", category: "General" },
  { name: "/support", description: "Join the support server.", category: "General" },
];

export type ServiceStatus = { name: string; status: "operational" | "degraded" | "outage"; latency: number };

export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
