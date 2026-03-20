export interface Album {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  artist: string;
  releaseDate: string;
  genre: string;
  ageRange: string;
  mood: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  amazonUrl?: string;
  otherUrl?: string; // Link to push.fm or other streaming platforms
  trackCount: number;
  duration: string;
  upc: string;
  educationalBenefits: {
    title: string;
    description: string;
  }[];
  // Extended content for album pages
  artistNote?: string;
  scienceFramework?: string;
  trackIds?: number[];
  relatedAlbums?: {
    id: number;
    title: string;
    cover: string;
    description: string;
    link: string;
  }[];
  // For Discography compatibility
  id?: number;
  type?: string;
  date?: string;
  image?: string;
  link?: string;
  status?: 'available' | 'coming-soon';
  lyrics?: string;
}

export const albums: Album[] = [
  {
    "id": 1,
    "slug": "the-blooms-house-volume-1",
    "title": "The Bloom's House: Volume 1",
    "subtitle": "Fun songs for toddler routines and playtime",
    "description": "A collection of lively, engaging songs designed specifically for toddlers, featuring animal sounds, movement activities, and educational content that supports early childhood development.",
    "coverImage": "/images/The-Blooms-House-volume-1-Aly-Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-05-29T00:00:00.000Z",
    "genre": "Kids Pop",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/album/placeholder",
    "appleMusicUrl": "https://music.apple.com/album/placeholder",
    "youtubeUrl": "https://youtube.com/playlist/placeholder",
    "amazonUrl": "https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak",
    "otherUrl": "https://push.fm/fl/alybouchnak",
    "trackCount": 10,
    "duration": "20:32",
    "upc": "5063959503706",
    "educationalBenefits": [
      {
        "title": "Language Development",
        "description": "Supports vocabulary growth through repetitive lyrics and catchy melodies."
      },
      {
        "title": "Motor Skills",
        "description": "Encourages movement and coordination through dance and action songs."
      },
      {
        "title": "Social Skills",
        "description": "Promotes sharing and interaction through group music activities."
      },
      {
        "title": "Emotional Expression",
        "description": "Helps children express feelings through music and movement."
      }
    ],
    "artistNote": "<p>&quot;<strong>The&nbsp;Bloom&#39;s&nbsp;House:&nbsp;Volume&nbsp;1</strong>&quot;&nbsp;represents&nbsp;my&nbsp;vision&nbsp;for&nbsp;what&nbsp;children&#39;s&nbsp;music&nbsp;should&nbsp;be—functional,&nbsp;fun,&nbsp;and&nbsp;developmentally&nbsp;supportive.&nbsp;Each&nbsp;track&nbsp;was&nbsp;carefully&nbsp;crafted&nbsp;to&nbsp;address&nbsp;specific&nbsp;needs&nbsp;in&nbsp;a&nbsp;child&#39;s&nbsp;daily&nbsp;routine,&nbsp;from&nbsp;morning&nbsp;energy&nbsp;to&nbsp;mealtime&nbsp;cooperation,&nbsp;from&nbsp;cognitive&nbsp;development&nbsp;to&nbsp;family&nbsp;bonding.&nbsp;</p><p>I&nbsp;noticed&nbsp;that&nbsp;many&nbsp;children&#39;s&nbsp;songs&nbsp;were&nbsp;either&nbsp;purely&nbsp;entertainment&nbsp;or&nbsp;overly&nbsp;educational,&nbsp;missing&nbsp;the&nbsp;sweet&nbsp;spot&nbsp;where&nbsp;learning&nbsp;happens&nbsp;naturally&nbsp;through&nbsp;play.&nbsp;This&nbsp;album&nbsp;bridges&nbsp;that&nbsp;gap.&nbsp;</p><p></p><p><strong>The&nbsp;tracks&nbsp;progress&nbsp;through&nbsp;a&nbsp;typical&nbsp;day:</strong>&nbsp;</p><ul><li>Morning&nbsp;energy&nbsp;(Boom&nbsp;Teka&nbsp;Boom)&nbsp;</li><li>Active&nbsp;play&nbsp;(The&nbsp;Funny&nbsp;Bunny&nbsp;Jump)</li><li>Social&nbsp;(Brave&nbsp;Hello)&nbsp;</li><li>Cognitive&nbsp;development&nbsp;(The&nbsp;Wise&nbsp;Mice)&nbsp;</li><li>Mealtime&nbsp;support&nbsp;(The&nbsp;Yummy&nbsp;Spoon)&nbsp;</li><li>Learning&nbsp;fundamentals&nbsp;(The&nbsp;Alphabet&nbsp;Song)&nbsp;</li><li>Family&nbsp;connection&nbsp;(Nanny&nbsp;&amp;&nbsp;Papa)&nbsp;</li><li>Animal&nbsp;exploration&nbsp;(The&nbsp;Duckie&nbsp;Song,&nbsp;Pet-Pop)&nbsp;</li><li>Imagination&nbsp;(Zakzooka&nbsp;The&nbsp;Bear)&nbsp;</li></ul><p></p><p>Parents&nbsp;tell&nbsp;me&nbsp;this&nbsp;album&nbsp;has&nbsp;become&nbsp;their&nbsp;&quot;go-to&quot;&nbsp;for&nbsp;different&nbsp;moments&nbsp;throughout&nbsp;the&nbsp;day—whether&nbsp;they&nbsp;need&nbsp;to&nbsp;wake&nbsp;up&nbsp;a&nbsp;sleepy&nbsp;toddler,&nbsp;encourage&nbsp;a&nbsp;picky&nbsp;eater,&nbsp;or&nbsp;create&nbsp;a&nbsp;fun&nbsp;dance&nbsp;party.&nbsp;The&nbsp;variety&nbsp;ensures&nbsp;there&#39;s&nbsp;a&nbsp;perfect&nbsp;song&nbsp;for&nbsp;every&nbsp;situation.</p>",
    "scienceFramework": "<h2><strong>The&nbsp;Developmental&nbsp;Science&nbsp;Behind&nbsp;Volume&nbsp;1</strong>&nbsp;</h2><p>This&nbsp;album&nbsp;is&nbsp;built&nbsp;on&nbsp;principles&nbsp;of&nbsp;developmental&nbsp;psychology&nbsp;and&nbsp;music&nbsp;therapy:&nbsp;</p><h3></h3><h3>Routine-Based&nbsp;Learning&nbsp;</h3><p>Each&nbsp;track&nbsp;is&nbsp;tied&nbsp;to&nbsp;a&nbsp;specific&nbsp;daily&nbsp;routine,&nbsp;leveraging&nbsp;what&nbsp;child&nbsp;development&nbsp;experts&nbsp;call&nbsp;&quot;scaffolded&nbsp;learning.&quot;&nbsp;By&nbsp;associating&nbsp;music&nbsp;with&nbsp;daily&nbsp;activities,&nbsp;children&nbsp;develop&nbsp;stronger&nbsp;neural&nbsp;pathways&nbsp;for&nbsp;routine&nbsp;compliance&nbsp;and&nbsp;skill&nbsp;development.&nbsp;</p><p></p><h3>Multi-Sensory&nbsp;Engagement&nbsp;</h3><p>The&nbsp;tracks&nbsp;incorporate&nbsp;various&nbsp;musical&nbsp;elements&nbsp;that&nbsp;engage&nbsp;different&nbsp;senses:&nbsp;</p><ol><li><ol><li>Rhythmic&nbsp;patterns&nbsp;for&nbsp;motor&nbsp;development&nbsp;</li><li>Melodic&nbsp;contours&nbsp;for&nbsp;emotional&nbsp;regulation&nbsp;</li><li>Timbral&nbsp;variety&nbsp;for&nbsp;auditory&nbsp;discrimination&nbsp;</li><li>Dynamic&nbsp;changes&nbsp;for&nbsp;attentional&nbsp;control&nbsp;</li></ol></li></ol><p></p><h3>Age-Appropriate&nbsp;Complexity&nbsp;</h3><p>All&nbsp;songs&nbsp;use&nbsp;musical&nbsp;complexity&nbsp;matched&nbsp;to&nbsp;2-6&nbsp;year&nbsp;developmental&nbsp;stage:&nbsp;</p><ol><li><ol><li>Simple,&nbsp;repetitive&nbsp;structures&nbsp;for&nbsp;memory&nbsp;</li><li>Clear&nbsp;diction&nbsp;for&nbsp;language&nbsp;development&nbsp;</li><li>Appropriate&nbsp;tempo&nbsp;ranges&nbsp;(90-135&nbsp;BPM)&nbsp;for&nbsp;natural&nbsp;movement&nbsp;</li><li>Predictable&nbsp;forms&nbsp;for&nbsp;cognitive&nbsp;security&nbsp;</li></ol></li></ol><p></p><h3>Functional&nbsp;Music&nbsp;Theory&nbsp;</h3><p>Based&nbsp;on&nbsp;research&nbsp;showing&nbsp;that&nbsp;music&nbsp;is&nbsp;most&nbsp;effective&nbsp;when&nbsp;it&nbsp;serves&nbsp;a&nbsp;purpose:&nbsp;</p><ol><li><ol><li>Transition&nbsp;songs&nbsp;reduce&nbsp;resistance&nbsp;to&nbsp;routine&nbsp;changes&nbsp;</li><li>Movement&nbsp;songs&nbsp;support&nbsp;gross&nbsp;motor&nbsp;development&nbsp;</li><li>Educational&nbsp;songs&nbsp;enhance&nbsp;learning&nbsp;retention&nbsp;</li><li>Emotional&nbsp;songs&nbsp;support&nbsp;social-emotional&nbsp;development&nbsp;</li></ol></li></ol><p></p><h3>Family-Centered&nbsp;Design&nbsp;</h3><p>Many&nbsp;tracks&nbsp;include&nbsp;elements&nbsp;that&nbsp;encourage&nbsp;family&nbsp;participation:&nbsp;</p><ol><li><ol><li>Call-and-response&nbsp;formats&nbsp;</li><li>Simple&nbsp;choreography&nbsp;for&nbsp;group&nbsp;activities&nbsp;</li><li>Relatable&nbsp;family&nbsp;scenarios&nbsp;</li><li>Inclusive&nbsp;language&nbsp;for&nbsp;diverse&nbsp;family&nbsp;structures</li></ol></li></ol>",
    "trackIds": [
      24,
      3,
      20,
      5,
      6,
      9,
      8,
      10,
      2,
      11
    ],
    "relatedAlbums": [
      {
        "id": 1,
        "link": "/album/tuned-for-dreams",
        "cover": "/images/tuned-for-dreams-cover",
        "title": "Tuned for Dreams",
        "description": "Sleep album for peaceful nights"
      },
      {
        "id": 2,
        "link": "/album/the-blooms-house-classics-party",
        "cover": "/images/The-Blooms-House-Party-Classics-Aly-Bouchnak.webp",
        "title": "The Bloom's House: Classics Party",
        "description": "Classic children's songs with modern twist"
      }
    ],
    "type": "Album",
    "date": "Jan 15, 2026",
    "image": "/images/The-Blooms-House-volume-1-Aly-Bouchnak.webp",
    "link": "/album/the-blooms-house-volume-1",
    "status": "coming-soon"
  },
  {
    "id": 2,
    "slug": "the-blooms-house-classics-party",
    "title": "The Bloom's House: Party Classics",
    "subtitle": "High-energy party versions of classic favorites",
    "description": "Energetic, modern takes on beloved classic children's songs, perfect for parties, celebrations, and active playtime with upbeat rhythms and contemporary sounds.",
    "coverImage": "/images/The-Blooms-House-Party-Classics-Aly-Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-04-24T00:00:00.000Z",
    "genre": "Children's Party Music, Classic Remakes",
    "ageRange": "2-6 years",
    "mood": "Energetic",
    "spotifyUrl": "https://open.spotify.com/album/placeholder",
    "appleMusicUrl": "https://music.apple.com/album/placeholder",
    "youtubeUrl": "https://youtube.com/playlist/placeholder",
    "amazonUrl": "https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak",
    "trackCount": 6,
    "duration": "13:47",
    "upc": "5063941237718",
    "educationalBenefits": [
      {
        "title": "Cultural Literacy",
        "description": "Introduces children to classic songs and cultural heritage."
      },
      {
        "title": "Physical Activity",
        "description": "Promotes active play and exercise through dance and movement."
      },
      {
        "title": "Musical Appreciation",
        "description": "Develops rhythm and timing through upbeat party music."
      },
      {
        "title": "Social Celebration",
        "description": "Creates joyful shared experiences for groups and families."
      }
    ],
    "artistNote": "<p>&quot;<strong>The&nbsp;Bloom&#39;s&nbsp;House</strong>:&nbsp;<strong>Classics&nbsp;Party</strong>&quot;&nbsp;was&nbsp;born&nbsp;from&nbsp;a&nbsp;special&nbsp;request&nbsp;from&nbsp;parents&nbsp;who&nbsp;wanted&nbsp;the&nbsp;magic&nbsp;of&nbsp;classic&nbsp;children&#39;s&nbsp;songs&nbsp;but&nbsp;with&nbsp;modern&nbsp;energy&nbsp;that&nbsp;gets&nbsp;kids&nbsp;moving.&nbsp;</p><p></p><p>I&nbsp;noticed&nbsp;that&nbsp;while&nbsp;traditional&nbsp;classics&nbsp;are&nbsp;beloved,&nbsp;they&nbsp;sometimes&nbsp;lack&nbsp;the&nbsp;production&nbsp;quality&nbsp;and&nbsp;tempo&nbsp;that&nbsp;engages&nbsp;today&#39;s&nbsp;children.&nbsp;</p><p></p><p>This&nbsp;album&nbsp;bridges&nbsp;generations&nbsp;by&nbsp;taking&nbsp;songs&nbsp;that&nbsp;parents&nbsp;and&nbsp;grandparents&nbsp;grew&nbsp;up&nbsp;with&nbsp;and&nbsp;giving&nbsp;them&nbsp;a&nbsp;contemporary&nbsp;makeover&nbsp;while&nbsp;preserving&nbsp;the&nbsp;core&nbsp;elements&nbsp;that&nbsp;make&nbsp;these&nbsp;songs&nbsp;timeless.&nbsp;</p><p></p><p>Each&nbsp;track&nbsp;was&nbsp;carefully&nbsp;reimagined:&nbsp;</p><ul><li>Modern&nbsp;pop&nbsp;production&nbsp;with&nbsp;clean,&nbsp;bright&nbsp;soundscapes&nbsp;</li><li>Upgraded&nbsp;tempos&nbsp;that&nbsp;match&nbsp;natural&nbsp;movement&nbsp;patterns&nbsp;for&nbsp;children&nbsp;</li><li>Preserved&nbsp;melodies&nbsp;and&nbsp;lyrics&nbsp;that&nbsp;maintain&nbsp;recognition&nbsp;</li><li>Added&nbsp;layers&nbsp;and&nbsp;harmonies&nbsp;that&nbsp;create&nbsp;emotional&nbsp;depth&nbsp;</li><li>Dance-friendly&nbsp;arrangements&nbsp;that&nbsp;encourage&nbsp;physical&nbsp;activity&nbsp;</li></ul><p></p><p>The&nbsp;goal&nbsp;was&nbsp;to&nbsp;create&nbsp;something&nbsp;that:&nbsp;</p><ol><li>Parents&nbsp;can&nbsp;share&nbsp;their&nbsp;childhood&nbsp;favorites&nbsp;with&nbsp;their&nbsp;kids&nbsp;</li><li>Children&nbsp;experience&nbsp;these&nbsp;classics&nbsp;with&nbsp;fresh,&nbsp;exciting&nbsp;energy&nbsp;</li><li>Teachers&nbsp;have&nbsp;modern&nbsp;arrangements&nbsp;for&nbsp;classroom&nbsp;activities&nbsp;</li><li>Families&nbsp;can&nbsp;enjoy&nbsp;dance&nbsp;parties&nbsp;with&nbsp;music&nbsp;everyone&nbsp;recognizes&nbsp;</li></ol><p></p><p>These&nbsp;aren&#39;t&nbsp;just&nbsp;covers—they&#39;re&nbsp;complete&nbsp;reimaginings&nbsp;that&nbsp;respect&nbsp;the&nbsp;original&nbsp;while&nbsp;creating&nbsp;something&nbsp;new&nbsp;and&nbsp;exciting&nbsp;for&nbsp;today&#39;s&nbsp;families.</p>",
    "scienceFramework": "<h2>The&nbsp;Educational&nbsp;Science&nbsp;Behind&nbsp;Classics&nbsp;Reimagined&nbsp;</h2><p>This&nbsp;album&nbsp;applies&nbsp;principles&nbsp;of&nbsp;music&nbsp;education&nbsp;and&nbsp;developmental&nbsp;psychology:&nbsp;</p><p></p><h3>1.&nbsp;Familiarity&nbsp;Principle&nbsp;</h3><p>Research&nbsp;shows&nbsp;that&nbsp;children&nbsp;learn&nbsp;best&nbsp;when&nbsp;they&nbsp;can&nbsp;connect&nbsp;new&nbsp;information&nbsp;to&nbsp;existing&nbsp;knowledge.&nbsp;</p><p>By&nbsp;using&nbsp;familiar&nbsp;melodies&nbsp;and&nbsp;structures,&nbsp;these&nbsp;songs&nbsp;create&nbsp;&quot;scaffolding&quot;&nbsp;that&nbsp;helps&nbsp;children:&nbsp;</p><ul><li>Process&nbsp;new&nbsp;musical&nbsp;concepts&nbsp;more&nbsp;easily&nbsp;</li><li>Remember&nbsp;lyrics&nbsp;and&nbsp;patterns&nbsp;through&nbsp;repetition&nbsp;</li><li>Connect&nbsp;with&nbsp;cultural&nbsp;heritage&nbsp;of&nbsp;children&#39;s&nbsp;music&nbsp;</li><li>Build&nbsp;confidence&nbsp;through&nbsp;known&nbsp;material&nbsp;</li></ul><p></p><h3>2.&nbsp;Tempo&nbsp;and&nbsp;Movement&nbsp;Science&nbsp;</h3><p>Each&nbsp;track&nbsp;is&nbsp;tempo-matched&nbsp;to&nbsp;developmental&nbsp;movement&nbsp;patterns:&nbsp;</p><ul><li>120-135&nbsp;BPM&nbsp;for&nbsp;natural&nbsp;dance&nbsp;and&nbsp;movement&nbsp;</li><li>Rhythmic&nbsp;patterns&nbsp;that&nbsp;encourage&nbsp;gross&nbsp;motor&nbsp;development&nbsp;</li><li>Clear&nbsp;beats&nbsp;that&nbsp;help&nbsp;with&nbsp;timing&nbsp;and&nbsp;coordination&nbsp;</li><li>Dynamic&nbsp;variations&nbsp;that&nbsp;maintain&nbsp;engagement&nbsp;</li></ul><p></p><h3>3.&nbsp;Cognitive&nbsp;Load&nbsp;Theory&nbsp;</h3><p>The&nbsp;arrangements&nbsp;balance&nbsp;complexity&nbsp;and&nbsp;accessibility:&nbsp;</p><ul><li>Simple&nbsp;enough&nbsp;for&nbsp;immediate&nbsp;participation&nbsp;</li><li>Complex&nbsp;enough&nbsp;to&nbsp;maintain&nbsp;interest&nbsp;over&nbsp;repeated&nbsp;listening&nbsp;</li><li>Layered&nbsp;production&nbsp;that&nbsp;reveals&nbsp;new&nbsp;details&nbsp;with&nbsp;each&nbsp;listen&nbsp;</li><li>Predictable&nbsp;structures&nbsp;that&nbsp;support&nbsp;memory&nbsp;development&nbsp;</li></ul><p></p><h3>4.&nbsp;Social-Emotional&nbsp;Learning&nbsp;</h3><p>Group&nbsp;music&nbsp;activities&nbsp;support:&nbsp;</p><ul><li>Social&nbsp;bonding&nbsp;through&nbsp;shared&nbsp;experience&nbsp;</li><li>Emotional&nbsp;regulation&nbsp;through&nbsp;rhythmic&nbsp;movement&nbsp;</li><li>Cultural&nbsp;connection&nbsp;through&nbsp;shared&nbsp;musical&nbsp;heritage&nbsp;</li><li>Cooperative&nbsp;play&nbsp;and&nbsp;turn-taking&nbsp;skills&nbsp;</li></ul><p></p><h3>5.&nbsp;Cross-Generational&nbsp;Appeal&nbsp;</h3><p>Modern&nbsp;production&nbsp;of&nbsp;classic&nbsp;songs&nbsp;creates:&nbsp;</p><ul><li>Bridge&nbsp;between&nbsp;generations&nbsp;(parents,&nbsp;grandparents,&nbsp;children)&nbsp;</li><li>Shared&nbsp;cultural&nbsp;experience&nbsp;</li><li>Nostalgia&nbsp;with&nbsp;contemporary&nbsp;relevance&nbsp;</li><li>Family&nbsp;tradition&nbsp;building&nbsp;opportunities</li></ul>",
    "trackIds": [
      7,
      1,
      23,
      4,
      21,
      22
    ],
    "relatedAlbums": [
      {
        "id": 1,
        "link": "/album/the-blooms-house-volume-1",
        "cover": "/images/The-Blooms-House-volume-1-Aly-Bouchnak.webp",
        "title": "The Bloom's House: Volume 1",
        "description": "Original songs for daily routines"
      },
      {
        "id": 2,
        "link": "/album/tuned-for-dreams",
        "cover": "/images/tuned-for-dreams-cover.webp",
        "title": "Tuned for Dreams",
        "description": "Sleep album for peaceful nights"
      }
    ],
    "type": "Album",
    "date": "Feb 1, 2026",
    "image": "/images/The-Blooms-House-Party-Classics-Aly-Bouchnak.webp",
    "link": "/album/the-blooms-house-classics-party",
    "status": "available"
  },
  {
    "id": 3,
    "slug": "tuned-for-dreams",
    "title": "Tuned for Dreams",
    "subtitle": "Calming sleep music for babies and toddlers",
    "description": "A carefully crafted collection of soothing lullabies and sleep aids designed to help babies and toddlers transition peacefully to sleep, featuring gentle melodies, white noise, and calming frequencies.",
    "coverImage": "/images/tuned-for-dreams-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09T00:00:00.000Z",
    "genre": "Children's Music",
    "ageRange": "1-8 years",
    "mood": "Calming",
    "spotifyUrl": "https://open.spotify.com/album/3MWhQxXFD4F0WDlqhp9a4m",
    "appleMusicUrl": "https://music.apple.com/us/album/tuned-for-dreams/1862214086",
    "youtubeUrl": "https://youtube.com/playlist?list=OLAK5uy_kyFy2tayS40xowEFXNBqWdkFxccMau004&si=M6ZBWvtbKpm9xCO2",
    "amazonUrl": "https://music.amazon.com/albums/B0G833ZYSZ",
    "otherUrl": "https://push.fm/fl/toned4dreams",
    "trackCount": 8,
    "duration": "25:03",
    "upc": "5063893028990",
    "educationalBenefits": [
      {
        "title": "Sleep Routine",
        "description": "Establishes consistent bedtime rituals and healthy sleep habits."
      },
      {
        "title": "Emotional Security",
        "description": "Provides comfort and safety through familiar, predictable sounds."
      },
      {
        "title": "Self-Soothing",
        "description": "Helps children develop independent sleep skills and coping mechanisms."
      },
      {
        "title": "Nervous System Regulation",
        "description": "Supports healthy development through calming auditory input."
      }
    ],
    "artistNote": "I created \"Tuned for Dreams\" after countless conversations with exhausted parents who were struggling with bedtime routines. The \"sleep battle\" is real—and I wanted to create something that actually works with a child's physiology, not against it.\n\nThis album is built on the ISO Principle: a gradual progression from higher energy to lower energy. Each track is scientifically designed to lower heart rate, reduce cortisol, and guide children into deep, restorative sleep.\n\nThe tracks progress through:\n• Validation and safety signaling (The Safe Container)\n• Vestibular calming through rhythm (The Pendulum)\n• Auditory masking of startle reflexes (The Sacred Shush)\n• Visual gating and womb simulation (The Dimming Light)\n• Cognitive offloading (The Ancient Tongue)\n• Social safety cues (The Protective Shadow)\n• Prenatal state simulation (The Liquid Room)\n• Deep sleep induction (The Infinite Loop)\n\nParents report that using this album as part of a consistent bedtime routine has transformed their evenings. The key is consistency—using the same sequence nightly helps build the neural association between these sounds and sleep.",
    "scienceFramework": "The Science of Sleep: How \"Tuned for Dreams\" Works\n\n1. The ISO Principle (Iso Principle in Music Therapy)\nThe ISO Principle states that music can be used to match and then gradually modify a person's emotional or physiological state. This album starts at 70 BPM (matching an elevated but calm heart rate) and gradually descends to 55 BPM (deep rest). This physiological entrainment helps the body follow the music into sleep.\n\n2. Brown Noise & Psychoacoustic Masking\nUnlike white noise (which can be harsh), Brown Noise has more energy at lower frequencies—similar to the sounds heard in the womb. This creates a \"sound blanket\" that masks sudden environmental noises that might trigger the startle reflex in sleeping children.\n\n3. Binaural Beats & Brainwave Entrainment\nSubtle frequency differences between left and right channels create binaural beats that encourage brainwave patterns associated with deep sleep (delta waves, 0.5-4 Hz). This is completely safe and non-invasive.\n\n4. Harmonic Stability & Predictability\nThe album uses consistent harmonic centers and predictable chord progressions. This reduces cognitive load—the brain doesn't need to \"work\" to process the music, allowing it to relax fully.\n\n5. The Cumulative Effect\nEach track builds on the previous one. The album is designed to be listened to in sequence, creating a 25-minute journey from wakefulness to deep sleep. The full album is more effective than individual tracks.",
    "trackIds": [
      12,
      13,
      14,
      19,
      15,
      17,
      18,
      16
    ],
    "relatedAlbums": [
      {
        "id": 1,
        "link": "/album/the-blooms-house-volume-1",
        "cover": "/images/The-Blooms-House-volume-1-Aly-Bouchnak.webp",
        "title": "The Bloom's House: Volume 1",
        "description": "Original songs for daily routines"
      },
      {
        "id": 2,
        "link": "/album/the-blooms-house-classics-party",
        "cover": "/images/The-Blooms-House-Party-Classics-Aly-Bouchnak.webp",
        "title": "The Bloom's House: Classics Party",
        "description": "Classic children's songs with modern twist"
      }
    ],
    "type": "Album",
    "date": "Feb 15, 2026",
    "image": "/images/tuned-for-dreams-cover.webp",
    "link": "/album/tuned-for-dreams",
    "status": "available"
  }
];

export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find(album => album.slug === slug);
}

export function getAllAlbums(): Album[] {
  return albums;
}
