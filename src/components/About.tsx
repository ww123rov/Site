import { ABOUT, type Lang } from "../lib/profile";
import { Card, CardHeader } from "./Card";
import { UserIcon } from "./icons";

interface AboutProps {
  index: number;
  lang: Lang;
}

export function About({ index, lang }: AboutProps) {
  return (
    <Card index={index}>
      <CardHeader icon={<UserIcon className="size-4" />}>
        {lang === "ru" ? "О разработчике" : "About Me"}
      </CardHeader>

      <p className="text-[14px] leading-relaxed text-[var(--fg)]">
        {ABOUT.body[lang]}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-4">
        <span className="text-[13px] font-bold tracking-[var(--tracking-caps)] text-[var(--fg-secondary)] uppercase">
          {lang === "ru" ? "Цитата" : "Quote"}
        </span>
        <span
          aria-hidden="true"
          className="h-3.5 w-px shrink-0 bg-[var(--line-strong)]"
        />
        <span className="text-[14px] font-medium text-[var(--accent)] italic">
          "{ABOUT.motto[lang]}"
        </span>
      </div>
    </Card>
  );
}
