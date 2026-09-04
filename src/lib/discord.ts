import type { DiscordStatus, DiscordUser } from "./lanyard-types";

export function avatarUrl(user: DiscordUser | null, size = 256): string | null {
  if (!user?.avatar) return null;
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${encodeURIComponent(user.id)}/${user.avatar}.${ext}?size=${size}`;
}

interface StatusMeta {
  label: string;
  color: string;
}

const STATUS: Record<DiscordStatus, StatusMeta> = {
  online: { label: "В сети", color: "var(--color-presence-online)" },
  idle: { label: "Неактивен", color: "var(--color-presence-idle)" },
  dnd: { label: "Не беспокоить", color: "var(--color-presence-dnd)" },
  offline: { label: "Не в сети", color: "var(--color-presence-offline)" },
};

export function statusMeta(status: DiscordStatus | undefined): StatusMeta {
  return (status && STATUS[status]) || STATUS.offline;
}

export function activeDevice(p: {
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
}): string | null {
  if (p.active_on_discord_mobile) return "телефон";
  if (p.active_on_discord_desktop) return "компьютер";
  if (p.active_on_discord_web) return "браузер";
  return null;
}

export function formatDuration(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}
