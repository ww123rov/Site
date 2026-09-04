import { PROJECTS, type Project } from "../lib/profile";
import { Card, CardHeader } from "./Card";
import { ArrowOutIcon, CubeIcon, DiscordIcon, TelegramIcon } from "./icons";

const ICONS: Record<Project["icon"], typeof DiscordIcon> = {
  discord: DiscordIcon,
  telegram: TelegramIcon,
};

export function Projects({ index }: { index: number }) {
  return (
    <Card index={index}>
      <CardHeader icon={<CubeIcon className="size-4" />}>Проекты</CardHeader>

      <ul className="space-y-2.5">
        {PROJECTS.map((project) => {
          const Icon = ICONS[project.icon];
          return (
            <li key={project.name}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="control flex items-start gap-3 p-3"
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-lg text-[var(--accent)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(140deg, color-mix(in oklab, var(--accent-strong) 16%, transparent), transparent)",
                    border:
                      "1px solid color-mix(in oklab, var(--accent-strong) 20%, transparent)",
                  }}
                >
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[var(--fg)]">
                    {project.name}
                  </span>
                  <span className="block text-xs text-[var(--fg-subtle)]">
                    {project.platform}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--accent)]">
                    {project.description}
                  </span>
                </span>
                <ArrowOutIcon className="size-4 shrink-0 text-[var(--fg-subtle)]" />
                <span className="sr-only">(откроется в новой вкладке)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
