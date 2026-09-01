'use client';

import { useEffect, useState } from 'react';

const NAV = [
  { label: 'Overview', href: '#overview' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Results', href: '#results' },
  { label: 'Citation', href: '#citation' },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = '';
      for (const item of NAV) {
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 100) current = item.href.slice(1);
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md'
          : 'bg-white'
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-nowrap items-center justify-center gap-1 overflow-x-auto px-4 py-3">
        {NAV.map(({ label, href }) => {
          const id = href.slice(1);
          return (
            <a
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === id
                  ? 'bg-ink text-white'
                  : 'text-ink hover:bg-gray-100 hover:text-gold'
              }`}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
