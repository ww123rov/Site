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

      <div className="flex flex-wrap gap-2">
        {SKILLS.map((skill) => {
          const Icon = ICONS[skill];
          return (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1.5 text-sm font-mono font-medium text-[var(--fg)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--accent)]"
            >
              {Icon && <Icon className="size-3.5 text-[var(--accent)] shrink-0 -translate-y-px" />}
              <span>{skill}</span>
            </span>
          );
        })}
      </div>
    </Card>
  );
}
