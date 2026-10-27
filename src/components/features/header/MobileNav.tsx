"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import type { CallToAction, NavLink } from "@/types/content";

interface MobileNavProps {
  links: readonly NavLink[];
  cta: CallToAction;
  activeHref: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const DESKTOP_QUERY = "(min-width: 1024px)";

const iconButton =
  "inline-flex size-11 items-center justify-center rounded-full text-ink-heading transition-colors duration-300 " +
  "hover:bg-brand/10 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function MobileNav({ links, cta, activeHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const toggle = toggleRef.current;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      // Keep keyboard focus inside the open drawer.
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);
  const slide = prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT };

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        className={iconButton}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="فتح القائمة"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>

      <AnimatePresence>
        {open ? (
          <div key="mobile-nav" className="fixed inset-0 z-50">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-ink-primary/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={slide}
              onClick={close}
            />
            <motion.div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="القائمة"
              className="absolute inset-y-0 start-0 flex w-[min(84vw,340px)] flex-col bg-surface px-6 pb-8 pt-4 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={slide}
            >
              <div className="flex justify-end">
                <button type="button" className={iconButton} aria-label="إغلاق القائمة" onClick={close}>
                  <CloseIcon />
                </button>
              </div>

              <nav aria-label="التنقل الرئيسي" className="mt-4">
                <ul className="flex flex-col">
                  {links.map((link) => {
                    const isActive = link.href === activeHref;
                    return (
                      <li key={link.href} className="border-b border-line/60">
                        <Link
                          href={link.href}
                          onClick={close}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between py-4 font-kufi text-lead text-ink-heading transition-colors duration-300 hover:text-brand",
                            "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                            isActive && "font-bold",
                          )}
                        >
                          {link.label}
                          {isActive ? <span aria-hidden="true" className="h-[3px] w-6 bg-brand" /> : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <Button href={cta.href} size="header" className="mt-auto w-full" onClick={close}>
                {cta.label}
              </Button>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
