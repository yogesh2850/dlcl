import type { ReactNode } from 'react';
import CopyCitation from '@/components/CopyCitation';
import FigureSlider from '@/components/FigureSlider';
import StickyNav from '@/components/StickyNav';
import { siteContent } from '@/constant/site-content';
import { asset } from '@/lib/asset';

function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-center text-xs leading-relaxed text-ink">{children}</p>
  );
}

export default function HomePage() {
  const breakAfter = siteContent.authors.findIndex(
    (author) => author.name === siteContent.authorBreakAfter,
  );

  return (
    <>
      <StickyNav />

      <main>
        {/* HERO */}
        <section
          id="top"
          className="relative flex flex-col items-center overflow-hidden px-4 pb-12 pt-24 text-center sm:px-6"
        >
          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <h1 className="font-display text-3xl font-medium leading-snug tracking-tight sm:text-4xl md:text-5xl">
              {siteContent.titleHighlights.map((part) => (
                <span
                  key={part.text}
                  className={part.highlight ? 'text-gold' : 'text-ink'}
                >
                  {part.text}
                </span>
              ))}
            </h1>

            <p className="mt-8 text-base font-medium leading-relaxed text-ink sm:text-lg">
              {siteContent.authors.map((author, i) => (
                <span key={author.name}>
                  {i > 0 && (i === breakAfter + 1 ? <br /> : ', ')}
                  {author.url ? (
                    <a
                      href={author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-ink/25 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                    >
                      {author.name}
                    </a>
                  ) : (
                    author.name
                  )}
                  {author.corresponding ? (
                    <sup className="ml-0.5 text-gold">*</sup>
                  ) : null}
                  <sup className="ml-0.5 text-xs text-mist">{author.affiliations}</sup>
                </span>
              ))}
            </p>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm text-mist">
              {siteContent.affiliations.map((aff) => (
                <div key={aff.id} className="flex items-center gap-2">
                  <sup className="text-gold">{aff.id}</sup>
                  <img
                    src={asset(aff.logo)}
                    alt=""
                    className="h-5 object-contain opacity-90"
                  />
                  <span>{aff.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {siteContent.links.map((link) => {
                const inner = (
                  <>
                    <img
                      src={asset(link.icon)}
                      alt=""
                      className="h-5 w-5"
                    />
                    {link.label}
                  </>
                );
                return link.live ? (
                  <a
                    key={link.label}
                    href={link.href.startsWith('/') ? asset(link.href) : link.href}
                    {...(link.href.startsWith('mailto:')
                      ? {}
                      : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:border-gold hover:bg-gold/10"
                  >
                    {inner}
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm text-gray-400"
                  >
                    {inner}
                  </span>
                );
              })}
            </div>
          </div>

          <figure className="relative z-10 mx-auto mt-14 w-full max-w-[calc(64rem*1.1)] px-4">
            <img
              src={asset('/images/graphical_abstract_1.jpg')}
              alt="DLCL graphical abstract"
              className="w-full rounded-xl border border-gray-200 bg-white object-contain"
            />
            <Caption>
              GNSS degradation and missed detections cascade through time (a) &mdash; DLCL predicts and
              recovers from them (b), tightening localization across the team (c).
            </Caption>
          </figure>
        </section>

        {/* TL;DR */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gold/25 bg-gold/5 px-6 py-6 sm:px-8">
            <p className="text-base leading-relaxed text-ink">
              <span className="font-semibold text-gold">TL;DR. </span>
              {siteContent.tldr}
            </p>
          </div>
        </section>

        {/* HEADLINE NUMBERS */}
        <section className="px-6 pb-12">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteContent.stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-gray-200 bg-white p-5 text-center shadow-sm"
              >
                <p className="font-display text-3xl text-gold">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-ink">{stat.label}</p>
                <p className="mt-1 text-xs text-mist">{stat.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OVERVIEW */}
        <section id="overview" className="border-y border-gray-200 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-3xl text-ink">Overview</h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-center">
              <ul className="space-y-6">
                {siteContent.contributions.map((item) => (
                  <li key={item.title}>
                    <p className="font-medium text-gold">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{item.body}</p>
                  </li>
                ))}
              </ul>
              <figure>
                <img
                  src={asset('/images/complete_model_arch.jpg')}
                  alt="DLCL perception and localization pipeline"
                  className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                />
                <Caption>
                  Each robot runs YOLO detection, Perception Recovery, and Kalman filtering, then
                  fuses its state with its teammates.
                </Caption>
              </figure>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS REEL */}
        <section id="highlights" className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-3xl text-ink">Highlights</h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <figure>
                <img
                  src={asset('/images/intro/abc_day.jpeg')}
                  alt="Field tests in daytime"
                  className="aspect-video w-full rounded-xl border border-gray-200 object-cover"
                />
                <Caption>Alpha, Bravo, and Charlie in the field — daytime.</Caption>
              </figure>
              <figure>
                <img
                  src={asset('/images/intro/abc_twilight.jpg')}
                  alt="Field tests in twilight"
                  className="aspect-video w-full rounded-xl border border-gray-200 object-cover"
                />
                <Caption>…and at twilight, where Perception Recovery earns its keep.</Caption>
              </figure>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { src: '/images/exp_setup/alpha.jpeg', label: 'Alpha — quadcopter' },
                { src: '/images/exp_setup/bravo.jpeg', label: 'Bravo — hexacopter' },
                { src: '/images/exp_setup/charlie.jpeg', label: 'Charlie — 4WD UGV' },
              ].map((item) => (
                <figure key={item.src}>
                  <img
                    src={asset(item.src)}
                    alt={item.label}
                    className="aspect-[4/3] w-full rounded-xl border border-gray-200 object-cover"
                  />
                  <Caption>{item.label}</Caption>
                </figure>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {['/images/uav_00.jpg', '/images/ugv_10.jpg', '/images/uav_01.jpeg'].map((src) => (
                <img
                  key={src}
                  src={asset(src)}
                  alt="YOLO detection on the UAV–UGV dataset"
                  className="aspect-video w-full rounded-lg border border-gray-200 object-cover"
                />
              ))}
            </div>
            <Caption>A slice of the ~30k-image UAV–UGV dataset, across lighting and backgrounds.</Caption>
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="border-y border-gray-200 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-3xl text-ink">Results</h2>

            <div className="mt-10">
              <FigureSlider
                captionSuffix="Left: raw detector. Middle: ground truth. Right: PR-corrected."
                slides={[
                  {
                    src: '/images/PR_results/combined_T1C0_v8s_vs_v8s_pr.jpg',
                    label: 'Dataset-1 Cam0: YOLOv8s vs YOLOv8s-PR',
                  },
                  {
                    src: '/images/PR_results/combined_T1C0_v8x_vs_v8s_pr.jpg',
                    label: 'Dataset-1 Cam0: YOLOv8x vs YOLOv8s-PR',
                  },
                  {
                    src: '/images/PR_results/combined_T2C0_v9e_vs_v9t_pr.jpg',
                    label: 'Dataset-2 Cam0: YOLOv9e vs YOLOv9t-PR',
                  },
                  {
                    src: '/images/PR_results/combined_T2C0_v9t_vs_v9t_pr.jpg',
                    label: 'Dataset-2 Cam0: YOLOv9t vs YOLOv9t-PR',
                  },
                ]}
              />
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-ink">
                On Charlie&rsquo;s twilight trajectory, YOLOv9-Tiny goes from failing almost every
                frame to reliable detection once Perception Recovery is switched on.
              </p>
            </div>

            <div className="mt-14">
              <h3 className="text-center font-display text-2xl text-ink">
                Localization uncertainty, before and after fusion
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { src: '/images/results/localization/alpha_ellipsoid.png', label: 'Alpha' },
                  { src: '/images/results/localization/bravo_ellipsoid.png', label: 'Bravo' },
                  { src: '/images/results/localization/charlie_ellipsoid.png', label: 'Charlie' },
                ].map((item) => (
                  <figure key={item.src}>
                    <img
                      src={asset(item.src)}
                      alt={`${item.label} 3-sigma uncertainty ellipsoid`}
                      className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                    />
                    <Caption>{item.label} — GNSS (red) vs. fused GNSS+vision (blue).</Caption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <figure className="mx-auto max-w-2xl">
                <img
                  src={asset('/images/agents_rmse.jpg')}
                  alt="RMSE versus number of cooperating agents"
                  className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                />
                <Caption>
                  RMSE keeps falling as more agents join GNSS+vision fusion — no saturation up to 10
                  agents.
                </Caption>
              </figure>
            </div>
          </div>
        </section>

        {/* CITATION */}
        <section id="citation" className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-ink">Citation</h2>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-5 text-xs leading-relaxed text-ink">
              {siteContent.citation}
            </pre>
            <CopyCitation citation={siteContent.citation} />
          </div>
        </section>

        {/* CONTACT */}
        <section className="border-t border-gray-200 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl text-ink">Paper &amp; Contact</h2>
            <p className="mt-6 text-sm text-ink">
              Corresponding author:{' '}
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="text-gold hover:underline"
              >
                {siteContent.contact.corresponding} ({siteContent.contact.email})
              </a>
            </p>
            <div className="mt-4 space-y-2 text-sm text-ink">
              {siteContent.contact.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-200 px-6 py-8 text-center text-xs text-mist">
          {siteContent.name} · University of Nebraska–Lincoln
        </footer>
      </main>
    </>
  );
}
