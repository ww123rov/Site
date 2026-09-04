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
        <span className="text-[var(--accent)]">{icon}</span>
        {children}
      </h2>
      {aside}
    </header>
  );
}
