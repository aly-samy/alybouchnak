import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Disc3, Moon, Sun } from "lucide-react";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import SEO from "../components/SEO";
import OptimizedImage from "../components/OptimizedImage";
import { getAllAlbums, getAllTracks } from "../data/catalog-summaries";
import {
  discographySections,
  getDiscographyReleases,
  discographySchema,
  type DiscographySection,
} from "../lib/discography";
import { formatDate } from "../lib/formatDate";

const icons = [Disc3, Sun, Moon];
export default function Discography({
  section,
}: {
  section?: DiscographySection;
}) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [type, setType] = useState("all");
  const info = discographySections.find((item) => item.slug === section);
  const releases = section
    ? getDiscographyReleases(getAllAlbums(), getAllTracks(), section)
    : [];
  const filtered = releases.filter(
    (item) =>
      (year === "all" || item.releaseDate.startsWith(year)) &&
      (type === "all" || item.type === type) &&
      `${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const title = info
    ? `${info.label} | Aly Bouchnak Discography`
    : "Aly Bouchnak Discography";
  const description =
    info?.description ||
    "Choose full-length albums, Bouncy Beats for daytime, or Tuned for Dreams for bedtime. Explore release dates, track lists, lyrics, and listening links.";
  return (
    <div className="min-h-screen bg-[#F6FBFC] text-[#101010]">
      <SEO
        title={title}
        description={description}
        canonical={`https://alybouchnak.com/discography${section ? `/${section}` : ""}`}
        schemaData={discographySchema(section, releases)}
      />
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <nav aria-label="Breadcrumb" className="text-sm">
          <Link to="/">Home</Link> / <Link to="/discography">Discography</Link>
          {info && ` / ${info.label}`}
        </nav>
        <header className="py-10 max-w-3xl">
          <p className="text-[#A7401B] font-bold uppercase tracking-wider text-sm mb-3">
            Music by Aly Bouchnak
          </p>
          <h1 className="font-['Fredoka_One'] text-4xl sm:text-6xl mb-5">
            {info?.label || "Find your family’s soundtrack"}
          </h1>
          <p className="text-lg text-[#2A2A2A] leading-relaxed">
            {description}
          </p>
        </header>
        <nav
          aria-label="Discography collections"
          className="flex flex-wrap gap-3 mb-10"
        >
          <NavLink
            end
            to="/discography"
            className={({ isActive }) =>
              `rounded-full px-5 py-3 font-bold border-2 ${isActive ? "bg-[#101010] text-white border-[#101010]" : "bg-white border-gray-200"}`
            }
          >
            Overview
          </NavLink>
          {discographySections.map((item) => (
            <NavLink
              key={item.slug}
              to={`/discography/${item.slug}`}
              className={({ isActive }) =>
                `rounded-full px-5 py-3 font-bold border-2 ${isActive ? "bg-[#101010] text-white border-[#101010]" : "bg-white border-gray-200 hover:border-[#F26B3A]"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {!info ? (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {discographySections.map((item, index) => {
                const Icon = icons[index];
                return (
                  <article
                    key={item.slug}
                    className={`rounded-3xl p-8 flex flex-col ${index === 2 ? "bg-[#240046] text-white" : index === 1 ? "bg-[#F7E859]" : "bg-[#C8F0F7]"}`}
                  >
                    <Icon aria-hidden="true" className="w-10 h-10 mb-8" />
                    <h2 className="font-['Fredoka_One'] text-2xl mb-4">
                      {item.label}
                    </h2>
                    <p className="leading-relaxed mb-8 flex-1">
                      {item.description}
                    </p>
                    <Link
                      className="inline-flex items-center gap-2 font-bold underline underline-offset-4"
                      to={`/discography/${item.slug}`}
                    >
                      Explore {item.label}
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
            <section className="bg-white rounded-3xl p-8 mt-10 border border-gray-200">
              <h2 className="font-['Fredoka_One'] text-2xl mb-4">
                A release, a recording, or a playlist?
              </h2>
              <p className="leading-relaxed">
                Albums, EPs, and singles are official releases. Their pages list
                the recordings they contain. A song may appear on more than one
                release. For a running listening mix, explore the{" "}
                <Link className="underline font-semibold" to="/playlists">
                  playlists
                </Link>
                . For answers about versions and lyrics, visit the{" "}
                <Link className="underline font-semibold" to="/faq">
                  FAQ
                </Link>
                .
              </p>
            </section>
          </>
        ) : (
          <>
            {section === "tuned-for-dreams" && (
              <p className="bg-[#EDE5F7] rounded-2xl p-5 mb-8 leading-relaxed">
                This collection brings together the Tuned for Dreams album and
                its bedtime recordings. Explore the music as part of a quiet
                routine; individual listening preferences vary.
              </p>
            )}
            <form
              role="search"
              aria-label={`Filter ${info.label}`}
              onSubmit={(event) => event.preventDefault()}
              className="grid sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-gray-200 mb-6"
            >
              <label className="font-semibold text-sm">
                Search releases
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="block mt-2 w-full border border-gray-300 rounded-xl p-3"
                  placeholder="Song or album title"
                />
              </label>
              <label className="font-semibold text-sm">
                Release year
                <select
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  className="block mt-2 w-full border border-gray-300 rounded-xl p-3"
                >
                  <option value="all">All years</option>
                  {[
                    ...new Set(
                      releases.map((item) => item.releaseDate.slice(0, 4)),
                    ),
                  ]
                    .sort()
                    .reverse()
                    .map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                </select>
              </label>
              <label className="font-semibold text-sm">
                Release type
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="block mt-2 w-full border border-gray-300 rounded-xl p-3"
                >
                  <option value="all">All types</option>
                  {[...new Set(releases.map((item) => item.type))].map(
                    (value) => (
                      <option key={value}>{value}</option>
                    ),
                  )}
                </select>
              </label>
            </form>
            <p role="status" className="text-sm mb-6">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </p>
            {!filtered.length && (
              <div className="rounded-2xl bg-white p-8">
                <p className="mb-4">No releases match these filters.</p>
                <button
                  className="underline font-bold"
                  onClick={() => {
                    setQuery("");
                    setYear("all");
                    setType("all");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <article
                  key={item.key}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 flex flex-col"
                >
                  <Link to={item.href} tabIndex={-1} aria-hidden="true">
                    <OptimizedImage
                      src={item.coverImage}
                      alt=""
                      width={480}
                      height={480}
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm font-bold text-[#A7401B] mb-2">
                      {item.type}
                      {item.releaseDate.slice(0, 10) > today
                        ? " · Upcoming"
                        : ""}
                    </p>
                    <h2 className="font-['Fredoka_One'] text-xl mb-3">
                      <Link to={item.href} className="hover:underline">
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                      Release date:{" "}
                      <time dateTime={item.releaseDate.slice(0, 10)}>
                        {formatDate(item.releaseDate)}
                      </time>
                    </p>
                    <p className="text-sm leading-relaxed mb-5 flex-1">
                      {item.description}
                    </p>
                    <Link
                      to={item.href}
                      className="inline-flex items-center gap-2 font-bold underline underline-offset-4"
                    >
                      {item.type === "Album" || item.type === "EP"
                        ? "View track list"
                        : "View song details"}
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                      <span className="sr-only"> for {item.title}</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
