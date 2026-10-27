import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SECTION_IDS, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";

const focusRing = "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export function SiteHeader() {
  // The design shows the landing page itself as the active destination.
  const activeHref = `#${SECTION_IDS.home}`;

  return (
    <header className="relative z-40 border-b border-surface bg-surface px-4 sm:px-6 lg:px-[80px]">
      <div className="mx-auto flex h-[72px] max-w-header items-center justify-between gap-6 lg:h-[104px]">
        <Link href={activeHref} className={cn("shrink-0", focusRing)} aria-label={siteConfig.name}>
          <Image
            src={siteConfig.logo.default}
            alt={siteConfig.logo.alt}
            width={239}
            height={79}
            className="h-12 w-auto object-cover lg:h-[79px]"
          />
        </Link>

        <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((link) => {
              const isActive = link.href === activeHref;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex flex-col items-center gap-2 font-kufi text-caption text-ink-heading transition-colors duration-300 ease-out hover:text-brand",
                      isActive && "font-bold hover:text-ink-heading",
                      focusRing,
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-[3px] w-6 bg-brand transition-transform duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Button href={siteConfig.headerCta.href} size="header" className="hidden min-w-[234px] lg:inline-flex">
          {siteConfig.headerCta.label}
        </Button>

        <MobileNav links={siteConfig.nav} cta={siteConfig.headerCta} activeHref={activeHref} />
      </div>
    </header>
  );
}
