import { SKILLS, type Lang } from "../lib/profile";
import { Card, CardHeader } from "./Card";
import { CodeIcon, JavaIcon, TypeScriptIcon, JavaScriptIcon } from "./icons";

const ICONS: Record<string, typeof JavaIcon> = {
  Java: JavaIcon,
  TypeScript: TypeScriptIcon,
  JS: JavaScriptIcon,
};

interface SkillsProps {
  index: number;
  lang: Lang;
}

export function Skills({ index, lang }: SkillsProps) {
  return (
    <Card index={index}>
      <CardHeader icon={<CodeIcon className="size-4" />}>
        {lang === "ru" ? "Технологии" : "Technologies"}
      </CardHeader>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs sm:text-sm text-[var(--fg)]">
        {SKILLS.map((skill, i) => {
          const Icon = ICONS[skill];
          return (
            <div key={skill} className="flex items-center gap-2">
              {Icon && <Icon className="size-3.5 text-[var(--accent)] shrink-0" />}
              <span className="font-semibold">{skill}</span>
              {i < SKILLS.length - 1 && (
                <span className="text-[var(--fg-subtle)] ml-3" aria-hidden="true">/</span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
