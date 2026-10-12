export interface Album {
  musicbrainzReleaseGroupId?: string;
  musicbrainzUrl?: string;
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
    "title": "The Bloom’s House: Volume 1",
    "subtitle": "Fun songs for toddler routines and playtime",
    "description": "A collection of lively, engaging songs designed specifically for toddlers, featuring animal sounds, movement activities, and educational content that supports early childhood development.",
    "coverImage": "/images/The-Blooms-House-volume-1-Aly-Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-05-29",
    "genre": "Kids Pop",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/album/134XipON3bV6hjGL4Dkn2G",
    "appleMusicUrl": "https://music.apple.com/us/album/1893464507",
    "youtubeUrl": "https://www.youtube.com/playlist?list=OLAK5uy_mXBcizwqKA_e7IAIXd48T-Q5Gu-LIipmk",
    "amazonUrl": "https://music.amazon.ca/albums/B0GX79PZKF",
    "otherUrl": "https://push.fm/fl/alybouchnak",
    "trackCount": 10,
    "duration": "22:47",
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
    "date": "2026-05-29",
    "image": "/images/The-Blooms-House-volume-1-Aly-Bouchnak.webp",
    "link": "/album/the-blooms-house-volume-1",
    "status": "available",
    "musicbrainzReleaseGroupId": "46fd8f74-3ea3-4438-8457-fcbc5f39e19c",
    "musicbrainzUrl": "https://musicbrainz.org/release/58a22571-0e96-4567-b636-ea2c25de21bb"
  },
  {
    "id": 3,
    "slug": "tuned-for-dreams",
    "title": "Tuned for Dreams",
    "subtitle": "Calming sleep music for babies and toddlers",
    "description": "A carefully crafted collection of soothing lullabies and sleep aids designed to help babies and toddlers transition peacefully to sleep, featuring gentle melodies, white noise, and calming frequencies.",
    "coverImage": "/images/tuned-for-dreams-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "genre": "Children's Music",
    "ageRange": "1-8 years",
    "mood": "Calming",
    "spotifyUrl": "https://open.spotify.com/album/3MWhQxXFD4F0WDlqhp9a4m",
    "appleMusicUrl": "https://music.apple.com/us/album/tuned-for-dreams/1862214086",
    "youtubeUrl": "https://www.youtube.com/playlist?list=OLAK5uy_kyFy2tayS40xowEFXNBqWdkFxccMau004",
    "amazonUrl": "https://music.amazon.com/albums/B0G833ZYSZ",
    "otherUrl": "https://push.fm/fl/toned4dreams",
    "trackCount": 8,
    "duration": "25:00",
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
      15,
      16,
      17,
      18,
      19
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
    "date": "2026-01-09",
    "image": "/images/tuned-for-dreams-cover.webp",
    "link": "/album/tuned-for-dreams",
    "status": "available",
    "musicbrainzReleaseGroupId": "029a33b3-28b2-4a3b-996d-d5ba7ac578ba",
    "musicbrainzUrl": "https://musicbrainz.org/release/d6a8fe6b-b82e-43a3-a352-08365fdcef50"
  },
  {
    "id": 2,
    "slug": "the-blooms-house-classics-party",
    "title": "The Bloom's House: Party Classics",
    "subtitle": "High-energy party versions of classic favorites",
    "description": "Energetic, modern takes on beloved classic children's songs, perfect for parties, celebrations, and active playtime with upbeat rhythms and contemporary sounds.",
    "coverImage": "/images/The-Blooms-House-Party-Classics-Aly-Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-04-24",
    "genre": "Children's Music",
    "ageRange": "2-6 years",
    "mood": "Energetic",
    "spotifyUrl": "https://open.spotify.com/album/2Z2ziPoKvzMMdnYYGVWfAZ",
    "appleMusicUrl": "https://music.apple.com/us/album/1885613941",
    "youtubeUrl": "https://www.youtube.com/watch?v=NuftpQHwLdE",
    "amazonUrl": "https://music.amazon.ca/albums/B0GSS9YPZJ",
    "otherUrl": "https://push.fm/fl/blooms-party-classics",
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
    "date": "2026-04-24",
    "image": "/images/The-Blooms-House-Party-Classics-Aly-Bouchnak.webp",
    "link": "/album/the-blooms-house-classics-party",
    "status": "available",
    "musicbrainzReleaseGroupId": "3a2f627c-0335-40c9-94ca-543531748cae",
    "musicbrainzUrl": "https://musicbrainz.org/release/2a446c92-7daf-43df-8fe7-d15c0e617507"
  },
  {
    "id": 4,
    "slug": "the-blooms-house-volume-2",
    "title": "The Bloom's House: Volume 2",
    "subtitle": "Big feelings, big dance moves & playful family adventures",
    "description": "The Bloom's House: Volume 2 is the second original kids album from Aly Bouchnak, expanding The Bloom’s House into a bigger, brighter world of movement, imagination, routines and everyday family celebration.\n\nBuilt for toddlers, preschoolers and young families, Volume 2 blends modern children’s pop with playful dance production, character-driven storytelling and practical music designed for real family moments.\n\nThis collection moves across:\n🐰 active playtime\n🛁 bath time routines\n🕺 dance breaks\n💜 friendship & inclusion\n👨‍👧 family bonding\n🌙 bedtime imagination\n👋 goodbye rituals\n\nwith songs designed to feel joyful, playful and highly interactive.\n\nHighlights include:\n\n🐰 Hobby The Bunny — a tropical hopping dance adventure\n\n🛁 Boss Bath — a playful bath-time anthem built for movement and routines\n\n🎤 The Babble Beat — funny rhythm-driven silliness\n\n🏆 Cool Gang (Big W Vibes) — the album’s friendship anthem celebrating inclusion, confidence and teamwork\n\n💛 My Little Love — a warm dance-along bonding song\n\n👨 Who is Daddy’s Favorite? — playful father-and-kids celebration\n\n🐶 Billy Boy — a fresh modern reimagining of a traditional classic\n\n👋 Silly Goodbye Dance (Later, Alligator) — a joyful goodbye anthem\n\n🦙 Llama Drama In Pajamas — bedtime storytelling meets playful imagination\n\n✨ Layla’s Coming — a disco-inspired movement celebration based on a timeless melody\n\nAcross the album, bright electronic pop, tropical rhythms, playful hooks and movement-based cues encourage kids to sing, dance, imagine and connect.\n\nThe result is playful enough for kids and thoughtfully produced for the whole family.",
    "coverImage": "/images/release-8f16d0f4-a610-41b1-be58-6e545f55c32b.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-10-23",
    "genre": "Kids Pop",
    "ageRange": "2-8 years",
    "mood": "Upbeat",
    "spotifyUrl": "",
    "appleMusicUrl": "",
    "youtubeUrl": "",
    "amazonUrl": "",
    "otherUrl": "https://push.fm/fl/alybouchnak",
    "trackCount": 11,
    "duration": "29:15",
    "upc": "5064091070064",
    "educationalBenefits": [
      {
        "title": "",
        "description": ""
      }
    ],
    "artistNote": "The Bloom’s House: Volume 2 was about making the world feel bigger and more alive.\n\nAfter Volume 1 introduced the foundation, I wanted the second album to feel like opening more doors inside Bloom’s House—more characters, more movement, more storytelling and more real family moments.\n\nI especially wanted to explore friendship and belonging through Cool Gang (Big W Vibes) because feeling included matters so much in early childhood.\n\nSome songs help kids move. Some help with routines. Some are simply meant to feel silly and joyful.\n\nMy goal stays the same: create music kids genuinely love while giving families playful songs that feel warm, memorable and fun to live with.",
    "trackIds": [
      25,
      26,
      27,
      28,
      33,
      30,
      35,
      32,
      34,
      31,
      36
    ],
    "type": "Album",
    "date": "2026-10-23",
    "image": "/images/release-8f16d0f4-a610-41b1-be58-6e545f55c32b.jpg",
    "link": "/album/the-blooms-house-volume-2",
    "status": "coming-soon",
    "musicbrainzReleaseGroupId": "70f43dc2-1eb3-4cf4-9b9f-a5c775c6ffe6",
    "musicbrainzUrl": "https://musicbrainz.org/release/8f16d0f4-a610-41b1-be58-6e545f55c32b"
  },
  {
    "id": 5,
    "slug": "hobby-the-bunny",
    "title": "Hobby The Bunny",
    "subtitle": "EP by Aly Bouchnak",
    "description": "Meet Hobby the Bunny in a hopping dance song with carrots, wiggling noses and high, low, left and right movement cues. This 6-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-21cead45-05f0-4e7d-9181-f3042062cb23.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-06-10",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/album/7hoLYuk1fPlir8SHLXQfnj",
    "appleMusicUrl": "https://music.apple.com/us/album/1893459178",
    "youtubeUrl": "https://www.youtube.com/watch?v=G7uZnOBdce8",
    "trackCount": 6,
    "duration": "13:56",
    "upc": "5063958788531",
    "educationalBenefits": [],
    "date": "2026-06-10",
    "type": "EP",
    "image": "/images/release-21cead45-05f0-4e7d-9181-f3042062cb23.jpg",
    "trackIds": [
      25,
      11,
      10,
      23,
      5,
      1
    ],
    "musicbrainzReleaseGroupId": "03f90596-f5c2-4e3b-9bbc-cdc154abda8b",
    "musicbrainzUrl": "https://musicbrainz.org/release/21cead45-05f0-4e7d-9181-f3042062cb23",
    "link": "/album/hobby-the-bunny",
    "status": "available",
    "amazonUrl": ""
  },
  {
    "id": 6,
    "slug": "my-little-love",
    "title": "My Little Love",
    "subtitle": "EP by Aly Bouchnak",
    "description": "A family dance song for mamas, papas and little ones, with warm hugs, tiny dancing feet, a freeze break and a funky beat. This 5-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/my-little-love-cover.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-08-14",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/album/12bISkWiAE0A467nBh65Yj",
    "appleMusicUrl": "https://music.apple.com/us/album/6788861011",
    "youtubeUrl": "https://www.youtube.com/playlist?list=OLAK5uy_lz6eT2uj7eRJzAjF5jeSkuVeVFQIsO7J8",
    "trackCount": 5,
    "duration": "13:16",
    "upc": "5064011593673",
    "educationalBenefits": [],
    "date": "2026-08-14",
    "type": "EP",
    "image": "/images/my-little-love-cover.jpg",
    "trackIds": [
      33,
      28,
      27,
      26,
      1
    ],
    "musicbrainzReleaseGroupId": "74a888bb-e22c-42b1-aa10-980cd5e02fb3",
    "musicbrainzUrl": "https://musicbrainz.org/release/299a664f-39ea-4af0-a153-02c88978f389",
    "link": "/album/my-little-love",
    "status": "available",
    "amazonUrl": "https://music.amazon.ca/albums/B0H83TB29P"
  },
  {
    "id": 7,
    "slug": "boom-teka-boom-wake-up-song",
    "title": "Boom Teka Boom (Wake Up Song)",
    "subtitle": "EP by Aly Bouchnak",
    "description": "Boom Teka Boom (Wake Up Song) is a 3-track ep by Aly Bouchnak. Explore the track list and release details.",
    "coverImage": "/images/boom-teka-boom-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-30",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "",
    "spotifyUrl": "https://open.spotify.com/album/6GY3VleFHyMgWHtckzV0Bx",
    "appleMusicUrl": "https://music.apple.com/eg/album/1863464669",
    "youtubeUrl": "https://www.youtube.com/playlist?list=OLAK5uy_kad6Z4DoGm7t1sPJZMfAC6k7Ea_LC1lXM",
    "trackCount": 3,
    "duration": "6:16",
    "upc": "5063893188977",
    "educationalBenefits": [],
    "date": "2026-01-30",
    "type": "EP",
    "image": "/images/boom-teka-boom-cover.webp",
    "trackIds": [
      3,
      2,
      29
    ],
    "musicbrainzReleaseGroupId": "634320d5-290f-4fb4-8c89-71cb0e95c896",
    "musicbrainzUrl": "https://musicbrainz.org/release/30c9f6e4-8a07-4d5c-9f95-a665b15c8a92",
    "link": "/album/boom-teka-boom-wake-up-song",
    "status": "available",
    "amazonUrl": ""
  },
  {
    "id": 8,
    "slug": "llama-drama-in-pajamas",
    "title": "Llama (Drama in Pajamas)",
    "subtitle": "EP by Aly Bouchnak",
    "description": "A playful bedtime story about a llama in polka-dot pajamas, with stop-and-go cues, putting toys away, turning book pages and a quiet goodnight. This 5-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-328a04b4-be48-45e9-a6e6-32178f5eee76.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-10-09",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Transitional",
    "spotifyUrl": "",
    "appleMusicUrl": "",
    "youtubeUrl": "",
    "trackCount": 5,
    "duration": "12:49",
    "upc": "5064041997960",
    "educationalBenefits": [],
    "date": "2026-10-09",
    "type": "EP",
    "image": "/images/release-328a04b4-be48-45e9-a6e6-32178f5eee76.jpg",
    "trackIds": [
      34,
      1,
      23,
      7,
      32
    ],
    "musicbrainzReleaseGroupId": "aa90fdad-b6fb-4113-8398-e0e344d3dc22",
    "musicbrainzUrl": "https://musicbrainz.org/release/328a04b4-be48-45e9-a6e6-32178f5eee76",
    "link": "/album/llama-drama-in-pajamas",
    "status": "available",
    "amazonUrl": ""
  },
  {
    "id": 9,
    "slug": "the-babble-beat",
    "title": "The Babble Beat",
    "subtitle": "EP by Aly Bouchnak",
    "description": "A playful call-and-response song that turns babbling, popping bubbles, bird sounds and invented words into a dance beat. This 5-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-3dcc5503-7614-4aa7-b76c-a739aeabd871.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-07-15",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/album/7Hb61Tqqj1cefeNJ5Le21h",
    "appleMusicUrl": "https://music.apple.com/eg/album/6781052445",
    "youtubeUrl": "https://www.youtube.com/playlist?list=OLAK5uy_mgQyIQX1x9kG6V-GEat4qLtB8ZEMovef8",
    "trackCount": 5,
    "duration": "13:08",
    "upc": "5063992021731",
    "educationalBenefits": [],
    "date": "2026-07-15",
    "type": "EP",
    "image": "/images/release-3dcc5503-7614-4aa7-b76c-a739aeabd871.jpg",
    "trackIds": [
      27,
      26,
      25,
      7,
      9
    ],
    "musicbrainzReleaseGroupId": "18ddc298-51ae-4101-a448-7e34bc2a25fb",
    "musicbrainzUrl": "https://musicbrainz.org/release/3dcc5503-7614-4aa7-b76c-a739aeabd871",
    "link": "/album/the-babble-beat",
    "status": "available",
    "amazonUrl": "https://music.amazon.in/albums/B0H5CG3NDM"
  },
  {
    "id": 10,
    "slug": "boss-bath",
    "title": "Boss Bath",
    "subtitle": "EP by Aly Bouchnak",
    "description": "A bubbly bath-time sing-along with duckies, frogs, fish, scrubbing and splashing. Everybody wash-wash—even the boss! This 6-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-46b2106e-c09e-4dd4-9766-b5d76bb53309.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-06-26",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/album/4uZEGRMcbXIGJ1SmokuCXe",
    "appleMusicUrl": "https://music.apple.com/us/album/1893583370",
    "youtubeUrl": "https://www.youtube.com/playlist?list=OLAK5uy_l74p7qwh9fN-bpypdpXOsrqu4sKorK3XY",
    "trackCount": 6,
    "duration": "14:58",
    "upc": "5063959799024",
    "educationalBenefits": [],
    "date": "2026-06-26",
    "type": "EP",
    "image": "/images/release-46b2106e-c09e-4dd4-9766-b5d76bb53309.jpg",
    "trackIds": [
      26,
      25,
      3,
      20,
      24,
      7
    ],
    "musicbrainzReleaseGroupId": "dd3af353-18bf-462e-93b7-174d5c804711",
    "musicbrainzUrl": "https://musicbrainz.org/release/46b2106e-c09e-4dd4-9766-b5d76bb53309",
    "link": "/album/boss-bath",
    "status": "available",
    "amazonUrl": "https://www.amazon.com/gp/product/B0GX79RTJF"
  },
  {
    "id": 11,
    "slug": "who-is-daddys-favorite",
    "title": "Who is Daddy’s Favorite?",
    "subtitle": "EP by Aly Bouchnak",
    "description": "A funny call-and-response family song celebrating Daddy, with spelling, tickles, silly household rules and a dance-like-a-dad break. This 5-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-5d431a2e-5bf9-4cc3-a308-9fd25fce7fc9.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-08-28",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/album/2ZfmJSfFxu74Y78sCJKIRO",
    "appleMusicUrl": "https://music.apple.com/us/album/6794532759",
    "youtubeUrl": "https://www.youtube.com/watch?v=JzP0P-eG7g4",
    "trackCount": 5,
    "duration": "13:07",
    "upc": "5064010254025",
    "educationalBenefits": [],
    "date": "2026-08-28",
    "type": "EP",
    "image": "/images/release-5d431a2e-5bf9-4cc3-a308-9fd25fce7fc9.jpg",
    "trackIds": [
      30,
      36,
      33,
      28,
      27
    ],
    "musicbrainzReleaseGroupId": "b1d80d1d-1819-4106-8960-8da496c2a332",
    "musicbrainzUrl": "https://musicbrainz.org/release/5d431a2e-5bf9-4cc3-a308-9fd25fce7fc9",
    "link": "/album/who-is-daddys-favorite",
    "status": "available",
    "amazonUrl": "https://www.amazon.com/gp/product/B0HBCKFS9L"
  },
  {
    "id": 12,
    "slug": "the-wise-mice-memory-game",
    "title": "The Wise Mice (Memory Game)",
    "subtitle": "EP by Aly Bouchnak",
    "description": "The Wise Mice (Memory Game) is a 5-track ep by Aly Bouchnak. Explore the track list and release details.",
    "coverImage": "/images/the-wise-mice-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-11",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "",
    "spotifyUrl": "",
    "appleMusicUrl": "https://music.apple.com/us/album/the-wise-mice-single/1890022352?uo=4",
    "youtubeUrl": "",
    "trackCount": 5,
    "duration": "11:09",
    "upc": "5063907926106",
    "educationalBenefits": [],
    "date": "2026-02-11",
    "type": "EP",
    "image": "/images/the-wise-mice-cover.webp",
    "trackIds": [
      5,
      8,
      3,
      2,
      29
    ],
    "musicbrainzReleaseGroupId": "23ccd8cb-0a8f-4da7-ba85-9a9a0d79bd0f",
    "musicbrainzUrl": "https://musicbrainz.org/release/602c6a50-fe1f-4ccf-99f6-1f239619b54b",
    "link": "/album/the-wise-mice-memory-game",
    "status": "available",
    "amazonUrl": ""
  },
  {
    "id": 13,
    "slug": "nanny-papa-funny-bunny-family",
    "title": "Nanny & Papa (Funny Bunny Family)",
    "subtitle": "EP by Aly Bouchnak",
    "description": "Nanny & Papa (Funny Bunny Family) is a 4-track ep by Aly Bouchnak. Explore the track list and release details.",
    "coverImage": "/images/nanny-and-papa-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-27",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "",
    "spotifyUrl": "https://open.spotify.com/album/2DWdaBxfb1xUMOHme8oyC6",
    "appleMusicUrl": "https://music.apple.com/us/album/nanny-papa-funny-bunny-family-single/1890026606?uo=4",
    "youtubeUrl": "",
    "trackCount": 4,
    "duration": "8:49",
    "upc": "5063907265434",
    "educationalBenefits": [],
    "date": "2026-02-27",
    "type": "EP",
    "image": "/images/nanny-and-papa-cover.webp",
    "trackIds": [
      8,
      3,
      2,
      29
    ],
    "musicbrainzReleaseGroupId": "32172fc2-b09a-4af6-9720-f75662f1d4d2",
    "musicbrainzUrl": "https://musicbrainz.org/release/6c7a200a-dd66-435a-a83a-fd30a08ca3b5",
    "link": "/album/nanny-papa-funny-bunny-family",
    "status": "available",
    "amazonUrl": ""
  },
  {
    "id": 14,
    "slug": "billy-boy",
    "title": "Billy Boy",
    "subtitle": "EP by Aly Bouchnak",
    "description": "A modern Billy Boy sing-along about exploring the sky, sea, moon and park, with jumping, spinning and a playful dance drop. This 5-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-7d43efd4-4693-4de5-a3e2-07d1a0fac646.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-09-11",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Energetic",
    "spotifyUrl": "",
    "appleMusicUrl": "",
    "youtubeUrl": "",
    "trackCount": 5,
    "duration": "12:09",
    "upc": "5064011078002",
    "educationalBenefits": [],
    "date": "2026-09-11",
    "type": "EP",
    "image": "/images/release-7d43efd4-4693-4de5-a3e2-07d1a0fac646.jpg",
    "trackIds": [
      35,
      30,
      36,
      28,
      20
    ],
    "musicbrainzReleaseGroupId": "fe14778e-cdcb-4c3a-b568-bd84c563d693",
    "musicbrainzUrl": "https://musicbrainz.org/release/7d43efd4-4693-4de5-a3e2-07d1a0fac646",
    "link": "/album/billy-boy",
    "status": "available",
    "amazonUrl": ""
  },
  {
    "id": 15,
    "slug": "the-yummy-spoon-open-wide",
    "title": "The Yummy Spoon (Open Wide)",
    "subtitle": "EP by Aly Bouchnak",
    "description": "The Yummy Spoon (Open Wide) is a 6-track ep by Aly Bouchnak. Explore the track list and release details.",
    "coverImage": "/images/the-yummy-spoon-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-03-11",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "",
    "spotifyUrl": "https://open.spotify.com/album/7E49NCiZEvqofDWy2hPcAO",
    "appleMusicUrl": "https://music.apple.com/gb/album/1877228062",
    "youtubeUrl": "",
    "trackCount": 6,
    "duration": "12:50",
    "upc": "5063906910496",
    "educationalBenefits": [],
    "date": "2026-03-11",
    "type": "EP",
    "image": "/images/the-yummy-spoon-cover.webp",
    "trackIds": [
      6,
      8,
      5,
      3,
      2,
      29
    ],
    "musicbrainzReleaseGroupId": "f27af58f-e5de-4314-a09c-586101efc263",
    "musicbrainzUrl": "https://musicbrainz.org/release/b5d50ec9-0e46-4822-8bfe-2e9a92d8f928",
    "link": "/album/the-yummy-spoon-open-wide",
    "status": "available",
    "amazonUrl": "https://music.amazon.in/albums/B0GN5F3NKG"
  },
  {
    "id": 16,
    "slug": "silly-goodbye-dance-see-you-later-alligator",
    "title": "Silly Goodbye Dance (See You Later Alligator)",
    "subtitle": "EP by Aly Bouchnak",
    "description": "A goodbye transition song with animal rhymes, waving, hugs, kisses, stomping and the familiar “See you later, alligator!” refrain. This 5-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-ca9fbe69-f47d-4646-a592-439e9ed7165b.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-09-25",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Playful",
    "spotifyUrl": "",
    "appleMusicUrl": "",
    "youtubeUrl": "",
    "trackCount": 5,
    "duration": "12:40",
    "upc": "5064041868062",
    "educationalBenefits": [],
    "date": "2026-09-25",
    "type": "EP",
    "image": "/images/release-ca9fbe69-f47d-4646-a592-439e9ed7165b.jpg",
    "trackIds": [
      32,
      20,
      36,
      28,
      33
    ],
    "musicbrainzReleaseGroupId": "74a40f05-3c66-44dd-9726-cd360533da8d",
    "musicbrainzUrl": "https://musicbrainz.org/release/ca9fbe69-f47d-4646-a592-439e9ed7165b",
    "link": "/album/silly-goodbye-dance-see-you-later-alligator",
    "status": "available",
    "amazonUrl": ""
  },
  {
    "id": 17,
    "slug": "laylas-coming",
    "title": "Layla's Coming",
    "subtitle": "EP by Aly Bouchnak",
    "description": "Layla arrives on her light-up scooter in a movement song with glowing wheels, scooter slides, helmet taps, wiggles and freeze-dance cues. This 5-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-dbc6724f-345d-416c-a79d-8d67db5a6acc.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-10-15",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Energetic",
    "spotifyUrl": "",
    "appleMusicUrl": "",
    "youtubeUrl": "",
    "trackCount": 5,
    "duration": "11:31",
    "upc": "5064041235277",
    "educationalBenefits": [],
    "date": "2026-10-15",
    "type": "EP",
    "image": "/images/release-dbc6724f-345d-416c-a79d-8d67db5a6acc.jpg",
    "trackIds": [
      31,
      21,
      22,
      11,
      3
    ],
    "musicbrainzReleaseGroupId": "d2fab4e4-27ad-4e4e-9375-380ae2c3c011",
    "musicbrainzUrl": "https://musicbrainz.org/release/dbc6724f-345d-416c-a79d-8d67db5a6acc",
    "link": "/album/laylas-coming",
    "status": "coming-soon",
    "amazonUrl": ""
  },
  {
    "id": 18,
    "slug": "cool-gang-big-w-vibes",
    "title": "Cool Gang (Big W Vibes)",
    "subtitle": "EP by Aly Bouchnak",
    "description": "Join the Cool Gang in a friendship dance song about welcoming someone new, helping a friend, sharing toys and celebrating the team. This 5-track EP includes more songs from The Bloom's House.",
    "coverImage": "/images/release-ef400481-323d-4090-922f-9d3f375a2e20.jpg",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-07-31",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "Energetic",
    "spotifyUrl": "https://open.spotify.com/album/7MpHD5F6fllOTOAGa1uZbI",
    "appleMusicUrl": "https://music.apple.com/eg/album/6782240578",
    "youtubeUrl": "",
    "trackCount": 5,
    "duration": "12:25",
    "upc": "5064011224317",
    "educationalBenefits": [],
    "date": "2026-07-31",
    "type": "EP",
    "image": "/images/release-ef400481-323d-4090-922f-9d3f375a2e20.jpg",
    "trackIds": [
      28,
      27,
      26,
      25,
      11
    ],
    "musicbrainzReleaseGroupId": "8b9ff75a-ae7d-4a00-bd8a-9def455965a0",
    "musicbrainzUrl": "https://musicbrainz.org/release/ef400481-323d-4090-922f-9d3f375a2e20",
    "link": "/album/cool-gang-big-w-vibes",
    "status": "available",
    "amazonUrl": "https://www.amazon.fr/gp/product/B0H62Z8N3H"
  },
  {
    "id": 19,
    "slug": "brave-hello",
    "title": "Brave Hello",
    "subtitle": "EP by Aly Bouchnak",
    "description": "Brave Hello is a 5-track ep by Aly Bouchnak. Explore the track list and release details.",
    "coverImage": "/images/Brave-Hello--Aly-Bouchnak-Cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-05-22",
    "genre": "Children's Music",
    "ageRange": "",
    "mood": "",
    "spotifyUrl": "https://open.spotify.com/album/3dNVr6iFEFQqnxyckhJ5ON",
    "appleMusicUrl": "https://music.apple.com/us/album/brave-hello-ep/1893407755?uo=4",
    "youtubeUrl": "",
    "trackCount": 5,
    "duration": "12:20",
    "upc": "5063958741116",
    "educationalBenefits": [],
    "date": "2026-05-22",
    "type": "EP",
    "image": "/images/Brave-Hello--Aly-Bouchnak-Cover.webp",
    "trackIds": [
      24,
      11,
      10,
      9,
      20
    ],
    "musicbrainzReleaseGroupId": "45d71b54-2905-4a0e-8db0-28d19a4dcb03",
    "musicbrainzUrl": "https://musicbrainz.org/release/fa396cea-4e4f-4060-8b7f-8745e527cd9a",
    "link": "/album/brave-hello",
    "status": "available",
    "amazonUrl": "https://music.amazon.in/albums/B0GX76998P"
  }
];

export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find(album => album.slug === slug);
}

export function getAllAlbums(): Album[] {
  return albums;
}
