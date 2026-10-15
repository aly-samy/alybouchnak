import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { readData } from "../scripts/read-data.js";
import { getDiscographyReleases } from "../src/lib/discography.ts";
const tracks = readData("src/data/tracks.ts", "tracks");
const albums = readData("src/data/albums.ts", "albums");
const faqs = readData("src/data/faqs.ts", "faqs");
const htmlFor = (route) => fs.readFileSync(`dist/${route}/index.html`, "utf8");
const graphFor = (html) =>
  JSON.parse(/data-seo="schema">([\s\S]*?)<\/script>/.exec(html)[1])["@graph"];
const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

test("daytime collections cover official releases, and bedtime includes every album recording", () => {
  const daytime = getDiscographyReleases(albums, tracks, "bouncy-beats");
  const bedtime = getDiscographyReleases(albums, tracks, "tuned-for-dreams");
  const dreamAlbum = albums.find((a) => a.slug === "tuned-for-dreams");
  assert.deepEqual(
    new Set(bedtime.filter((i) => i.type === "Recording").map((i) => i.id)),
    new Set(dreamAlbum.trackIds),
  );
  assert.ok(
    daytime.every(
      (i) => !dreamAlbum.trackIds.includes(i.id) || !i.key.startsWith("track-"),
    ),
  );
  assert.equal(
    daytime.length + bedtime.filter((i) => i.type === "Album").length,
    31,
  );
  assert.equal(
    getDiscographyReleases(albums, tracks, "latest-albums").length,
    albums.filter((a) => a.type === "Album").length,
  );
});

test("each discography collection has unique SEO, crawlable links, and matching list schema", () => {
  for (const section of ["latest-albums", "bouncy-beats", "tuned-for-dreams"]) {
    const html = htmlFor(`discography/${section}`);
    const schema = graphFor(html).find((i) => i["@type"] === "CollectionPage");
    const expected = getDiscographyReleases(albums, tracks, section);
    assert.equal(schema.url, `https://alybouchnak.com/discography/${section}`);
    assert.equal(schema.mainEntity.numberOfItems, expected.length);
    for (const release of expected)
      assert.ok(html.includes(`href="${release.href}"`));
    assert.ok(fs.readFileSync("dist/sitemap.xml", "utf8").includes(schema.url));
  }
});

test("all FAQ answers are visible in initial HTML and match the FAQ schema exactly", () => {
  const html = htmlFor("faq");
  const schema = graphFor(html).find((i) => i["@type"] === "FAQPage");
  assert.equal(schema.mainEntity.length, faqs.length);
  const body = decode(html.split("<main")[1]);
  for (const faq of faqs) {
    const question = schema.mainEntity.find((q) => q.name === faq.question);
    assert.equal(question.acceptedAnswer.text, faq.answer);
    assert.ok(body.includes(faq.question));
    assert.ok(body.includes(faq.answer));
    assert.ok(body.includes(`id="question-${faq.id}"`));
  }
  assert.ok(
    !/viral hit|regulate sleep|dopamine boost|authoritative semantic entity|growth engine/i.test(
      body,
    ),
  );
});

test("press kit exposes current biography, releases and identifiers without hidden tuning text", () => {
  const html = htmlFor("epk");
  const schema = graphFor(html).find((i) => i["@type"] === "ProfilePage");
  assert.equal(schema.mainEntity.name, "Aly Bouchnak");
  const body = html.split("<main")[1];
  for (const track of tracks)
    if (track.isrc) assert.ok(body.includes(track.isrc));
  for (const album of albums) assert.ok(body.includes(`/album/${album.slug}`));
  for (const code of [
    "GXF972564744",
    "GX5MY2662913",
    "GXFHP2678212",
    "GXFHP2629495",
  ])
    assert.ok(body.includes(code));
  assert.ok(!/voice-assistant-tuning|aria-hidden="true"/.test(body));
  assert.ok(fs.readFileSync("dist/llms.txt", "utf8").includes("/faq"));
  assert.ok(fs.readFileSync("dist/llms.txt", "utf8").includes("/epk"));
});

test("every local FAQ resource resolves to a built page and a real fragment when present", () => {
  const links = JSON.parse(fs.readFileSync("src/data/faq-links.json", "utf8"));
  for (const list of Object.values(links))
    for (const link of list) {
      if (!link.href.startsWith("/")) continue;
      const [route, fragment] = link.href.slice(1).split("#");
      const file =
        route.endsWith(".json") || route.endsWith(".txt")
          ? `dist/${route}`
          : `dist/${route}/index.html`;
      assert.ok(fs.existsSync(file), link.href);
      if (fragment)
        assert.ok(
          fs.readFileSync(file, "utf8").includes(`id="${fragment}"`),
          link.href,
        );
    }
});
