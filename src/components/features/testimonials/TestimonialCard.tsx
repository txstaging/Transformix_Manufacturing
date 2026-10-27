import Image from "next/image";
import type { Testimonial } from "@/types/content";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { author, quote, avatar, rating } = testimonial;

  return (
    <figure className="flex h-full flex-col gap-6 rounded-review bg-surface-lavender px-6 py-8 shadow-review sm:gap-[33px] sm:pe-[51.5px] sm:ps-[85.5px] sm:pt-[71px] lg:h-[397px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <figcaption className="flex items-center gap-4 font-kufi text-lead text-ink-strong">
          <Image
            src={avatar.src}
            alt=""
            width={Math.round(avatar.size)}
            height={Math.round(avatar.size)}
            className="shrink-0 rounded-full object-cover"
            style={{ width: avatar.size, height: avatar.size }}
          />
          {author}
        </figcaption>
        <Image
          src={rating.image}
          alt={`تقييم ${rating.value} من 5`}
          width={162}
          height={27}
          className="h-[22px] w-auto sm:h-[27px]"
        />
      </div>
      <blockquote className="font-tajawal text-title text-ink-strong">
        <p>{quote}</p>
      </blockquote>
    </figure>
  );
}
