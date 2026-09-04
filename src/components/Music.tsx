import { useState } from "react";
import { clampPercent, formatDuration } from "../lib/discord";
import { FAVOURITE_ARTISTS } from "../lib/profile";
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
      alt={`Обложка: ${spotify.album}`}
      width={112}
      height={112}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="size-14 shrink-0 rounded-lg object-cover ring-1 ring-[var(--line)]"
    />
  );
}

function NowPlaying({ spotify }: { spotify: Spotify }) {
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
          <p className="truncate text-sm font-medium text-[var(--fg)]">
            {spotify.song}
          </p>
          <p className="truncate text-xs text-[var(--fg-muted)]">
            {spotify.artist}
          </p>
          <p className="mt-0.5 truncate text-xs text-[var(--fg-subtle)]">
            {spotify.album}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="tabular text-xs text-[var(--fg-subtle)]">
          {formatDuration(elapsed)}
        </span>
        <div className="meter h-1 flex-1" aria-hidden="true">
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
        <span className="tabular text-xs text-[var(--fg-subtle)]">
          {formatDuration(total)}
        </span>
      </div>

      {spotify.track_id ? (
        <a
          href={`https://open.spotify.com/track/${encodeURIComponent(spotify.track_id)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="control flex min-h-11 items-center justify-center gap-2 px-3 text-xs font-medium text-[var(--fg-secondary)]"
        >
          <SpotifyIcon className="size-4" />
          Открыть в Spotify
          <span className="sr-only">(откроется в новой вкладке)</span>
        </a>
      ) : null}
    </div>
  );
}

function Idle() {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-[var(--fg-subtle)]">
      <MusicIcon className="size-8 opacity-40" />
      <p className="text-xs">Сейчас ничего не слушает</p>
    </div>
  );
}

interface MusicProps {
  spotify: Spotify | null;
  index: number;
}

export function Music({ spotify, index }: MusicProps) {
  const playing = Boolean(spotify?.timestamps?.start && spotify.timestamps.end);

  return (
    <Card index={index}>
      <CardHeader
        icon={<MusicIcon className="size-4" />}
        aside={
          playing ? (
            <span className="chip border-transparent bg-transparent px-0 text-xs text-[var(--accent)]">
              Играет
            </span>
          ) : null
        }
      >
        Музыка
      </CardHeader>

      <div aria-live="polite">
        {playing && spotify ? <NowPlaying spotify={spotify} /> : <Idle />}
      </div>

      <div className="mt-4 border-t border-[var(--line)] pt-3.5">
        <h3 className="mb-2 text-xs font-medium tracking-[var(--tracking-caps)] text-[var(--fg-subtle)] uppercase">
          Часто слушает
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
