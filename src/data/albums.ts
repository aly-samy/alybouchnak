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
    "genre": "Children's Music, Toddler Songs",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/album/placeholder",
    "appleMusicUrl": "https://music.apple.com/album/placeholder",
    "youtubeUrl": "https://youtube.com/playlist/placeholder",
    "amazonUrl": "https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak",
    "otherUrl": "https://push.fm/fl/alybouchnak",
    "trackCount": 10,
    "duration": "20:00",
    "upc": "0000",
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
    "artistNote": "\"The Bloom's House: Volume 1\" represents my vision for what children's music should be—functional, fun, and developmentally supportive. Each track was carefully crafted to address specific needs in a child's daily routine, from morning energy to mealtime cooperation, from cognitive development to family bonding.\n\nI noticed that many children's songs were either purely entertainment or overly educational, missing the sweet spot where learning happens naturally through play. This album bridges that gap.\n\nThe tracks progress through a typical day:\n• Morning energy (Boom Teka Boom)\n• Active play (Bock Bock Chicken, The Funny Bunny Jump)\n• Cognitive development (The Wise Mice)\n• Mealtime support (The Yummy Spoon)\n• Learning fundamentals (The Alphabet Song)\n• Family connection (Nanny & Papa)\n• Animal exploration (The Duckie Song, Pet-Pop)\n• Imagination (Zakzooka The Bear)\n\nParents tell me this album has become their \"go-to\" for different moments throughout the day—whether they need to wake up a sleepy toddler, encourage a picky eater, or create a fun dance party. The variety ensures there's a perfect song for every situation.",
    "scienceFramework": "The Developmental Science Behind Volume 1\n\nThis album is built on principles of developmental psychology and music therapy:\n\n1. Routine-Based Learning\nEach track is tied to a specific daily routine, leveraging what child development experts call \"scaffolded learning.\" By associating music with daily activities, children develop stronger neural pathways for routine compliance and skill development.\n\n2. Multi-Sensory Engagement\nThe tracks incorporate various musical elements that engage different senses:\n• Rhythmic patterns for motor development\n• Melodic contours for emotional regulation  \n• Timbral variety for auditory discrimination\n• Dynamic changes for attentional control\n\n3. Age-Appropriate Complexity\nAll songs use musical complexity matched to 2-6 year developmental stage:\n• Simple, repetitive structures for memory\n• Clear diction for language development\n• Appropriate tempo ranges (90-135 BPM) for natural movement\n• Predictable forms for cognitive security\n\n4. Functional Music Theory\nBased on research showing that music is most effective when it serves a purpose:\n• Transition songs reduce resistance to routine changes\n• Movement songs support gross motor development\n• Educational songs enhance learning retention\n• Emotional songs support social-emotional development\n\n5. Family-Centered Design\nMany tracks include elements that encourage family participation:\n• Call-and-response formats\n• Simple choreography for group activities\n• Relatable family scenarios\n• Inclusive language for diverse family structures",
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
    "status": "available"
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
    "otherUrl": "",
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
    "artistNote": "\"The Bloom's House: Classics Party\" was born from a special request from parents who wanted the magic of classic children's songs but with modern energy that gets kids moving. I noticed that while traditional classics are beloved, they sometimes lack the production quality and tempo that engages today's children.\n\nThis album bridges generations by taking songs that parents and grandparents grew up with and giving them a contemporary makeover while preserving the core elements that make these songs timeless.\n\nEach track was carefully reimagined:\n• Modern pop production with clean, bright soundscapes\n• Upgraded tempos that match natural movement patterns for children\n• Preserved melodies and lyrics that maintain recognition\n• Added layers and harmonies that create emotional depth\n• Dance-friendly arrangements that encourage physical activity\n\nThe goal was to create something that:\n1. Parents can share their childhood favorites with their kids\n2. Children experience these classics with fresh, exciting energy\n3. Teachers have modern arrangements for classroom activities\n4. Families can enjoy dance parties with music everyone recognizes\n\nThese aren't just covers—they're complete reimaginings that respect the original while creating something new and exciting for today's families.",
    "scienceFramework": "The Educational Science Behind Classics Reimagined\n\nThis album applies principles of music education and developmental psychology:\n\n1. Familiarity Principle\nResearch shows that children learn best when they can connect new information to existing knowledge. By using familiar melodies and structures, these songs create \"scaffolding\" that helps children:\n• Process new musical concepts more easily\n• Remember lyrics and patterns through repetition\n• Connect with cultural heritage of children's music\n• Build confidence through known material\n\n2. Tempo and Movement Science\nEach track is tempo-matched to developmental movement patterns:\n• 120-135 BPM for natural dance and movement\n• Rhythmic patterns that encourage gross motor development\n• Clear beats that help with timing and coordination\n• Dynamic variations that maintain engagement\n\n3. Cognitive Load Theory\nThe arrangements balance complexity and accessibility:\n• Simple enough for immediate participation\n• Complex enough to maintain interest over repeated listening\n• Layered production that reveals new details with each listen\n• Predictable structures that support memory development\n\n4. Social-Emotional Learning\nGroup music activities support:\n• Social bonding through shared experience\n• Emotional regulation through rhythmic movement\n• Cultural connection through shared musical heritage\n• Cooperative play and turn-taking skills\n\n5. Cross-Generational Appeal\nModern production of classic songs creates:\n• Bridge between generations (parents, grandparents, children)\n• Shared cultural experience\n• Nostalgia with contemporary relevance\n• Family tradition building opportunities",
    "trackIds": [
      4,
      21,
      1,
      22,
      7,
      23
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
    "genre": "Children's Sleep Music, Lullabies",
    "ageRange": "0-3 years",
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
