import { DISCORD_USER_ID } from "./lib/profile";
import { usePresence } from "./hooks/usePresence";
import { Hero } from "./components/Hero";
import { AboutFacts } from "./components/AboutFacts";
import { Links } from "./components/Links";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Music } from "./components/Music";

function ConnectionNote({ error }: { error: boolean }) {
  if (!error) return null;
  return (
    <span className="mr-auto text-[var(--fg-subtle)]">
      Статус недоступен — Lanyard не отвечает
    </span>
  );
}

export function App() {
  const { presence, error } = usePresence(DISCORD_USER_ID);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Hero presence={presence} />

      <main className="mt-4 grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <AboutFacts index={1} />
          <Links index={2} />
        </div>

        <div className="flex flex-col gap-4">
          <Projects index={3} />
          <About index={4} />
        </div>

        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          <Skills index={5} />
          <Music spotify={presence?.spotify ?? null} index={6} />
        </div>
      </main>

      <footer className="mt-6 flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs">
        <ConnectionNote error={error} />
        <a
          href="https://github.com/ww123rov/Site"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--fg-subtle)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors duration-200 hover:text-[var(--accent)]"
        >
          Исходный код
          <span className="sr-only">(откроется в новой вкладке)</span>
        </a>
      </footer>
    </div>
  );
}
