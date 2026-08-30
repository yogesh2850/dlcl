import type { ReactNode } from 'react';
import CopyCitation from '@/components/CopyCitation';
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
              Graphical abstract. (a) GNSS degradation and missed detections cascade through time.
              (b) DLCL architecture: dataset, multi-camera detection, and LSTM Perception Recovery.
              (c) Localization gains from adaptive perception and multi-robot vision–GNSS fusion.
            </Caption>
          </figure>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gold/25 bg-gold/5 px-6 py-6 sm:px-8">
            <p className="text-base leading-relaxed text-ink">
              <span className="font-semibold text-gold">TL;DR. </span>
              {siteContent.tldr}
            </p>
          </div>
        </section>

        <section id="abstract" className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-3xl text-ink">
              Introduction
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <figure>
                <img
                  src={asset('/images/intro/abc_day.jpeg')}
                  alt="Field tests in daytime"
                  className="w-full rounded-xl border border-gray-200 object-cover"
                />
                <Caption>Field tests in daytime — Alpha, Bravo, and Charlie.</Caption>
              </figure>
              <figure>
                <img
                  src={asset('/images/intro/abc_twilight.jpg')}
                  alt="Field tests in twilight"
                  className="w-full rounded-xl border border-gray-200 object-cover"
                />
                <Caption>Field tests in twilight, when Perception Recovery matters most.</Caption>
              </figure>
            </div>
            <div className="mx-auto mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-mist">
              {siteContent.introduction.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="contributions" className="border-y border-gray-200 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-3xl text-ink">
              Key Contributions
            </h2>
            <ul className="mt-10 space-y-6">
              {siteContent.contributions.map((item) => (
                <li key={item.title}>
                  <p className="font-medium text-gold">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="methodology" className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="border-b border-gray-200 pb-3 font-display text-3xl text-ink">
              Methodology
            </h2>

            <div className="mt-12">
              <h3 className="font-display text-2xl text-ink">Hardware</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.methodology.hardware}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { src: '/images/exp_setup/alpha.jpeg', label: 'Alpha — Wispr Ranger Pro quadcopter' },
                  { src: '/images/exp_setup/bravo.jpeg', label: 'Bravo — in-house hexacopter' },
                  { src: '/images/exp_setup/charlie.jpeg', label: 'Charlie — shaft-drive 4WD UGV' },
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
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">Perception</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.methodology.perception}
              </p>
              <figure className="mt-6">
                <img
                  src={asset('/images/method/illustration.png')}
                  alt="Camera layout for cooperative detection"
                  className="mx-auto w-full max-w-2xl rounded-xl border border-gray-200 bg-white object-contain p-2"
                />
                <Caption>
                  Downward cameras on Alpha and Bravo detect Charlie; Charlie looks up; Alpha and Bravo triangulate each other in stereo.
                </Caption>
              </figure>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">
                Perception Recovery
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.methodology.recovery}
              </p>
              <figure className="mt-6">
                <img
                  src={asset('/images/complete_model_arch.jpg')}
                  alt="DLCL perception and localization pipeline"
                  className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                />
                <Caption>
                  Each robot runs calibration, YOLO, Perception Recovery, pose estimation, and Kalman filtering before cooperative fusion.
                </Caption>
              </figure>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">
                Cooperative localization
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.methodology.localization}
              </p>
              <figure className="mt-6">
                <img
                  src={asset('/images/graphical_abstract_1.jpg')}
                  alt="DLCL architecture overview"
                  className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                />
                <Caption>
                  GNSS degradation and missed detections cascade through time; DLCL forecasts confidence, recovers perception, and fuses vision with GNSS.
                </Caption>
              </figure>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">
                Simulation-to-real stack
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.methodology.simToReal}
              </p>
            </div>
          </div>
        </section>

        <section id="results" className="border-y border-gray-200 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl text-ink">Results</h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">Detection benchmark</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.results.detection}
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <caption className="mb-3 text-left text-xs text-mist">
                    {siteContent.detectorTable.caption}
                  </caption>
                  <thead>
                    <tr className="border-b border-gray-200 text-gold">
                      {siteContent.detectorTable.headers.map((h) => (
                        <th key={h} className="py-2 pr-4 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-ink">
                    {siteContent.detectorTable.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-gray-200">
                        {row.map((cell, i) => (
                          <td
                            key={`${row[0]}-${i}`}
                            className={`py-2 pr-4 ${
                              row[0] === 'YOLOv11 small' && i === 1
                                ? 'font-semibold text-gold'
                                : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  '/images/uav_00.jpg',
                  '/images/uav_01.jpeg',
                  '/images/uav_02.jpeg',
                  '/images/ugv_10.jpg',
                  '/images/ugv_11.jpg',
                  '/images/ugv_12.jpg',
                ].map((src) => (
                  <img
                    key={src}
                    src={asset(src)}
                    alt="YOLO detection on the UAV–UGV dataset"
                    className="aspect-video w-full rounded-lg border border-gray-200 object-cover"
                  />
                ))}
              </div>
              <Caption>
                Detections on the UAV–UGV dataset across vehicle types, backgrounds, and lighting.
              </Caption>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">
                Perception Recovery, in the field
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.results.recovery}
              </p>
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <figure>
                  <div className="grid grid-cols-4 gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={`bravo-pr-${i}`}
                        src={asset(`/images/results/adaptive_perception/uav/adaptive/a_uav_v9n_${i}.jpeg`)}
                        alt=""
                        className="aspect-video w-full object-cover"
                      />
                    ))}
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={`bravo-base-${i}`}
                        src={asset(`/images/results/adaptive_perception/uav/base/b_uav_v9n_${i}.jpeg`)}
                        alt=""
                        className="aspect-video w-full object-cover"
                      />
                    ))}
                  </div>
                  <Caption>
                    Bravo at twilight: YOLOv10-nano with Perception Recovery (top) vs. without (bottom).
                  </Caption>
                </figure>
                <figure>
                  <div className="grid grid-cols-4 gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={`charlie-pr-${i}`}
                        src={asset(`/images/results/adaptive_perception/ugv/adaptive/a_ugv_v10n_${i}.jpeg`)}
                        alt=""
                        className="aspect-video w-full object-cover"
                      />
                    ))}
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={`charlie-base-${i}`}
                        src={asset(`/images/results/adaptive_perception/ugv/base/b_ugv_v10n_${i}.jpeg`)}
                        alt=""
                        className="aspect-video w-full object-cover"
                      />
                    ))}
                  </div>
                  <Caption>
                    Charlie at twilight: YOLOv9-tiny with Perception Recovery (top) vs. without (bottom).
                  </Caption>
                </figure>
              </div>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <caption className="mb-3 text-left text-xs text-mist">
                    {siteContent.recoveryTable.caption}
                  </caption>
                  <thead>
                    <tr className="border-b border-gray-200 text-gold">
                      {siteContent.recoveryTable.headers.map((h) => (
                        <th key={h} className="py-2 pr-4 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-ink">
                    {siteContent.recoveryTable.rows.map((row) => (
                      <tr
                        key={row[0]}
                        className={`border-b border-gray-200 ${
                          row[0].endsWith('-PR') ? 'bg-gold/5' : ''
                        }`}
                      >
                        {row.map((cell, i) => (
                          <td key={`${row[0]}-${i}`} className="py-2 pr-4">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { src: '/images/PR_results/T1C0_plot.jpg', label: 'Dataset 1, iPhone 6' },
                  { src: '/images/PR_results/T1C3_plot.jpg', label: 'Dataset 1, Sony NEX-5N' },
                  { src: '/images/PR_results/T2C0_plot.jpg', label: 'Dataset 2, iPhone 6' },
                  { src: '/images/PR_results/T2C3_plot.jpg', label: 'Dataset 2, Sony NEX-5N' },
                ].map((item) => (
                  <figure key={item.src}>
                    <img
                      src={asset(item.src)}
                      alt={item.label}
                      className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                    />
                    <Caption>{item.label} — base YOLO vs. Perception Recovery.</Caption>
                  </figure>
                ))}
              </div>
              <div className="mt-8 grid gap-4">
                {[
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
                ].map((item) => (
                  <figure key={item.src}>
                    <img
                      src={asset(item.src)}
                      alt={item.label}
                      className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                    />
                    <Caption>{item.label}. Left: raw detector. Middle: ground truth. Right: PR-corrected.</Caption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">Localization</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.results.localization}
              </p>
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
              <figure className="mt-6">
                <img
                  src={asset('/images/results/abc_cov_big.png')}
                  alt="Covariance heatmap after fusion"
                  className="mx-auto w-full max-w-xl rounded-xl border border-gray-200 bg-white object-contain p-2"
                />
                <Caption>Covariance heatmap after cooperative fusion.</Caption>
              </figure>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">
                Ablation — team size
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.results.teamSize}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <figure>
                  <img
                    src={asset('/images/agents_rmse.jpg')}
                    alt="RMSE versus number of cooperating agents"
                    className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                  />
                  <Caption>RMSE falls as more agents join GNSS+vision fusion.</Caption>
                </figure>
                <figure>
                  <img
                    src={asset('/images/agents_uncert.jpg')}
                    alt="Uncertainty versus number of cooperating agents"
                    className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                  />
                  <Caption>3σ uncertainty keeps tightening; GNSS-only stays flat.</Caption>
                </figure>
              </div>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-ink">
                Ablation — crop size vs. distance
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
                {siteContent.results.crop}
              </p>
              <figure className="mt-6">
                <img
                  src={asset('/images/alpha_charlie_ab.jpg')}
                  alt="Crop size versus altitude detection matrix"
                  className="w-full rounded-xl border border-gray-200 bg-white object-contain p-2"
                />
                <Caption>
                  Detection is governed by crop resolution; 192 px is the empirical floor for embedded deployment.
                </Caption>
              </figure>
            </div>
          </div>
        </section>

        <section id="qa" className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-3xl text-ink">
              Questions and Answers
            </h2>
            <div className="mt-10 space-y-8">
              {siteContent.qa.map((item) => (
                <div key={item.q}>
                  <p className="font-medium text-ink">Q: {item.q}</p>
                  <p className="mt-2 pl-4 text-sm leading-relaxed text-mist">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="citation" className="border-t border-gray-200 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-ink">Citation</h2>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-5 text-xs leading-relaxed text-ink">
              {siteContent.citation}
            </pre>
            <CopyCitation citation={siteContent.citation} />
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl text-ink">Paper &amp; Contact</h2>
            <p className="mt-6 text-sm text-mist">
              Corresponding author:{' '}
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="text-gold hover:underline"
              >
                {siteContent.contact.corresponding} ({siteContent.contact.email})
              </a>
            </p>
            <div className="mt-4 space-y-2 text-sm text-mist">
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
