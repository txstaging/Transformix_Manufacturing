import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SECTION_IDS, siteConfig } from "@/config/site";

const linkFocus = "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function ColumnTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-tajawal text-lead font-bold leading-[1.6] text-white">{children}</h2>;
}

interface ContactRowProps {
  icon: string;
  iconSize: 20 | 24;
  gap: "gap-2" | "gap-4";
  children: ReactNode;
}

function ContactRow({ icon, iconSize, gap, children }: ContactRowProps) {
  return (
    <li className={`flex items-start ${gap}`}>
      <Image src={icon} alt="" width={iconSize} height={iconSize} className="shrink-0" />
      {children}
    </li>
  );
}

export function SiteFooter() {
  const { contact, social, footer, logo } = siteConfig;
  const phoneHref = `tel:${contact.phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer id={SECTION_IDS.contact} className="bg-brand-umber px-4 pb-[34px] pt-12 sm:px-6 lg:px-[50px] lg:pt-[59px]">
      <div className="mx-auto flex max-w-[1340px] flex-col gap-12 lg:gap-[86px]">
        <div className="flex flex-col items-center gap-12 xl:flex-row xl:justify-center xl:gap-[61px]">
          <div className="flex w-[276px] shrink-0 flex-col items-center gap-3">
            <Link href={`#${SECTION_IDS.home}`} aria-label={siteConfig.name} className={`relative block aspect-[276/60] w-full overflow-hidden ${linkFocus}`}>
              <Image
                src={logo.light}
                alt={logo.alt}
                width={276}
                height={92}
                className="absolute left-[-0.16%] top-[-24.17%] h-[153.33%] w-full max-w-none"
              />
            </Link>
            <p className="text-center font-tajawal text-lead leading-[1.6] text-surface-snow">{footer.tagline}</p>
          </div>

          {/* At the 1440 design width the columns pack toward the physical left of an 890px group. */}
          <div className="grid w-full max-w-[890px] grid-cols-1 gap-10 text-start sm:grid-cols-[auto_auto_auto] sm:justify-between xl:flex xl:w-auto xl:max-w-none xl:items-start xl:gap-[96px] min-[1440px]:w-[890px] min-[1440px]:justify-end min-[1440px]:gap-[135px]">
            <nav aria-labelledby="footer-links-title" className="flex flex-col gap-4 xl:w-[234px]">
              <ColumnTitle>
                <span id="footer-links-title">{footer.quickLinksTitle}</span>
              </ColumnTitle>
              <ul className="flex flex-col gap-2 font-tajawal text-lead leading-[1.6] text-surface-snow opacity-90">
                {footer.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={`transition-opacity duration-300 hover:underline hover:opacity-100 ${linkFocus}`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-4">
              <ColumnTitle>{footer.contactTitle}</ColumnTitle>
              <address className="not-italic">
                <ul className="flex flex-col gap-4 font-kufi text-caption">
                  <ContactRow icon="/icons/mail.svg" iconSize={24} gap="gap-4">
                    <a
                      href={`mailto:${contact.email}`}
                      dir="ltr"
                      className={`text-end text-white underline decoration-from-font underline-offset-2 transition-colors duration-300 hover:text-surface-cream sm:min-w-[188px] ${linkFocus}`}
                    >
                      {contact.email}
                    </a>
                  </ContactRow>
                  <ContactRow icon="/icons/phone.svg" iconSize={20} gap="gap-2">
                    <a href={phoneHref} dir="ltr" className={`text-surface-snow transition-colors duration-300 hover:text-white ${linkFocus}`}>
                      {contact.phone}
                    </a>
                  </ContactRow>
                  {contact.locations.map((location) => (
                    <ContactRow key={location} icon="/icons/map-pin.svg" iconSize={24} gap="gap-4">
                      <span className="whitespace-nowrap text-surface-cream sm:min-w-[188px]">{location}</span>
                    </ContactRow>
                  ))}
                </ul>
              </address>
            </div>

            <div className="flex flex-col gap-4 xl:w-[122px] xl:items-center">
              <ColumnTitle>{footer.socialTitle}</ColumnTitle>
              <ul className="flex items-center gap-[25px]">
                {social.map((item) => (
                  <li key={item.platform}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      className={`block transition-[opacity,transform] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-80 ${linkFocus}`}
                    >
                      <Image src={item.icon} alt="" width={24} height={24} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[29px]">
          <Image src="/icons/footer-divider.svg" alt="" width={1340} height={1} className="h-[0.5px] w-full rotate-180" />
          <p className="text-center font-tajawal text-caption leading-[1.6] text-white">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
