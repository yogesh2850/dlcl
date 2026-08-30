'use client';

import { useCallback, useEffect, useState } from 'react';
import { asset } from '@/lib/asset';

type Slide = { src: string; label: string };

export default function FigureSlider({
  slides,
  captionSuffix,
  intervalMs = 3000,
}: {
  slides: Slide[];
  captionSuffix?: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [index, slides.length, intervalMs]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
        {slides.map((item, i) => (
          <img
            key={item.src}
            src={asset(item.src)}
            alt={item.label}
            className={`w-full object-contain p-2 ${i === index ? 'block' : 'hidden'}`}
          />
        ))}

        <button
          type="button"
          aria-label="Previous figure"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-ink shadow-sm hover:border-gold hover:bg-white"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          aria-label="Next figure"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-ink shadow-sm hover:border-gold hover:bg-white"
        >
          <Chevron dir="right" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {slides.map((item, i) => (
          <button
            key={item.src}
            type="button"
            aria-label={`Show ${item.label}`}
            aria-current={i === index ? true : undefined}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-ink' : 'w-2.5 bg-gray-300 hover:bg-gold'
            }`}
          />
        ))}
      </div>

      <p className="mt-2 text-center text-xs leading-relaxed text-ink">
        {slide.label}
        {captionSuffix ? `. ${captionSuffix}` : ''}
      </p>
    </figure>
  );
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d={dir === 'left' ? 'M12.5 4.5 7 10l5.5 5.5' : 'M7.5 4.5 13 10l-5.5 5.5'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
