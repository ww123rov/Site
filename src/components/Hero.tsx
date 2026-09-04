import { avatarUrl, activeDevice, statusMeta } from "../lib/discord";
import { IDENTITY } from "../lib/profile";
import type { Presence } from "../lib/lanyard-types";
import { useClock } from "../hooks/useClock";
import { StatusDot } from "./StatusDot";
import { CalendarIcon, ClockIcon, PinIcon } from "./icons";

function Avatar({ presence }: { presence: Presence | null }) {
  const src = avatarUrl(presence?.discord_user ?? null, 256);
  const meta = statusMeta(presence?.discord_status);

  return (
    <div className="relative size-28 shrink-0 sm:size-32">
      {src ? (
        <img
          src={src}
          alt=""
          width={256}
          height={256}
          decoding="async"
          className="size-full rounded-full object-cover ring-1 ring-[var(--line-strong)]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid size-full place-items-center rounded-full bg-[var(--surface-2)] text-3xl font-semibold text-[var(--accent)] ring-1 ring-[var(--line-strong)]"
        >
          {IDENTITY.name.charAt(0).toUpperCase()}
        </div>
      )}
      <span
        className="absolute right-1 bottom-1"
        title={`Discord: ${meta.label}`}
      >
        <StatusDot status={presence?.discord_status} size={16} />
      </span>
    </div>
  );
}

interface HeroProps {
  presence: Presence | null;
}

export function Hero({ presence }: HeroProps) {
  const { time, zone } = useClock(IDENTITY.timeZone);
  const meta = statusMeta(presence?.discord_status);
  const device = presence ? activeDevice(presence) : null;

  return (
    <header
      className="card reveal p-6 sm:p-8"
      style={{ "--reveal-index": 0 } as React.CSSProperties}
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <Avatar presence={presence} />

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-gradient text-[clamp(2rem,7vw,2.75rem)] leading-[1.1] font-extrabold tracking-[var(--tracking-display)]">
            {IDENTITY.name}
          </h1>
          <p className="mt-1.5 text-sm font-medium text-[var(--fg-secondary)]">
            {IDENTITY.role}
          </p>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            {IDENTITY.tagline}
          </p>

          <ul className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
            <li className="chip">
              <StatusDot
                status={presence?.discord_status}
                size={7}
                ringColor="transparent"
              />
              <span aria-live="polite">
                {meta.label}
                {device ? ` · ${device}` : ""}
              </span>
            </li>
            <li className="chip">
              <CalendarIcon className="size-3.5 text-[var(--accent)]" />
              17 лет
            </li>
            <li className="chip">
              <PinIcon className="size-3.5 text-[var(--accent)]" />
              Польша
            </li>
            <li className="chip tabular">
              <ClockIcon className="size-3.5 text-[var(--accent)]" />
              {time}
              {zone ? ` ${zone}` : ""}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
