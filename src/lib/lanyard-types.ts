export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  display_name: string | null;
  avatar: string | null;
  discriminator: string;
}

export interface SpotifyTimestamps {
  start: number;
  end: number;
}

export interface Spotify {
  song: string;
  artist: string;
  album: string;
  album_art_url: string | null;
  track_id: string | null;
  timestamps: SpotifyTimestamps;
}

export interface Activity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  emoji?: { name: string; id?: string; animated?: boolean };
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
}

export interface Presence {
  discord_user: DiscordUser;
  discord_status: DiscordStatus;
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify: Spotify | null;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
  active_on_discord_embedded: boolean;
  kv: Record<string, string>;
}

export type PresenceSource = "socket" | "rest" | "none";

export interface PresenceState {
  presence: Presence | null;
  source: PresenceSource;
  loading: boolean;
  error: boolean;
}

export const Op = {
  Event: 0,
  Hello: 1,
  Initialize: 2,
  Heartbeat: 3,
} as const;

export type SocketFrame =
  | { op: typeof Op.Hello; d: { heartbeat_interval: number } }
  | {
      op: typeof Op.Event;
      t: "INIT_STATE";
      d: Presence | Record<string, Presence>;
    }
  | { op: typeof Op.Event; t: "PRESENCE_UPDATE"; d: Presence };
