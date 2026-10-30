import { useState, useEffect } from "react";
import { DISCORD_USER_ID, type Lang } from "./lib/profile";
import { usePresence } from "./hooks/usePresence";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { About } from "./components/About";
import { Links } from "./components/Links";
import { Music } from "./components/Music";
import { MinecraftSkin } from "./components/MinecraftSkin";
import { CheckIcon, GlobeIcon } from "./components/icons";

function ConnectionNote({ error, lang }: { error: boolean; lang: Lang }) {
  if (!error) return null;
  return (
    <span className="mr-auto text-[var(--fg-subtle)]">
      {lang === "ru"
        ? "Статус недоступен, Lanyard не отвечает"
        : "Live status offline, Lanyard unreachable"}
    </span>
  );
}

export function App() {
  const { presence, error } = usePresence(DISCORD_USER_ID);
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("pref-lang");
    return saved === "en" ? "en" : "ru";
  });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("pref-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = (target: Lang) => {
    if (target === lang) return;
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        setLang(target);
      });
    } else {
      setLang(target);
    }
  };

  const showToast = (val: string, label: string) => {
    navigator.clipboard.writeText(val).catch(() => {});
    setToast(
      lang === "ru"
        ? `Скопировано в буфер: ${label}`
        : `Copied to clipboard: ${label}`,
    );
    window.setTimeout(() => setToast(null), 2400);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <nav className="mb-4 flex items-center justify-end text-xs font-mono text-[var(--fg-subtle)]">
        <div className="flex items-center gap-1">
          <GlobeIcon className="size-3.5 text-[var(--fg-subtle)] mr-1" />
          <button
            type="button"
            onClick={() => toggleLang("ru")}
            className={`px-1.5 py-0.5 transition-colors ${
              lang === "ru" ? "text-[var(--accent)] font-bold" : "hover:text-[var(--fg)]"
            }`}
          >
            RU
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => toggleLang("en")}
            className={`px-1.5 py-0.5 transition-colors ${
              lang === "en" ? "text-[var(--accent)] font-bold" : "hover:text-[var(--fg)]"
            }`}
          >
            EN
          </button>
        </div>
      </nav>

      <Hero
        presence={presence}
        lang={lang}
        onCopy={showToast}
      />

      <main className="mt-5 flex flex-col gap-5">
        <Projects index={1} lang={lang} />

        <MinecraftSkin lang={lang} onCopy={showToast} />

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Skills index={2} lang={lang} />
            <Links index={3} lang={lang} onCopy={showToast} />
          </div>

          <div className="flex flex-col gap-5">
            <About index={4} lang={lang} />
            <Music spotify={presence?.spotify ?? null} index={5} lang={lang} />
          </div>
        </div>
      </main>

      <footer className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[var(--line)] pt-4 text-xs">
        <ConnectionNote error={error} lang={lang} />
        <div className="ml-auto flex items-center gap-4 text-[var(--fg-subtle)]">
          <span>wweshka &copy; {new Date().getFullYear()}</span>
          <a
            href="https://github.com/ww123rov/Site"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[var(--line-strong)] underline-offset-4 transition-colors duration-200 hover:text-[var(--accent)]"
          >
            {lang === "ru" ? "Исходный код" : "Source Code"}
            <span className="sr-only">
              {lang === "ru" ? "(откроется в новой вкладке)" : "(opens in new tab)"}
            </span>
          </a>
        </div>
      </footer>

      {toast && (
        <aside className="toast" role="status" aria-live="polite">
          <CheckIcon className="size-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toast}</span>
        </aside>
      )}
    </div>
  );
}
