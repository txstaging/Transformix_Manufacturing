import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Heading weight differs per section in Figma (Medium vs Bold). */
  weight?: "medium" | "bold";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  weight = "medium",
  as: Heading = "h2",
  id,
  className,
  titleClassName,
  subtitleClassName,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-6 text-center", className)}>
      <Heading
        id={id}
        className={cn(
          "font-kufi text-display text-ink-primary text-balance",
          weight === "bold" ? "font-bold" : "font-medium",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p className={cn("font-tajawal text-title text-ink-secondary text-balance", subtitleClassName)}>
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  );
}
