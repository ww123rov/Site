import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

export function Card({ children, index = 0, className = "" }: CardProps) {
  return (
    <section
      className={`card reveal p-5 ${className}`}
      style={{ "--reveal-index": index } as React.CSSProperties}
    >
      {children}
    </section>
  );
}

interface CardHeaderProps {
  icon: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}

export function CardHeader({ icon, children, aside }: CardHeaderProps) {
  return (
    <header className="mb-4 flex items-center justify-between gap-3">
      <h2 className="card-title">
        <span className="text-[var(--accent)] shrink-0 -translate-y-px">{icon}</span>
        <span aria-hidden="true" className="h-3.5 w-px shrink-0 bg-[var(--line-strong)]" />
        {children}
      </h2>
      {aside}
    </header>
  );
}
