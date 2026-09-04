export const DISCORD_USER_ID = "830702760952463400";

export const IDENTITY = {
  name: "wweshka",
  handle: "ww123rov",
  role: "Java- и веб-разработчик",
  tagline: "Плагины для Minecraft, боты и небольшие сайты.",
  timeZone: "Europe/Warsaw",
} as const;

export interface Fact {
  label: string;
  value: string;
  icon: "calendar" | "pin" | "plane" | "clock" | "globe";
}

export const FACTS: readonly Fact[] = [
  { label: "Возраст", value: "17 лет", icon: "calendar" },
  { label: "Родился", value: "Украина", icon: "pin" },
  { label: "Живёт", value: "Польша", icon: "plane" },
  { label: "Языки", value: "Русский · Украинский · Польский", icon: "globe" },
];

export interface Skill {
  name: string;
  share: number;
  note: string;
}

export const SKILLS: readonly Skill[] = [
  { name: "Java", share: 76, note: "Плагины и моды для Minecraft" },
  { name: "React / TypeScript", share: 16, note: "Сайты и веб-интерфейсы" },
  { name: "JavaScript", share: 8, note: "Скрипты и мелкая автоматизация" },
];

export interface Link {
  label: string;
  handle: string;
  href: string;
  icon: "discord" | "telegram" | "github";
}

export const LINKS: readonly Link[] = [
  {
    label: "Discord",
    handle: "ww123rov",
    href: `https://discord.com/users/${DISCORD_USER_ID}`,
    icon: "discord",
  },
  {
    label: "Telegram",
    handle: "@ww123rov",
    href: "https://t.me/ww123rov",
    icon: "telegram",
  },
  {
    label: "GitHub",
    handle: "ww123rov",
    href: "https://github.com/ww123rov",
    icon: "github",
  },
];

export interface Project {
  name: string;
  platform: string;
  description: string;
  href: string;
  icon: "telegram" | "discord";
}

export const PROJECTS: readonly Project[] = [
  {
    name: "Шиза дротика",
    platform: "Telegram",
    description: "Личный канал",
    href: "https://t.me/shizadarta",
    icon: "telegram",
  },
  {
    name: "Nexgen Recode",
    platform: "Discord",
    description: "Клиент для Minecraft",
    href: "https://discord.gg/WTdQK9EeH",
    icon: "discord",
  },
];

export const ABOUT = {
  body: "Увлекаюсь Minecraft и разработкой: пишу плагины и моды на Java, делаю сайты. В свободное время изучаю новые технологии и играю в Hearts of Iron.",
  motto: "Искал медь — сгорел медведь.",
} as const;

export const FAVOURITE_ARTISTS: readonly string[] = [
  "ooes",
  "zhanulka-Hop",
  "Fortuna 812",
  "Sadsvit",
];
