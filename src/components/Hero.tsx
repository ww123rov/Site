import { useState } from "react";
import { avatarUrl, activeDevice, statusMeta } from "../lib/discord";
import { IDENTITY, type Lang } from "../lib/profile";
import type { Presence } from "../lib/lanyard-types";
import { useClock } from "../hooks/useClock";
import { StatusDot } from "./StatusDot";
import {
  DiscordIcon,
  TelegramIcon,
  GitHubIcon,
  CopyIcon,
  CheckIcon,
} from "./icons";

function Avatar({ presence, lang }: { presence: Presence | null; lang: Lang }) {
  const src = avatarUrl(presence?.discord_user ?? null, 256);
  const meta = statusMeta(presence?.discord_status);

  return (
    <div className="relative size-24 shrink-0 sm:size-28 lg:size-32">
      {src ? (
        <img
          src={src}
          alt={IDENTITY.name}
          width={256}
          height={256}
          decoding="async"
          className="size-full rounded-2xl object-cover border border-[var(--line)]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="size-full rounded-2xl bg-[var(--surface-2)] border border-[var(--line)]"
        />
      )}
      <span
        className="absolute -right-1 -bottom-1"
        title={`Discord: ${meta.label[lang]}`}
      >
        <StatusDot status={presence?.discord_status} size={14} ringColor="var(--surface-base)" />
      </span>
    </div>
  );
}

interface HeroProps {
  presence: Presence | null;
  lang: Lang;
  onCopy: (text: string, label: string) => void;
}

export function Hero({ presence, lang, onCopy }: HeroProps) {
  const { time, zone } = useClock(IDENTITY.timeZone);
  const meta = statusMeta(presence?.discord_status);
  const device = presence ? activeDevice(presence, lang) : null;
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const handleCopyDiscord = () => {
    onCopy(IDENTITY.handle, "Discord: ww123rov");
    setCopiedDiscord(true);
    window.setTimeout(() => setCopiedDiscord(false), 2000);
  };

  return (
    <header
      className="card reveal p-6 sm:p-7 lg:p-8"
      style={{ "--reveal-index": 0 } as React.CSSProperties}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
          <Avatar presence={presence} lang={lang} />

          <div className="min-w-0 text-center sm:text-left">
            <div className="flex flex-wrap items-baseline justify-center gap-2.5 sm:justify-start">
              <h1 className="text-gradient text-[clamp(2.1rem,6vw,2.85rem)] leading-none font-black tracking-[var(--tracking-display)]">
                {IDENTITY.name}
              </h1>
              <span className="font-mono text-sm text-[var(--accent)]">
                @{IDENTITY.handle}
              </span>
            </div>

            <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
              {IDENTITY.tagline[lang]}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-xs font-mono sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                <span className="text-[11px] text-[var(--fg-subtle)]">
                  {lang === "ru" ? "Статус:" : "Status:"}
                </span>
                <span className="text-[var(--fg)] font-medium">
                  {meta.label[lang]}{device ? ` (${device})` : ""}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                <span className="text-[11px] text-[var(--fg-subtle)]">
                  {lang === "ru" ? "Возраст:" : "Age:"}
                </span>
                <span className="text-[var(--fg)] font-medium">
                  {lang === "ru" ? "17 лет" : "17 y.o."}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                <span className="text-[11px] text-[var(--fg-subtle)]">
                  {lang === "ru" ? "Локация:" : "Location:"}
                </span>
                <span className="text-[var(--fg)] font-medium">
                  {lang === "ru" ? "Вроцлав, Польша" : "Wrocław, Poland"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                <span className="text-[11px] text-[var(--fg-subtle)]">
                  {lang === "ru" ? "Время:" : "Time:"}
                </span>
                <span className="text-[var(--accent)] font-semibold tabular">
                  {time}{zone ? ` ${zone}` : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[var(--line)] pt-4 sm:flex-row sm:justify-between lg:flex-col lg:items-end lg:border-t-0 lg:border-l lg:border-[var(--line)] lg:pt-0 lg:pl-6">
          <button
            type="button"
            onClick={handleCopyDiscord}
            className="control flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[var(--fg)] leading-none"
            title={lang === "ru" ? "Скопировать ник в буфер" : "Copy Discord handle"}
          >
            <DiscordIcon className="size-4 text-[#5865F2] shrink-0 -translate-y-px" />
            <span>ww123rov</span>
            {copiedDiscord ? (
              <CheckIcon className="size-3.5 text-emerald-400 shrink-0 -translate-y-px" />
            ) : (
              <CopyIcon className="size-3.5 text-[var(--fg-subtle)] shrink-0 -translate-y-px" />
            )}
          </button>

          <a
            href="https://t.me/ww123rov"
            target="_blank"
            rel="noopener noreferrer"
            className="control flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[var(--fg)] leading-none"
          >
            <TelegramIcon className="size-4 text-[#229ED9] shrink-0 -translate-y-px" />
            <span>Telegram</span>
          </a>

          <a
            href="https://github.com/ww123rov"
            target="_blank"
            rel="noopener noreferrer"
            className="control flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[var(--fg)] leading-none"
          >
            <GitHubIcon className="size-4 text-[var(--fg-secondary)] shrink-0 -translate-y-px" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
