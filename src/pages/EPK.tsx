import { Link } from "react-router-dom";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import SEO from "../components/SEO";
import OptimizedImage from "../components/OptimizedImage";
import press from "../data/press-kit.json";
import catalog from "../data/catalog-reference.json";
import { artistSchema } from "../data/artist";
import { formatDate } from "../lib/formatDate";

export default function EPK() {
  const counts = ["Album", "EP", "Single"].map((type) => ({
    type,
    count: catalog.releases.filter((item) => item.type === type).length,
  }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://alybouchnak.com/epk#webpage",
    url: "https://alybouchnak.com/epk",
    name: press.title,
    description: press.description,
    dateModified: press.updatedOn,
    mainEntity: {
      ...artistSchema,
      "@context": undefined,
      description: press.shortBio,
    },
  };
  return (
    <div className="min-h-screen bg-[#F6FBFC] text-[#101010]">
      <SEO
        title={press.title}
        description={press.description}
        canonical="https://alybouchnak.com/epk"
        schemaData={schema}
      />
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <header className="grid md:grid-cols-[1fr_240px] gap-8 items-center mb-12">
          <div>
            <p className="font-bold text-[#A7401B] text-sm uppercase tracking-wider mb-3">
              Electronic press kit
            </p>
            <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl mb-5">
              Aly Bouchnak
            </h1>
            <p className="text-xl leading-relaxed">
              Children’s music artist, songwriter, producer, and creator of The
              Bloom’s House.
            </p>
            <p className="text-sm text-gray-600 mt-5">
              Editorial update:{" "}
              <time dateTime={press.updatedOn}>15 October 2026</time>
            </p>
          </div>
          <OptimizedImage
            src="/images/Aly-bouchnak-profile.webp"
            alt="Aly Bouchnak"
            width={240}
            height={240}
            className="w-48 md:w-60 aspect-square object-cover rounded-3xl"
            fetchPriority="high"
            loading="eager"
          />
        </header>
        <nav
          aria-label="Press kit sections"
          className="flex flex-wrap gap-3 mb-10"
        >
          {[
            ["biography", "Biography"],
            ["catalog", "Music catalog"],
            ["identifiers", "Recording identifiers"],
            ["contact", "Contact & sources"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full bg-white border border-gray-200 px-5 py-3 font-semibold"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mb-12">
          <section
            id="biography"
            className="scroll-mt-28 rounded-3xl bg-white p-6 sm:p-8 border border-gray-200"
          >
            <h2 className="font-['Fredoka_One'] text-3xl mb-6">
              Artist biography
            </h2>
            <h3 className="font-bold text-lg mb-3">Short biography</h3>
            <p className="leading-relaxed mb-7">{press.shortBio}</p>
            <h3 className="font-bold text-lg mb-3">Extended biography</h3>
            <div className="space-y-4 leading-relaxed">
              {press.longBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
          <aside className="bg-[#C8F0F7] rounded-3xl p-8">
            <h2 className="font-['Fredoka_One'] text-2xl mb-6">Artist facts</h2>
            <dl className="space-y-5">
              <div>
                <dt className="font-bold">Artist credit</dt>
                <dd>Aly Bouchnak</dd>
              </div>
              <div>
                <dt className="font-bold">Music world & release series</dt>
                <dd>The Bloom’s House</dd>
              </div>
              <div>
                <dt className="font-bold">Catalog</dt>
                <dd>
                  {catalog.releases.length} releases:{" "}
                  {counts
                    .map(
                      ({ type, count }) =>
                        `${count} ${type === "Album" ? "albums" : type === "EP" ? "EPs" : "singles"}`,
                    )
                    .join(", ")}
                  . Includes announced releases.
                </dd>
              </div>
              <div>
                <dt className="font-bold">Distinct recordings</dt>
                <dd>{catalog.recordings.length} recording pages</dd>
              </div>
              <div>
                <dt className="font-bold">ISNI</dt>
                <dd className="break-all">0000000529569919</dd>
              </div>
              <div>
                <dt className="font-bold">IPI</dt>
                <dd>01337888402</dd>
              </div>
            </dl>
            <Link to="/faq" className="inline-block underline font-bold mt-7">
              Read the music FAQ
            </Link>
          </aside>
        </div>
        <section id="catalog" className="scroll-mt-28 mb-12">
          <h2 className="font-['Fredoka_One'] text-3xl mb-4">Music catalog</h2>
          <p className="leading-relaxed mb-6">
            Explore{" "}
            <Link
              to="/discography/latest-albums"
              className="underline font-semibold"
            >
              full-length albums
            </Link>
            ,{" "}
            <Link
              to="/discography/bouncy-beats"
              className="underline font-semibold"
            >
              daytime releases
            </Link>
            , or{" "}
            <Link
              to="/discography/tuned-for-dreams"
              className="underline font-semibold"
            >
              bedtime recordings
            </Link>
            . Release dates are listed for both published and announced
            releases.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalog.releases.map((item) => (
              <article
                key={item.href}
                className="bg-white border border-gray-200 rounded-2xl p-5"
              >
                <p className="text-sm text-[#A7401B] font-bold mb-2">
                  {item.type}
                </p>
                <h3 className="font-bold text-lg">
                  <Link to={item.href} className="underline underline-offset-4">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-sm mt-3">
                  Release date:{" "}
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </p>
                {item.upc && (
                  <p className="text-sm mt-1 break-all">UPC: {item.upc}</p>
                )}
              </article>
            ))}
          </div>
        </section>
        <section
          id="identifiers"
          className="scroll-mt-28 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 mb-12"
        >
          <h2 className="font-['Fredoka_One'] text-3xl mb-4">
            Recording identifiers
          </h2>
          <p className="leading-relaxed mb-6">
            Use the ISRC to distinguish recordings with similar titles. Bock
            Bock Chicken has separate 2025 and 2026 recordings; the lyrics
            supplied for this website belong to the 2026 version.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Official recording pages, release dates and ISRC identifiers
              </caption>
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="py-3 pr-4">
                    Recording
                  </th>
                  <th scope="col" className="py-3 pr-4">
                    Release date
                  </th>
                  <th scope="col" className="py-3">
                    ISRC
                  </th>
                </tr>
              </thead>
              <tbody>
                {catalog.recordings.map((item) => (
                  <tr key={item.slug} className="border-b border-gray-100">
                    <th scope="row" className="py-3 pr-4 font-semibold">
                      <Link
                        to={item.href}
                        className="underline underline-offset-4"
                      >
                        {item.title}
                      </Link>
                    </th>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <time dateTime={item.date}>{item.date}</time>
                    </td>
                    <td className="py-3 font-mono whitespace-nowrap">
                      {item.isrc || "Not listed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section
          id="contact"
          className="scroll-mt-28 bg-[#240046] text-white rounded-3xl p-8"
        >
          <h2 className="font-['Fredoka_One'] text-3xl mb-5">
            Press, permissions & sources
          </h2>
          <p className="leading-relaxed mb-5">
            For interviews, collaborations, press materials, or a request to use
            a recording, email{" "}
            <a className="font-bold underline" href={`mailto:${press.contact}`}>
              {press.contact}
            </a>
            . Include your publication or project, the song or release, and your
            deadline.
          </p>
          <p className="leading-relaxed mb-6">{press.sourceNote}</p>
          <ul className="flex flex-wrap gap-5 mb-6">
            {press.platforms.map((item) => (
              <li key={item.url}>
                <a className="underline font-semibold" href={item.url}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            <a className="underline" href="/music-catalog.json">
              Structured music catalog
            </a>{" "}
            ·{" "}
            <a className="underline" href="/llms.txt">
              Official page directory
            </a>{" "}
            ·{" "}
            <Link className="underline" to="/faq">
              FAQ
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
