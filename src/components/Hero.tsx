import { useState } from "react";
import { avatarUrl, activeDevice, statusMeta } from "../lib/discord";
import { IDENTITY, FACTS, type Lang } from "../lib/profile";
import type { Presence } from "../lib/lanyard-types";
import { useClock } from "../hooks/useClock";
import { StatusDot } from "./StatusDot";
import {
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  PinIcon,
  DiscordIcon,
  TelegramIcon,
  GitHubIcon,
  CopyIcon,
  CheckIcon,
} from "./icons";

const FACT_ICONS = {
  calendar: CalendarIcon,
  pin: PinIcon,
  globe: GlobeIcon,
} as const;

function Avatar({ presence, lang }: { presence: Presence | null; lang: Lang }) {
  const src = avatarUrl(presence?.discord_user ?? null, 256);
  const meta = statusMeta(presence?.discord_status);

  return (
    <div className="relative size-24 shrink-0 sm:size-28 lg:size-32">
      {src ? (
        <img
          src={src}
          alt=""
          width={256}
          height={256}
          decoding="async"
          className="size-full rounded-full object-cover ring-2 ring-[var(--line-strong)]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid size-full place-items-center rounded-full bg-[var(--surface-2)] text-3xl font-semibold text-[var(--accent)] ring-2 ring-[var(--line-strong)]"
        >
          {IDENTITY.name.charAt(0).toUpperCase()}
        </div>
      )}
      <span
        className="absolute right-1 bottom-1"
        title={`Discord: ${meta.label[lang]}`}
      >
        <StatusDot status={presence?.discord_status} size={16} />
      </span>
    </div>
  );
}

interface HeroProps {
  presence: Presence | null;
  lang: Lang;
  onToggleLang: (next?: Lang) => void;
  onCopy: (text: string, label: string) => void;
}

export function Hero({ presence, lang, onToggleLang, onCopy }: HeroProps) {
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
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
              <h1 className="text-gradient text-[clamp(2.1rem,6vw,2.85rem)] leading-none font-black tracking-[var(--tracking-display)]">
                {IDENTITY.name}
              </h1>
            </div>

            <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
              {IDENTITY.tagline[lang]}
            </p>

            <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <li className="chip">
                <StatusDot
                  status={presence?.discord_status}
                  size={7}
                  ringColor="transparent"
                />
                <span aria-live="polite">
                  {meta.label[lang]}
                  {device ? ` · ${device}` : ""}
                </span>
              </li>
              {FACTS.map((fact) => {
                const Icon = FACT_ICONS[fact.icon];
                return (
                  <li key={fact.icon} className="chip">
                    <Icon className="size-3.5 text-[var(--accent)] shrink-0 -translate-y-px" />
                    {fact.value[lang]}
                  </li>
                );
              })}
              <li className="chip tabular">
                <ClockIcon className="size-3.5 text-[var(--accent)] shrink-0 -translate-y-px" />
                {time}
                {zone ? ` ${zone}` : ""}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-[var(--line)] pt-4 sm:flex-row sm:justify-between lg:flex-col lg:items-end lg:border-t-0 lg:border-l lg:border-[var(--line)] lg:pt-0 lg:pl-6">
          <div
            className="control lang-switcher flex items-center rounded-lg p-0.5"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              onClick={() => onToggleLang("ru")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                lang === "ru"
                  ? "bg-[var(--surface-3)] text-[var(--accent)] shadow-xs"
                  : "text-[var(--fg-subtle)] hover:text-[var(--fg)]"
              }`}
            >
              <GlobeIcon className="size-3 shrink-0 -translate-y-px" />
              <span>RU</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleLang("en")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                lang === "en"
                  ? "bg-[var(--surface-3)] text-[var(--accent)] shadow-xs"
                  : "text-[var(--fg-subtle)] hover:text-[var(--fg)]"
              }`}
            >
              <span>EN</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 lg:flex-col lg:items-stretch">
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
      </div>
    </header>
  );
}
