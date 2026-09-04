import { FACTS, type Fact } from "../lib/profile";
import { Card, CardHeader } from "./Card";
import {
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  IdCardIcon,
  PinIcon,
  PlaneIcon,
} from "./icons";

const ICONS: Record<Fact["icon"], typeof CalendarIcon> = {
  calendar: CalendarIcon,
  pin: PinIcon,
  plane: PlaneIcon,
  clock: ClockIcon,
  globe: GlobeIcon,
};

export function AboutFacts({ index }: { index: number }) {
  return (
    <Card index={index}>
      <CardHeader icon={<IdCardIcon className="size-4" />}>Коротко</CardHeader>

      <dl className="space-y-3 text-sm">
        {FACTS.map((fact) => {
          const Icon = ICONS[fact.icon];
          return (
            <div key={fact.label} className="flex items-start gap-3">
              <Icon className="mt-0.5 size-4 shrink-0 text-[var(--fg-subtle)]" />
              <dt className="sr-only">{fact.label}</dt>
              <dd className="min-w-0">
                <span className="text-[var(--fg-subtle)]">{fact.label}: </span>
                <span className="text-[var(--fg-secondary)]">{fact.value}</span>
              </dd>
            </div>
          );
        })}
      </dl>
    </Card>
  );
}
