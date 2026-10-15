import { Link } from "react-router-dom";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import SEO from "../components/SEO";
import { faqs } from "../data/faqs";
import resourceLinks from "../data/faq-links.json";
import pressKit from "../data/press-kit.json";

const links = resourceLinks as Record<
  string,
  { label: string; href: string }[]
>;
export default function FAQ() {
  const categories = [...new Set(faqs.map((item) => item.category))];
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://alybouchnak.com/faq#webpage",
    url: "https://alybouchnak.com/faq",
    name: "Aly Bouchnak Music FAQ",
    about: { "@id": "https://alybouchnak.com/#artist" },
    dateModified: pressKit.updatedOn,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      "@id": `https://alybouchnak.com/faq#question-${item.id}`,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
        url: `https://alybouchnak.com/faq#question-${item.id}`,
      },
    })),
  };
  return (
    <div className="min-h-screen bg-[#F6FBFC] text-[#101010]">
      <SEO
        title="Aly Bouchnak FAQ | Songs, Albums, Lyrics & Listening"
        description="Official answers about Aly Bouchnak, The Bloom’s House, song versions, lyrics, streaming, everyday listening, and press or music permission enquiries."
        canonical="https://alybouchnak.com/faq"
        schemaData={schema}
      />
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <header className="mb-10">
          <p className="text-[#A7401B] font-bold uppercase text-sm tracking-wider mb-3">
            The official answers
          </p>
          <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl mb-5">
            Questions about the music?
          </h1>
          <p className="text-lg leading-relaxed">
            Find Aly Bouchnak’s albums, songs, lyrics, and listening links, with
            a direct route to the relevant music page.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Editorial update:{" "}
            <time dateTime={pressKit.updatedOn}>15 October 2026</time>
          </p>
        </header>
        <nav aria-label="FAQ topics" className="flex flex-wrap gap-3 mb-12">
          {categories.map((category, index) => (
            <a
              key={category}
              href={`#topic-${index + 1}`}
              className="rounded-full bg-white px-4 py-3 border border-gray-200 font-semibold hover:border-[#F26B3A]"
            >
              {category}
            </a>
          ))}
        </nav>
        {categories.map((category, index) => (
          <section
            key={category}
            aria-labelledby={`topic-${index + 1}`}
            className="mb-12"
          >
            <h2
              id={`topic-${index + 1}`}
              className="scroll-mt-28 font-['Fredoka_One'] text-2xl mb-5"
            >
              {category}
            </h2>
            <div className="space-y-4">
              {faqs
                .filter((item) => item.category === category)
                .map((item) => (
                  <article
                    key={item.id}
                    id={`question-${item.id}`}
                    className="scroll-mt-28 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200"
                  >
                    <h3 className="text-lg font-bold mb-3">
                      <a
                        href={`#question-${item.id}`}
                        className="hover:underline"
                      >
                        {item.question}
                      </a>
                    </h3>
                    <p className="leading-relaxed">{item.answer}</p>
                    {links[item.id]?.length > 0 && (
                      <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                        {links[item.id].map((link) => (
                          <li key={link.href}>
                            {link.href.startsWith("/") ? (
                              <Link
                                to={link.href}
                                className="text-[#A7401B] font-semibold underline underline-offset-4"
                              >
                                {link.label}
                              </Link>
                            ) : (
                              <a
                                href={link.href}
                                className="text-[#A7401B] font-semibold underline underline-offset-4"
                              >
                                {link.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
            </div>
          </section>
        ))}
        <aside className="bg-[#F7E859] p-8 rounded-3xl">
          <h2 className="font-['Fredoka_One'] text-2xl mb-3">
            Need a different answer?
          </h2>
          <p className="leading-relaxed">
            For press, collaborations, or a question about using a recording,
            email{" "}
            <a
              href={`mailto:${pressKit.contact}`}
              className="font-bold underline"
            >
              {pressKit.contact}
            </a>
            . Include the song title and a link to the recording you mean.
          </p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
