import { statusMeta } from "../lib/discord";
import type { DiscordStatus } from "../lib/lanyard-types";

interface StatusDotProps {
  status: DiscordStatus | undefined;
  size?: number;
  ringColor?: string;
}

export function StatusDot({
  status,
  size = 10,
  ringColor = "var(--surface-base)",
}: StatusDotProps) {
  const { color } = statusMeta(status);
  return (
    <span
      aria-hidden="true"
      className="block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 0 ${Math.max(2, Math.round(size / 4))}px ${ringColor}`,
      }}
    />
  );
}
