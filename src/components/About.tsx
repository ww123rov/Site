import { ABOUT } from "../lib/profile";
import { Card, CardHeader } from "./Card";
import { UserIcon } from "./icons";

export function About({ index }: { index: number }) {
  return (
    <Card index={index}>
      <CardHeader icon={<UserIcon className="size-4" />}>О себе</CardHeader>

      <p className="max-w-[62ch] text-sm leading-relaxed text-[var(--fg-secondary)]">
        {ABOUT.body}
      </p>

      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[var(--line)] pt-4">
        <span className="text-[0.625rem] tracking-[var(--tracking-caps)] text-[var(--fg-subtle)] uppercase">
          Девиз
        </span>
        <span
          aria-hidden="true"
          className="h-3.5 w-px shrink-0 bg-[var(--line-strong)]"
        />
        <span className="text-sm text-[var(--accent)] italic">
          {ABOUT.motto}
        </span>
      </p>
    </Card>
  );
}
