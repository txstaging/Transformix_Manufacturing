import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "inverse";
export type ButtonSize = "md" | "header" | "cta";

const base =
  "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap text-center font-kufi " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-2 border-brand bg-brand text-ink-inverse hover:border-brand-deep hover:bg-brand-deep hover:shadow-lift",
  outline:
    "border-2 border-brand-accent bg-transparent text-brand-accent hover:bg-brand-accent/10 hover:shadow-lift",
  inverse: "bg-surface text-brand-rust shadow-cta-button hover:-translate-y-0.5 hover:bg-surface-cream",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-14 rounded-button px-9 text-lead",
  header: "rounded-button-lg px-[26px] py-[14px] text-lead leading-[27px]",
  cta: "h-[61px] min-w-[209px] rounded-[29.266px] px-10 text-action",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & { href: string };

type NativeButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, ...linkProps } = props;
    return (
      <Link {...linkProps} className={buttonClassName(variant, size, className)}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, type = "button", ...buttonProps } = props;
  return (
    <button {...buttonProps} type={type} className={buttonClassName(variant, size, className)}>
      {children}
    </button>
  );
}
