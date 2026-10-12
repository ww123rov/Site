import { useState } from "react";
import { CONTACTS, type ContactLink, type Lang } from "../lib/profile";
import { Card, CardHeader } from "./Card";
import {
  ArrowOutIcon,
  CheckIcon,
  CopyIcon,
  DiscordIcon,
  GitHubIcon,
  LinkIcon,
  TelegramIcon,
} from "./icons";

const ICONS: Record<ContactLink["icon"], typeof DiscordIcon> = {
  discord: DiscordIcon,
  telegram: TelegramIcon,
  github: GitHubIcon,
};

interface LinksProps {
  index: number;
  lang: Lang;
  onCopy: (text: string, label: string) => void;
}

export function Links({ index, lang, onCopy }: LinksProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (val: string, label: string) => {
    onCopy(val, `${label}: ${val}`);
    setCopiedId(val);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card index={index}>
      <CardHeader icon={<LinkIcon className="size-4" />}>
        {lang === "ru" ? "Связь и каналы" : "Contacts & Channels"}
      </CardHeader>

      <ul className="space-y-2">
        {CONTACTS.map((contact) => {
          const Icon = ICONS[contact.icon];
          const isCopied = copiedId === contact.copyValue;

          return (
            <li key={contact.label}>
              <div className="control flex items-center justify-between p-2.5">
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--fg-secondary)]">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[13.5px] font-semibold text-[var(--fg)]">
                        {contact.label}
                      </span>
                      {contact.badge && (
                        <span className="rounded bg-[var(--surface-3)] px-1.5 py-0.2 text-[11px] font-mono text-[var(--accent)]">
                          {contact.badge[lang]}
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-xs text-[var(--fg-muted)]">
                      {contact.handle}
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {contact.copyValue && (
                    <button
                      type="button"
                      onClick={() => handleCopy(contact.copyValue!, contact.label)}
                      className="p-1 text-[var(--fg-subtle)] hover:text-[var(--accent)] transition-colors"
                      title={lang === "ru" ? "Скопировать" : "Copy to clipboard"}
                    >
                      {isCopied ? (
                        <CheckIcon className="size-4 text-emerald-400" />
                      ) : (
                        <CopyIcon className="size-4" />
                      )}
                    </button>
                  )}
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
                  >
                    <ArrowOutIcon className="size-4" />
                    <span className="sr-only">
                      {lang === "ru" ? "(откроется в новой вкладке)" : "(opens in new tab)"}
                    </span>
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
