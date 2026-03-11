export interface Track {
  // Internal identifier
  id: number;
  slug: string;

  // Basic track info
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  artist: string;
  releaseDate: string;
  duration: string;
  bpm: number;
  genre: string;
  ageRange: string;
  mood: string;
  routine: 'Playtime' | 'Bedtime' | 'Mealtime' | 'Cleanup' | 'Transition' | 'Learning' | 'Celebration' | 'Movement';

  // International codes
  isrc: string; // International Standard Recording Code
  upc: string;  // Universal Product Code (album)

  // Album info
  album: string;
  albumUrl: string;

  // Streaming URLs
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  amazonUrl?: string;
  otherUrl?: string; // Link to push.fm or other streaming platforms

  // Lyrics (preview array for display, full text for SEO/lyrics page)
  lyricsPreview: string[];
  lyricsFull: string;

  // Educational content
  educationalBenefits: {
    title: string;
    description: string;
  }[];

  // Artist insights
  artistNote: string;

  // Related tracks (by id)
  relatedTracks: number[];

  // Complete SEO metadata
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
  };

  // Schema.org structured data
  trackSchema: {
    '@context': string;
    '@type': string;
    '@id': string;
    name: string;
    url: string;
    duration: string;
    genre: string;
    byArtist: {
      '@type': string;
      name: string;
    };
    inAlbum: {
      '@type': string;
      name: string;
      '@id': string;
    };
    datePublished: string;
    isrcCode: string;
    description: string;
    image: string;
  };
}

export const tracks: Track[] = [
  {
    "id": 24,
    "slug": "brave-hello",
    "title": "Brave Hello",
    "subtitle": "A Social-Emotional song for greetings and confidence (Ages 2–6)",
    "description": "Helping little ones find their (Brave Hello) This track uses a gentle but bouncy rhythm to teach toddlers how to greet others with confidence, making social transitions easier for both kids and parents.",
    "coverImage": "/images/Brave-Hello--Aly-Bouchnak-Cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-05-22",
    "duration": "2:15",
    "bpm": 124,
    "genre": "Children's Music",
    "ageRange": "2-6 years",
    "mood": "Upbeat",
    "routine": "Transition",
    "isrc": "TBD",
    "upc": "TBD",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/Placeholder",
    "appleMusicUrl": "https://music.apple.com/us/song/Placeholder",
    "youtubeUrl": "https://youtu.be/Placeholder",
    "amazonUrl": "https://music.amazon.com/tracks/Placeholder",
    "lyricsPreview": [
      "Deep breath in, and a smile so wide",
      "I’ve got my 'Brave Hello' inside",
      "Wave your hand, and say it clear"
    ],
    "lyricsFull": "Deep breath in, and a smile so wide\nI’ve got my 'Brave Hello' inside\nWave your hand, and say it clear\nI’m so happy to be here!\n\nSometimes I feel a little shy\nWhen a new friend passes by\nBut I remember what to do\nI say 'Hello! How are you?'\n\nBrave Hello, Brave Hello\nWatch my confidence start to grow\nBrave Hello, Brave Hello\nEverywhere that I may go\n\nTo my teacher, to my friend\nOn the love, we can depend\nWith a wave and a happy face\nI feel brave in every place!",
    "educationalBenefits": [
      {
        "title": "Social Confidence",
        "description": "Models positive greeting behaviors to reduce social anxiety."
      },
      {
        "title": "Emotional Regulation",
        "description": "Uses deep breathing cues to help children manage 'shyness' or jitters."
      },
      {
        "title": "Communication Skills",
        "description": "Encourages clear verbal and non-verbal (waving) communication."
      }
    ],
    "artistNote": "I wrote 'Brave Hello' to be a 'pocket-tool' for parents. Meeting new people can be scary for a 3-year-old, so I wanted to give them a catchy rhythm they can hum to feel brave during those first-day-of-school moments.",
    "relatedTracks": [
      8,
      11,
      7
    ],
    "seo": {
      "title": "Brave Hello | Social-Emotional Song | Aly Bouchnak",
      "description": "Helping little ones find their (Brave Hello) This track uses a gentle but bouncy rhythm to teach toddlers how to greet others with confidence, making social transitions easier for both kids and parents.",
      "keywords": "social-emotional song, brave hello, toddler music, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/brave-hello",
      "ogImage": "https://alybouchnak.com/images/Brave-Hello--Aly-Bouchnak-Cover.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/brave-hello#recording",
      "name": "Brave Hello | Social-Emotional Song",
      "url": "https://alybouchnak.com/track/brave-hello",
      "duration": "PT2M15S",
      "genre": "Children's Music",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-05-22",
      "isrcCode": "TBD",
      "description": "A social-emotional song helping children build confidence in greetings.",
      "image": "https://alybouchnak.com/images/Brave-Hello--Aly-Bouchnak-Cover.webp"
    }
  },
  {
    "id": 23,
    "slug": "mary-had-a-little-lamb-school-party",
    "title": "Mary Had a Little Lamb (School Party)",
    "subtitle": "Classic nursery rhyme with party twist (Ages 2–6)",
    "description": "A fresh, upbeat take on the classic nursery rhyme \"Mary Had a Little Lamb\" with a modern party beat that gets children moving and singing along.",
    "coverImage": "/images/mary-little-lamb-school-party-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-27",
    "duration": "2:06",
    "bpm": 130,
    "genre": "Children's Music, Pop, Nu Disco, Nursery Rhymes",
    "ageRange": "2-6 years",
    "mood": "Celebratory",
    "routine": "Playtime",
    "isrc": "GX8KD2657271",
    "upc": "5063925242516",
    "album": "The Bloom's House: Party Classics",
    "albumUrl": "/album/the-blooms-house-classics-party",
    "spotifyUrl": "https://open.spotify.com/track/39mGnlWUZBz5gbx4U9Z1Mk",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtu.be/-cp7P3vwvHQ",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "Mary had a little lamb, little lamb, little lamb",
      "Mary had a little lamb, its fleece was white as snow",
      "He followed her to school one day, School one day, school one day",
      "He followed her to school one day, Which was against the rule!"
    ],
    "lyricsFull": "Who is ready for school?\nGrab your backpack!\nBut wait... who is following Mary?\n(Baa!)\n\nMary had a little lamb\nLittle lamb, little lamb\nMary had a little lamb\nHis fleece was white as snow!\nHe followed her to school one day\nSchool one day, school one day\nHe followed her to school one day\nWhich was against the rule!\n(Uh oh!)\n\nHe walked right through the open door\n(Hello!)\nHis hooves went Tap-Tap on the floor\n(Tap-Tap!)\nThe teacher looked and rubbed her eyes...\nBut the children yelled a big SURPRISE!\n\nLook at the Lamb! He is so CUTE!\n(So cute!)\nLook at the Lamb! In his fluffy suit!\n(So fluffy!)\nIt made the children laugh and play\nLaugh and play, laugh and play!\nIt made the children laugh and play\nTo see a Lamb at school!\n(Party time!)\n\nMary had a little lamb\nLittle lamb, little lamb\nMary had a little lamb\nHis fleece was white as snow!\nHe followed her to school one day\nSchool one day, school one day\nHe followed her to school one day\nWhich was against the rule!\n\nEverybody dance with the Lamb!\nShow me your fluffy hands!\n(Wiggle Wiggle!)\nShow me your fluffy tail!\n(Shake Shake!)\nGo Mary! Go Lamb!\n(Yay!)\n\nThe teacher said \"You cannot stay!\"\n\"You have to go outside and play!\"\nBut the Lamb just smiled and tapped his feet\nHe was dancing to the happy beat!\n(He loves the song!)\n\nLook at the Lamb! He is so CUTE!\n(So cute!)\nLook at the Lamb! In his fluffy suit!\n(So fluffy!)\nIt made the children laugh and play\nLaugh and play, laugh and play!\nIt made the children laugh and play\nTo see a Lamb at school!\n\nYou are the cutest Lamb in the world!\n(Baa!)\nSee you tomorrow!\n(Bye bye!)",
    "educationalBenefits": [
      {
        "title": "Traditional Learning",
        "description": "Introduces children to classic nursery rhymes and cultural heritage."
      },
      {
        "title": "Memory Skills",
        "description": "Develops memorization through repetitive lyrics and predictable patterns."
      },
      {
        "title": "Rhythm & Movement",
        "description": "Encourages dancing and movement to the upbeat party rhythm."
      },
      {
        "title": "Social Bonding",
        "description": "Promotes group singing and shared musical experiences."
      }
    ],
    "artistNote": "Taking a beloved classic and giving it new life with modern production was a joy. I wanted to preserve the nostalgic essence while making it exciting for today's kids to dance to.",
    "relatedTracks": [
      2,
      4,
      5
    ],
    "seo": {
      "title": "Mary Had a Little Lamb (School Party) | Classic Nursery Rhyme | Aly Bouchnak",
      "description": "A modern, upbeat take on the classic nursery rhyme. Perfect party version for kids ages 2-6 with dance beats and sing-along fun.",
      "keywords": "Mary had a little lamb, nursery rhyme, kids party song, classic song modern version, toddler dance song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/mary-had-a-little-lamb-school-party",
      "ogImage": "https://alybouchnak.com/images/mary-little-lamb-school-party-cover.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/mary-had-a-little-lamb-school-party#recording",
      "name": "Mary Had a Little Lamb (School Party)",
      "url": "https://alybouchnak.com/track/mary-had-a-little-lamb-school-party",
      "duration": "PT2M06S",
      "genre": "Children's Music, Pop, Nu Disco, Nursery Rhymes",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Party Classics",
        "@id": "https://alybouchnak.com/album/the-blooms-house-classics-party"
      },
      "datePublished": "2026-02-27",
      "isrcCode": "GX8KD2657271",
      "description": "A fresh, upbeat take on the classic nursery rhyme with a modern party beat.",
      "image": "https://alybouchnak.com/images/mary-little-lamb-school-party-cover.webp"
    }
  },
  {
    "id": 22,
    "slug": "body-party-head-shoulders",
    "title": "The Body Party (Head & Shoulders)",
    "subtitle": "Body parts movement song (Ages 2–6)",
    "description": "A party version of \"Head, Shoulders, Knees and Toes\" that gets children moving while learning body parts and developing coordination.",
    "coverImage": "/images/head-shoulders-knees-and-toes.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-08",
    "duration": "2:10",
    "bpm": 130,
    "genre": "Children's Pop, Body Awareness Songs",
    "ageRange": "2-6 years",
    "mood": "Energetic",
    "routine": "Movement",
    "isrc": "GX8LD2631231",
    "upc": "5063941237718",
    "album": "The Bloom's House: Party Classics",
    "albumUrl": "/album/the-blooms-house-classics-party",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "Head, Shoulders, Knees and Toes!, (Knees and Toes!)",
      "And Eyes! And Ears! And Mouth and Nose!",
      "Head, Shoulders, Knees and Toes!, (Knees and Toes!)"
    ],
    "lyricsFull": "Okay everybody!\nCheck your energy!\n(Full!)\nCheck your smiles!\n(Check!)\nIt's time to move your body... from the top... to the bottom!\n\nHead, Shoulders, Knees and Toes!\n(Knees and Toes!)\nHead, Shoulders, Knees and Toes!\n(Knees and Toes!)\nAnd Eyes! And Ears! And Mouth and Nose!\nHead, Shoulders, Knees and Toes!\n(Knees and Toes!)\n\nI love my body!\n(Yay!)\nI love to move!\n(Yay!)\nFrom the top of my head...\nDown to my shoes!\n(Woo!)\nIt’s a Body Party!\n\nLet’s do it again!\nHead, Shoulders, Knees and Toes!\n(Clap! Clap!)\nHead, Shoulders, Knees and Toes!\n(Clap! Clap!)\nAnd Eyes! And Ears! And Mouth and Nose!\nHead, Shoulders, Knees and Toes!\n(Yeah!)\n\nWhoa... the record is slowing down\nCan you move in Sloooooow Moooooootion?\nHeaaaaaad...\nShouuuuulders...\nKneeeees....\nAnd Toooooes....\n(You look like an astronaut!)\n\nOkay... speed it up!\n1... 2... 1, 2, 3, GO!\nHeadShouldersKneesandToes!\n(Knees and Toes!)\nHeadShouldersKneesandToes!\n(Knees and Toes!)\nHeadShouldersKneesandToes!\n(Woo!)\n\nGive your knees a hug!\n(Good job knees!)\nGive your toes a wiggle!\n(Good job toes!)\nWe are healthy and strong!\n(Yay!)",
    "educationalBenefits": [
      {
        "title": "Body Awareness",
        "description": "Teaches children to identify different body parts through song."
      },
      {
        "title": "Motor Coordination",
        "description": "Develops ability to touch body parts while singing and moving."
      },
      {
        "title": "Vocabulary Building",
        "description": "Expands body part vocabulary in a fun, memorable way."
      },
      {
        "title": "Speed Processing",
        "description": "Challenges children with progressively faster tempos."
      }
    ],
    "artistNote": "The challenge here was keeping it educational while making it party-worthy. Speeding up the tempo creates excitement while reinforcing body part knowledge.",
    "relatedTracks": [
      6,
      7,
      9
    ],
    "seo": {
      "title": "The Body Party (Head & Shoulders) | Kids Body Parts Song | Aly Bouchnak",
      "description": "Party version of the classic body parts song. Kids learn head, shoulders, knees and toes while dancing. Ages 2-6.",
      "keywords": "head shoulders knees and toes, body parts song for kids, movement song, toddler body awareness, kids coordination song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/body-party-head-shoulders",
      "ogImage": "https://alybouchnak.com/images/head-shoulders-knees-and-toes.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/body-party-head-shoulders#recording",
      "name": "The Body Party (Head & Shoulders)",
      "url": "https://alybouchnak.com/track/body-party-head-shoulders",
      "duration": "PT2M10S",
      "genre": "Children's Pop, Body Awareness Songs",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Party Classics",
        "@id": "https://alybouchnak.com/album/the-blooms-house-classics-party"
      },
      "datePublished": "2026-02-08",
      "isrcCode": "GX8LD2631231",
      "description": "A party version teaching body parts with progressively faster tempos for fun coordination challenges.",
      "image": "https://alybouchnak.com/images/head-shoulders-knees-and-toes.webp"
    }
  },
  {
    "id": 21,
    "slug": "wheels-on-the-bus-party-ride",
    "title": "The Wheels on the Bus (Party Ride)",
    "subtitle": "Transportation movement song (Ages 2–6)",
    "description": "An energetic party version of the classic \"The Wheels on the Bus\" with modern beats and fun sound effects that get children moving and singing about bus adventures.",
    "coverImage": "/images/The-Wheels-on-the-Bus--Party-Ride.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-03",
    "duration": "2:19",
    "bpm": 130,
    "genre": "Children's Pop, Transportation Songs",
    "ageRange": "2-6 years",
    "mood": "Energetic",
    "routine": "Movement",
    "isrc": "GX8LD2630428",
    "upc": "5063907564377",
    "album": "The Bloom's House: Party Classics",
    "albumUrl": "/album/the-blooms-house-classics-party",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "The wheels on the bus go round and round",
      "Round and round, round and round",
      "The wheels on the bus go round and round",
      "All through the town"
    ],
    "lyricsFull": "The Party Bus is here!\nI have a ticket for you... and you... and you!\nCome on inside!\nLet's roll!\n\nThe wheels on the bus go round and round\nRound and round, round and round\nThe wheels on the bus go round and round\nAll through the town!\n(Roll your hands!)\n\nThe wipers on the bus go Swish, Swish, Swish\nSwish, Swish, Swish!\nSwish, Swish, Swish!\nThe wipers on the bus go Swish, Swish, Swish\nAll through the town!\n(Side to side!)\n\nWe are riding on the bus!\n(Yeah!)\nIt’s a party just for us!\n(Woo!)\nThe sun is shining down...\nAll through the town!\n(Yay!)\n\nThe horn on the bus goes Beep, Beep, Beep\nBeep, Beep, Beep!\nBeep, Beep, Beep!\nThe horn on the bus goes Beep, Beep, Beep\nAll through the town!\n(Make some noise!)\n\nThe people on the bus go Up and Down!\n(Jump Up!)\nUp and Down!\n(Get Low!)\nUp and Down!\n(Jump Up!)\nThe people on the bus go Up and Down\nAll through the town!\n\nWe are stopped at a red light\n(Shhh...)\nWho is driving the bus?\nIs it a Bear?\n(No!)\nIs it a Cat?\n(No!)\nIt's the DJ!\nAnd the Driver on the bus says...\nEVERYBODY DANCE!\n\n(Go Bus! Go Bus! Go Bus!)\n(Wiggle your wheels!)\n\nThe wheels on the bus go round and round!\n(Round and round!)\nWe are here!\n(Ding Dong!)\nThanks for the ride!",
    "educationalBenefits": [
      {
        "title": "Transportation Awareness",
        "description": "Teaches children about buses and transportation concepts."
      },
      {
        "title": "Sound Effects",
        "description": "Develops understanding of vehicle sounds through repetition."
      },
      {
        "title": "Movement Coordination",
        "description": "Encourages physical actions matching song lyrics."
      },
      {
        "title": "Sequencing Skills",
        "description": "Builds understanding of patterns through verse repetition."
      }
    ],
    "artistNote": "I remember doing all the hand motions to this song as a kid. I wanted to keep that interactive spirit but add beats that make both kids and parents want to dance together.",
    "relatedTracks": [
      3,
      4,
      5
    ],
    "seo": {
      "title": "The Wheels on the Bus (Party Ride) | Kids Transportation Song | Aly Bouchnak",
      "description": "Energetic party version of the classic bus song. Kids learn vehicle sounds while dancing to modern beats. Perfect for ages 2-6.",
      "keywords": "wheels on the bus, transportation song for kids, bus song, kids vehicle song, toddler movement song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/wheels-on-the-bus-party-ride",
      "ogImage": "https://alybouchnak.com/images/The-Wheels-on-the-Bus--Party-Ride.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/wheels-on-the-bus-party-ride#recording",
      "name": "The Wheels on the Bus (Party Ride)",
      "url": "https://alybouchnak.com/track/wheels-on-the-bus-party-ride",
      "duration": "PT2M19S",
      "genre": "Children's Pop, Transportation Songs",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Party Classics",
        "@id": "https://alybouchnak.com/album/the-blooms-house-classics-party"
      },
      "datePublished": "2026-02-03",
      "isrcCode": "GX8LD2630428",
      "description": "An energetic party version of the classic bus song with modern beats and fun sound effects.",
      "image": "https://alybouchnak.com/images/The-Wheels-on-the-Bus--Party-Ride.webp"
    }
  },
  {
    "id": 20,
    "slug": "the-funny-bunny-jump",
    "title": "The Funny Bunny Jump (Freeze Dance)",
    "subtitle": "Interactive freeze dance game for listening skills (Ages 2–6)",
    "description": "An interactive freeze dance game that builds listening skills and motor control. Children hop like bunnies and freeze when the music stops.",
    "coverImage": "/images/the-funny-bunny-jump-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-04-03",
    "duration": "1:50",
    "bpm": 120,
    "genre": "Children's Music, Pop, Movement",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "routine": "Playtime",
    "isrc": "GX89G2614392",
    "upc": "5063907299958",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "Hop hop hop, the bunny goes",
      "Hop hop hop, on his toes",
      "When the music stops - FREEZE!"
    ],
    "lyricsFull": "Hop hop hop, the bunny goes\nHop hop hop, on his toes\nFluffy tail and twitchy nose\nHop hop hop, there he goes\n\nWhen the music stops - FREEZE!\nDon't you move, stay right there\nHold your pose up in the air\nWhen the music stops - FREEZE!\n\nBounce bounce bounce, up and down\nBounce bounce bounce, all around\nFunny bunny jumping high\nFunny bunny touch the sky\n\nWhen the music stops - FREEZE!\nStill as a statue, don't you bend\nHold your pose until the end\nWhen the music plays again!",
    "educationalBenefits": [
      {
        "title": "Listening Skills",
        "description": "Develops auditory attention through stop-and-go musical cues."
      },
      {
        "title": "Motor Control",
        "description": "Practices starting and stopping movements on command."
      },
      {
        "title": "Impulse Control",
        "description": "Builds self-regulation through freeze game mechanics."
      }
    ],
    "artistNote": "Freeze dance has always been a favorite in my family. The Funny Bunny Jump combines the joy of movement with the developmental benefits of impulse control training.",
    "relatedTracks": [
      2,
      7,
      10
    ],
    "seo": {
      "title": "The Funny Bunny Jump | Freeze Dance Song | Kids Movement | Aly Bouchnak",
      "description": "Interactive freeze dance song for kids. Build listening skills and motor control while hopping like a bunny.",
      "keywords": "freeze dance, bunny song, movement song for kids, listening skills game, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/the-funny-bunny-jump",
      "ogImage": "https://alybouchnak.com/images/funny-bunny-jump-cover.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/the-funny-bunny-jump#recording",
      "name": "The Funny Bunny Jump (Freeze Dance)",
      "url": "https://alybouchnak.com/track/the-funny-bunny-jump",
      "duration": "PT1M50S",
      "genre": "Children's Music, Pop, Movement",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-04-03",
      "isrcCode": "GX89G2614392",
      "description": "An interactive freeze dance game that builds listening skills and motor control.",
      "image": "https://alybouchnak.com/images/funny-bunny-jump-cover.webp"
    }
  },
  {
    "id": 19,
    "slug": "dimming-light-soft-sleepy-music",
    "title": "The Dimming Light | Soft Sleepy Music",
    "subtitle": "Gentle sleep transition music (Ages 0–3)",
    "description": "Soft, gradually fading melodies that mimic the natural dimming of light at sunset, helping children transition from alertness to sleepiness naturally.",
    "coverImage": "/images/The-Dimming-Light.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "duration": "2:42",
    "bpm": 50,
    "genre": "Children's Lullabies, Sleep Music",
    "ageRange": "0-3 years",
    "mood": "Transitional",
    "routine": "Bedtime",
    "isrc": "GXJ2E2542577",
    "upc": "5063893028990",
    "album": "Tuned for Dreams",
    "albumUrl": "/album/tuned-for-dreams",
    "spotifyUrl": "https://open.spotify.com/track/4rweKYtoCcrpw8uh8B1t4K",
    "appleMusicUrl": "https://music.apple.com/us/song/the-dimming-light-soft-sleepy-music/1862214090",
    "youtubeUrl": "https://youtu.be/YOHYPx2yY9M",
    "amazonUrl": "https://music.amazon.com/tracks/B0G8498XST",
    "lyricsPreview": [
      "Goodnight, little eyes... the room grows dim",
      "Shapes turn soft... at the quiet rim",
      "Edges fall... into evening's hue",
      "Slowly fading... out of view"
    ],
    "lyricsFull": "Goodnight, little eyes... the room grows dim\nShapes turn soft... at the quiet rim\nEdges fall... into evening's hue\nSlowly fading... out of view\n\nGoodnight, tiny lights... they drift away\nSoft and low... at the edge of day\nColors blur... in a gentle slide\nShadows finding... where they hide\n\nGoodnight... goodnight... sinking low\nEverything softer... as we let go\nGoodnight... goodnight... all grows slight\nFalling gently... into night\n\nGoodnight... dim light... fading slow\nQuiet world... begins to go",
    "educationalBenefits": [
      {
        "title": "Circadian Rhythm",
        "description": "Supports natural sleep-wake cycle through sunset associations."
      },
      {
        "title": "Transition Support",
        "description": "Helps children transition from active play to sleep readiness."
      },
      {
        "title": "Sensory Integration",
        "description": "Connects visual and auditory experiences of sunset."
      },
      {
        "title": "Calming Cues",
        "description": "Creates environmental cues that signal sleep time."
      }
    ],
    "artistNote": "I wanted to capture that magical twilight hour when the world gets quieter and softer. The gradual fade in the music mirrors the natural dimming of daylight, signaling to the body that rest is coming.",
    "relatedTracks": [
      12,
      13,
      15
    ],
    "seo": {
      "title": "The Dimming Light | Soft Sleepy Music | Sunset Sleep | Aly Bouchnak",
      "description": "Gentle fading melodies mimicking sunset. Helps children transition naturally to sleepiness. Ages 0-3.",
      "keywords": "sunset sleep music, dimming light lullaby, sleep transition music, twilight sleep aid, evening sleep song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/dimming-light-soft-sleepy-music",
      "ogImage": "https://alybouchnak.com/images/The-Dimming-Light.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/dimming-light-soft-sleepy-music#recording",
      "name": "The Dimming Light | Soft Sleepy Music",
      "url": "https://alybouchnak.com/track/dimming-light-soft-sleepy-music",
      "duration": "PT2M42S",
      "genre": "Children's Lullabies, Sleep Music",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "Tuned for Dreams",
        "@id": "https://alybouchnak.com/album/tuned-for-dreams"
      },
      "datePublished": "2026-01-09",
      "isrcCode": "GXJ2E2542577",
      "description": "Soft, gradually fading melodies mimicking natural sunset dimming to help children transition to sleep.",
      "image": "https://alybouchnak.com/images/The-Dimming-Light.webp"
    }
  },
  {
    "id": 18,
    "slug": "liquid-room-brown-noise-womb",
    "title": "The Liquid Room | Brown Noise Womb Sound",
    "subtitle": "Womb-like brown noise sleep aid (Ages 0–1)",
    "description": "Recreates the familiar sounds of the womb with brown noise and liquid-like frequencies, providing newborns with the comforting sounds they heard before birth.",
    "coverImage": "/images/The-Liquid-Room.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "duration": "3:53",
    "bpm": 30,
    "genre": "Children's White Noise, Infant Sleep",
    "ageRange": "0-1 years",
    "mood": "Womb-like",
    "routine": "Bedtime",
    "isrc": "GXJ2E2518383",
    "upc": "5063893028990",
    "album": "Tuned for Dreams",
    "albumUrl": "/album/tuned-for-dreams",
    "spotifyUrl": "https://open.spotify.com/track/3rUZ2E4FbIOUsrofXfjeta",
    "appleMusicUrl": "https://music.apple.com/us/song/the-liquid-room-brown-noise-womb-sound/1862214093",
    "youtubeUrl": "https://youtu.be/4yIbfJahJSc",
    "amazonUrl": "https://music.amazon.com/tracks/B0G83LCQWV",
    "lyricsPreview": [
      "(instrumental)",
      "Liquid sounds, gentle storm",
      "Brown noise, soft and low",
      "Baby sleeps, starts to grow"
    ],
    "lyricsFull": "(instrumental)",
    "educationalBenefits": [
      {
        "title": "Womb Comfort",
        "description": "Recreates familiar prenatal auditory environment for newborns."
      },
      {
        "title": "Noise Masking",
        "description": "Blocks out disruptive environmental sounds for better sleep."
      },
      {
        "title": "Transition Support",
        "description": "Helps newborns adjust to life outside the womb."
      },
      {
        "title": "Calming Reflex",
        "description": "Triggers natural calming responses through familiar frequencies."
      }
    ],
    "artistNote": "I studied recordings from inside the womb and worked with sound engineers to recreate those exact frequencies. For newborns, this is not just music, it is coming home.",
    "relatedTracks": [
      12,
      14,
      17
    ],
    "seo": {
      "title": "The Liquid Room | Brown Noise Womb Sound | Newborn Sleep | Aly Bouchnak",
      "description": "Womb-like brown noise for newborns. Recreates prenatal sounds for comfort and better sleep. Perfect for ages 0-1.",
      "keywords": "womb sounds, brown noise for babies, newborn sleep aid, prenatal sound recreation, infant white noise, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/liquid-room-brown-noise-womb",
      "ogImage": "https://alybouchnak.com/images/The-Liquid-Room.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/liquid-room-brown-noise-womb#recording",
      "name": "The Liquid Room | Brown Noise Womb Sound",
      "url": "https://alybouchnak.com/track/liquid-room-brown-noise-womb",
      "duration": "PT3M53S",
      "genre": "Children's White Noise, Infant Sleep",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "Tuned for Dreams",
        "@id": "https://alybouchnak.com/album/tuned-for-dreams"
      },
      "datePublished": "2026-01-09",
      "isrcCode": "GXJ2E2518383",
      "description": "Womb-like brown noise recreating familiar prenatal sounds for newborn comfort and sleep.",
      "image": "https://alybouchnak.com/images/The-Liquid-Room.webp"
    }
  },
  {
    "id": 17,
    "slug": "protective-shadow-night-drone",
    "title": "The Protective Shadow | Night Drone for Sleep",
    "subtitle": "Protective drone sleep music (Ages 0–3)",
    "description": "A protective drone frequency that creates a feeling of being watched over and safe, using low-frequency tones that mimic the comforting presence of a caregiver.",
    "coverImage": "/images/The-Protective-Shadow.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "duration": "2:45",
    "bpm": 35,
    "genre": "Children's Drone, Sleep Music",
    "ageRange": "0-3 years",
    "mood": "Protective",
    "routine": "Bedtime",
    "isrc": "GXJ2E2505077",
    "upc": "5063893028990",
    "album": "Tuned for Dreams",
    "albumUrl": "/album/tuned-for-dreams",
    "spotifyUrl": "https://open.spotify.com/track/6wFAyvQ45lR7vIMaOm8DwQ",
    "appleMusicUrl": "https://music.apple.com/us/song/the-protective-shadow-night-drone-for-sleep/1862214092",
    "youtubeUrl": "https://youtu.be/Ik94oiUKb04",
    "amazonUrl": "https://music.amazon.com/tracks/B0G83QZC2K",
    "lyricsPreview": [
      "Safe in the dark, I'm here with you",
      "Warm as the night, Soft, gentle, true",
      "Deep in the hush, Shadows fall low",
      "Quiet and slow, Where safe feelings grow"
    ],
    "lyricsFull": "Safe in the dark\nI'm here with you\nWarm as the night\nSoft, gentle, true\nDeep in the hush\nShadows fall low\nQuiet and slow\nWhere safe feelings grow\n\nWarm is the room\nCalm is the air\nDeep is the peace\nHolding you there\nSafe in the still\nNothing to fear\nSoft as a sigh\nWhen someone is near\n\nSafe and warm\nDeep and slow\nRest in the place\nWhere soft shadows go\nWarm and deep\nSafe and low\nHeld in the dark by the hum below\n\nSafe... warm... deep... we stay\nLow hum guarding through the way",
    "educationalBenefits": [
      {
        "title": "Security Building",
        "description": "Creates feeling of safety and protection during sleep."
      },
      {
        "title": "Anxiety Reduction",
        "description": "Reduces nighttime fears through protective auditory cues."
      },
      {
        "title": "Attachment Security",
        "description": "Supports secure attachment even when caregiver is not present."
      },
      {
        "title": "Deep Relaxation",
        "description": "Promotes profound physical and mental relaxation."
      }
    ],
    "artistNote": "I wanted to create an auditory security blanket. The low drone frequency mimics the feeling of someone standing nearby, providing comfort for children who fear the dark.",
    "relatedTracks": [
      12,
      15,
      16
    ],
    "seo": {
      "title": "The Protective Shadow | Night Drone for Sleep | Aly Bouchnak",
      "description": "Protective drone frequency for sleep. Creates feeling of being watched over and safe. Low-frequency comfort tones. Ages 0-3.",
      "keywords": "sleep drone, protective sleep music, night drone for kids, low frequency sleep, anxiety reducing music, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/protective-shadow-night-drone",
      "ogImage": "https://alybouchnak.com/images/The-Protective-Shadow.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/protective-shadow-night-drone#recording",
      "name": "The Protective Shadow | Night Drone for Sleep",
      "url": "https://alybouchnak.com/track/protective-shadow-night-drone",
      "duration": "PT2M45S",
      "genre": "Children's Drone, Sleep Music",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "Tuned for Dreams",
        "@id": "https://alybouchnak.com/album/tuned-for-dreams"
      },
      "datePublished": "2026-01-09",
      "isrcCode": "GXJ2E2505077",
      "description": "Protective drone frequency creating a feeling of being watched over and safe during sleep.",
      "image": "https://alybouchnak.com/images/The-Protective-Shadow.webp"
    }
  },
  {
    "id": 16,
    "slug": "infinite-loop-continuous-sleep-aid",
    "title": "The Infinite Loop | Continuous Sleep Aid",
    "subtitle": "Seamless looping sleep music (Ages 0–3)",
    "description": "Designed to loop seamlessly throughout the night, this track provides continuous gentle background music that maintains sleep without disruptive transitions.",
    "coverImage": "/images/The-Infinite-Loop.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "duration": "3:32",
    "bpm": 40,
    "genre": "Children's Ambient, Sleep Music",
    "ageRange": "0-3 years",
    "mood": "Continuous",
    "routine": "Bedtime",
    "isrc": "GXJ2E2577222",
    "upc": "5063893028990",
    "album": "Tuned for Dreams",
    "albumUrl": "/album/tuned-for-dreams",
    "spotifyUrl": "https://open.spotify.com/track/7vE93klmC1XiDGu4fGmZi1",
    "appleMusicUrl": "https://music.apple.com/us/song/the-infinite-loop-continuous-sleep-aid/1862214095",
    "youtubeUrl": "https://youtu.be/DU5gFbJWnRc",
    "amazonUrl": "https://music.amazon.com/tracks/B0G847T4J7",
    "lyricsPreview": [
      "(Instrumental)"
    ],
    "lyricsFull": "(Instrumental)",
    "educationalBenefits": [
      {
        "title": "Sleep Maintenance",
        "description": "Helps maintain sleep throughout the night without disturbances."
      },
      {
        "title": "Consistent Environment",
        "description": "Provides stable auditory environment for better sleep quality."
      },
      {
        "title": "Nighttime Security",
        "description": "Offers continuous comfort for children who wake during night."
      },
      {
        "title": "Sleep Architecture",
        "description": "Supports healthy sleep cycle progression."
      }
    ],
    "artistNote": "The challenge was creating music that could loop infinitely without becoming repetitive or annoying. I used generative ambient techniques so it feels fresh even after hours of play.",
    "relatedTracks": [
      12,
      15,
      17
    ],
    "seo": {
      "title": "The Infinite Loop | Continuous Sleep Aid | Ambient | Aly Bouchnak",
      "description": "Seamless looping sleep music for all-night use. Maintains peaceful sleep without disruptive transitions. Ages 0-3.",
      "keywords": "continuous sleep music, looping lullaby, ambient sleep, all night sleep aid, seamless sleep music, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/infinite-loop-continuous-sleep-aid",
      "ogImage": "https://alybouchnak.com/images/The-Infinite-Loop.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/infinite-loop-continuous-sleep-aid#recording",
      "name": "The Infinite Loop | Continuous Sleep Aid",
      "url": "https://alybouchnak.com/track/infinite-loop-continuous-sleep-aid",
      "duration": "PT3M32S",
      "genre": "Children's Ambient, Sleep Music",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "Tuned for Dreams",
        "@id": "https://alybouchnak.com/album/tuned-for-dreams"
      },
      "datePublished": "2026-01-09",
      "isrcCode": "GXJ2E2577222",
      "description": "Seamless looping sleep music providing continuous gentle background for all-night sleep.",
      "image": "https://alybouchnak.com/images/The-Infinite-Loop.webp"
    }
  },
  {
    "id": 15,
    "slug": "ancient-tongue-deep-sleep-humming",
    "title": "The Ancient Tongue | Deep Sleep Humming",
    "subtitle": "Meditative humming lullaby (Ages 0–3)",
    "description": "A meditative track featuring gentle humming frequencies that resonate with the natural calming frequencies of the human voice, promoting deep and restorative sleep.",
    "coverImage": "/images/The-Ancient-Tongue.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "duration": "3:52",
    "bpm": 45,
    "genre": "Children's Meditation, Sleep Music",
    "ageRange": "0-3 years",
    "mood": "Meditative",
    "routine": "Bedtime",
    "isrc": "GXJ2E2555627",
    "upc": "5063893028990",
    "album": "Tuned for Dreams",
    "albumUrl": "/album/tuned-for-dreams",
    "spotifyUrl": "https://open.spotify.com/track/0q1UQBw4TIX1EwVhfr7fag",
    "appleMusicUrl": "https://music.apple.com/us/song/the-ancient-tongue-deep-sleep-humming/1862214091",
    "youtubeUrl": "https://youtu.be/G0Rc96D3Ydw",
    "amazonUrl": "https://music.amazon.com/tracks/B0G83WB4JD",
    "lyricsPreview": [
      "(Instrumental)"
    ],
    "lyricsFull": "(Instrumental)",
    "educationalBenefits": [
      {
        "title": "Resonance Therapy",
        "description": "Uses vocal frequencies to promote physical and emotional calm."
      },
      {
        "title": "Breathing Regulation",
        "description": "Encourages deep, rhythmic breathing patterns."
      },
      {
        "title": "Nervous System Regulation",
        "description": "Supports parasympathetic nervous system activation."
      },
      {
        "title": "Deep Sleep Support",
        "description": "Facilitates transition to deeper sleep stages."
      }
    ],
    "artistNote": "I studied the science of vocal resonance and how humming affects the vagus nerve. The ancient human practice of humming to soothe babies transcends culture and time.",
    "relatedTracks": [
      12,
      14,
      16
    ],
    "seo": {
      "title": "The Ancient Tongue | Deep Sleep Humming | Meditation | Aly Bouchnak",
      "description": "Meditative humming frequencies for deep sleep. Vocal resonance promotes calm and restorative rest. Ages 0-3.",
      "keywords": "sleep humming, meditation for babies, deep sleep music, vocal resonance sleep, calming frequencies, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/ancient-tongue-deep-sleep-humming",
      "ogImage": "https://alybouchnak.com/images/The-Ancient-Tongue.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/ancient-tongue-deep-sleep-humming#recording",
      "name": "The Ancient Tongue | Deep Sleep Humming",
      "url": "https://alybouchnak.com/track/ancient-tongue-deep-sleep-humming",
      "duration": "PT3M52S",
      "genre": "Children's Meditation, Sleep Music",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "Tuned for Dreams",
        "@id": "https://alybouchnak.com/album/tuned-for-dreams"
      },
      "datePublished": "2026-01-09",
      "isrcCode": "GXJ2E2555627",
      "description": "Meditative humming frequencies resonating with natural calming frequencies to promote deep sleep.",
      "image": "https://alybouchnak.com/images/The-Ancient-Tongue.webp"
    }
  },
  {
    "id": 14,
    "slug": "sacred-shush-baby-shusher",
    "title": "The Sacred Shush | Baby Shusher Sound",
    "subtitle": "Traditional shushing sleep aid (Ages 0–1)",
    "description": "Based on the traditional \"shushing\" technique used by parents worldwide, this track combines gentle shushing sounds with soft melodies to calm fussy babies.",
    "coverImage": "/images/The-Sacred-Shush.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "duration": "2:45",
    "bpm": 50,
    "genre": "Children's Sleep, White Noise",
    "ageRange": "0-1 years",
    "mood": "Tranquil",
    "routine": "Bedtime",
    "isrc": "GXJ2E2509998",
    "upc": "5063893028990",
    "album": "Tuned for Dreams",
    "albumUrl": "/album/tuned-for-dreams",
    "spotifyUrl": "https://open.spotify.com/track/58YiaJMZPZKxTAX9t6OkGK",
    "appleMusicUrl": "https://music.apple.com/us/song/the-sacred-shush-baby-shusher-sound/1862214089",
    "youtubeUrl": "https://youtu.be/TeG37XixnbA",
    "amazonUrl": "https://music.amazon.com/tracks/B0G844SQNW",
    "lyricsPreview": [
      "Shh, The sea is soft tonight",
      "Shh, Flow drifting in the light",
      "Soft winds circle, low and slow",
      "Shaa-sway where the quiet blows"
    ],
    "lyricsFull": "Shhh\nThe sea is soft tonight\nSssh\nFlow drifting in the light\nSoft winds circle, low and slow\nShaa-sway where the quiet blows\n\nShhh\nThe air moves round your face\nSiiih-sigh in a gentle pace\nSlow breeze rising, slow breeze fall\nShhh-around you, covering all\n\nShhh\nYou're safe in this sound\nSoft waves rolling all around\nShhh\nThe hush that holds you tight\nSteady seas through the silent night\n\nShhh\nSlow air... drifting near\nShhh\nSoft wind... always here",
    "educationalBenefits": [
      {
        "title": "Calming Reflex",
        "description": "Activates the calming reflex in infants through rhythmic shushing."
      },
      {
        "title": "Sleep Induction",
        "description": "Helps induce sleep states in fussy or overtired babies."
      },
      {
        "title": "Womb Association",
        "description": "Mimics sounds heard in utero for comfort and familiarity."
      },
      {
        "title": "Parent Support",
        "description": "Provides consistent shushing when parents need a break."
      }
    ],
    "artistNote": "I interviewed parents from different cultures and found that shushing is universal. This track combines that ancient wisdom with gentle musical elements for modern parents who need a break from constant shushing.",
    "relatedTracks": [
      12,
      13,
      15
    ],
    "seo": {
      "title": "The Sacred Shush | Baby Shusher Sound | Sleep Aid | Aly Bouchnak",
      "description": "Traditional shushing technique combined with soft melodies. Calms fussy babies and promotes sleep. Perfect for ages 0-1.",
      "keywords": "baby shusher, shushing sound, baby sleep aid, white noise for babies, infant calming, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/sacred-shush-baby-shusher",
      "ogImage": "https://alybouchnak.com/images/The-Sacred-Shush.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/sacred-shush-baby-shusher#recording",
      "name": "The Sacred Shush | Baby Shusher Sound",
      "url": "https://alybouchnak.com/track/sacred-shush-baby-shusher",
      "duration": "PT2M45S",
      "genre": "Children's Sleep, White Noise",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "Tuned for Dreams",
        "@id": "https://alybouchnak.com/album/tuned-for-dreams"
      },
      "datePublished": "2026-01-09",
      "isrcCode": "GXJ2E2509998",
      "description": "Traditional shushing technique combined with soft melodies to calm fussy babies.",
      "image": "https://alybouchnak.com/images/The-Sacred-Shush.webp"
    }
  },
  {
    "id": 13,
    "slug": "pendulum-rocking-lullaby",
    "title": "The Pendulum | Rocking Lullaby for Baby",
    "subtitle": "Soothing rocking motion song (Ages 0–2)",
    "description": "A gentle lullaby with rhythmic pendulum-like melodies that mimic the natural rocking motion, perfect for calming babies and promoting deep sleep.",
    "coverImage": "/images/The-Pendulum.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "duration": "2:50",
    "bpm": 55,
    "genre": "Children's Lullabies, Infant Sleep",
    "ageRange": "0-2 years",
    "mood": "Soothing",
    "routine": "Bedtime",
    "isrc": "GXJ2E2572277",
    "upc": "5063893028990",
    "album": "Tuned for Dreams",
    "albumUrl": "/album/tuned-for-dreams",
    "spotifyUrl": "https://open.spotify.com/track/44dRcJxlSugjiuDlS26t5R",
    "appleMusicUrl": "https://music.apple.com/us/song/the-pendulum-rocking-lullaby-for-baby/1862214088",
    "youtubeUrl": "https://youtu.be/2qDoKkWon4Q",
    "amazonUrl": "https://music.amazon.com/tracks/B0G84FNPMC",
    "lyricsPreview": [
      "Back and forth... we sway so slow",
      "Moving soft... from high to low",
      "Side to side... the quiet air",
      "Cradle swing... you're resting there"
    ],
    "lyricsFull": "Back and forth... we sway so slow\nMoving soft... from high to low\nSide to side... the quiet air\nCradle swing... you're resting there\n\nLeft to right... the night is warm\nSteady waves... a gentle form\nSlow we drift... with every roll\nSoft and low... your settling soul\n\nBack and forth... high to low\nHere we swing... in an easy flow\nRow by row... the moments glide\nYou and me... side to side\n\n(Slow and low)\nSlow and low... we drift again\n(We drift again)\n(Back and forth)\nBack and forth... like a tender wind\nSide to side... in a peaceful bend",
    "educationalBenefits": [
      {
        "title": "Sensory Development",
        "description": "Supports vestibular system development through rhythmic patterns."
      },
      {
        "title": "Sleep Association",
        "description": "Creates positive sleep associations with calming music."
      },
      {
        "title": "Rhythm Recognition",
        "description": "Develops internal sense of rhythm and timing."
      },
      {
        "title": "Calm Transition",
        "description": "Helps babies transition from alert to sleep states."
      }
    ],
    "artistNote": "I researched how rocking motion affects infant brain development and created this song to mimic that natural soothing rhythm. The pendulum metaphor represents both the physical rocking and the gentle passage into sleep.",
    "relatedTracks": [
      12,
      14,
      15
    ],
    "seo": {
      "title": "The Pendulum | Rocking Lullaby for Baby | Sleep Music | Aly Bouchnak",
      "description": "Gentle rocking lullaby mimicking natural motion. Rhythmic melodies calm babies and promote deep sleep. Perfect for ages 0-2.",
      "keywords": "rocking lullaby, baby sleep song, infant sleep music, pendulum sleep aid, gentle rocking song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/pendulum-rocking-lullaby",
      "ogImage": "https://alybouchnak.com/images/The-Pendulum.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/pendulum-rocking-lullaby#recording",
      "name": "The Pendulum | Rocking Lullaby for Baby",
      "url": "https://alybouchnak.com/track/pendulum-rocking-lullaby",
      "duration": "PT2M50S",
      "genre": "Children's Lullabies, Infant Sleep",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "Tuned for Dreams",
        "@id": "https://alybouchnak.com/album/tuned-for-dreams"
      },
      "datePublished": "2026-01-09",
      "isrcCode": "GXJ2E2572277",
      "description": "A gentle lullaby with pendulum-like melodies mimicking natural rocking motion for calming babies.",
      "image": "https://alybouchnak.com/images/The-Pendulum.webp"
    }
  },
  {
    "id": 12,
    "slug": "safe-container-calm-bedtime",
    "title": "The Safe Container | Calm Bedtime Routine",
    "subtitle": "Gentle sleep preparation song (Ages 0–3)",
    "description": "A soothing lullaby that creates a feeling of safety and security, helping children transition from active play to peaceful sleep through gentle melodies and calming rhythms.",
    "coverImage": "/images/The-Safe-Container.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-09",
    "duration": "2:44",
    "bpm": 60,
    "genre": "Children's Lullabies, Sleep Music",
    "ageRange": "0-3 years",
    "mood": "Calming",
    "routine": "Bedtime",
    "isrc": "GXJ2E2568126",
    "upc": "5063893028990",
    "album": "Tuned for Dreams",
    "albumUrl": "/album/tuned-for-dreams",
    "spotifyUrl": "https://open.spotify.com/track/28ycLvXb40POUWBgxbOO4k",
    "appleMusicUrl": "https://music.apple.com/us/song/the-safe-container-calm-bedtime-routine/1862214087",
    "youtubeUrl": "https://youtu.be/mO_bhECagMU",
    "amazonUrl": "https://music.amazon.com/tracks/B0G83BPSWJ",
    "lyricsPreview": [
      "Mm-mm, you are here, my love, I'm near",
      "Low and warm, I stay right here",
      "La-la, mellow light so slow",
      "Gentle room in a sleepy glow"
    ],
    "lyricsFull": "Mm-mm, you are here, my love, I'm near\nLow and warm, I stay right here\nLa-la, mellow light so slow\nGentle room in a sleepy glow\n\nMm-mm, little one, you feel, you see\nSoft and safe with the room and me\nLa-la, hush of the window air\nTiny hands in the evening air\n\nI am here, you are here\nClose and calm, my melody near\nLo-lo, sway with the quiet night\nSafe inside this tender light\n\nMm-mm, la-la, slow we stay\nDrifting down in a gentle way\nI am here, you are here\nMm-mm you are here",
    "educationalBenefits": [
      {
        "title": "Sleep Routine",
        "description": "Establishes consistent bedtime rituals and sleep associations."
      },
      {
        "title": "Emotional Security",
        "description": "Builds feelings of safety and comfort for peaceful sleep."
      },
      {
        "title": "Relaxation Skills",
        "description": "Teaches calming techniques for self-soothing."
      },
      {
        "title": "Parent-Child Bonding",
        "description": "Strengthens attachment through shared bedtime routines."
      }
    ],
    "artistNote": "I studied the concept of psychological safety and how important it is for children to feel contained and secure. This song was designed to create that feeling of being held, even when parents step out of the room.",
    "relatedTracks": [
      13,
      14,
      15
    ],
    "seo": {
      "title": "The Safe Container | Calm Bedtime Routine | Sleep Music | Aly Bouchnak",
      "description": "Soothing lullaby for bedtime routine. Creates feelings of safety and security for peaceful sleep. Perfect for ages 0-3.",
      "keywords": "bedtime song, sleep music for kids, lullaby, calm bedtime routine, baby sleep aid, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/safe-container-calm-bedtime",
      "ogImage": "https://alybouchnak.com/images/The-Safe-Container.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/safe-container-calm-bedtime#recording",
      "name": "The Safe Container | Calm Bedtime Routine",
      "url": "https://alybouchnak.com/track/safe-container-calm-bedtime",
      "duration": "PT2M44S",
      "genre": "Children's Lullabies, Sleep Music",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "Tuned for Dreams",
        "@id": "https://alybouchnak.com/album/tuned-for-dreams"
      },
      "datePublished": "2026-01-09",
      "isrcCode": "GXJ2E2568126",
      "description": "A soothing lullaby creating feelings of safety and security for peaceful sleep.",
      "image": "https://alybouchnak.com/images/The-Safe-Container.webp"
    }
  },
  {
    "id": 11,
    "slug": "zakzooka-the-bear",
    "title": "Zakzooka The Bear",
    "subtitle": "Friendly bear adventure song (Ages 2–6)",
    "description": "An adventurous song about Zakzooka the bear and his forest friends, teaching about bears, friendship, and woodland animals through storytelling.",
    "coverImage": "/images/Zakzooka-The-Bear--Aly-Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-14",
    "duration": "2:21",
    "bpm": 118,
    "genre": "Children's Pop, Story Songs",
    "ageRange": "2-6 years",
    "mood": "Adventurous",
    "routine": "Playtime",
    "isrc": "GX8LD2691082",
    "upc": "5063941025018",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "Zakzooka is a dizzy, whizzy, fuzzy bear",
      "He has a wiggly tummy and messy, messy hair!",
      "He eats the yummy food, he is always in a mood",
      "For fishy, mushy, sushi... it is so good!"
    ],
    "lyricsFull": "(Roar!)\nWho is that bear?\n(It's Zakzooka!)\nLet's go!\n\nZakzooka is a dizzy, whizzy, fuzzy bear\nHe has a wiggly tummy and messy, messy hair!\n\nHe eats the yummy food, he is always in a mood\nFor fishy, mushy, sushi... it is so good!\n(Yum, yum, yum!)\n\nZak, Zak, Zak, Zak\nZak, Zak, Zoo-ooo!\n(We love you!)\nZak, Zak, Zak, Zak\nZak, Zak, Zoo-Kaa!\n(He's the bear!)\nZak, Zak, Zak, Zak\nZak, Zak, Zoo-ooo!\nZak-Zoo-Ka!\n\nHe has no fear, he flies up in the air\n(Fly, fly, fly!)\nHe swims inside the water, splashing everywhere\n(Splash, splash, splash!)\nNow stomp your feet like a big fuzzy bear\n(Stomp! Stomp!)\nAnd roar like Zakzooka if you dare!\n(ROAR!)\n\nAre you ready to roar?\n(Yeah!)\nAre you ready for more?\n(Let's go!)\n\nZak, Zak, Zak, Zak\nZak, Zak, Zoo-ooo!\n(We love you!)\nZak, Zak, Zak, Zak\nZak, Zak, Zoo-Kaa!\n(He's the bear!)\nZak, Zak, Zak, Zak\nZak, Zak, Zoo-ooo!\nZak-Zoo-Ka!\n\nFishy, mushy, sushi!\n(Sushi!)\nFishy, mushy, sushi!\n(Sushi!)\nDizzy, whizzy, fuzzy!\n(Fuzzy!)\nWho is the bear?\n(Zakzooka!)\n\nZak, Zak, Zoo-ooo...\nZak, Zak, Zoo-Kaa...\n(Bye bye bear!)",
    "educationalBenefits": [
      {
        "title": "Storytelling Skills",
        "description": "Develops narrative understanding through song storytelling."
      },
      {
        "title": "Friendship Values",
        "description": "Teaches about friendship and helping others."
      },
      {
        "title": "Forest Animals",
        "description": "Introduces children to woodland creatures and their habitats."
      },
      {
        "title": "Character Development",
        "description": "Builds understanding of personality traits through Zakzooka."
      }
    ],
    "artistNote": "Creating Zakzooka as a character was so much fun. I wanted a bear who was gentle, adventurous, and always ready to help friends. Kids need heroes they can relate to!",
    "relatedTracks": [
      1,
      2,
      10
    ],
    "seo": {
      "title": "Zakzooka The Bear | Kids Forest Adventure Song | Aly Bouchnak",
      "description": "Adventurous bear song teaching friendship and forest animals. Follow Zakzooka through woodland adventures. Ages 2-6.",
      "keywords": "bear song for kids, forest adventure song, Zakzooka, woodland animals song, kids story song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/zakzooka-the-bear",
      "ogImage": "https://alybouchnak.com/images/Zakzooka-The-Bear--Aly-Bouchnak.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/zakzooka-the-bear#recording",
      "name": "Zakzooka The Bear",
      "url": "https://alybouchnak.com/track/zakzooka-the-bear",
      "duration": "PT2M21S",
      "genre": "Children's Pop, Story Songs",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-02-14",
      "isrcCode": "GX8LD2691082",
      "description": "An adventurous song about Zakzooka the bear teaching about friendship and woodland animals through storytelling.",
      "image": "https://alybouchnak.com/images/Zakzooka-The-Bear--Aly-Bouchnak.webp"
    }
  },
  {
    "id": 10,
    "slug": "duckie-song",
    "title": "The Duckie Song",
    "subtitle": "Water animal adventure song (Ages 2–6)",
    "description": "A sweet and playful song about a little duck's adventures, perfect for teaching about ducks and water animals while encouraging imagination.",
    "coverImage": "/images/The-Duckie-Song-Aly-Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-12",
    "duration": "2:32",
    "bpm": 120,
    "genre": "Children's Pop, Animal Songs",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "routine": "Playtime",
    "isrc": "GX8LD2660078",
    "upc": "5063941614571",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "The duckie is walking, ( See! Like dis! )",
      "She’s walking slowly, ( See! Like dis! )",
      "She keeps on quacking, ( Hear! Like dis! )",
      "Oh, how sweet she is, ( See! Like dis! )"
    ],
    "lyricsFull": "The duckie is walking, \n( See! Like dis! )\nShe’s walking slowly, \n( See! Like dis! )\nShe keeps on quacking, \n( Hear! Like dis! )\nOh, how sweet she is, \n( See! Like dis! )\n\nAnd She sing\n( Singing! Like dis! )\n\nQuack quack quacky quack quack \nQuack quack quacky quack quack \n\nShe has a baby, \n( Tiny! Like dis! )\nHis feet are so tiny, \n( Tiny! Like dis! )\nHe runs behind her, \n( See! Like dis! )\nOh, how sweet he is, \n( See! Like dis! )\n\nAnd they sing\nSinging! Like dis!\n\nQuack quack quacky quack quack \nQuack quack quacky quack quack \n\nHere comes Daddy Duck, \n( Walks like dis! )\nHe spots the foxy, \n( Hiding! Like dis! )\nHe puffs his chest out, \n( Big! Like dis! )\nThe foxy runs away, \n( Fast! Like dis! )\n\nHere come Gram and Gramps,\n( See! Like dis! )\nThey walk with a stick, \n( See! Like dis! )\nThey’re waddling slowly, \n( Slowly! Like dis! )\nAnd quack along too, \n( Quacking! Like dis! )\n\nAnd they all sing\n( Singing! Like dis! )\n\nQuack quack quacky quack quack \nQuack quack quacky quack quack \n\nThe duckie is walking,\n( See! Like dis! )\nShe’s walking slowly, \n( See! Like dis! )\nShe keeps on quacking,\n( Hear! Like dis!)\nOh, how sweet she is,\n( See! Like dis!)",
    "educationalBenefits": [
      {
        "title": "Animal Knowledge",
        "description": "Teaches children about ducks and their characteristics."
      },
      {
        "title": "Imaginative Play",
        "description": "Encourages creative storytelling and pretend play."
      },
      {
        "title": "Sound Recognition",
        "description": "Develops understanding of duck sounds and water themes."
      },
      {
        "title": "Nature Awareness",
        "description": "Introduces concepts of ponds, rain, and water environments."
      }
    ],
    "artistNote": "Watching ducks at a local pond with my nephew inspired this song. The way children connect with animals is magical, and I wanted to capture that wonder.",
    "relatedTracks": [
      1,
      2,
      4
    ],
    "seo": {
      "title": "The Duckie Song | Kids Water Animal Song | Aly Bouchnak",
      "description": "Sweet duck adventure song for kids. Learn about ducks and water animals through playful storytelling. Ages 2-6.",
      "keywords": "duck song for kids, duckie song, water animal song, pond song, kids animal adventure, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/duckie-song",
      "ogImage": "https://alybouchnak.com/images/The-Duckie-Song-Aly-Bouchnak.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/duckie-song#recording",
      "name": "The Duckie Song",
      "url": "https://alybouchnak.com/track/duckie-song",
      "duration": "PT2M32S",
      "genre": "Children's Pop, Animal Songs",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-02-12",
      "isrcCode": "GX8LD2660078",
      "description": "A sweet song about a little duck's adventures teaching about water animals and encouraging imagination.",
      "image": "https://alybouchnak.com/images/The-Duckie-Song-Aly-Bouchnak.webp"
    }
  },
  {
    "id": 9,
    "slug": "alphabet-song",
    "title": "The Alphabet Song",
    "subtitle": "Letter learning song (Ages 2–6)",
    "description": "A modern, upbeat version of the classic alphabet song that makes learning ABCs fun and engaging with contemporary beats and catchy melody.",
    "coverImage": "/images/The-Alphabet-Song--Aly-Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-10",
    "duration": "2:55",
    "bpm": 125,
    "genre": "Children's Pop, Educational Songs",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "routine": "Learning",
    "isrc": "GX8LD2663207",
    "upc": "5063941576312",
    "album": "The Bloom's House: Party Classics",
    "albumUrl": "/album/the-blooms-house-classics-party",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "A is for apple, juicy and sweet",
      "B is for ball, bounce bounce your feet",
      "C is for cuddle, snuggle up tight",
      "D is for dream, sleep all night"
    ],
    "lyricsFull": "A, B, C, D\nCome and sing with me\n\nA is for apple, juicy and sweet\nB is for ball, bounce bounce your feet\nC is for cuddle, snuggle up tight\nD is for dream, sleep all night\nE is for earth, green and blue\nF is for family, me and you\nG is for garden, watch it grow\nH is for happy, say hello (Hello!)\n\nA B C D E F G\nH I J K L M N O P\nQ R S T U V\nW X Y and Z\nSinging with my family\n\nI is for ice cream, cold and yummy\nJ is for jump, wiggle your tummy\nK is for kiss on your cheek\nL is for love every week\nM is for music, dance around\nN is for night, quiet sound\nO is for ocean, splash and play\nP is for party, hip hooray (Yay!)\n\nA B C D E F G\nH I J K L M N O P\nQ R S T U V\nW X Y and Z\nSinging with my family\n\nQ is for quiet, go to sleep (Beep-beep-beep)\nR is for robot, beep-beep-beep\nS is for sunshine, shining bright\nT is for twinkle, starry light\nU is for up, touch the sky\nV is for island, playing hide\nW is for world, big and round\nX is for xylophone, happy sound\nY is for you, my best friend\nZ is for zoom, that's the end\n\nThat's the end\nA B C",
    "educationalBenefits": [
      {
        "title": "Letter Recognition",
        "description": "Teaches all 26 letters of the alphabet in order."
      },
      {
        "title": "Phonemic Awareness",
        "description": "Introduces letter-sound associations through examples."
      },
      {
        "title": "Memory Skills",
        "description": "Builds memorization through melodic repetition."
      },
      {
        "title": "Pre-Reading Skills",
        "description": "Establishes foundation for future reading and writing."
      }
    ],
    "artistNote": "I wanted to create an alphabet song that parents actually enjoy hearing on repeat. The modern beat keeps it fresh while maintaining the educational foundation.",
    "relatedTracks": [
      3,
      4,
      8
    ],
    "seo": {
      "title": "The Alphabet Song | ABC Learning Song | Aly Bouchnak",
      "description": "Modern upbeat alphabet song for kids. Learn ABCs with fun beats and letter examples. Perfect for early literacy ages 2-6.",
      "keywords": "alphabet song, ABC song for kids, learn letters song, kids educational music, toddler alphabet, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/alphabet-song",
      "ogImage": "https://alybouchnak.com/images/The-Alphabet-Song--Aly-Bouchnak.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/alphabet-song#recording",
      "name": "The Alphabet Song",
      "url": "https://alybouchnak.com/track/alphabet-song",
      "duration": "PT2M55S",
      "genre": "Children's Pop, Educational Songs",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-02-10",
      "isrcCode": "GX8LD2663207",
      "description": "A modern, upbeat alphabet song teaching ABCs with contemporary beats and letter examples.",
      "image": "https://alybouchnak.com/images/The-Alphabet-Song--Aly-Bouchnak.webp"
    }
  },
  {
    "id": 8,
    "slug": "nanny-papa",
    "title": "Nanny & Papa (Funny Bunny Family)",
    "subtitle": "Heartwarming family celebration song (Ages 2–6)",
    "description": "A heartwarming celebration of grandparent relationships. This song honors the special bond between children and their Nanny and Papa through joyful lyrics and warm melodies.",
    "coverImage": "/images/nanny-and-papa-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-27",
    "duration": "2:34",
    "bpm": 90,
    "genre": "Children's Music",
    "ageRange": "2-6 years",
    "mood": "Gentle",
    "routine": "Celebration",
    "isrc": "GXBDS2573588",
    "upc": "5063907265434",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/7hvodloW3JqfVKI4yJLQT6",
    "appleMusicUrl": "https://music.apple.com/us/song/nanny-papa-funny-bunny-family/1870774446",
    "youtubeUrl": "https://youtu.be/PKQHTPmkmVY",
    "amazonUrl": "https://music.amazon.com/tracks/B0GJTMS9YS",
    "lyricsPreview": [
      "Nanny and Papa, love so true",
      "Special grandparents, me and you",
      "Hugs and kisses, cookies and fun"
    ],
    "lyricsFull": "Nanny and Papa, love so true\nSpecial grandparents, me and you\nHugs and kisses, cookies and fun\nPlaying games in the sun\n\nNanny reads stories, Papa tells jokes\nNanny gives cuddles, Papa gives pokes\nBoth of them love me, this I know\nTheir love helps me grow\n\nFunny Bunny Family, big and small\nWe love each other, one and all\nNanny and Papa, part of our crew\nFamily love forever true\n\nWhen I visit, what a treat\nNanny's cooking, Papa's seat\nStories shared and memories made\nGrandparent love will never fade",
    "educationalBenefits": [
      {
        "title": "Family Bonds",
        "description": "Strengthens emotional connections with extended family members."
      },
      {
        "title": "Intergenerational Love",
        "description": "Celebrates the unique grandparent-grandchild relationship."
      },
      {
        "title": "Emotional Expression",
        "description": "Encourages expressing love and gratitude for family."
      }
    ],
    "artistNote": "Grandparents hold such a special place in children's hearts. This song is my tribute to the Nannys and Papas who shower their grandchildren with unconditional love.",
    "relatedTracks": [
      2,
      6,
      20
    ],
    "seo": {
      "title": "Nanny & Papa | Grandparent Song | Family Love | Aly Bouchnak",
      "description": "Heartwarming song celebrating grandparent relationships. Perfect for honoring Nanny and Papa bonds with children.",
      "keywords": "grandparent song, nanny papa song, family love song, grandparents day song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/nanny-papa",
      "ogImage": "https://alybouchnak.com/images/nanny-and-papa-cover.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/nanny-papa#recording",
      "name": "Nanny & Papa (Funny Bunny Family)",
      "url": "https://alybouchnak.com/track/nanny-papa",
      "duration": "PT2M34S",
      "genre": "Children's Music",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-02-27",
      "isrcCode": "GXBDS2573588",
      "description": "A heartwarming celebration of grandparent relationships.",
      "image": "https://alybouchnak.com/images/nanny-and-papa-cover.webp"
    }
  },
  {
    "id": 7,
    "slug": "happy-party-edition",
    "title": "If You're Happy and You Know It (Party Edition)",
    "subtitle": "Emotions and actions celebration song (Ages 2–6)",
    "description": "A high-energy party version of the classic \"If You're Happy and You Know It\" that encourages children to express emotions through movement and celebrate together.",
    "coverImage": "/images/If-you-happy-and-you-know-it.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-05",
    "duration": "2:33",
    "bpm": 135,
    "genre": "Children's Pop, Action Songs",
    "ageRange": "2-6 years",
    "mood": "Celebratory",
    "routine": "Celebration",
    "isrc": "GX8LD2681741",
    "upc": "5063925895088",
    "album": "The Bloom's House: Party Classics",
    "albumUrl": "/album/the-blooms-house-classics-party",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "If you're happy and you know it, clap your hands",
      "If you're Happy and you know it, and you really want to show it...",
      "If you're Excited and you know it, Stomp your Feet!",
      "If you're Excited and you know it, and you really want to show it..."
    ],
    "lyricsFull": "I see a lot of smiles today!\nBut I need to check your energy levels...\nAre you ready to blast off?\n1, 2, 1-2-3-GO!\n\nI woke up feeling sunny inside\nA happy feeling that I cannot hide\nI got my dancing shoes on my feet\nI’m moving to the rhythm of the beat!\n\nIf you're Happy and you know it, Clap your Hands!\n(Clap! Clap!)\nIf you're Happy and you know it, Clap your Hands!\n(Clap! Clap!)\nIf you're Happy and you know it, and you really want to show it...\nIf you're Happy and you know it, Clap your Hands!\n(Clap! Clap!)\n\nNow we are warming up the machine\nThe happiest machine you've ever seen!\nWe need some power, we need some noise\nCalling all the girls and the boys!\n\nIf you're Excited and you know it, Stomp your Feet!\n(Stomp! Stomp!)\nIf you're Excited and you know it, Stomp your Feet!\n(Stomp! Stomp!)\nIf you're Excited and you know it, and you really want to show it...\nIf you're Excited and you know it, Stomp your Feet!\n(Stomp! Stomp!)\n\nWait a minute...\nI think we are getting TOO excited\nMy heart is going Boom Boom Boom\nLet's take a \"Magic Breath.\"\n\n(Ahhh...)\nOkay... now let's get SILLY!\n\nIf you're Silly and you know it, Shake it All About!\n(Wiggle-Wiggle-Wiggle!) [Funny Sound Effect]\nIf you're Silly and you know it, Shake it All About!\n(Wiggle-Wiggle-Wiggle!)\nIf you're Silly and you know it, and you really want to show it...\nIf you're Silly and you know it, Shake it All About!\n(Wiggle-Wiggle-Wiggle!)\n\nIf you're Happy and you know it, shout HOORAY!\n(HOORAY!)\nIf you're Happy and you know it, shout HOORAY!\n(HOORAY!)\nWe are happy!\n(Yeah!)\nSee you next time!\n(Bye bye!)",
    "educationalBenefits": [
      {
        "title": "Emotional Expression",
        "description": "Teaches children to recognize and express happiness and other emotions."
      },
      {
        "title": "Following Directions",
        "description": "Builds listening skills through action-based instructions."
      },
      {
        "title": "Motor Skills",
        "description": "Develops coordination through clapping, stomping, and movement."
      },
      {
        "title": "Social Engagement",
        "description": "Encourages group participation and shared celebration."
      }
    ],
    "artistNote": "This song is all about joy and celebration. I wanted to create a version that builds excitement while teaching kids that expressing emotions through movement is healthy and fun.",
    "relatedTracks": [
      3,
      4,
      6
    ],
    "seo": {
      "title": "If You're Happy and You Know It (Party Edition) | Kids Action Song | Aly Bouchnak",
      "description": "High-energy party version of the classic emotions song. Kids learn to express feelings through movement and celebration. Ages 2-6.",
      "keywords": "if youre happy and you know it, emotions song for kids, action song, clap your hands song, toddler celebration song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/happy-party-edition",
      "ogImage": "https://alybouchnak.com/images/If-you-happy-and-you-know-it.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/happy-party-edition#recording",
      "name": "If You're Happy and You Know It (Party Edition)",
      "url": "https://alybouchnak.com/track/happy-party-edition",
      "duration": "PT2M33S",
      "genre": "Children's Pop, Action Songs",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Party Classics",
        "@id": "https://alybouchnak.com/album/the-blooms-house-classics-party"
      },
      "datePublished": "2026-02-05",
      "isrcCode": "GX8LD2681741",
      "description": "A high-energy party version encouraging children to express emotions through movement and celebration.",
      "image": "https://alybouchnak.com/images/If-you-happy-and-you-know-it.webp"
    }
  },
  {
    "id": 6,
    "slug": "the-yummy-spoon",
    "title": "The Yummy Spoon (Open Wide)",
    "subtitle": "Mealtime encouragement song for picky eaters (Ages 2–6)",
    "description": "A playful mealtime song that encourages trying new foods and makes eating fun. Perfect for reducing picky eating and creating positive mealtime associations.",
    "coverImage": "/images/the-yummy-spoon-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-03-11",
    "duration": "1:41",
    "bpm": 120,
    "genre": "Children's Music, Mealtime Songs",
    "ageRange": "2-6 years",
    "mood": "Gentle",
    "routine": "Mealtime",
    "isrc": "GX89G2661676",
    "upc": "5063906910496",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "Open wide for the yummy spoon",
      "Zoom zoom zoom, coming soon",
      "Here comes the airplane, open the gate"
    ],
    "lyricsFull": "Open wide for the yummy spoon\nZoom zoom zoom, coming soon\nHere comes the airplane, open the gate\nYummy food is never late\n\nHere is a carrot, orange and bright\nCrunchy and sweet, a healthy bite\nOpen wide, here it comes\nYummy yum for little ones\n\nHere is a pea, round and green\nA little vegetable, rarely seen\nPop it in and give a chew\nGood food is good for you\n\nThe yummy spoon makes mealtime fun\nEven broccoli can be yum\nOpen wide and take a bite\nEating healthy is alright!",
    "educationalBenefits": [
      {
        "title": "Positive Mealtime",
        "description": "Creates joyful associations with eating and trying new foods."
      },
      {
        "title": "Nutrition Awareness",
        "description": "Introduces healthy food choices in a fun context."
      },
      {
        "title": "Cooperation",
        "description": "Encourages participation in family meal routines."
      }
    ],
    "artistNote": "As a parent, I know the struggle of mealtime battles. This song transforms eating from a chore into a playful adventure with the Yummy Spoon.",
    "relatedTracks": [
      3,
      10,
      11
    ],
    "seo": {
      "title": "The Yummy Spoon | Mealtime Song for Picky Eaters | Healthy Eating | Aly Bouchnak",
      "description": "Playful mealtime song to encourage healthy eating. Perfect for reducing picky eating and making meals fun for toddlers.",
      "keywords": "mealtime song, picky eater song, healthy eating for kids, toddler mealtime, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/the-yummy-spoon",
      "ogImage": "https://alybouchnak.com/images/the-yummy-spoon-cover.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/the-yummy-spoon#recording",
      "name": "The Yummy Spoon (Open Wide)",
      "url": "https://alybouchnak.com/track/the-yummy-spoon",
      "duration": "PT1M41S",
      "genre": "Children's Music, Mealtime Songs",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-03-11",
      "isrcCode": "GX89G2661676",
      "description": "A playful mealtime song that encourages trying new foods and makes eating fun.",
      "image": "https://alybouchnak.com/images/the-yummy-spoon-cover.webp"
    }
  },
  {
    "id": 5,
    "slug": "the-wise-mice",
    "title": "The Wise Mice (Memory Game)",
    "subtitle": "Cumulative memory song for cognitive skills (Ages 2–6)",
    "description": "A cumulative memory song that enhances sequencing and cognitive skills. Children repeat growing sequences of mouse actions, building working memory.",
    "coverImage": "/images/the-wise-mice-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-11",
    "duration": "2:20",
    "bpm": 115,
    "genre": "Children's Music, Educational, Memory Games",
    "ageRange": "2-6 years",
    "mood": "Clever",
    "routine": "Learning",
    "isrc": "GX89G2624756",
    "upc": "5063907926106",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/3McW2hD8aFsXOx6pcru9IW",
    "appleMusicUrl": "https://music.apple.com/us/song/the-wise-mice-memory-game/1877091609",
    "youtubeUrl": "https://youtu.be/QHI7vPGAgY4",
    "amazonUrl": "https://music.amazon.com/tracks/B0GN4CFSLX",
    "lyricsPreview": [
      "The first little mouse went squeak squeak squeak",
      "The second little mouse went run run run",
      "The third little mouse went hide hide hide"
    ],
    "lyricsFull": "The first little mouse went squeak squeak squeak\nSqueak squeak squeak, squeak squeak squeak\nThe first little mouse went squeak squeak squeak\nThe wise mice having fun\n\nThe second little mouse went run run run\nRun run run, run run run\nThe first went squeak, then the second went run\nThe wise mice having fun\n\nThe third little mouse went hide hide hide\nHide hide hide, hide hide hide\nSqueak, run, hide - can you keep the order right?\nThe wise mice having fun\n\nThe fourth little mouse went nibble nibble nibble\nNibble nibble nibble, nibble nibble nibble\nSqueak, run, hide, nibble - remember with a giggle\nThe wise mice having fun\n\nCan you remember all the mice?\nSay their actions once or twice\nSqueak and run and hide and nibble\nWise mice memories make us giggle!",
    "educationalBenefits": [
      {
        "title": "Working Memory",
        "description": "Builds capacity to hold and manipulate information in short-term memory."
      },
      {
        "title": "Sequencing Skills",
        "description": "Develops understanding of order and patterns."
      },
      {
        "title": "Cognitive Flexibility",
        "description": "Practices switching between remembering and adding new information."
      }
    ],
    "artistNote": "Memory games are powerful tools for cognitive development. I created this cumulative song to make working memory training feel like play rather than work.",
    "relatedTracks": [
      9,
      2,
      10
    ],
    "seo": {
      "title": "The Wise Mice | Memory Game Song | Cognitive Development | Aly Bouchnak",
      "description": "Cumulative memory song for kids ages 2-6. Build working memory and sequencing skills through playful mouse actions.",
      "keywords": "memory game song, cognitive development music, sequencing song, educational kids music, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/the-wise-mice",
      "ogImage": "https://alybouchnak.com/images/the-wise-mice-cover.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/the-wise-mice#recording",
      "name": "The Wise Mice (Memory Game)",
      "url": "https://alybouchnak.com/track/the-wise-mice",
      "duration": "PT2M20S",
      "genre": "Children's Music, Educational, Memory Games",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-02-11",
      "isrcCode": "GX89G2624756",
      "description": "A cumulative memory song that enhances sequencing and cognitive skills.",
      "image": "https://alybouchnak.com/images/the-wise-mice-cover.webp"
    }
  },
  {
    "id": 4,
    "slug": "old-macdonald-farm-party",
    "title": "Old MacDonald Had a Farm (Farm Party)",
    "subtitle": "Farm animal celebration song (Ages 2–6)",
    "description": "A high-energy party version of \"Old MacDonald Had a Farm\" with modern beats and animal sound effects that get everyone dancing and singing along, a fun, upbeat nursery rhyme for toddlers and preschool kids. This playful kids song brings farm animals, catchy rhythms, and sing-along fun together—perfect for dancing, learning, and kids party playlists.",
    "coverImage": "/images/Old-McDonald-had-a-farm.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-03-06",
    "duration": "2:14",
    "bpm": 124,
    "genre": "Children's Music, Pop, Nursery Rhyme",
    "ageRange": "2-6 years",
    "mood": "Energetic",
    "routine": "Playtime",
    "isrc": "GX8KD2658865",
    "upc": "5063925085663",
    "album": "The Bloom's House: Party Classics",
    "albumUrl": "/album/the-blooms-house-classics-party",
    "spotifyUrl": "https://open.spotify.com/track/4D66R3Y3zlXfrfID0T2XCD",
    "appleMusicUrl": "https://music.apple.com/us/album/old-macdonald-had-a-farm-farm-party/1881714138",
    "youtubeUrl": "https://youtu.be/usWcgcBCENI",
    "amazonUrl": "https://www.amazon.com/dp/B0GR5JZMFY",
    "lyricsPreview": [
      "Old MacDonald found a beat!, E-I-E-I-O",
      "And now the farm is dancing sweet!, E-I-E-I-O",
      "I see a Cow inside the barn",
      "He's spinning round, he means no harm!"
    ],
    "lyricsFull": "Who is ready to party?\nLet's go to the farm!\n1, 2, 1-2-3-Go!\n\nOld MacDonald found a beat!\n(E-I-E-I-O!)\nAnd now the farm is dancing sweet!\n(E-I-E-I-O!)\n\nI see a Cow inside the barn\nHe's spinning round, he means no harm!\nHe doesn't walk, he likes to groove\nWatch the way he likes to move!\n\nHe goes Moo-Moo to the left!\n(Slide! Slide!)\nHe goes Moo-Moo to the right!\n(Slide! Slide!)\nMoo-Moo here! Moo-Moo there!\nWaving hands up in the air!\n\nOld MacDonald found a beat!\n(E-I-E-I-O!)\nAnd now the farm is dancing sweet!\n(E-I-E-I-O!)\n\nI see a Duck wearing a hat\n(Quack Quack!)\nHe's bouncing like an acrobat!\nHe jumps in the water, splashes cool\nHe is the captain of the pool!\n\nHe goes Quack-Quack down low!\n(Squat! Squat!)\nHe goes Quack-Quack to and fro!\n(Wiggle! Wiggle!)\nQuack-Quack here! Quack-Quack there!\nWaving feathers in the air!\n(Woo!)\n\nOkay, everybody freeze!\n(Freeze!)\nOkay, everybody freeze!\n(Freeze!)\nDo you hear that sound?\nIt's coming from the mud...\nIs it a pig?\n(Oink Oink!)\nIs he dancing?\n(Yes he is!)\nTurn up the bass!\n\nOld MacDonald found a beat!\n(E-I-E-I-O!)\nAnd now the farm is dancing sweet!\n(E-I-E-I-O!)\n\nMoo-Moo!\n(Cha-cha-cha!)\nQuack-Quack!\n(Cha-cha-cha!)\nOink-Oink!\n(Cha-cha-cha!)\nOld Mac... is back!",
    "educationalBenefits": [
      {
        "title": "Animal Recognition",
        "description": "Teaches children about farm animals and their characteristic sounds."
      },
      {
        "title": "Sound Imitation",
        "description": "Develops vocal skills through animal sound repetition and rhythm."
      },
      {
        "title": "Memory & Sequencing",
        "description": "Builds memory through the repetitive E-I-E-I-O pattern."
      },
      {
        "title": "Physical Activity",
        "description": "Encourages dancing and movement to the upbeat party rhythm."
      }
    ],
    "artistNote": "This song brings back memories of singing this classic as a child. Adding modern beats and party energy makes it perfect for today's kids while keeping the educational value intact.",
    "relatedTracks": [
      2,
      5,
      10
    ],
    "seo": {
      "title": "Old MacDonald Had a Farm (Farm Party) | Kids Farm Song | Aly Bouchnak",
      "description": "High-energy party version of the classic farm song. Kids learn animal sounds while dancing to modern beats. Perfect for ages 2-6.",
      "keywords": "Old MacDonald, farm song for kids, animal sounds song, farm party song, toddler farm song, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/old-macdonald-farm-party",
      "ogImage": "https://alybouchnak.com/images/Old-McDonald-had-a-farm.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/old-macdonald-farm-party#recording",
      "name": "Old MacDonald Had a Farm (Farm Party)",
      "url": "https://alybouchnak.com/track/old-macdonald-farm-party",
      "duration": "PT2M14S",
      "genre": "Children's Music, Pop, Nursery Rhyme",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Party Classics",
        "@id": "https://alybouchnak.com/album/the-blooms-house-classics-party"
      },
      "datePublished": "2026-03-06",
      "isrcCode": "GX8KD2658865",
      "description": "A high-energy party version of Old MacDonald with modern beats and animal sound effects.",
      "image": "https://alybouchnak.com/images/Old-McDonald-had-a-farm.webp"
    },
    "otherUrl": "https://push.fm/fl/old-macdonald-had-a-farm"
  },
  {
    "id": 3,
    "slug": "boom-teka-boom",
    "title": "Boom Teka Boom (Wake Up Song)",
    "subtitle": "Morning wake-up anthem with rhythmic energy (Ages 2–6)",
    "description": "A high-energy wake-up song with rhythmic beats to start the day positively. Perfect for morning routines and getting toddlers moving.",
    "coverImage": "/images/boom-teka-boom-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-30",
    "duration": "2:09",
    "bpm": 120,
    "genre": "Children's Music, Pop, Electronic",
    "ageRange": "2-6 years",
    "mood": "Energetic",
    "routine": "Transition",
    "isrc": "GXJ2E2565871",
    "upc": "5063893188977",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/43ezNyM5fkmq2ivXQw0lwn",
    "appleMusicUrl": "https://music.apple.com/us/song/boom-teka-boom-wake-up-song/1863464670",
    "youtubeUrl": "https://youtu.be/g7UvUxsWOek",
    "amazonUrl": "https://music.amazon.com/tracks/B0GCBD4YGZ",
    "lyricsPreview": [
      "Boom teka boom, wake up now",
      "Boom teka boom, show me how",
      "Stretch your arms up to the sky"
    ],
    "lyricsFull": "Boom teka boom, wake up now\nBoom teka boom, show me how\nStretch your arms up to the sky\nWave them low and wave them high\n\nBoom teka boom, time to rise\nBoom teka boom, open your eyes\nShake your head and wiggle your toes\nRub your eyes and touch your nose\n\nGood morning sun, good morning day\nTime to laugh and time to play\nBoom teka boom, here we go\nBoom teka boom, nice and slow",
    "educationalBenefits": [
      {
        "title": "Morning Routine",
        "description": "Helps establish consistent wake-up routines and transitions from sleep to activity."
      },
      {
        "title": "Gross Motor Skills",
        "description": "Encourages stretching and movement to activate the body."
      },
      {
        "title": "Energy Boost",
        "description": "Provides musical stimulation to increase alertness and engagement."
      }
    ],
    "artistNote": "This song was inspired by watching parents struggle to wake up sleepy toddlers. I wanted to create something that makes the morning transition fun rather than a battle.",
    "relatedTracks": [
      6,
      4,
      7
    ],
    "seo": {
      "title": "Boom Teka Boom | Wake Up Song for Kids | Morning Routine | Aly Bouchnak",
      "description": "Energetic wake-up song for toddlers. Perfect morning routine music to get kids moving and ready for the day.",
      "keywords": "wake up song, morning song for kids, toddler routine song, energetic kids music, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/boom-teka-boom",
      "ogImage": "https://alybouchnak.com/images/boom-teka-boom-cover.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/boom-teka-boom#recording",
      "name": "Boom Teka Boom (Wake Up Song)",
      "url": "https://alybouchnak.com/track/boom-teka-boom",
      "duration": "PT2M09S",
      "genre": "Children's Music, Pop, Electronic",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2026-01-30",
      "isrcCode": "GXJ2E2565871",
      "description": "A high-energy wake-up song with rhythmic beats to start the day positively.",
      "image": "https://alybouchnak.com/images/boom-teka-boom-cover.webp"
    }
  },
  {
    "id": 2,
    "slug": "pet-pop-animal-song",
    "title": "Pet-Pop | The Animal Song",
    "subtitle": "Fun pet animal movement song (Ages 2–6)",
    "description": "A lively song about different pets and their sounds, encouraging children to mimic animal movements and sounds. Perfect for pet-themed activities and learning about domestic animals.",
    "coverImage": "/images/pet-pop-animal-song-cover.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2025-12-19",
    "duration": "2:10",
    "bpm": 128,
    "genre": "Children's Music, Pop, Nursery Rhymes",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "routine": "Playtime",
    "isrc": "GXHZG2515365",
    "upc": "5063863307490",
    "album": "The Bloom's House: Volume 1",
    "albumUrl": "/album/the-blooms-house-volume-1",
    "spotifyUrl": "https://open.spotify.com/track/4hEpXU03NdZQYmv456JoiI",
    "appleMusicUrl": "https://music.apple.com/us/song/pet-pop-the-animal-song/1857066272",
    "youtubeUrl": "https://youtu.be/enNB5x7nT7M",
    "amazonUrl": "https://music.amazon.com/tracks/B0G4ND7L97",
    "lyricsPreview": [
      "My doggie make a sound goes woof woof woof",
      "My doggie likes to run goes run run run",
      "All day long"
    ],
    "lyricsFull": "My doggie make a sound goes woof woof woof\nWoof woof woof\nWoof woof woof\nMy doggie likes to run goes run run run\nAll day long\n\nMy kitty make a sound goes meow meow meow\nMeow meow meow\nMeow meow meow\nMy kitty likes to sleep goes shh shh shh\nAll day long\n\nMy ducky make a sound goes quack quack quack\nQuack quack quack\nQuack quack quack\nMy ducky likes to go goes splash splash splash\nAll day long\n\nMy birdie make a sound goes tweet tweet tweet\nTweet tweet tweet\nTweet tweet tweet\nMy birdie likes to fly goes up up up\nAll day long\n\nMy cow make a sound goes moo moo moo\nMoo moo moo\nMoo moo moo\nMy cow likes to eat goes munch munch munch\nAll day long\n\nMy doggie make a sound goes woof woof woof\nWoof woof woof\nWoof woof woof\nMy doggie likes to run goes run run run\nAll day long\n\nMy friends make sounds goes meow meow meow\nQuack quack quack\nTweet tweet tweet\nMoo moo moo\nAll day long",
    "educationalBenefits": [
      {
        "title": "Animal Recognition",
        "description": "Helps children learn about different pets and their characteristic sounds."
      },
      {
        "title": "Sound Association",
        "description": "Builds understanding of animal sounds and their corresponding pets."
      },
      {
        "title": "Motor Skills",
        "description": "Develops coordination through animal movement imitation activities."
      },
      {
        "title": "Social Skills",
        "description": "Encourages group participation and shared animal role-play experiences."
      }
    ],
    "artistNote": "This song came from observing how fascinated children are by pets. I wanted to create something that celebrates the special bond between kids and their furry (or feathery, or scaly) friends.",
    "relatedTracks": [
      10,
      4,
      11
    ],
    "seo": {
      "title": "Pet-Pop | The Animal Song | Kids Pet Song | Aly Bouchnak",
      "description": "Learn pet animal sounds with this fun movement song for kids ages 2-6. Perfect for pet-themed activities and learning about domestic animals.",
      "keywords": "pet song, animal sounds for kids, dog cat song, kids animal song, pet animal sounds, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/pet-pop-animal-song",
      "ogImage": "https://alybouchnak.com/images/pet-pop-animal-song-cover.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/pet-pop-animal-song#recording",
      "name": "Pet-Pop | The Animal Song",
      "url": "https://alybouchnak.com/track/pet-pop-animal-song",
      "duration": "PT2M10S",
      "genre": "Children's Music, Pop, Nursery Rhymes",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Volume 1",
        "@id": "https://alybouchnak.com/album/the-blooms-house-volume-1"
      },
      "datePublished": "2025-12-19",
      "isrcCode": "GXHZG2515365",
      "description": "A lively song about different pets and their sounds, encouraging children to mimic animal movements and sounds.",
      "image": "https://alybouchnak.com/images/pet-pop-animal-song-cover.webp"
    }
  },
  {
    "id": 1,
    "slug": "five-little-monkeys-jungle-party",
    "title": "Five Little Monkeys (Jungle Party)",
    "subtitle": "Counting and jumping jungle song (Ages 2–6)",
    "description": "A lively jungle-themed version of \"Five Little Monkeys\" with energetic beats that encourage counting, jumping, and playful monkey movements.",
    "coverImage": "/images/Five-little-monkeys-jumping-on-the-bed.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-01",
    "duration": "2:25",
    "bpm": 124,
    "genre": "Children's Pop, Counting Songs",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "routine": "Playtime",
    "isrc": "GX8LD2671883",
    "upc": "5063925856317",
    "album": "The Bloom's House: Party Classics",
    "albumUrl": "/album/the-blooms-house-classics-party",
    "spotifyUrl": "https://open.spotify.com/track/placeholder",
    "appleMusicUrl": "https://music.apple.com/placeholder",
    "youtubeUrl": "https://youtube.com/placeholder",
    "amazonUrl": "https://music.amazon.com/placeholder",
    "lyricsPreview": [
      "Five little monkeys jumping on the bed!",
      "(Jump! Jump! Jump! Jump!)",
      "One fell off and bumped his head!",
      "Mama called the Doctor and the Doctor said..."
    ],
    "lyricsFull": "Welcome to the Jungle Disco!\nWe are going to bounce!\nShow me your Monkey hands!\n(Ooh-Ooh-Ah-Ah!)\n\nFive little monkeys jumping on the bed!\n(Jump! Jump! Jump! Jump!)\nOne fell off and bumped his head!\n(Oh no!)\nMama called the Doctor and the Doctor said...\n\nAre you ready for the rule?\n(Here it comes!)\n1, 2, 3...\n\nNO! MORE! MONKEYS!\nJUMPING ON THE BED!\n\n(Jump to the rhythm!)\n(Jump to the rhythm!)\n\nFour little monkeys jumping on the bed!\n(Jump! Jump! Jump! Jump!)\nOne fell off and bumped his head!\n(Whoopsie!)\nMama called the Doctor and the Doctor said...\n\nAre you ready for the rule?\n1, 2, 3...\nNO! MORE! MONKEYS!\nJUMPING ON THE BED!\n\n(Wiggle your tails!)\n(Side to side!)\nOkay monkeys... let's cool down\nThe sun is setting in the jungle\n(Phew...)\nTake a deep breath...\nWait... the sun is coming back up!\nIt's time for the SUPER JUMP!\n\nOne little monkey jumping on the bed!\n(Super Jump! Super Jump!)\nHe fell off and bumped his head!\nMama called the Doctor and the Doctor said...\nPut those monkeys straight to bed!\n(Awww....)\nJust kidding!\n(Party!)\nNO MORE JUMPING!",
    "educationalBenefits": [
      {
        "title": "Counting Skills",
        "description": "Teaches counting backwards from five to one through repetitive lyrics."
      },
      {
        "title": "Motor Development",
        "description": "Develops jumping and coordination through monkey movement activities."
      },
      {
        "title": "Following Instructions",
        "description": "Builds listening skills and ability to follow sequential directions."
      },
      {
        "title": "Cause & Effect",
        "description": "Teaches consequences through the falling off the bed narrative."
      }
    ],
    "artistNote": "The challenge was making the countdown engaging throughout. Adding the jungle party chorus gives kids something to look forward to between each verse.",
    "relatedTracks": [
      10,
      11,
      6
    ],
    "seo": {
      "title": "Five Little Monkeys (Jungle Party) | Counting Song | Aly Bouchnak",
      "description": "Jungle party version of the classic counting song. Kids learn to count down from 5 while jumping and dancing. Ages 2-6.",
      "keywords": "five little monkeys, counting song for kids, monkey song, kids jumping song, toddler counting, Aly Bouchnak",
      "canonical": "https://alybouchnak.com/track/five-little-monkeys-jungle-party",
      "ogImage": "https://alybouchnak.com/images/Five-little-monkeys-jumping-on-the-bed.webp"
    },
    "trackSchema": {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "@id": "https://alybouchnak.com/track/five-little-monkeys-jungle-party#recording",
      "name": "Five Little Monkeys (Jungle Party)",
      "url": "https://alybouchnak.com/track/five-little-monkeys-jungle-party",
      "duration": "PT2M25S",
      "genre": "Children's Pop, Counting Songs",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aly Bouchnak"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": "The Bloom's House: Party Classics",
        "@id": "https://alybouchnak.com/album/the-blooms-house-classics-party"
      },
      "datePublished": "2026-02-01",
      "isrcCode": "GX8LD2671883",
      "description": "A jungle-themed version of Five Little Monkeys with energetic beats for counting and jumping.",
      "image": "https://alybouchnak.com/images/Five-little-monkeys-jumping-on-the-bed.webp"
    }
  }
];

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find(track => track.slug === slug);
}

export function getTrackById(id: number): Track | undefined {
  return tracks.find(track => track.id === id);
}

export function getTracksByAlbum(albumName: string): Track[] {
  return tracks.filter(track => track.album === albumName);
}

export function getAllTracks(): Track[] {
  return tracks;
}

export function getRelatedTracks(trackId: number): Track[] {
  const track = getTrackById(trackId);
  if (!track) return [];
  return track.relatedTracks.map(id => getTrackById(id)).filter((t): t is Track => t !== undefined);
}
