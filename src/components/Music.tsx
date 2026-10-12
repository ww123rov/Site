import { useState } from "react";
import { clampPercent, formatDuration } from "../lib/discord";
import { FAVOURITE_ARTISTS, type Lang } from "../lib/profile";
import type { Spotify } from "../lib/lanyard-types";
import { useNow } from "../hooks/useNow";
import { Card, CardHeader } from "./Card";
import { MusicIcon, SpotifyIcon } from "./icons";

function AlbumArt({ spotify }: { spotify: Spotify }) {
  const [failed, setFailed] = useState(false);
  const src = spotify.album_art_url;

  if (!src || failed) {
    return (
      <div
        aria-hidden="true"
        className="grid size-14 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--fg-subtle)]"
      >
        <MusicIcon className="size-5" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={spotify.album}
      width={112}
      height={112}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="size-14 shrink-0 rounded-lg object-cover ring-1 ring-[var(--line)]"
    />
  );
}

function NowPlaying({ spotify, lang }: { spotify: Spotify; lang: Lang }) {
  const now = useNow(true);
  const { start, end } = spotify.timestamps;
  const total = Math.max(1, end - start);
  const elapsed = Math.min(total, Math.max(0, now - start));
  const progress = clampPercent((elapsed / total) * 100);

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <AlbumArt spotify={spotify} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] font-semibold text-[var(--fg)]">
            {spotify.song}
          </p>
          <p className="truncate text-xs font-medium text-[var(--fg-secondary)]">
            {spotify.artist}
          </p>
          <p className="mt-0.5 truncate text-xs text-[var(--fg-muted)]">
            {spotify.album}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="tabular text-xs font-mono text-[var(--fg-subtle)]">
          {formatDuration(elapsed)}
        </span>
        <div className="meter h-1.5 flex-1" aria-hidden="true">
          <div
            className="meter-fill"
            style={
              {
                "--fill": progress / 100,
                backgroundImage:
                  "linear-gradient(90deg, var(--accent-deep), var(--accent))",
                transitionDuration: "1000ms",
                transitionTimingFunction: "linear",
              } as React.CSSProperties
            }
          />
        </div>
        <span className="tabular text-xs font-mono text-[var(--fg-subtle)]">
          {formatDuration(total)}
        </span>
      </div>

      {spotify.track_id ? (
        <a
          href={`https://open.spotify.com/track/${encodeURIComponent(spotify.track_id)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="control flex min-h-10 items-center justify-center gap-2 px-3 text-xs font-semibold text-[var(--fg-secondary)]"
        >
          <SpotifyIcon className="size-4 text-[#1DB954]" />
          <span>{lang === "ru" ? "Открыть в Spotify" : "Open in Spotify"}</span>
          <span className="sr-only">
            {lang === "ru" ? "(откроется в новой вкладке)" : "(opens in new tab)"}
          </span>
        </a>
      ) : null}
    </div>
  );
}

function Idle({ lang }: { lang: Lang }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-[var(--fg-muted)]">
      <MusicIcon className="size-8 opacity-40 text-[var(--fg-subtle)]" />
      <p className="text-[13px]">
        {lang === "ru" ? "Сейчас ничего не играет" : "Not listening to music right now"}
      </p>
    </div>
  );
}

interface MusicProps {
  spotify: Spotify | null;
  index: number;
  lang: Lang;
}

export function Music({ spotify, index, lang }: MusicProps) {
  const playing = Boolean(spotify?.timestamps?.start && spotify.timestamps.end);

  return (
    <Card index={index}>
      <CardHeader
        icon={<MusicIcon className="size-4" />}
        aside={
          playing ? (
            <span className="chip border-emerald-500/30 bg-emerald-500/10 text-xs font-medium text-emerald-400">
              {lang === "ru" ? "Сейчас играет" : "Playing now"}
            </span>
          ) : null
        }
      >
        {lang === "ru" ? "Spotify" : "Spotify"}
      </CardHeader>

      <div aria-live="polite">
        {playing && spotify ? <NowPlaying spotify={spotify} lang={lang} /> : <Idle lang={lang} />}
      </div>

      <div className="mt-4 border-t border-[var(--line)] pt-3.5">
        <h3 className="mb-2 text-xs font-bold tracking-[var(--tracking-caps)] text-[var(--fg-subtle)] uppercase">
          {lang === "ru" ? "Часто слушает" : "Top Artists"}
        </h3>
        <ul className="flex flex-wrap gap-1.5">
          {FAVOURITE_ARTISTS.map((artist) => (
            <li key={artist} className="chip">
              {artist}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
