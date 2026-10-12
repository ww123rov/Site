import { PROJECTS, type Lang, type Project } from "../lib/profile";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import { Card, CardHeader } from "./Card";
import {
  ArrowOutIcon,
  FolderIcon,
  DiscordIcon,
  GitHubIcon,
  DownloadIcon,
  MinecraftIcon,
  StarIcon,
  ForkIcon,
} from "./icons";

const ICONS: Record<Project["icon"], typeof DiscordIcon> = {
  discord: DiscordIcon,
  github: GitHubIcon,
  download: DownloadIcon,
  minecraft: MinecraftIcon,
};

interface ProjectsProps {
  index: number;
  lang: Lang;
}

export function Projects({ index, lang }: ProjectsProps) {
  const { repos } = useGitHubRepos("ww123rov");

  return (
    <Card index={index} className="col-span-full">
      <CardHeader icon={<FolderIcon className="size-5" />}>
        <span className="text-lg font-bold">
          {lang === "ru" ? "Проекты и разработки" : "Featured Projects"}
        </span>
      </CardHeader>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PROJECTS.map((project) => {
          const Icon = ICONS[project.icon];

          return (
            <article
              key={project.name}
              className={`control relative flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${
                project.blurred ? "select-none pointer-events-none" : ""
              }`}
            >
              <div
                className={`flex flex-col justify-between h-full ${
                  project.blurred ? "blur-[6px] select-none" : ""
                }`}
                aria-hidden={project.blurred ? true : undefined}
              >
                <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-[var(--fg)]">
                    {project.name}
                  </h3>
                  <Icon
                    className={`size-4 shrink-0 -translate-y-px ${
                      project.icon === "minecraft"
                        ? "glitch-icon"
                        : "text-[var(--fg-subtle)]"
                    }`}
                  />
                </div>

                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                  {project.description[lang]}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[var(--surface-2)] px-2 py-0.5 text-xs font-mono font-medium text-[var(--fg-secondary)] border border-[var(--line)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--line)] flex items-center justify-between gap-2">
                {project.disabled ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)] leading-none select-none">
                    <DownloadIcon className="size-3.5 shrink-0 -translate-y-px text-[var(--accent)]" />
                    <span>{project.linkLabel[lang]}</span>
                  </span>
                ) : (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline leading-none"
                  >
                    <Icon className="size-3.5 shrink-0 -translate-y-px" />
                    <span>{project.linkLabel[lang]}</span>
                    <ArrowOutIcon className="size-3 shrink-0 -translate-y-px" />
                    <span className="sr-only">
                      {lang === "ru" ? "(откроется в новой вкладке)" : "(opens in new tab)"}
                    </span>
                  </a>
                )}

                {project.githubHref && (
                  <div className="group/git relative inline-flex items-center">
                    <a
                      href={project.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:underline leading-none"
                    >
                      <GitHubIcon className="size-3.5 shrink-0 -translate-y-px" />
                      <span>GitHub</span>
                      <ArrowOutIcon className="size-3 shrink-0 -translate-y-px" />
                      <span className="sr-only">
                        {lang === "ru" ? "(откроется в новой вкладке)" : "(opens in new tab)"}
                      </span>
                    </a>
                    {project.githubPrivate && (
                      <span className="pointer-events-none absolute bottom-full mb-1.5 right-0 translate-y-1 opacity-0 group-hover/git:opacity-100 group-hover/git:translate-y-0 group-focus-within/git:opacity-100 group-focus-within/git:translate-y-0 transition-all duration-200 rounded-md border border-red-500 bg-[#1e0507] px-2 py-0.5 text-[11px] font-mono font-bold text-red-400 shadow-lg shadow-red-950/90 whitespace-nowrap z-20">
                        {lang === "ru" ? "Приватный" : "Private"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
          );
        })}
      </div>

      {repos.length > 0 && (
        <div className="mt-6 pt-5 border-t border-[var(--line)]">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[var(--tracking-caps)] text-[var(--fg-subtle)] uppercase">
            <GitHubIcon className="size-3.5 text-[var(--accent)] shrink-0 -translate-y-px" />
            <span aria-hidden="true" className="h-3 w-px shrink-0 bg-[var(--line-strong)]" />
            <span>
              {lang === "ru" ? "Репозитории из GitHub" : "GitHub Repositories"}
            </span>
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="control flex flex-col justify-between p-3.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13.5px] font-bold text-[var(--fg)] truncate">
                      {repo.name}
                    </span>
                    <ArrowOutIcon className="size-3 text-[var(--fg-subtle)] shrink-0 -translate-y-px" />
                  </div>
                  <p className="mt-1 text-xs text-[var(--fg-muted)] line-clamp-2">
                    {repo.description || (lang === "ru" ? "Без описания" : "No description")}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs text-[var(--fg-subtle)]">
                  {repo.language && (
                    <span className="font-mono text-[var(--accent)]">
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <StarIcon className="size-3 text-amber-400" />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <ForkIcon className="size-3" />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
