export interface CatalogItem {
  id?: number;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  releaseDate: string;
  type?: string;
  routine?: string;
  genre?: string;
  mood?: string;
  isStandaloneRelease?: boolean;
  trackIds?: number[];
}
export interface CatalogRelease extends CatalogItem {
  type: string;
  href: string;
  key: string;
}
export const discographySections = [
  {
    slug: "latest-albums",
    label: "Latest Albums",
    description:
      "Explore full-length albums, release dates, and complete track lists from The Bloom’s House and Tuned for Dreams.",
  },
  {
    slug: "bouncy-beats",
    label: "Bouncy Beats",
    description:
      "Original family pop, action songs, and nursery-rhyme releases for playtime and everyday routines.",
  },
  {
    slug: "tuned-for-dreams",
    label: "Tuned for Dreams",
    description:
      "Explore the bedtime album and its individual recordings, including humming, shushing sounds, and gentle instrumental textures.",
  },
] as const;
export type DiscographySection = (typeof discographySections)[number]["slug"];
const newest = (a: CatalogRelease, b: CatalogRelease) =>
  b.releaseDate.localeCompare(a.releaseDate) || a.title.localeCompare(b.title);
export function getDiscographyReleases(
  albums: CatalogItem[],
  tracks: CatalogItem[],
  section: DiscographySection,
): CatalogRelease[] {
  const bedtimeIds = new Set(albums.find(album => album.slug === 'tuned-for-dreams')?.trackIds || []);
  const albumItems = albums.map((a) => ({
    ...a,
    type: a.type || "Album",
    href: `/album/${a.slug}`,
    key: `album-${a.slug}`,
  }));
  const trackItems = tracks.map((t) => ({
    ...t,
    type: t.isStandaloneRelease ? "Single" : "Recording",
    href: `/track/${t.slug}`,
    key: `track-${t.slug}`,
  }));
  if (section === "latest-albums")
    return albumItems.filter((a) => a.type === "Album").sort(newest);
  if (section === "tuned-for-dreams")
    return [
      ...albumItems.filter((a) => a.slug === "tuned-for-dreams"),
      ...trackItems.filter((t) => t.id !== undefined && bedtimeIds.has(t.id)),
    ].sort(
      (a, b) =>
        Number(b.type === "Album") - Number(a.type === "Album") || newest(a, b),
    );
  return [
    ...albumItems.filter((a) => a.slug !== "tuned-for-dreams"),
    ...trackItems.filter(
      (t) => t.isStandaloneRelease === true && (t.id === undefined || !bedtimeIds.has(t.id)),
    ),
  ].sort(newest);
}
export function discographySchema(
  section: DiscographySection | undefined,
  items: CatalogRelease[],
) {
  const info = discographySections.find((s) => s.slug === section);
  const url = `https://alybouchnak.com/discography${section ? "/" + section : ""}`;
  const entries = section ? items : discographySections.map(item => ({ title: item.label, href: `/discography/${item.slug}` }));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url + "#webpage",
    url,
    name: info
      ? `${info.label} | Aly Bouchnak Discography`
      : "Aly Bouchnak Discography",
    description:
      info?.description ||
      "Browse Aly Bouchnak’s albums, daytime music, and bedtime recordings.",
    about: { "@id": "https://alybouchnak.com/#artist" },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://alybouchnak.com/' },
        { '@type': 'ListItem', position: 2, name: 'Discography', item: 'https://alybouchnak.com/discography' },
        ...(info ? [{ '@type': 'ListItem', position: 3, name: info.label, item: url }] : []),
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entries.length,
      itemListElement: entries.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: "https://alybouchnak.com" + item.href,
        name: item.title,
      })),
    },
  };
}
