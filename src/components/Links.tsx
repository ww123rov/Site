import { LINKS, type Link } from "../lib/profile";
import { Card, CardHeader } from "./Card";
import {
  ArrowOutIcon,
  DiscordIcon,
  GitHubIcon,
  LinkIcon,
  TelegramIcon,
} from "./icons";

const ICONS: Record<Link["icon"], typeof DiscordIcon> = {
  discord: DiscordIcon,
  telegram: TelegramIcon,
  github: GitHubIcon,
};

export function Links({ index }: { index: number }) {
  return (
    <Card index={index}>
      <CardHeader icon={<LinkIcon className="size-4" />}>Контакты</CardHeader>

      <nav aria-label="Контакты">
        <ul className="space-y-2">
          {LINKS.map((link) => {
            const Icon = ICONS[link.icon];
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="control flex items-center gap-3 p-2.5"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--fg-secondary)]">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-[var(--fg)]">
                      {link.label}
                    </span>
                    <span className="block truncate text-xs text-[var(--fg-subtle)]">
                      {link.handle}
                    </span>
                  </span>
                  <ArrowOutIcon className="size-4 shrink-0 text-[var(--fg-subtle)]" />
                  <span className="sr-only">(откроется в новой вкладке)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </Card>
  );
}
