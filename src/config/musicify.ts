/**
 * Musicify configuration — the ONE place to plug in real values.
 *
 * Set these in a `.env` file (all are PUBLIC values, safe for the browser):
 *   VITE_DISCORD_CLIENT_ID=123456789012345678
 *   VITE_BOT_INVITE_URL=https://discord.com/oauth2/authorize?client_id=...&permissions=...&scope=bot%20applications.commands
 *   VITE_SUPPORT_SERVER_URL=https://discord.gg/your-invite
 *   VITE_API_URL=https://api.your-domain.com
 *   VITE_STATUS_ENDPOINT=https://api.your-domain.com/status
 *   VITE_OAUTH_REDIRECT_URI=https://your-domain.com/auth/callback
 *
 * NEVER put the Discord client SECRET or bot TOKEN here. Those belong on the
 * server only (server function / backend) and are used to exchange OAuth codes.
 */
const env = import.meta.env;

export const DISCORD_CLIENT_ID: string = env['VITE_DISCORD_CLIENT_ID'] ?? "";
// Permissions: Connect, Speak, Send Messages, Embed Links, Use Slash Commands
const BOT_PERMISSIONS = "3148800";

export const config = {
  discordClientId: DISCORD_CLIENT_ID,
  botInviteUrl:
    (env['VITE_BOT_INVITE_URL'] as string | undefined) ??
    (DISCORD_CLIENT_ID
      ? `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${BOT_PERMISSIONS}&scope=bot%20applications.commands`
      : "#add-bot-not-configured"),
  supportServerUrl: (env['VITE_SUPPORT_SERVER_URL'] as string | undefined) ?? "#",
  githubUrl: (env['VITE_GITHUB_URL'] as string | undefined) ?? "#",
  apiUrl: (env['VITE_API_URL'] as string | undefined) ?? "",
  statusEndpoint: (env['VITE_STATUS_ENDPOINT'] as string | undefined) ?? "",
  oauthRedirectUri: (env['VITE_OAUTH_REDIRECT_URI'] as string | undefined) ?? "",
};

/** Builds the Discord OAuth2 login URL ("Continue with Discord"). Code exchange must happen server-side. */
export function getDiscordLoginUrl(): string | null {
  if (!config.discordClientId || !config.oauthRedirectUri) return null;
  const p = new URLSearchParams({
    client_id: config.discordClientId,
    redirect_uri: config.oauthRedirectUri,
    response_type: "code",
    scope: "identify guilds",
    prompt: "none",
  });
  return `https://discord.com/oauth2/authorize?${p.toString()}`;
}

/** Editable homepage stats. */
export const stats = [
  { value: 10000, suffix: "+", label: "Servers", decimals: 0 },
  { value: 500000, suffix: "+", label: "Users", decimals: 0 },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
  { value: 1, suffix: "M+", label: "Songs Played", decimals: 0 },
];
