export interface FAQ {
  id: number;
  category:
    | "About Aly Bouchnak"
    | "Music & Parenting"
    | "The Bloom's House"
    | "General";
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    category: "About Aly Bouchnak",
    question: "Who is Aly Bouchnak?",
    answer:
      "Aly Bouchnak is an independent children’s music artist, songwriter and producer, and the creator of The Bloom’s House. His catalog includes original family pop, nursery-rhyme arrangements, action songs, and quieter bedtime music. The official artist website is alybouchnak.com.",
  },
  {
    id: 2,
    category: "The Bloom's House",
    question: "What is The Bloom’s House?",
    answer:
      "The Bloom’s House is the music world and release series created by Aly Bouchnak. Its catalog includes The Bloom’s House: Volume 1, The Bloom’s House: Party Classics, and The Bloom’s House: Volume 2. Aly Bouchnak is the artist credit; The Bloom’s House is not a separate artist credit for these recordings.",
  },
  {
    id: 3,
    category: "General",
    question: "Where can I listen to Aly Bouchnak’s music?",
    answer:
      "Start with the Discography pages to choose an album, EP, or single. Each music page includes available release-specific listening links. Aly Bouchnak also has official artist profiles on Spotify, Apple Music, and YouTube. A playlist is a listening mix and may not contain every release.",
  },
  {
    id: 4,
    category: "About Aly Bouchnak",
    question: "Which albums has Aly Bouchnak released or announced?",
    answer:
      "The full-length albums listed here are The Bloom’s House: Volume 1, The Bloom’s House: Party Classics, Tuned for Dreams, and The Bloom’s House: Volume 2. The Latest Albums page provides release dates and track lists, including announced albums. It distinguishes full-length albums from EPs and singles.",
  },
  {
    id: 5,
    category: "General",
    question: "What is Bouncy Beats on this website?",
    answer:
      "Bouncy Beats is the daytime section of the discography. It groups family pop, action songs, nursery-rhyme releases, and music for everyday routines. It is a browsing collection, not an additional album. The separate Playlists page lists listening mixes.",
  },
  {
    id: 6,
    category: "General",
    question: "What is Tuned for Dreams?",
    answer:
      "Tuned for Dreams is Aly Bouchnak’s bedtime album, released on 9 January 2026. Its discography collection links to the album and the individual recordings, including The Sacred Shush, The Ancient Tongue, and The Liquid Room. The album page provides the ordered track list.",
  },
  {
    id: 7,
    category: "The Bloom's House",
    question: "When is The Bloom’s House: Volume 2 released?",
    answer:
      "The listed release date for The Bloom’s House: Volume 2 is 23 October 2026. Its album page contains the track list and available platform links. A song appearing on Volume 2 may also have an earlier single or EP release; the recording page and album page describe different catalog entries.",
  },
  {
    id: 8,
    category: "About Aly Bouchnak",
    question: "Why are there two Bock Bock Chicken recordings?",
    answer:
      "The catalog contains a 2025 recording with ISRC GXF972564744 and a separate 2026 recording with ISRC GX5MY2662913. Use the ISRC and release year to identify the version. The lyrics supplied by Aly Bouchnak for this website apply only to the 2026 recording; approved lyrics are not currently listed for the 2025 recording.",
  },
  {
    id: 9,
    category: "General",
    question: "Where can I find full lyrics?",
    answer:
      "Open a song’s recording page and look for its Lyrics section. Full lyrics are displayed where they have been supplied by the artist. If lyrics are absent, they have not been inferred from another recording or a similarly named song. The release and recording details remain available.",
  },
  {
    id: 10,
    category: "General",
    question: "Where can I verify release dates, track lists, ISRCs, and UPCs?",
    answer:
      "Album pages provide release dates and ordered track lists. Recording pages provide recording details and ISRCs where listed. The press kit includes a recording identifier table and release UPCs. MusicBrainz is the external source used to reconcile the release catalog; artist-supplied lyrics are a separate source.",
  },
  {
    id: 11,
    category: "Music & Parenting",
    question: "Which Aly Bouchnak songs work for action games and dancing?",
    answer:
      "Try The Funny Bunny Jump (Freeze Dance) for a stop-and-move game or Hobby The Bunny for hopping actions. Their recording pages include the lyrics and available listening links. Bouncy Beats brings these daytime releases together so families and educators can choose a song for the activity.",
  },
  {
    id: 12,
    category: "Music & Parenting",
    question: "Which song is about waking up?",
    answer:
      "Boom Teka Boom (Wake Up Song) is Aly Bouchnak’s morning-themed action song. Open its recording page for lyrics, release details, and available listening links. It also appears in album and EP track lists; use those pages to see the release context.",
  },
  {
    id: 13,
    category: "Music & Parenting",
    question: "Which song is about bath time?",
    answer:
      "Boss Bath is the bath-time song in Aly Bouchnak’s catalog. Its lyrics describe washing, bubbles, and playful bath-time characters. The recording page provides the artist-supplied lyrics and listening links, while the Boss Bath EP page lists the songs included on that release.",
  },
  {
    id: 14,
    category: "Music & Parenting",
    question: "Which song is about mealtime?",
    answer:
      "The Yummy Spoon (Open Wide) is Aly Bouchnak’s mealtime-themed song. Visit its recording page for the lyrics and release information. It can be used as a familiar musical cue during a family routine, without assuming that every child will respond in the same way.",
  },
  {
    id: 15,
    category: "Music & Parenting",
    question: "Which song can mark the end of an activity?",
    answer:
      "Silly Goodbye Dance (See You Later Alligator) is a goodbye song with animal rhymes, waving, and movement cues. Its recording page contains the full artist-supplied lyrics, including the spoken lines, and the ISRC GXFHP2678212. It is an option for the end of a play session or classroom activity.",
  },
  {
    id: 16,
    category: "Music & Parenting",
    question: "Which songs are about parents and family affection?",
    answer:
      "My Little Love celebrates affection between parents and their little ones. Who is Daddy’s Favorite? is a playful call-and-response song about a father and his children. Open their recording pages to read the lyrics and decide which fits your family or activity.",
  },
  {
    id: 17,
    category: "The Bloom's House",
    question: "Where are the modern nursery-rhyme versions?",
    answer:
      "The Bloom’s House: Party Classics includes Aly Bouchnak’s pop arrangements of familiar nursery rhymes. Examples include The Wheels on the Bus (Party Ride), Mary Had a Little Lamb (School Party), and Old MacDonald Had a Farm (Farm Party). The album page lists the exact titles and links to each recording.",
  },
  {
    id: 18,
    category: "General",
    question: "Where can I find the official playlists?",
    answer:
      "The Playlists page lists the listening mixes featured on this website. Open a playlist page for its description and available platform link. Use the Discography pages for the release catalog, since a playlist’s selection and running order are different from an album’s official track list.",
  },
  {
    id: 19,
    category: "Music & Parenting",
    question: "Does Tuned for Dreams guarantee sleep or a particular response?",
    answer:
      "No specific sleep outcome is promised. Tuned for Dreams is a collection of bedtime recordings with quieter musical textures, humming, and shushing sounds. Families can preview individual tracks and decide whether they fit a quiet routine. Descriptions of the music should not be read as evidence of a clinical effect.",
  },
  {
    id: 20,
    category: "Music & Parenting",
    question: "Can we enjoy the songs without watching videos?",
    answer:
      "Yes. The recording and album pages provide available audio-platform links, so listening does not require watching a video. Choose a song for dancing, singing, play, or a quiet activity. The website’s Resources page also provides music-related articles and activity ideas.",
  },
  {
    id: 21,
    category: "General",
    question:
      "Can I use a recording in a video, lesson, event, or commercial project?",
    answer:
      "For a permission or licensing enquiry about an Aly Bouchnak recording, contact hello@alybouchnak.com. Include the recording link or ISRC, how and where you want to use it, and whether the project will be published or commercial. A listening link or a lyrics page does not itself grant permission to reuse a recording.",
  },
  {
    id: 22,
    category: "General",
    question: "How can journalists and collaborators contact Aly Bouchnak?",
    answer:
      "Email hello@alybouchnak.com for press, interviews, collaborations, and requests for press materials. Include your publication or project, the topic, relevant song or release links, and your deadline. The official press kit provides short and extended biographies, artist profiles, and recording identifiers.",
  },
  {
    id: 23,
    category: "About Aly Bouchnak",
    question:
      "Which official pages should I cite for information about Aly Bouchnak?",
    answer:
      "Use the press kit for the artist biography and contact details, the FAQ for direct answers, album pages for track lists and release dates, and recording pages for ISRCs and supplied lyrics. The structured music catalog and official page directory link these resources. Identify the recording by ISRC when titles or versions could be confused.",
  },
];

export function getFaqById(id: number): FAQ | undefined {
  return faqs.find((faq) => faq.id === id);
}

export function getAllFaqs(): FAQ[] {
  return faqs;
}
