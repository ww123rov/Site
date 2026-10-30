import { useEffect, useRef, useState } from "react";
import { SkinViewer, WalkingAnimation } from "skinview3d";
import { Card, CardHeader } from "./Card";
import { MinecraftIcon, CopyIcon, CheckIcon, PlayIcon, PauseIcon, DiscordIcon, GitHubIcon, TelegramIcon } from "./icons";
import type { Lang } from "../lib/profile";

const UUID = "29a21ecf-448b-4eb8-9e75-0fe8777ca256";

const TIERS = [
  { mode: "OP", tier: "LT4", icon: "./items/pearl.png" },
  { mode: "NetherPOT", tier: "LT3", icon: "./items/potion.png" },
  { mode: "UCH", tier: "HT5", icon: "./items/gapple.png" },
  { mode: "SWORD", tier: "HT4", icon: "./items/sword.png" },
] as const;

interface MinecraftSkinProps {
  lang: Lang;
  onCopy: (text: string, label: string) => void;
}

export function MinecraftSkin({ lang, onCopy }: MinecraftSkinProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewerRef = useRef<SkinViewer | null>(null);
  const [animating, setAnimating] = useState(true);
  const [copiedUuid, setCopiedUuid] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width: 240,
      height: 300,
      skin: "./skin.png",
      cape: "./cape.png",
      zoom: 0.85,
    });
    viewer.animation = new WalkingAnimation();
    viewer.controls.enableRotate = true;
    viewer.controls.enableZoom = false;
    viewer.controls.enablePan = false;
    viewer.controls.autoRotate = true;
    viewer.controls.autoRotateSpeed = 1.2;
    viewerRef.current = viewer;

    return () => {
      viewer.dispose();
      viewerRef.current = null;
    };
  }, []);

  const toggleAnimation = () => {
    if (!viewerRef.current) return;
    const next = !animating;
    if (viewerRef.current.animation) viewerRef.current.animation.paused = !next;
    viewerRef.current.controls.autoRotate = next;
    setAnimating(next);
  };

  const handleCopyUuid = () => {
    onCopy(UUID, "Minecraft UUID");
    setCopiedUuid(true);
    window.setTimeout(() => setCopiedUuid(false), 2000);
  };

  const handleCopyName = () => {
    onCopy("wweshka", "Minecraft Nickname");
    setCopiedName(true);
    window.setTimeout(() => setCopiedName(false), 2000);
  };

  return (
    <Card className="col-span-full">
      <CardHeader icon={<MinecraftIcon className="size-4" />}>
        {lang === "ru" ? "Minecraft профиль" : "Minecraft Profile"}
      </CardHeader>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
        <div className="relative mx-auto flex flex-col items-center justify-center md:col-span-5 lg:col-span-4">
          <div className="relative flex items-center justify-center">
            <canvas ref={canvasRef} className="block cursor-grab active:cursor-grabbing relative z-10" />
            <button
              type="button"
              onClick={toggleAnimation}
              className="absolute right-1 top-1 z-20 flex size-7 items-center justify-center rounded-md text-[var(--fg-subtle)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-colors"
              title={animating ? (lang === "ru" ? "Пауза" : "Pause") : (lang === "ru" ? "Воспроизвести" : "Play")}
            >
              {animating ? <PauseIcon className="size-3.5" /> : <PlayIcon className="size-3.5" />}
            </button>
          </div>
          <span className="mt-2 text-[11px] font-mono text-[var(--fg-subtle)]">
            {lang === "ru" ? "Вращайте модель мышкой и касанием" : "Drag model to inspect 3D view"}
          </span>
        </div>

        <div className="flex flex-col justify-between gap-4 md:col-span-7 lg:col-span-8">
          <div className="flex flex-wrap items-baseline gap-3">
            <h3 className="text-xl font-bold text-[var(--fg)]">wweshka</h3>
            <span className="font-mono text-xs text-[var(--accent)]">Java Edition</span>
          </div>

          <div className="space-y-2.5 border-t border-[var(--line)] pt-3 text-xs font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[var(--fg-subtle)]">UUID:</span>
              <button
                type="button"
                onClick={handleCopyUuid}
                className="flex items-center gap-1.5 text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                title={lang === "ru" ? "Скопировать UUID" : "Copy UUID"}
              >
                <span className="truncate max-w-[220px] sm:max-w-none">{UUID}</span>
                {copiedUuid ? (
                  <CheckIcon className="size-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <CopyIcon className="size-3.5 text-[var(--fg-subtle)] shrink-0" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-[var(--fg-subtle)]">{lang === "ru" ? "Просмотры:" : "Views:"}</span>
              <span className="text-[var(--fg)]">1 {lang === "ru" ? "/ за месяц" : "/ per month"}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-[var(--fg-subtle)]">{lang === "ru" ? "Информация:" : "Info:"}</span>
              <div className="flex items-center gap-2">
                <span title="Ukraine">🇺🇦</span>
                <a
                  href="https://discord.com/users/1393665576288391218"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                  title="Discord"
                >
                  <DiscordIcon className="size-3.5" />
                </a>
                <a
                  href="https://github.com/wweshka"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                  title="GitHub"
                >
                  <GitHubIcon className="size-3.5" />
                </a>
                <a
                  href="https://t.me/ww123rov"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                  title="Telegram"
                >
                  <TelegramIcon className="size-3.5" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-[var(--fg-subtle)]">{lang === "ru" ? "История имён:" : "Name history:"}</span>
              <button
                type="button"
                onClick={handleCopyName}
                className="flex items-center gap-1.5 text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                title={lang === "ru" ? "Скопировать ник" : "Copy nickname"}
              >
                <span>wweshka (23.12.2025 • 17:47:02)</span>
                {copiedName ? (
                  <CheckIcon className="size-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <CopyIcon className="size-3.5 text-[var(--fg-subtle)] shrink-0" />
                )}
              </button>
            </div>
          </div>

          <div className="border-t border-[var(--line)] pt-3">
            <span className="block mb-2 text-xs font-mono text-[var(--fg-subtle)]">
              {lang === "ru" ? "PvP Тиры:" : "PvP Tiers:"}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono sm:grid-cols-4">
              {TIERS.map((item) => (
                <div
                  key={item.mode}
                  className="flex items-center gap-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface-1)] px-3 py-2"
                >
                  <img
                    src={item.icon}
                    alt={item.mode}
                    width={40}
                    height={40}
                    className="size-9 shrink-0 object-contain select-none bg-transparent"
                    loading="eager"
                  />
                  <div className="flex flex-col min-w-0 leading-tight">
                    <span className="text-[11px] text-[var(--fg-muted)] tracking-wide truncate">{item.mode}</span>
                    <span className="font-bold text-xs text-[var(--accent)]">{item.tier}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}