import { siteContent } from '@/constant/site-content';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'People', href: '#people' },
  { label: 'Contact', href: '#contact' },
];

export default function HomePage() {
  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-xl tracking-tight text-paper">
            {siteContent.name}
          </a>
          <nav className="flex gap-6 text-sm text-mist">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section
        id="top"
        className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
      >
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-gold">
          {siteContent.location}
        </p>
        <h1 className="font-display text-7xl font-medium tracking-tight text-paper sm:text-8xl">
          {siteContent.name}
        </h1>
        {siteContent.expansion ? (
          <p className="mt-4 max-w-xl text-lg text-mist">{siteContent.expansion}</p>
        ) : null}
        <p className="mt-6 max-w-lg text-lg text-paper/80">{siteContent.tagline}</p>
        <div className="mt-10 h-px w-16 bg-gold" />
      </section>

      <section id="about" className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="font-display text-3xl text-paper">About</h2>
        <p className="mt-6 text-lg leading-relaxed text-mist">{siteContent.about}</p>
      </section>

      <section id="research" className="border-y border-white/10 bg-black/20">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="font-display text-3xl text-paper">Research</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {siteContent.research.map((item) => (
              <article
                key={item.title}
                className="border border-white/10 bg-ink p-6"
              >
                <h3 className="font-display text-xl text-gold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="people" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="font-display text-3xl text-paper">People</h2>
        <ul className="mt-10 space-y-4">
          {siteContent.people.map((person) => (
            <li key={person.name} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
              {person.url ? (
                <a
                  href={person.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-paper underline decoration-gold/50 underline-offset-4 hover:text-gold"
                >
                  {person.name}
                </a>
              ) : (
                <span className="font-medium text-paper">{person.name}</span>
              )}
              <span className="text-mist">{person.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer id="contact" className="border-t border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-16 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>{siteContent.name}</p>
          <div className="flex gap-6">
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="hover:text-gold"
            >
              {siteContent.contact.email}
            </a>
            <a
              href={siteContent.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
