export type Lang = "ru" | "en";

export const DISCORD_USER_ID = "830702760952463400";

export const IDENTITY = {
  name: "wweshka",
  handle: "ww123rov",
  timeZone: "Europe/Warsaw",
  tagline: {
    ru: "Являюсь владельцем клиента Nexgen и занимаюсь другими проектами.",
    en: "Owner of the Nexgen client and working on other projects.",
  },
} as const;

export interface Fact {
  label: Record<Lang, string>;
  value: Record<Lang, string>;
  icon: "calendar" | "pin" | "globe";
}

export const FACTS: readonly Fact[] = [
  {
    label: { ru: "Возраст", en: "Age" },
    value: { ru: "17 лет", en: "17 y.o." },
    icon: "calendar",
  },
  {
    label: { ru: "Локация", en: "Location" },
    value: { ru: "Вроцлав, Польша", en: "Wrocław, Poland" },
    icon: "pin",
  },
  {
    label: { ru: "Языки", en: "Languages" },
    value: { ru: "RU · UA · PL · EN", en: "RU · UA · PL · EN" },
    icon: "globe",
  },
];

export const SKILLS: readonly string[] = ["Java", "TypeScript", "JS"];

export interface Project {
  name: string;
  description: Record<Lang, string>;
  stack: readonly string[];
  href: string;
  linkLabel: Record<Lang, string>;
  icon: "discord" | "github" | "download" | "minecraft";
  githubHref?: string;
  githubPrivate?: boolean;
  disabled?: boolean;
  blurred?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    name: "Nexgen Recode",
    description: {
      ru: "Приватный клиент на Minecraft 1.21.11 с качественным функционалом и высокой производительностью.",
      en: "Private client for Minecraft 1.21.11 with premium features and high performance.",
    },
    stack: ["Java", "Fabric", "OpenGL / Vulkan"],
    href: "https://discord.gg/WTdQK9EeH",
    linkLabel: { ru: "Discord сообщество", en: "Discord Community" },
    icon: "discord",
    githubHref: "https://github.com/dartik404/Nexgen-Recode-1.21.11",
    githubPrivate: true,
  },
  {
    name: "REVELESS",
    description: {
      ru: "Мистическая версия Minecraft, являющаяся продолжением истории DART404. Также является сломанной версией игры.",
      en: "Mystical Minecraft version continuing the story of DART404. Also represents a corrupted version of the game.",
    },
    stack: ["Java", "Minecraft"],
    href: "#",
    linkLabel: { ru: "Скоро", en: "Coming soon" },
    icon: "minecraft",
    disabled: true,
  },
  {
    name: "DeepRage",
    description: {
      ru: "Локальная нейронка для удобного взаимодействия ии с компом.",
      en: "Local neural network for seamless AI interaction with the PC.",
    },
    stack: ["?????"],
    href: "#",
    linkLabel: { ru: "Скоро", en: "Coming soon" },
    icon: "github",
    disabled: true,
    blurred: true,
  },
];

export interface ContactLink {
  label: string;
  handle: string;
  href: string;
  icon: "discord" | "telegram" | "github";
  badge?: Record<Lang, string>;
  copyValue?: string;
}

export const CONTACTS: readonly ContactLink[] = [
  {
    label: "Discord",
    handle: "ww123rov",
    href: `https://discord.com/users/${DISCORD_USER_ID}`,
    icon: "discord",
    copyValue: "ww123rov",
  },
  {
    label: "Telegram",
    handle: "@ww123rov",
    href: "https://t.me/ww123rov",
    icon: "telegram",
  },
  {
    label: "Telegram-канал",
    handle: "@shizadarta",
    href: "https://t.me/shizadarta",
    icon: "telegram",
    badge: { ru: "Канал", en: "Channel" },
  },
  {
    label: "GitHub",
    handle: "ww123rov",
    href: "https://github.com/ww123rov",
    icon: "github",
  },
];

export const ABOUT = {
  body: {
    ru: "Пишу плагины и моды на Java (Paper, Spigot), сайты на React и TypeScript. В свободное время играю в Hoi4 и Майн.",
    en: "I write Minecraft plugins and mods in Java (Paper, Spigot), and websites with React and TypeScript. In my spare time I play Hoi4 and Minecraft.",
  },
  motto: {
    ru: "Искал медь — сгорел медведь.",
    en: "Looked for copper — found gold.",
  },
} as const;

export const FAVOURITE_ARTISTS: readonly string[] = [
  "ooes",
  "zhanulka-Hop",
  "Fortuna 812",
  "Sadsvit",
];

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}
