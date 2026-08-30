import { siteContent } from '@/constant/site-content';

export default function QaAccordion() {
  return (
    <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
      {siteContent.qa.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span>Q: {item.q}</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-lg leading-none text-gold transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-4 pr-8 text-sm leading-relaxed text-ink">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
