import { SKILLS } from "../lib/profile";
import { clampPercent } from "../lib/discord";
import { Card, CardHeader } from "./Card";
import { ChartIcon } from "./icons";

export function Skills({ index }: { index: number }) {
  return (
    <Card index={index}>
      <CardHeader icon={<ChartIcon className="size-4" />}>
        Языки и стек
      </CardHeader>

      <ul className="space-y-3.5">
        {SKILLS.map((skill) => {
          const share = clampPercent(skill.share);
          return (
            <li key={skill.name}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-[var(--fg-secondary)]">
                  {skill.name}
                </span>
                <span className="tabular text-xs text-[var(--fg-subtle)]">
                  {share}%
                </span>
              </div>

              <div
                className="meter h-1.5"
                role="meter"
                aria-valuenow={share}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name}: ${share}% — ${skill.note}`}
              >
                <div
                  className="meter-fill"
                  style={
                    {
                      "--fill": share / 100,
                      backgroundImage:
                        "linear-gradient(90deg, var(--accent-deep), var(--accent))",
                    } as React.CSSProperties
                  }
                />
              </div>

              <p className="mt-1.5 text-xs text-[var(--fg-subtle)]">
                {skill.note}
              </p>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
