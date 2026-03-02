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
  // The Bloom's House: Volume 1 Album (UPC: 198391926947)
  {
    id: 2,
    slug: 'pet-pop-animal-song',
    title: 'Pet-Pop | The Animal Song',
    subtitle: 'Fun pet animal movement song (Ages 2–6)',
    description: 'A lively song about different pets and their sounds, encouraging children to mimic animal movements and sounds. Perfect for pet-themed activities and learning about domestic animals.',
    coverImage: '/images/pet-pop-animal-song-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2025-12-19',
    duration: '2:10',
    bpm: 128,
    genre: "Children's Music, Pop, Nursery Rhymes",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Playtime',
    isrc: 'GXHZG2515365',
    upc: '5063863307490',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/4hEpXU03NdZQYmv456JoiI',
    appleMusicUrl: 'https://music.apple.com/us/song/pet-pop-the-animal-song/1857066272',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/tracks/B0G4ND7L97',
    lyricsPreview: [
      "My doggie make a sound goes woof woof woof",
      "My doggie likes to run goes run run run",
      "All day long"
    ],
    lyricsFull: `My doggie make a sound goes woof woof woof
Woof woof woof
Woof woof woof
My doggie likes to run goes run run run
All day long

My kitty make a sound goes meow meow meow
Meow meow meow
Meow meow meow
My kitty likes to sleep goes shh shh shh
All day long

My ducky make a sound goes quack quack quack
Quack quack quack
Quack quack quack
My ducky likes to go goes splash splash splash
All day long

My birdie make a sound goes tweet tweet tweet
Tweet tweet tweet
Tweet tweet tweet
My birdie likes to fly goes up up up
All day long

My cow make a sound goes moo moo moo
Moo moo moo
Moo moo moo
My cow likes to eat goes munch munch munch
All day long

My doggie make a sound goes woof woof woof
Woof woof woof
Woof woof woof
My doggie likes to run goes run run run
All day long

My friends make sounds goes meow meow meow
Quack quack quack
Tweet tweet tweet
Moo moo moo
All day long`,
    educationalBenefits: [
      { title: 'Animal Recognition', description: 'Helps children learn about different pets and their characteristic sounds.' },
      { title: 'Sound Association', description: 'Builds understanding of animal sounds and their corresponding pets.' },
      { title: 'Motor Skills', description: 'Develops coordination through animal movement imitation activities.' },
      { title: 'Social Skills', description: 'Encourages group participation and shared animal role-play experiences.' }
    ],
    artistNote: 'This song came from observing how fascinated children are by pets. I wanted to create something that celebrates the special bond between kids and their furry (or feathery, or scaly) friends.',
    relatedTracks: [1, 3, 4],
    seo: {
      title: 'Pet-Pop | The Animal Song | Kids Pet Song | Aly Bouchnak',
      description: 'Learn pet animal sounds with this fun movement song for kids ages 2-6. Perfect for pet-themed activities and learning about domestic animals.',
      keywords: 'pet song, animal sounds for kids, dog cat song, kids animal song, pet animal sounds, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/pet-pop-animal-song',
      ogImage: 'https://alybouchnak.com/images/pet-pop-animal-song-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/pet-pop-animal-song#recording',
      name: 'Pet-Pop | The Animal Song',
      url: 'https://alybouchnak.com/track/pet-pop-animal-song',
      duration: 'PT2M10S',
      genre: "Children's Music, Pop, Nursery Rhymes",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2025-12-19',
      isrcCode: 'GXHZG2515365',
      description: 'A lively song about different pets and their sounds, encouraging children to mimic animal movements and sounds.',
      image: 'https://alybouchnak.com/images/pet-pop-animal-song-cover.webp'
    }
  },
  {
    id: 3,
    slug: 'boom-teka-boom',
    title: 'Boom Teka Boom (Wake Up Song)',
    subtitle: 'Morning wake-up anthem with rhythmic energy (Ages 2–6)',
    description: 'A high-energy wake-up song with rhythmic beats to start the day positively. Perfect for morning routines and getting toddlers moving.',
    coverImage: '/images/boom-teka-boom-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-30',
    duration: '2:09',
    bpm: 120,
    genre: "Children's Music, Pop, Electronic",
    ageRange: '2-6 years',
    mood: 'Energetic',
    routine: 'Transition',
    isrc: 'GXJ2E2565871',
    upc: '5063893188977',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Boom teka boom, wake up now",
      "Boom teka boom, show me how",
      "Stretch your arms up to the sky"
    ],
    lyricsFull: `Boom teka boom, wake up now
Boom teka boom, show me how
Stretch your arms up to the sky
Wave them low and wave them high

Boom teka boom, time to rise
Boom teka boom, open your eyes
Shake your head and wiggle your toes
Rub your eyes and touch your nose

Good morning sun, good morning day
Time to laugh and time to play
Boom teka boom, here we go
Boom teka boom, nice and slow`,
    educationalBenefits: [
      { title: 'Morning Routine', description: 'Helps establish consistent wake-up routines and transitions from sleep to activity.' },
      { title: 'Gross Motor Skills', description: 'Encourages stretching and movement to activate the body.' },
      { title: 'Energy Boost', description: 'Provides musical stimulation to increase alertness and engagement.' }
    ],
    artistNote: 'This song was inspired by watching parents struggle to wake up sleepy toddlers. I wanted to create something that makes the morning transition fun rather than a battle.',
    relatedTracks: [1, 4, 7],
    seo: {
      title: 'Boom Teka Boom | Wake Up Song for Kids | Morning Routine | Aly Bouchnak',
      description: 'Energetic wake-up song for toddlers. Perfect morning routine music to get kids moving and ready for the day.',
      keywords: 'wake up song, morning song for kids, toddler routine song, energetic kids music, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/boom-teka-boom',
      ogImage: 'https://alybouchnak.com/images/boom-teka-boom-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/boom-teka-boom#recording',
      name: 'Boom Teka Boom (Wake Up Song)',
      url: 'https://alybouchnak.com/track/boom-teka-boom',
      duration: 'PT2M09S',
      genre: "Children's Music, Pop, Electronic",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2026-01-30',
      isrcCode: 'GXJ2E2565871',
      description: 'A high-energy wake-up song with rhythmic beats to start the day positively.',
      image: 'https://alybouchnak.com/images/boom-teka-boom-cover.webp'
    }
  },
  {
    id: 4,
    slug: 'the-funny-bunny-jump',
    title: 'The Funny Bunny Jump (Freeze Dance)',
    subtitle: 'Interactive freeze dance game for listening skills (Ages 2–6)',
    description: 'An interactive freeze dance game that builds listening skills and motor control. Children hop like bunnies and freeze when the music stops.',
    coverImage: '/images/funny-bunny-jump-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-04-03',
    duration: '1:50',
    bpm: 120,
    genre: "Children's Music, Pop, Movement",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Playtime',
    isrc: 'GX89G2614392',
    upc: '5063907299958',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Hop hop hop, the bunny goes",
      "Hop hop hop, on his toes",
      "When the music stops - FREEZE!"
    ],
    lyricsFull: `Hop hop hop, the bunny goes
Hop hop hop, on his toes
Fluffy tail and twitchy nose
Hop hop hop, there he goes

When the music stops - FREEZE!
Don't you move, stay right there
Hold your pose up in the air
When the music stops - FREEZE!

Bounce bounce bounce, up and down
Bounce bounce bounce, all around
Funny bunny jumping high
Funny bunny touch the sky

When the music stops - FREEZE!
Still as a statue, don't you bend
Hold your pose until the end
When the music plays again!`,
    educationalBenefits: [
      { title: 'Listening Skills', description: 'Develops auditory attention through stop-and-go musical cues.' },
      { title: 'Motor Control', description: 'Practices starting and stopping movements on command.' },
      { title: 'Impulse Control', description: 'Builds self-regulation through freeze game mechanics.' }
    ],
    artistNote: 'Freeze dance has always been a favorite in my family. The Funny Bunny Jump combines the joy of movement with the developmental benefits of impulse control training.',
    relatedTracks: [1, 3, 5],
    seo: {
      title: 'The Funny Bunny Jump | Freeze Dance Song | Kids Movement | Aly Bouchnak',
      description: 'Interactive freeze dance song for kids. Build listening skills and motor control while hopping like a bunny.',
      keywords: 'freeze dance, bunny song, movement song for kids, listening skills game, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/the-funny-bunny-jump',
      ogImage: 'https://alybouchnak.com/images/funny-bunny-jump-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/the-funny-bunny-jump#recording',
      name: 'The Funny Bunny Jump (Freeze Dance)',
      url: 'https://alybouchnak.com/track/the-funny-bunny-jump',
      duration: 'PT1M50S',
      genre: "Children's Music, Pop, Movement",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2026-04-03',
      isrcCode: 'GX89G2614392',
      description: 'An interactive freeze dance game that builds listening skills and motor control.',
      image: 'https://alybouchnak.com/images/funny-bunny-jump-cover.webp'
    }
  },
  {
    id: 5,
    slug: 'the-wise-mice',
    title: 'The Wise Mice (Memory Game)',
    subtitle: 'Cumulative memory song for cognitive skills (Ages 2–6)',
    description: 'A cumulative memory song that enhances sequencing and cognitive skills. Children repeat growing sequences of mouse actions, building working memory.',
    coverImage: '/images/wise-mice-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-11',
    duration: '2:20',
    bpm: 120,
    genre: "Children's Music, Educational, Memory Games",
    ageRange: '2-6 years',
    mood: 'Clever',
    routine: 'Learning',
    isrc: 'GX89G2624756',
    upc: '5063907926106',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "The first little mouse went squeak squeak squeak",
      "The second little mouse went run run run",
      "The third little mouse went hide hide hide"
    ],
    lyricsFull: `The first little mouse went squeak squeak squeak
Squeak squeak squeak, squeak squeak squeak
The first little mouse went squeak squeak squeak
The wise mice having fun

The second little mouse went run run run
Run run run, run run run
The first went squeak, then the second went run
The wise mice having fun

The third little mouse went hide hide hide
Hide hide hide, hide hide hide
Squeak, run, hide - can you keep the order right?
The wise mice having fun

The fourth little mouse went nibble nibble nibble
Nibble nibble nibble, nibble nibble nibble
Squeak, run, hide, nibble - remember with a giggle
The wise mice having fun

Can you remember all the mice?
Say their actions once or twice
Squeak and run and hide and nibble
Wise mice memories make us giggle!`,
    educationalBenefits: [
      { title: 'Working Memory', description: 'Builds capacity to hold and manipulate information in short-term memory.' },
      { title: 'Sequencing Skills', description: 'Develops understanding of order and patterns.' },
      { title: 'Cognitive Flexibility', description: 'Practices switching between remembering and adding new information.' }
    ],
    artistNote: 'Memory games are powerful tools for cognitive development. I created this cumulative song to make working memory training feel like play rather than work.',
    relatedTracks: [3, 4, 6],
    seo: {
      title: 'The Wise Mice | Memory Game Song | Cognitive Development | Aly Bouchnak',
      description: 'Cumulative memory song for kids ages 2-6. Build working memory and sequencing skills through playful mouse actions.',
      keywords: 'memory game song, cognitive development music, sequencing song, educational kids music, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/the-wise-mice',
      ogImage: 'https://alybouchnak.com/images/wise-mice-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/the-wise-mice#recording',
      name: 'The Wise Mice (Memory Game)',
      url: 'https://alybouchnak.com/track/the-wise-mice',
      duration: 'PT2M20S',
      genre: "Children's Music, Educational, Memory Games",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2026-02-11',
      isrcCode: 'GX89G2624756',
      description: 'A cumulative memory song that enhances sequencing and cognitive skills.',
      image: 'https://alybouchnak.com/images/wise-mice-cover.webp'
    }
  },
  {
    id: 6,
    slug: 'the-yummy-spoon',
    title: 'The Yummy Spoon (Open Wide)',
    subtitle: 'Mealtime encouragement song for picky eaters (Ages 2–6)',
    description: 'A playful mealtime song that encourages trying new foods and makes eating fun. Perfect for reducing picky eating and creating positive mealtime associations.',
    coverImage: '/images/yummy-spoon-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-03-11',
    duration: '1:41',
    bpm: 120,
    genre: "Children's Music, Mealtime Songs",
    ageRange: '2-6 years',
    mood: 'Gentle',
    routine: 'Mealtime',
    isrc: 'GX89G2661676',
    upc: '5063906910496',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Open wide for the yummy spoon",
      "Zoom zoom zoom, coming soon",
      "Here comes the airplane, open the gate"
    ],
    lyricsFull: `Open wide for the yummy spoon
Zoom zoom zoom, coming soon
Here comes the airplane, open the gate
Yummy food is never late

Here is a carrot, orange and bright
Crunchy and sweet, a healthy bite
Open wide, here it comes
Yummy yum for little ones

Here is a pea, round and green
A little vegetable, rarely seen
Pop it in and give a chew
Good food is good for you

The yummy spoon makes mealtime fun
Even broccoli can be yum
Open wide and take a bite
Eating healthy is alright!`,
    educationalBenefits: [
      { title: 'Positive Mealtime', description: 'Creates joyful associations with eating and trying new foods.' },
      { title: 'Nutrition Awareness', description: 'Introduces healthy food choices in a fun context.' },
      { title: 'Cooperation', description: 'Encourages participation in family meal routines.' }
    ],
    artistNote: 'As a parent, I know the struggle of mealtime battles. This song transforms eating from a chore into a playful adventure with the Yummy Spoon.',
    relatedTracks: [3, 5, 7],
    seo: {
      title: 'The Yummy Spoon | Mealtime Song for Picky Eaters | Healthy Eating | Aly Bouchnak',
      description: 'Playful mealtime song to encourage healthy eating. Perfect for reducing picky eating and making meals fun for toddlers.',
      keywords: 'mealtime song, picky eater song, healthy eating for kids, toddler mealtime, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/the-yummy-spoon',
      ogImage: 'https://alybouchnak.com/images/yummy-spoon-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/the-yummy-spoon#recording',
      name: 'The Yummy Spoon (Open Wide)',
      url: 'https://alybouchnak.com/track/the-yummy-spoon',
      duration: 'PT1M41S',
      genre: "Children's Music, Mealtime Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2026-03-11',
      isrcCode: 'GX89G2661676',
      description: 'A playful mealtime song that encourages trying new foods and makes eating fun.',
      image: 'https://alybouchnak.com/images/yummy-spoon-cover.webp'
    }
  },
  {
    id: 8,
    slug: 'nanny-papa',
    title: 'Nanny & Papa (Funny Bunny Family)',
    subtitle: 'Heartwarming family celebration song (Ages 2–6)',
    description: 'A heartwarming celebration of grandparent relationships. This song honors the special bond between children and their Nanny and Papa through joyful lyrics and warm melodies.',
    coverImage: '/images/nanny-papa-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-27',
    duration: '2:34',
    bpm: 120,
    genre: "Children's Music, Family Songs",
    ageRange: '2-6 years',
    mood: 'Loving',
    routine: 'Playtime',
    isrc: 'GXBDS2573588',
    upc: '5063907265434',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Nanny and Papa, love so true",
      "Special grandparents, me and you",
      "Hugs and kisses, cookies and fun"
    ],
    lyricsFull: `Nanny and Papa, love so true
Special grandparents, me and you
Hugs and kisses, cookies and fun
Playing games in the sun

Nanny reads stories, Papa tells jokes
Nanny gives cuddles, Papa gives pokes
Both of them love me, this I know
Their love helps me grow

Funny Bunny Family, big and small
We love each other, one and all
Nanny and Papa, part of our crew
Family love forever true

When I visit, what a treat
Nanny's cooking, Papa's seat
Stories shared and memories made
Grandparent love will never fade`,
    educationalBenefits: [
      { title: 'Family Bonds', description: 'Strengthens emotional connections with extended family members.' },
      { title: 'Intergenerational Love', description: 'Celebrates the unique grandparent-grandchild relationship.' },
      { title: 'Emotional Expression', description: 'Encourages expressing love and gratitude for family.' }
    ],
    artistNote: 'Grandparents hold such a special place in children\'s hearts. This song is my tribute to the Nannys and Papas who shower their grandchildren with unconditional love.',
    relatedTracks: [3, 6, 7],
    seo: {
      title: 'Nanny & Papa | Grandparent Song | Family Love | Aly Bouchnak',
      description: 'Heartwarming song celebrating grandparent relationships. Perfect for honoring Nanny and Papa bonds with children.',
      keywords: 'grandparent song, nanny papa song, family love song, grandparents day song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/nanny-papa',
      ogImage: 'https://alybouchnak.com/images/nanny-papa-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/nanny-papa#recording',
      name: 'Nanny & Papa (Funny Bunny Family)',
      url: 'https://alybouchnak.com/track/nanny-papa',
      duration: 'PT2M34S',
      genre: "Children's Music, Family Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2026-02-27',
      isrcCode: 'GXBDS2573588',
      description: 'A heartwarming celebration of grandparent relationships.',
      image: 'https://alybouchnak.com/images/nanny-papa-cover.webp'
    }
  },
  {
    id: 9,
    slug: 'mary-had-a-little-lamb-school-party',
    title: 'Mary Had a Little Lamb (School Party)',
    subtitle: 'Classic nursery rhyme with party twist (Ages 2–6)',
    description: 'A fresh, upbeat take on the classic nursery rhyme "Mary Had a Little Lamb" with a modern party beat that gets children moving and singing along.',
    coverImage: '/images/mary-little-lamb-school-party-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-27',
    duration: '2:06',
    bpm: 130,
    genre: "Children's Music, Pop, Nu Disco, Nursery Rhymes",
    ageRange: '2-6 years',
    mood: 'Celebratory',
    routine: 'Playtime',
    isrc: 'GX8KD2657271',
    upc: '5063925242516',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Mary had a little lamb, little lamb, little lamb",
      "Mary had a little lamb, its fleece was white as snow",
      "He followed her to school one day, School one day, school one day",
      "He followed her to school one day, Which was against the rule!"
    ],
    lyricsFull: `Who is ready for school?
Grab your backpack!
But wait... who is following Mary?
(Baa!)

Mary had a little lamb
Little lamb, little lamb
Mary had a little lamb
His fleece was white as snow!
He followed her to school one day
School one day, school one day
He followed her to school one day
Which was against the rule!
(Uh oh!)

He walked right through the open door
(Hello!)
His hooves went Tap-Tap on the floor
(Tap-Tap!)
The teacher looked and rubbed her eyes...
But the children yelled a big SURPRISE!

Look at the Lamb! He is so CUTE!
(So cute!)
Look at the Lamb! In his fluffy suit!
(So fluffy!)
It made the children laugh and play
Laugh and play, laugh and play!
It made the children laugh and play
To see a Lamb at school!
(Party time!)

Mary had a little lamb
Little lamb, little lamb
Mary had a little lamb
His fleece was white as snow!
He followed her to school one day
School one day, school one day
He followed her to school one day
Which was against the rule!

Everybody dance with the Lamb!
Show me your fluffy hands!
(Wiggle Wiggle!)
Show me your fluffy tail!
(Shake Shake!)
Go Mary! Go Lamb!
(Yay!)

The teacher said "You cannot stay!"
"You have to go outside and play!"
But the Lamb just smiled and tapped his feet
He was dancing to the happy beat!
(He loves the song!)

Look at the Lamb! He is so CUTE!
(So cute!)
Look at the Lamb! In his fluffy suit!
(So fluffy!)
It made the children laugh and play
Laugh and play, laugh and play!
It made the children laugh and play
To see a Lamb at school!

You are the cutest Lamb in the world!
(Baa!)
See you tomorrow!
(Bye bye!)`,
    educationalBenefits: [
      { title: 'Traditional Learning', description: 'Introduces children to classic nursery rhymes and cultural heritage.' },
      { title: 'Memory Skills', description: 'Develops memorization through repetitive lyrics and predictable patterns.' },
      { title: 'Rhythm & Movement', description: 'Encourages dancing and movement to the upbeat party rhythm.' },
      { title: 'Social Bonding', description: 'Promotes group singing and shared musical experiences.' }
    ],
    artistNote: 'Taking a beloved classic and giving it new life with modern production was a joy. I wanted to preserve the nostalgic essence while making it exciting for today\'s kids to dance to.',
    relatedTracks: [4, 5, 6],
    seo: {
      title: 'Mary Had a Little Lamb (School Party) | Classic Nursery Rhyme | Aly Bouchnak',
      description: 'A modern, upbeat take on the classic nursery rhyme. Perfect party version for kids ages 2-6 with dance beats and sing-along fun.',
      keywords: 'Mary had a little lamb, nursery rhyme, kids party song, classic song modern version, toddler dance song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/mary-had-a-little-lamb-school-party',
      ogImage: 'https://alybouchnak.com/images/mary-little-lamb-school-party-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/mary-had-a-little-lamb-school-party#recording',
      name: 'Mary Had a Little Lamb (School Party)',
      url: 'https://alybouchnak.com/track/mary-had-a-little-lamb-school-party',
      duration: 'PT2M06S',
      genre: "Children's Music, Pop, Nu Disco, Nursery Rhymes",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Party Classics",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-classics-party'
      },
      datePublished: '2026-02-27',
      isrcCode: 'GX8KD2657271',
      description: 'A fresh, upbeat take on the classic nursery rhyme with a modern party beat.',
      image: 'https://alybouchnak.com/images/mary-little-lamb-school-party-cover.webp'
    }
  },
  {
    id: 4,
    slug: 'old-macdonald-farm-party',
    title: 'Old MacDonald Had a Farm (Farm Party)',
    subtitle: 'Farm animal celebration song (Ages 2–6)',
    description: 'A high-energy party version of "Old MacDonald Had a Farm" with modern beats and animal sound effects that get everyone dancing and singing along.',
    coverImage: '/images/old-macdonald-farm-party-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-03-06',
    duration: '2:14',
    bpm: 132,
    genre: "Children's Pop, Farm Songs",
    ageRange: '2-6 years',
    mood: 'Energetic',
    routine: 'Playtime',
    isrc: 'GX8KD2658865',
    upc: '5063925085663',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Old MacDonald found a beat!, E-I-E-I-O",
      "And now the farm is dancing sweet!, E-I-E-I-O",
      "I see a Cow inside the barn",
      "He's spinning round, he means no harm!"
    ],
    lyricsFull: `Who is ready to party?
Let's go to the farm!
1, 2, 1-2-3-Go!

Old MacDonald found a beat!
(E-I-E-I-O!)
And now the farm is dancing sweet!
(E-I-E-I-O!)

I see a Cow inside the barn
He's spinning round, he means no harm!
He doesn't walk, he likes to groove
Watch the way he likes to move!

He goes Moo-Moo to the left!
(Slide! Slide!)
He goes Moo-Moo to the right!
(Slide! Slide!)
Moo-Moo here! Moo-Moo there!
Waving hands up in the air!

Old MacDonald found a beat!
(E-I-E-I-O!)
And now the farm is dancing sweet!
(E-I-E-I-O!)

I see a Duck wearing a hat
(Quack Quack!)
He's bouncing like an acrobat!
He jumps in the water, splashes cool
He is the captain of the pool!

He goes Quack-Quack down low!
(Squat! Squat!)
He goes Quack-Quack to and fro!
(Wiggle! Wiggle!)
Quack-Quack here! Quack-Quack there!
Waving feathers in the air!
(Woo!)

Okay, everybody freeze!
(Freeze!)
Okay, everybody freeze!
(Freeze!)
Do you hear that sound?
It's coming from the mud...
Is it a pig?
(Oink Oink!)
Is he dancing?
(Yes he is!)
Turn up the bass!

Old MacDonald found a beat!
(E-I-E-I-O!)
And now the farm is dancing sweet!
(E-I-E-I-O!)

Moo-Moo!
(Cha-cha-cha!)
Quack-Quack!
(Cha-cha-cha!)
Oink-Oink!
(Cha-cha-cha!)
Old Mac... is back!`,
    educationalBenefits: [
      { title: 'Animal Recognition', description: 'Teaches children about farm animals and their characteristic sounds.' },
      { title: 'Sound Imitation', description: 'Develops vocal skills through animal sound repetition and rhythm.' },
      { title: 'Memory & Sequencing', description: 'Builds memory through the repetitive E-I-E-I-O pattern.' },
      { title: 'Physical Activity', description: 'Encourages dancing and movement to the upbeat party rhythm.' }
    ],
    artistNote: 'This song brings back memories of singing this classic as a child. Adding modern beats and party energy makes it perfect for today\'s kids while keeping the educational value intact.',
    relatedTracks: [3, 5, 6],
    seo: {
      title: 'Old MacDonald Had a Farm (Farm Party) | Kids Farm Song | Aly Bouchnak',
      description: 'High-energy party version of the classic farm song. Kids learn animal sounds while dancing to modern beats. Perfect for ages 2-6.',
      keywords: 'Old MacDonald, farm song for kids, animal sounds song, farm party song, toddler farm song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/old-macdonald-farm-party',
      ogImage: 'https://alybouchnak.com/images/old-macdonald-farm-party-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/old-macdonald-farm-party#recording',
      name: 'Old MacDonald Had a Farm (Farm Party)',
      url: 'https://alybouchnak.com/track/old-macdonald-farm-party',
      duration: 'PT2M14S',
      genre: "Children's Pop, Farm Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Party Classics",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-classics-party'
      },
      datePublished: '2026-03-06',
      isrcCode: 'GX8KD2658865',
      description: 'A high-energy party version of Old MacDonald with modern beats and animal sound effects.',
      image: 'https://alybouchnak.com/images/old-macdonald-farm-party-cover.webp'
    }
  },
  {
    id: 5,
    slug: 'five-little-monkeys-jungle-party',
    title: 'Five Little Monkeys (Jungle Party)',
    subtitle: 'Counting and jumping jungle song (Ages 2–6)',
    description: 'A lively jungle-themed version of "Five Little Monkeys" with energetic beats that encourage counting, jumping, and playful monkey movements.',
    coverImage: '/images/five-little-monkeys-jungle-party-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-01',
    duration: '2:25',
    bpm: 135,
    genre: "Children's Pop, Counting Songs",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Playtime',
    isrc: 'GX8LD2671883',
    upc: '5063925856317',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Five little monkeys jumping on the bed!",
      "(Jump! Jump! Jump! Jump!)",
      "One fell off and bumped his head!",
      "Mama called the Doctor and the Doctor said..."
    ],
    lyricsFull: `Welcome to the Jungle Disco!
We are going to bounce!
Show me your Monkey hands!
(Ooh-Ooh-Ah-Ah!)

Five little monkeys jumping on the bed!
(Jump! Jump! Jump! Jump!)
One fell off and bumped his head!
(Oh no!)
Mama called the Doctor and the Doctor said...

Are you ready for the rule?
(Here it comes!)
1, 2, 3...

NO! MORE! MONKEYS!
JUMPING ON THE BED!

(Jump to the rhythm!)
(Jump to the rhythm!)

Four little monkeys jumping on the bed!
(Jump! Jump! Jump! Jump!)
One fell off and bumped his head!
(Whoopsie!)
Mama called the Doctor and the Doctor said...

Are you ready for the rule?
1, 2, 3...
NO! MORE! MONKEYS!
JUMPING ON THE BED!

(Wiggle your tails!)
(Side to side!)
Okay monkeys... let's cool down
The sun is setting in the jungle
(Phew...)
Take a deep breath...
Wait... the sun is coming back up!
It's time for the SUPER JUMP!

One little monkey jumping on the bed!
(Super Jump! Super Jump!)
He fell off and bumped his head!
Mama called the Doctor and the Doctor said...
Put those monkeys straight to bed!
(Awww....)
Just kidding!
(Party!)
NO MORE JUMPING!`,
    educationalBenefits: [
      { title: 'Counting Skills', description: 'Teaches counting backwards from five to one through repetitive lyrics.' },
      { title: 'Motor Development', description: 'Develops jumping and coordination through monkey movement activities.' },
      { title: 'Following Instructions', description: 'Builds listening skills and ability to follow sequential directions.' },
      { title: 'Cause & Effect', description: 'Teaches consequences through the falling off the bed narrative.' }
    ],
    artistNote: 'The challenge was making the countdown engaging throughout. Adding the jungle party chorus gives kids something to look forward to between each verse.',
    relatedTracks: [3, 4, 6],
    seo: {
      title: 'Five Little Monkeys (Jungle Party) | Counting Song | Aly Bouchnak',
      description: 'Jungle party version of the classic counting song. Kids learn to count down from 5 while jumping and dancing. Ages 2-6.',
      keywords: 'five little monkeys, counting song for kids, monkey song, kids jumping song, toddler counting, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/five-little-monkeys-jungle-party',
      ogImage: 'https://alybouchnak.com/images/five-little-monkeys-jungle-party-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/five-little-monkeys-jungle-party#recording',
      name: 'Five Little Monkeys (Jungle Party)',
      url: 'https://alybouchnak.com/track/five-little-monkeys-jungle-party',
      duration: 'PT2M25S',
      genre: "Children's Pop, Counting Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Party Classics",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-classics-party'
      },
      datePublished: '2026-02-01',
      isrcCode: 'GX8LD2671883',
      description: 'A jungle-themed version of Five Little Monkeys with energetic beats for counting and jumping.',
      image: 'https://alybouchnak.com/images/five-little-monkeys-jungle-party-cover.webp'
    }
  },
  {
    id: 6,
    slug: 'wheels-on-the-bus-party-ride',
    title: 'The Wheels on the Bus (Party Ride)',
    subtitle: 'Transportation movement song (Ages 2–6)',
    description: 'An energetic party version of the classic "The Wheels on the Bus" with modern beats and fun sound effects that get children moving and singing about bus adventures.',
    coverImage: '/images/wheels-on-the-bus-party-ride-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-03',
    duration: '2:19',
    bpm: 130,
    genre: "Children's Pop, Transportation Songs",
    ageRange: '2-6 years',
    mood: 'Energetic',
    routine: 'Movement',
    isrc: 'GX8LD2630428',
    upc: '5063907564377',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "The wheels on the bus go round and round",
      "Round and round, round and round",
      "The wheels on the bus go round and round",
      "All through the town"
    ],
    lyricsFull: `The Party Bus is here!
I have a ticket for you... and you... and you!
Come on inside!
Let's roll!

The wheels on the bus go round and round
Round and round, round and round
The wheels on the bus go round and round
All through the town!
(Roll your hands!)

The wipers on the bus go Swish, Swish, Swish
Swish, Swish, Swish!
Swish, Swish, Swish!
The wipers on the bus go Swish, Swish, Swish
All through the town!
(Side to side!)

We are riding on the bus!
(Yeah!)
It’s a party just for us!
(Woo!)
The sun is shining down...
All through the town!
(Yay!)

The horn on the bus goes Beep, Beep, Beep
Beep, Beep, Beep!
Beep, Beep, Beep!
The horn on the bus goes Beep, Beep, Beep
All through the town!
(Make some noise!)

The people on the bus go Up and Down!
(Jump Up!)
Up and Down!
(Get Low!)
Up and Down!
(Jump Up!)
The people on the bus go Up and Down
All through the town!

We are stopped at a red light
(Shhh...)
Who is driving the bus?
Is it a Bear?
(No!)
Is it a Cat?
(No!)
It's the DJ!
And the Driver on the bus says...
EVERYBODY DANCE!

(Go Bus! Go Bus! Go Bus!)
(Wiggle your wheels!)

The wheels on the bus go round and round!
(Round and round!)
We are here!
(Ding Dong!)
Thanks for the ride!`,
    educationalBenefits: [
      { title: 'Transportation Awareness', description: 'Teaches children about buses and transportation concepts.' },
      { title: 'Sound Effects', description: 'Develops understanding of vehicle sounds through repetition.' },
      { title: 'Movement Coordination', description: 'Encourages physical actions matching song lyrics.' },
      { title: 'Sequencing Skills', description: 'Builds understanding of patterns through verse repetition.' }
    ],
    artistNote: 'I remember doing all the hand motions to this song as a kid. I wanted to keep that interactive spirit but add beats that make both kids and parents want to dance together.',
    relatedTracks: [3, 4, 5],
    seo: {
      title: 'The Wheels on the Bus (Party Ride) | Kids Transportation Song | Aly Bouchnak',
      description: 'Energetic party version of the classic bus song. Kids learn vehicle sounds while dancing to modern beats. Perfect for ages 2-6.',
      keywords: 'wheels on the bus, transportation song for kids, bus song, kids vehicle song, toddler movement song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/wheels-on-the-bus-party-ride',
      ogImage: 'https://alybouchnak.com/images/wheels-on-the-bus-party-ride-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/wheels-on-the-bus-party-ride#recording',
      name: 'The Wheels on the Bus (Party Ride)',
      url: 'https://alybouchnak.com/track/wheels-on-the-bus-party-ride',
      duration: 'PT2M19S',
      genre: "Children's Pop, Transportation Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Party Classics",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-classics-party'
      },
      datePublished: '2026-02-03',
      isrcCode: 'GX8LD2630428',
      description: 'An energetic party version of the classic bus song with modern beats and fun sound effects.',
      image: 'https://alybouchnak.com/images/wheels-on-the-bus-party-ride-cover.webp'
    }
  },
  {
    id: 7,
    slug: 'happy-party-edition',
    title: "If You're Happy and You Know It (Party Edition)",
    subtitle: 'Emotions and actions celebration song (Ages 2–6)',
    description: 'A high-energy party version of the classic "If You\'re Happy and You Know It" that encourages children to express emotions through movement and celebrate together.',
    coverImage: '/images/happy-party-edition-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-05',
    duration: '2:33',
    bpm: 135,
    genre: "Children's Pop, Action Songs",
    ageRange: '2-6 years',
    mood: 'Celebratory',
    routine: 'Celebration',
    isrc: 'GX8LD2681741',
    upc: '5063925895088',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "If you're happy and you know it, clap your hands",
      "If you're Happy and you know it, and you really want to show it...",
      "If you're Excited and you know it, Stomp your Feet!",
      "If you're Excited and you know it, and you really want to show it..."
    ],
    lyricsFull: `I see a lot of smiles today!
But I need to check your energy levels...
Are you ready to blast off?
1, 2, 1-2-3-GO!

I woke up feeling sunny inside
A happy feeling that I cannot hide
I got my dancing shoes on my feet
I’m moving to the rhythm of the beat!

If you're Happy and you know it, Clap your Hands!
(Clap! Clap!)
If you're Happy and you know it, Clap your Hands!
(Clap! Clap!)
If you're Happy and you know it, and you really want to show it...
If you're Happy and you know it, Clap your Hands!
(Clap! Clap!)

Now we are warming up the machine
The happiest machine you've ever seen!
We need some power, we need some noise
Calling all the girls and the boys!

If you're Excited and you know it, Stomp your Feet!
(Stomp! Stomp!)
If you're Excited and you know it, Stomp your Feet!
(Stomp! Stomp!)
If you're Excited and you know it, and you really want to show it...
If you're Excited and you know it, Stomp your Feet!
(Stomp! Stomp!)

Wait a minute...
I think we are getting TOO excited
My heart is going Boom Boom Boom
Let's take a "Magic Breath."

(Ahhh...)
Okay... now let's get SILLY!

If you're Silly and you know it, Shake it All About!
(Wiggle-Wiggle-Wiggle!) [Funny Sound Effect]
If you're Silly and you know it, Shake it All About!
(Wiggle-Wiggle-Wiggle!)
If you're Silly and you know it, and you really want to show it...
If you're Silly and you know it, Shake it All About!
(Wiggle-Wiggle-Wiggle!)

If you're Happy and you know it, shout HOORAY!
(HOORAY!)
If you're Happy and you know it, shout HOORAY!
(HOORAY!)
We are happy!
(Yeah!)
See you next time!
(Bye bye!)`,
    educationalBenefits: [
      { title: 'Emotional Expression', description: 'Teaches children to recognize and express happiness and other emotions.' },
      { title: 'Following Directions', description: 'Builds listening skills through action-based instructions.' },
      { title: 'Motor Skills', description: 'Develops coordination through clapping, stomping, and movement.' },
      { title: 'Social Engagement', description: 'Encourages group participation and shared celebration.' }
    ],
    artistNote: 'This song is all about joy and celebration. I wanted to create a version that builds excitement while teaching kids that expressing emotions through movement is healthy and fun.',
    relatedTracks: [3, 4, 6],
    seo: {
      title: "If You're Happy and You Know It (Party Edition) | Kids Action Song | Aly Bouchnak",
      description: 'High-energy party version of the classic emotions song. Kids learn to express feelings through movement and celebration. Ages 2-6.',
      keywords: 'if youre happy and you know it, emotions song for kids, action song, clap your hands song, toddler celebration song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/happy-party-edition',
      ogImage: 'https://alybouchnak.com/images/happy-party-edition-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/happy-party-edition#recording',
      name: "If You're Happy and You Know It (Party Edition)",
      url: 'https://alybouchnak.com/track/happy-party-edition',
      duration: 'PT2M33S',
      genre: "Children's Pop, Action Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Party Classics",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-classics-party'
      },
      datePublished: '2026-02-05',
      isrcCode: 'GX8LD2681741',
      description: 'A high-energy party version encouraging children to express emotions through movement and celebration.',
      image: 'https://alybouchnak.com/images/happy-party-edition-cover.webp'
    }
  },
  {
    id: 8,
    slug: 'body-party-head-shoulders',
    title: 'The Body Party (Head & Shoulders)',
    subtitle: 'Body parts movement song (Ages 2–6)',
    description: 'A party version of "Head, Shoulders, Knees and Toes" that gets children moving while learning body parts and developing coordination.',
    coverImage: '/images/body-party-head-shoulders-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-08',
    duration: '2:10',
    bpm: 130,
    genre: "Children's Pop, Body Awareness Songs",
    ageRange: '2-6 years',
    mood: 'Energetic',
    routine: 'Movement',
    isrc: 'GX8LD2631231',
    upc: '5063941237718',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Head, Shoulders, Knees and Toes!, (Knees and Toes!)",
      "And Eyes! And Ears! And Mouth and Nose!",
      "Head, Shoulders, Knees and Toes!, (Knees and Toes!)"
    ],
    lyricsFull: `Okay everybody!
Check your energy!
(Full!)
Check your smiles!
(Check!)
It's time to move your body... from the top... to the bottom!

Head, Shoulders, Knees and Toes!
(Knees and Toes!)
Head, Shoulders, Knees and Toes!
(Knees and Toes!)
And Eyes! And Ears! And Mouth and Nose!
Head, Shoulders, Knees and Toes!
(Knees and Toes!)

I love my body!
(Yay!)
I love to move!
(Yay!)
From the top of my head...
Down to my shoes!
(Woo!)
It’s a Body Party!

Let’s do it again!
Head, Shoulders, Knees and Toes!
(Clap! Clap!)
Head, Shoulders, Knees and Toes!
(Clap! Clap!)
And Eyes! And Ears! And Mouth and Nose!
Head, Shoulders, Knees and Toes!
(Yeah!)

Whoa... the record is slowing down
Can you move in Sloooooow Moooooootion?
Heaaaaaad...
Shouuuuulders...
Kneeeees....
And Toooooes....
(You look like an astronaut!)

Okay... speed it up!
1... 2... 1, 2, 3, GO!
HeadShouldersKneesandToes!
(Knees and Toes!)
HeadShouldersKneesandToes!
(Knees and Toes!)
HeadShouldersKneesandToes!
(Woo!)

Give your knees a hug!
(Good job knees!)
Give your toes a wiggle!
(Good job toes!)
We are healthy and strong!
(Yay!)`,
    educationalBenefits: [
      { title: 'Body Awareness', description: 'Teaches children to identify different body parts through song.' },
      { title: 'Motor Coordination', description: 'Develops ability to touch body parts while singing and moving.' },
      { title: 'Vocabulary Building', description: 'Expands body part vocabulary in a fun, memorable way.' },
      { title: 'Speed Processing', description: 'Challenges children with progressively faster tempos.' }
    ],
    artistNote: 'The challenge here was keeping it educational while making it party-worthy. Speeding up the tempo creates excitement while reinforcing body part knowledge.',
    relatedTracks: [6, 7, 9],
    seo: {
      title: 'The Body Party (Head & Shoulders) | Kids Body Parts Song | Aly Bouchnak',
      description: 'Party version of the classic body parts song. Kids learn head, shoulders, knees and toes while dancing. Ages 2-6.',
      keywords: 'head shoulders knees and toes, body parts song for kids, movement song, toddler body awareness, kids coordination song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/body-party-head-shoulders',
      ogImage: 'https://alybouchnak.com/images/body-party-head-shoulders-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/body-party-head-shoulders#recording',
      name: 'The Body Party (Head & Shoulders)',
      url: 'https://alybouchnak.com/track/body-party-head-shoulders',
      duration: 'PT2M10S',
      genre: "Children's Pop, Body Awareness Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Party Classics",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-classics-party'
      },
      datePublished: '2026-02-08',
      isrcCode: 'GX8LD2631231',
      description: 'A party version teaching body parts with progressively faster tempos for fun coordination challenges.',
      image: 'https://alybouchnak.com/images/body-party-head-shoulders-cover.webp'
    }
  },
  {
    id: 9,
    slug: 'alphabet-song',
    title: 'The Alphabet Song',
    subtitle: 'Letter learning song (Ages 2–6)',
    description: 'A modern, upbeat version of the classic alphabet song that makes learning ABCs fun and engaging with contemporary beats and catchy melody.',
    coverImage: '/images/alphabet-song-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-10',
    duration: '2:55',
    bpm: 125,
    genre: "Children's Pop, Educational Songs",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Learning',
    isrc: 'GX8LD2663207',
    upc: '5063941576312',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "A is for apple, juicy and sweet",
      "B is for ball, bounce bounce your feet",
      "C is for cuddle, snuggle up tight",
      "D is for dream, sleep all night"
    ],
    lyricsFull: `A, B, C, D
Come and sing with me

A is for apple, juicy and sweet
B is for ball, bounce bounce your feet
C is for cuddle, snuggle up tight
D is for dream, sleep all night
E is for earth, green and blue
F is for family, me and you
G is for garden, watch it grow
H is for happy, say hello (Hello!)

A B C D E F G
H I J K L M N O P
Q R S T U V
W X Y and Z
Singing with my family

I is for ice cream, cold and yummy
J is for jump, wiggle your tummy
K is for kiss on your cheek
L is for love every week
M is for music, dance around
N is for night, quiet sound
O is for ocean, splash and play
P is for party, hip hooray (Yay!)

A B C D E F G
H I J K L M N O P
Q R S T U V
W X Y and Z
Singing with my family

Q is for quiet, go to sleep (Beep-beep-beep)
R is for robot, beep-beep-beep
S is for sunshine, shining bright
T is for twinkle, starry light
U is for up, touch the sky
V is for island, playing hide
W is for world, big and round
X is for xylophone, happy sound
Y is for you, my best friend
Z is for zoom, that's the end

That's the end
A B C`,
    educationalBenefits: [
      { title: 'Letter Recognition', description: 'Teaches all 26 letters of the alphabet in order.' },
      { title: 'Phonemic Awareness', description: 'Introduces letter-sound associations through examples.' },
      { title: 'Memory Skills', description: 'Builds memorization through melodic repetition.' },
      { title: 'Pre-Reading Skills', description: 'Establishes foundation for future reading and writing.' }
    ],
    artistNote: 'I wanted to create an alphabet song that parents actually enjoy hearing on repeat. The modern beat keeps it fresh while maintaining the educational foundation.',
    relatedTracks: [3, 4, 8],
    seo: {
      title: 'The Alphabet Song | ABC Learning Song | Aly Bouchnak',
      description: 'Modern upbeat alphabet song for kids. Learn ABCs with fun beats and letter examples. Perfect for early literacy ages 2-6.',
      keywords: 'alphabet song, ABC song for kids, learn letters song, kids educational music, toddler alphabet, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/alphabet-song',
      ogImage: 'https://alybouchnak.com/images/alphabet-song-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/alphabet-song#recording',
      name: 'The Alphabet Song',
      url: 'https://alybouchnak.com/track/alphabet-song',
      duration: 'PT2M55S',
      genre: "Children's Pop, Educational Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Party Classics",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-classics-party'
      },
      datePublished: '2026-02-10',
      isrcCode: 'GX8LD2663207',
      description: 'A modern, upbeat alphabet song teaching ABCs with contemporary beats and letter examples.',
      image: 'https://alybouchnak.com/images/alphabet-song-cover.webp'
    }
  },
  {
    id: 10,
    slug: 'duckie-song',
    title: 'The Duckie Song',
    subtitle: 'Water animal adventure song (Ages 2–6)',
    description: 'A sweet and playful song about a little duck\'s adventures, perfect for teaching about ducks and water animals while encouraging imagination.',
    coverImage: '/images/duckie-song-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-12',
    duration: '2:32',
    bpm: 120,
    genre: "Children's Pop, Animal Songs",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Playtime',
    isrc: 'GX8LD2660078',
    upc: '5063941614571',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "The duckie is walking, ( See! Like dis! )",
      "She’s walking slowly, ( See! Like dis! )",
      "She keeps on quacking, ( Hear! Like dis! )",
      "Oh, how sweet she is, ( See! Like dis! )"
    ],
    lyricsFull: `The duckie is walking, 
( See! Like dis! )
She’s walking slowly, 
( See! Like dis! )
She keeps on quacking, 
( Hear! Like dis! )
Oh, how sweet she is, 
( See! Like dis! )

And She sing
( Singing! Like dis! )

Quack quack quacky quack quack 
Quack quack quacky quack quack 

She has a baby, 
( Tiny! Like dis! )
His feet are so tiny, 
( Tiny! Like dis! )
He runs behind her, 
( See! Like dis! )
Oh, how sweet he is, 
( See! Like dis! )

And they sing
Singing! Like dis!

Quack quack quacky quack quack 
Quack quack quacky quack quack 

Here comes Daddy Duck, 
( Walks like dis! )
He spots the foxy, 
( Hiding! Like dis! )
He puffs his chest out, 
( Big! Like dis! )
The foxy runs away, 
( Fast! Like dis! )

Here come Gram and Gramps,
( See! Like dis! )
They walk with a stick, 
( See! Like dis! )
They’re waddling slowly, 
( Slowly! Like dis! )
And quack along too, 
( Quacking! Like dis! )

And they all sing
( Singing! Like dis! )

Quack quack quacky quack quack 
Quack quack quacky quack quack 

The duckie is walking,
( See! Like dis! )
She’s walking slowly, 
( See! Like dis! )
She keeps on quacking,
( Hear! Like dis!)
Oh, how sweet she is,
( See! Like dis!)`,
    educationalBenefits: [
      { title: 'Animal Knowledge', description: 'Teaches children about ducks and their characteristics.' },
      { title: 'Imaginative Play', description: 'Encourages creative storytelling and pretend play.' },
      { title: 'Sound Recognition', description: 'Develops understanding of duck sounds and water themes.' },
      { title: 'Nature Awareness', description: 'Introduces concepts of ponds, rain, and water environments.' }
    ],
    artistNote: 'Watching ducks at a local pond with my nephew inspired this song. The way children connect with animals is magical, and I wanted to capture that wonder.',
    relatedTracks: [1, 2, 4],
    seo: {
      title: 'The Duckie Song | Kids Water Animal Song | Aly Bouchnak',
      description: 'Sweet duck adventure song for kids. Learn about ducks and water animals through playful storytelling. Ages 2-6.',
      keywords: 'duck song for kids, duckie song, water animal song, pond song, kids animal adventure, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/duckie-song',
      ogImage: 'https://alybouchnak.com/images/duckie-song-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/duckie-song#recording',
      name: 'The Duckie Song',
      url: 'https://alybouchnak.com/track/duckie-song',
      duration: 'PT2M32S',
      genre: "Children's Pop, Animal Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2026-02-12',
      isrcCode: 'GX8LD2660078',
      description: 'A sweet song about a little duck\'s adventures teaching about water animals and encouraging imagination.',
      image: 'https://alybouchnak.com/images/duckie-song-cover.webp'
    }
  },
  {
    id: 11,
    slug: 'zakzooka-the-bear',
    title: 'Zakzooka The Bear',
    subtitle: 'Friendly bear adventure song (Ages 2–6)',
    description: 'An adventurous song about Zakzooka the bear and his forest friends, teaching about bears, friendship, and woodland animals through storytelling.',
    coverImage: '/images/zakzooka-the-bear-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-02-14',
    duration: '2:21',
    bpm: 118,
    genre: "Children's Pop, Story Songs",
    ageRange: '2-6 years',
    mood: 'Adventurous',
    routine: 'Playtime',
    isrc: 'GX8LD2691082',
    upc: '5063941025018',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Zakzooka is a dizzy, whizzy, fuzzy bear",
      "He has a wiggly tummy and messy, messy hair!",
      "He eats the yummy food, he is always in a mood",
      "For fishy, mushy, sushi... it is so good!"
    ],
    lyricsFull: `(Roar!)
Who is that bear?
(It's Zakzooka!)
Let's go!

Zakzooka is a dizzy, whizzy, fuzzy bear
He has a wiggly tummy and messy, messy hair!

He eats the yummy food, he is always in a mood
For fishy, mushy, sushi... it is so good!
(Yum, yum, yum!)

Zak, Zak, Zak, Zak
Zak, Zak, Zoo-ooo!
(We love you!)
Zak, Zak, Zak, Zak
Zak, Zak, Zoo-Kaa!
(He's the bear!)
Zak, Zak, Zak, Zak
Zak, Zak, Zoo-ooo!
Zak-Zoo-Ka!

He has no fear, he flies up in the air
(Fly, fly, fly!)
He swims inside the water, splashing everywhere
(Splash, splash, splash!)
Now stomp your feet like a big fuzzy bear
(Stomp! Stomp!)
And roar like Zakzooka if you dare!
(ROAR!)

Are you ready to roar?
(Yeah!)
Are you ready for more?
(Let's go!)

Zak, Zak, Zak, Zak
Zak, Zak, Zoo-ooo!
(We love you!)
Zak, Zak, Zak, Zak
Zak, Zak, Zoo-Kaa!
(He's the bear!)
Zak, Zak, Zak, Zak
Zak, Zak, Zoo-ooo!
Zak-Zoo-Ka!

Fishy, mushy, sushi!
(Sushi!)
Fishy, mushy, sushi!
(Sushi!)
Dizzy, whizzy, fuzzy!
(Fuzzy!)
Who is the bear?
(Zakzooka!)

Zak, Zak, Zoo-ooo...
Zak, Zak, Zoo-Kaa...
(Bye bye bear!)`,
    educationalBenefits: [
      { title: 'Storytelling Skills', description: 'Develops narrative understanding through song storytelling.' },
      { title: 'Friendship Values', description: 'Teaches about friendship and helping others.' },
      { title: 'Forest Animals', description: 'Introduces children to woodland creatures and their habitats.' },
      { title: 'Character Development', description: 'Builds understanding of personality traits through Zakzooka.' }
    ],
    artistNote: 'Creating Zakzooka as a character was so much fun. I wanted a bear who was gentle, adventurous, and always ready to help friends. Kids need heroes they can relate to!',
    relatedTracks: [1, 2, 10],
    seo: {
      title: 'Zakzooka The Bear | Kids Forest Adventure Song | Aly Bouchnak',
      description: 'Adventurous bear song teaching friendship and forest animals. Follow Zakzooka through woodland adventures. Ages 2-6.',
      keywords: 'bear song for kids, forest adventure song, Zakzooka, woodland animals song, kids story song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/zakzooka-the-bear',
      ogImage: 'https://alybouchnak.com/images/zakzooka-the-bear-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/zakzooka-the-bear#recording',
      name: 'Zakzooka The Bear',
      url: 'https://alybouchnak.com/track/zakzooka-the-bear',
      duration: 'PT2M21S',
      genre: "Children's Pop, Story Songs",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2026-02-14',
      isrcCode: 'GX8LD2691082',
      description: 'An adventurous song about Zakzooka the bear teaching about friendship and woodland animals through storytelling.',
      image: 'https://alybouchnak.com/images/zakzooka-the-bear-cover.webp'
    }
  },
  // Tuned for Dreams Album (Sleep Music - UPC: 198391926950)
  {
    id: 12,
    slug: 'safe-container-calm-bedtime',
    title: 'The Safe Container | Calm Bedtime Routine',
    subtitle: 'Gentle sleep preparation song (Ages 0–3)',
    description: 'A soothing lullaby that creates a feeling of safety and security, helping children transition from active play to peaceful sleep through gentle melodies and calming rhythms.',
    coverImage: '/images/safe-container-calm-bedtime-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-09',
    duration: '2:44',
    bpm: 60,
    genre: "Children's Lullabies, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Calming',
    routine: 'Bedtime',
    isrc: 'GXJ2E2568126',
    upc: '5063893028990',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Mm-mm, you are here, my love, I'm near",
      "Low and warm, I stay right here",
      "La-la, mellow light so slow",
      "Gentle room in a sleepy glow"
    ],
    lyricsFull: `Mm-mm, you are here, my love, I'm near
Low and warm, I stay right here
La-la, mellow light so slow
Gentle room in a sleepy glow

Mm-mm, little one, you feel, you see
Soft and safe with the room and me
La-la, hush of the window air
Tiny hands in the evening air

I am here, you are here
Close and calm, my melody near
Lo-lo, sway with the quiet night
Safe inside this tender light

Mm-mm, la-la, slow we stay
Drifting down in a gentle way
I am here, you are here
Mm-mm you are here`,
    educationalBenefits: [
      { title: 'Sleep Routine', description: 'Establishes consistent bedtime rituals and sleep associations.' },
      { title: 'Emotional Security', description: 'Builds feelings of safety and comfort for peaceful sleep.' },
      { title: 'Relaxation Skills', description: 'Teaches calming techniques for self-soothing.' },
      { title: 'Parent-Child Bonding', description: 'Strengthens attachment through shared bedtime routines.' }
    ],
    artistNote: 'I studied the concept of psychological safety and how important it is for children to feel contained and secure. This song was designed to create that feeling of being held, even when parents step out of the room.',
    relatedTracks: [13, 14, 15],
    seo: {
      title: 'The Safe Container | Calm Bedtime Routine | Sleep Music | Aly Bouchnak',
      description: 'Soothing lullaby for bedtime routine. Creates feelings of safety and security for peaceful sleep. Perfect for ages 0-3.',
      keywords: 'bedtime song, sleep music for kids, lullaby, calm bedtime routine, baby sleep aid, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/safe-container-calm-bedtime',
      ogImage: 'https://alybouchnak.com/images/safe-container-calm-bedtime-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/safe-container-calm-bedtime#recording',
      name: 'The Safe Container | Calm Bedtime Routine',
      url: 'https://alybouchnak.com/track/safe-container-calm-bedtime',
      duration: 'PT2M44S',
      genre: "Children's Lullabies, Sleep Music",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Tuned for Dreams',
        '@id': 'https://alybouchnak.com/album/tuned-for-dreams'
      },
      datePublished: '2026-01-09',
      isrcCode: 'GXJ2E2568126',
      description: 'A soothing lullaby creating feelings of safety and security for peaceful sleep.',
      image: 'https://alybouchnak.com/images/safe-container-calm-bedtime-cover.webp'
    }
  },
  {
    id: 13,
    slug: 'pendulum-rocking-lullaby',
    title: 'The Pendulum | Rocking Lullaby for Baby',
    subtitle: 'Soothing rocking motion song (Ages 0–2)',
    description: 'A gentle lullaby with rhythmic pendulum-like melodies that mimic the natural rocking motion, perfect for calming babies and promoting deep sleep.',
    coverImage: '/images/pendulum-rocking-lullaby-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-09',
    duration: '2:50',
    bpm: 55,
    genre: "Children's Lullabies, Infant Sleep",
    ageRange: '0-2 years',
    mood: 'Soothing',
    routine: 'Bedtime',
    isrc: 'GXJ2E2572277',
    upc: '5063893028990',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Back and forth... we sway so slow",
      "Moving soft... from high to low",
      "Side to side... the quiet air",
      "Cradle swing... you're resting there"
    ],
    lyricsFull: `Back and forth... we sway so slow
Moving soft... from high to low
Side to side... the quiet air
Cradle swing... you're resting there

Left to right... the night is warm
Steady waves... a gentle form
Slow we drift... with every roll
Soft and low... your settling soul

Back and forth... high to low
Here we swing... in an easy flow
Row by row... the moments glide
You and me... side to side

(Slow and low)
Slow and low... we drift again
(We drift again)
(Back and forth)
Back and forth... like a tender wind
Side to side... in a peaceful bend`,
    educationalBenefits: [
      { title: 'Sensory Development', description: 'Supports vestibular system development through rhythmic patterns.' },
      { title: 'Sleep Association', description: 'Creates positive sleep associations with calming music.' },
      { title: 'Rhythm Recognition', description: 'Develops internal sense of rhythm and timing.' },
      { title: 'Calm Transition', description: 'Helps babies transition from alert to sleep states.' }
    ],
    artistNote: 'I researched how rocking motion affects infant brain development and created this song to mimic that natural soothing rhythm. The pendulum metaphor represents both the physical rocking and the gentle passage into sleep.',
    relatedTracks: [12, 14, 15],
    seo: {
      title: 'The Pendulum | Rocking Lullaby for Baby | Sleep Music | Aly Bouchnak',
      description: 'Gentle rocking lullaby mimicking natural motion. Rhythmic melodies calm babies and promote deep sleep. Perfect for ages 0-2.',
      keywords: 'rocking lullaby, baby sleep song, infant sleep music, pendulum sleep aid, gentle rocking song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/pendulum-rocking-lullaby',
      ogImage: 'https://alybouchnak.com/images/pendulum-rocking-lullaby-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/pendulum-rocking-lullaby#recording',
      name: 'The Pendulum | Rocking Lullaby for Baby',
      url: 'https://alybouchnak.com/track/pendulum-rocking-lullaby',
      duration: 'PT2M50S',
      genre: "Children's Lullabies, Infant Sleep",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Tuned for Dreams',
        '@id': 'https://alybouchnak.com/album/tuned-for-dreams'
      },
      datePublished: '2026-01-09',
      isrcCode: 'GXJ2E2572277',
      description: 'A gentle lullaby with pendulum-like melodies mimicking natural rocking motion for calming babies.',
      image: 'https://alybouchnak.com/images/pendulum-rocking-lullaby-cover.webp'
    }
  },
  {
    id: 14,
    slug: 'sacred-shush-baby-shusher',
    title: 'The Sacred Shush | Baby Shusher Sound',
    subtitle: 'Traditional shushing sleep aid (Ages 0–1)',
    description: 'Based on the traditional "shushing" technique used by parents worldwide, this track combines gentle shushing sounds with soft melodies to calm fussy babies.',
    coverImage: '/images/sacred-shush-baby-shusher-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-09',
    duration: '2:45',
    bpm: 50,
    genre: "Children's Sleep, White Noise",
    ageRange: '0-1 years',
    mood: 'Tranquil',
    routine: 'Bedtime',
    isrc: 'GXJ2E2509998',
    upc: '5063893028990',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Shh, The sea is soft tonight",
      "Shh, Flow drifting in the light",
      "Soft winds circle, low and slow",
      "Shaa-sway where the quiet blows"
    ],
    lyricsFull: `Shhh
The sea is soft tonight
Sssh
Flow drifting in the light
Soft winds circle, low and slow
Shaa-sway where the quiet blows

Shhh
The air moves round your face
Siiih-sigh in a gentle pace
Slow breeze rising, slow breeze fall
Shhh-around you, covering all

Shhh
You're safe in this sound
Soft waves rolling all around
Shhh
The hush that holds you tight
Steady seas through the silent night

Shhh
Slow air... drifting near
Shhh
Soft wind... always here`,
    educationalBenefits: [
      { title: 'Calming Reflex', description: 'Activates the calming reflex in infants through rhythmic shushing.' },
      { title: 'Sleep Induction', description: 'Helps induce sleep states in fussy or overtired babies.' },
      { title: 'Womb Association', description: 'Mimics sounds heard in utero for comfort and familiarity.' },
      { title: 'Parent Support', description: 'Provides consistent shushing when parents need a break.' }
    ],
    artistNote: 'I interviewed parents from different cultures and found that shushing is universal. This track combines that ancient wisdom with gentle musical elements for modern parents who need a break from constant shushing.',
    relatedTracks: [12, 13, 15],
    seo: {
      title: 'The Sacred Shush | Baby Shusher Sound | Sleep Aid | Aly Bouchnak',
      description: 'Traditional shushing technique combined with soft melodies. Calms fussy babies and promotes sleep. Perfect for ages 0-1.',
      keywords: 'baby shusher, shushing sound, baby sleep aid, white noise for babies, infant calming, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/sacred-shush-baby-shusher',
      ogImage: 'https://alybouchnak.com/images/sacred-shush-baby-shusher-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/sacred-shush-baby-shusher#recording',
      name: 'The Sacred Shush | Baby Shusher Sound',
      url: 'https://alybouchnak.com/track/sacred-shush-baby-shusher',
      duration: 'PT2M45S',
      genre: "Children's Sleep, White Noise",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Tuned for Dreams',
        '@id': 'https://alybouchnak.com/album/tuned-for-dreams'
      },
      datePublished: '2026-01-09',
      isrcCode: 'GXJ2E2509998',
      description: 'Traditional shushing technique combined with soft melodies to calm fussy babies.',
      image: 'https://alybouchnak.com/images/sacred-shush-baby-shusher-cover.webp'
    }
  },
  {
    id: 15,
    slug: 'ancient-tongue-deep-sleep-humming',
    title: 'The Ancient Tongue | Deep Sleep Humming',
    subtitle: 'Meditative humming lullaby (Ages 0–3)',
    description: 'A meditative track featuring gentle humming frequencies that resonate with the natural calming frequencies of the human voice, promoting deep and restorative sleep.',
    coverImage: '/images/ancient-tongue-deep-sleep-humming-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-09',
    duration: '3:52',
    bpm: 45,
    genre: "Children's Meditation, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Meditative',
    routine: 'Bedtime',
    isrc: 'GXJ2E2555627',
    upc: '5063893028990',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "(Instrumental)"
    ],
    lyricsFull: `(Instrumental)`,
    educationalBenefits: [
      { title: 'Resonance Therapy', description: 'Uses vocal frequencies to promote physical and emotional calm.' },
      { title: 'Breathing Regulation', description: 'Encourages deep, rhythmic breathing patterns.' },
      { title: 'Nervous System Regulation', description: 'Supports parasympathetic nervous system activation.' },
      { title: 'Deep Sleep Support', description: 'Facilitates transition to deeper sleep stages.' }
    ],
    artistNote: 'I studied the science of vocal resonance and how humming affects the vagus nerve. The ancient human practice of humming to soothe babies transcends culture and time.',
    relatedTracks: [12, 14, 16],
    seo: {
      title: 'The Ancient Tongue | Deep Sleep Humming | Meditation | Aly Bouchnak',
      description: 'Meditative humming frequencies for deep sleep. Vocal resonance promotes calm and restorative rest. Ages 0-3.',
      keywords: 'sleep humming, meditation for babies, deep sleep music, vocal resonance sleep, calming frequencies, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/ancient-tongue-deep-sleep-humming',
      ogImage: 'https://alybouchnak.com/images/ancient-tongue-deep-sleep-humming-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/ancient-tongue-deep-sleep-humming#recording',
      name: 'The Ancient Tongue | Deep Sleep Humming',
      url: 'https://alybouchnak.com/track/ancient-tongue-deep-sleep-humming',
      duration: 'PT3M52S',
      genre: "Children's Meditation, Sleep Music",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Tuned for Dreams',
        '@id': 'https://alybouchnak.com/album/tuned-for-dreams'
      },
      datePublished: '2026-01-09',
      isrcCode: 'GXJ2E2555627',
      description: 'Meditative humming frequencies resonating with natural calming frequencies to promote deep sleep.',
      image: 'https://alybouchnak.com/images/ancient-tongue-deep-sleep-humming-cover.webp'
    }
  },
  {
    id: 16,
    slug: 'infinite-loop-continuous-sleep-aid',
    title: 'The Infinite Loop | Continuous Sleep Aid',
    subtitle: 'Seamless looping sleep music (Ages 0–3)',
    description: 'Designed to loop seamlessly throughout the night, this track provides continuous gentle background music that maintains sleep without disruptive transitions.',
    coverImage: '/images/infinite-loop-continuous-sleep-aid-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-09',
    duration: '3:32',
    bpm: 40,
    genre: "Children's Ambient, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Continuous',
    routine: 'Bedtime',
    isrc: 'GXJ2E2577222',
    upc: '5063893028990',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "(Instrumental)"
    ],
    lyricsFull: `(Instrumental)`,
    educationalBenefits: [
      { title: 'Sleep Maintenance', description: 'Helps maintain sleep throughout the night without disturbances.' },
      { title: 'Consistent Environment', description: 'Provides stable auditory environment for better sleep quality.' },
      { title: 'Nighttime Security', description: 'Offers continuous comfort for children who wake during night.' },
      { title: 'Sleep Architecture', description: 'Supports healthy sleep cycle progression.' }
    ],
    artistNote: 'The challenge was creating music that could loop infinitely without becoming repetitive or annoying. I used generative ambient techniques so it feels fresh even after hours of play.',
    relatedTracks: [12, 15, 17],
    seo: {
      title: 'The Infinite Loop | Continuous Sleep Aid | Ambient | Aly Bouchnak',
      description: 'Seamless looping sleep music for all-night use. Maintains peaceful sleep without disruptive transitions. Ages 0-3.',
      keywords: 'continuous sleep music, looping lullaby, ambient sleep, all night sleep aid, seamless sleep music, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/infinite-loop-continuous-sleep-aid',
      ogImage: 'https://alybouchnak.com/images/infinite-loop-continuous-sleep-aid-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/infinite-loop-continuous-sleep-aid#recording',
      name: 'The Infinite Loop | Continuous Sleep Aid',
      url: 'https://alybouchnak.com/track/infinite-loop-continuous-sleep-aid',
      duration: 'PT3M32S',
      genre: "Children's Ambient, Sleep Music",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Tuned for Dreams',
        '@id': 'https://alybouchnak.com/album/tuned-for-dreams'
      },
      datePublished: '2026-01-09',
      isrcCode: 'GXJ2E2577222',
      description: 'Seamless looping sleep music providing continuous gentle background for all-night sleep.',
      image: 'https://alybouchnak.com/images/infinite-loop-continuous-sleep-aid-cover.webp'
    }
  },
  {
    id: 17,
    slug: 'protective-shadow-night-drone',
    title: 'The Protective Shadow | Night Drone for Sleep',
    subtitle: 'Protective drone sleep music (Ages 0–3)',
    description: 'A protective drone frequency that creates a feeling of being watched over and safe, using low-frequency tones that mimic the comforting presence of a caregiver.',
    coverImage: '/images/protective-shadow-night-drone-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-09',
    duration: '2:45',
    bpm: 35,
    genre: "Children's Drone, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Protective',
    routine: 'Bedtime',
    isrc: 'GXJ2E2505077',
    upc: '5063893028990',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Safe in the dark, I'm here with you",
      "Warm as the night, Soft, gentle, true",
      "Deep in the hush, Shadows fall low",
      "Quiet and slow, Where safe feelings grow"
    ],
    lyricsFull: `Safe in the dark
I'm here with you
Warm as the night
Soft, gentle, true
Deep in the hush
Shadows fall low
Quiet and slow
Where safe feelings grow

Warm is the room
Calm is the air
Deep is the peace
Holding you there
Safe in the still
Nothing to fear
Soft as a sigh
When someone is near

Safe and warm
Deep and slow
Rest in the place
Where soft shadows go
Warm and deep
Safe and low
Held in the dark by the hum below

Safe... warm... deep... we stay
Low hum guarding through the way`,
    educationalBenefits: [
      { title: 'Security Building', description: 'Creates feeling of safety and protection during sleep.' },
      { title: 'Anxiety Reduction', description: 'Reduces nighttime fears through protective auditory cues.' },
      { title: 'Attachment Security', description: 'Supports secure attachment even when caregiver is not present.' },
      { title: 'Deep Relaxation', description: 'Promotes profound physical and mental relaxation.' }
    ],
    artistNote: 'I wanted to create an auditory security blanket. The low drone frequency mimics the feeling of someone standing nearby, providing comfort for children who fear the dark.',
    relatedTracks: [12, 15, 16],
    seo: {
      title: 'The Protective Shadow | Night Drone for Sleep | Aly Bouchnak',
      description: 'Protective drone frequency for sleep. Creates feeling of being watched over and safe. Low-frequency comfort tones. Ages 0-3.',
      keywords: 'sleep drone, protective sleep music, night drone for kids, low frequency sleep, anxiety reducing music, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/protective-shadow-night-drone',
      ogImage: 'https://alybouchnak.com/images/protective-shadow-night-drone-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/protective-shadow-night-drone#recording',
      name: 'The Protective Shadow | Night Drone for Sleep',
      url: 'https://alybouchnak.com/track/protective-shadow-night-drone',
      duration: 'PT2M45S',
      genre: "Children's Drone, Sleep Music",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Tuned for Dreams',
        '@id': 'https://alybouchnak.com/album/tuned-for-dreams'
      },
      datePublished: '2026-01-09',
      isrcCode: 'GXJ2E2505077',
      description: 'Protective drone frequency creating a feeling of being watched over and safe during sleep.',
      image: 'https://alybouchnak.com/images/protective-shadow-night-drone-cover.webp'
    }
  },
  {
    id: 18,
    slug: 'liquid-room-brown-noise-womb',
    title: 'The Liquid Room | Brown Noise Womb Sound',
    subtitle: 'Womb-like brown noise sleep aid (Ages 0–1)',
    description: 'Recreates the familiar sounds of the womb with brown noise and liquid-like frequencies, providing newborns with the comforting sounds they heard before birth.',
    coverImage: '/images/liquid-room-brown-noise-womb-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-09',
    duration: '3:53',
    bpm: 30,
    genre: "Children's White Noise, Infant Sleep",
    ageRange: '0-1 years',
    mood: 'Womb-like',
    routine: 'Bedtime',
    isrc: 'GXJ2E2518383',
    upc: '5063893028990',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "(instrumental)",
      "Liquid sounds, gentle storm",
      "Brown noise, soft and low",
      "Baby sleeps, starts to grow"
    ],
    lyricsFull: `(instrumental)`,
    educationalBenefits: [
      { title: 'Womb Comfort', description: 'Recreates familiar prenatal auditory environment for newborns.' },
      { title: 'Noise Masking', description: 'Blocks out disruptive environmental sounds for better sleep.' },
      { title: 'Transition Support', description: 'Helps newborns adjust to life outside the womb.' },
      { title: 'Calming Reflex', description: 'Triggers natural calming responses through familiar frequencies.' }
    ],
    artistNote: 'I studied recordings from inside the womb and worked with sound engineers to recreate those exact frequencies. For newborns, this is not just music, it is coming home.',
    relatedTracks: [12, 14, 17],
    seo: {
      title: 'The Liquid Room | Brown Noise Womb Sound | Newborn Sleep | Aly Bouchnak',
      description: 'Womb-like brown noise for newborns. Recreates prenatal sounds for comfort and better sleep. Perfect for ages 0-1.',
      keywords: 'womb sounds, brown noise for babies, newborn sleep aid, prenatal sound recreation, infant white noise, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/liquid-room-brown-noise-womb',
      ogImage: 'https://alybouchnak.com/images/liquid-room-brown-noise-womb-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/liquid-room-brown-noise-womb#recording',
      name: 'The Liquid Room | Brown Noise Womb Sound',
      url: 'https://alybouchnak.com/track/liquid-room-brown-noise-womb',
      duration: 'PT3M53S',
      genre: "Children's White Noise, Infant Sleep",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Tuned for Dreams',
        '@id': 'https://alybouchnak.com/album/tuned-for-dreams'
      },
      datePublished: '2026-01-09',
      isrcCode: 'GXJ2E2518383',
      description: 'Womb-like brown noise recreating familiar prenatal sounds for newborn comfort and sleep.',
      image: 'https://alybouchnak.com/images/liquid-room-brown-noise-womb-cover.webp'
    }
  },
  {
    id: 19,
    slug: 'dimming-light-soft-sleepy-music',
    title: 'The Dimming Light | Soft Sleepy Music',
    subtitle: 'Gentle sleep transition music (Ages 0–3)',
    description: 'Soft, gradually fading melodies that mimic the natural dimming of light at sunset, helping children transition from alertness to sleepiness naturally.',
    coverImage: '/images/dimming-light-soft-sleepy-music-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2026-01-09',
    duration: '2:42',
    bpm: 50,
    genre: "Children's Lullabies, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Transitional',
    routine: 'Bedtime',
    isrc: 'GXJ2E2542577',
    upc: '5063893028990',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Goodnight, little eyes... the room grows dim",
      "Shapes turn soft... at the quiet rim",
      "Edges fall... into evening's hue",
      "Slowly fading... out of view"
    ],
    lyricsFull: `Goodnight, little eyes... the room grows dim
Shapes turn soft... at the quiet rim
Edges fall... into evening's hue
Slowly fading... out of view

Goodnight, tiny lights... they drift away
Soft and low... at the edge of day
Colors blur... in a gentle slide
Shadows finding... where they hide

Goodnight... goodnight... sinking low
Everything softer... as we let go
Goodnight... goodnight... all grows slight
Falling gently... into night

Goodnight... dim light... fading slow
Quiet world... begins to go`,
    educationalBenefits: [
      { title: 'Circadian Rhythm', description: 'Supports natural sleep-wake cycle through sunset associations.' },
      { title: 'Transition Support', description: 'Helps children transition from active play to sleep readiness.' },
      { title: 'Sensory Integration', description: 'Connects visual and auditory experiences of sunset.' },
      { title: 'Calming Cues', description: 'Creates environmental cues that signal sleep time.' }
    ],
    artistNote: 'I wanted to capture that magical twilight hour when the world gets quieter and softer. The gradual fade in the music mirrors the natural dimming of daylight, signaling to the body that rest is coming.',
    relatedTracks: [12, 13, 15],
    seo: {
      title: 'The Dimming Light | Soft Sleepy Music | Sunset Sleep | Aly Bouchnak',
      description: 'Gentle fading melodies mimicking sunset. Helps children transition naturally to sleepiness. Ages 0-3.',
      keywords: 'sunset sleep music, dimming light lullaby, sleep transition music, twilight sleep aid, evening sleep song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/dimming-light-soft-sleepy-music',
      ogImage: 'https://alybouchnak.com/images/dimming-light-soft-sleepy-music-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/dimming-light-soft-sleepy-music#recording',
      name: 'The Dimming Light | Soft Sleepy Music',
      url: 'https://alybouchnak.com/track/dimming-light-soft-sleepy-music',
      duration: 'PT2M42S',
      genre: "Children's Lullabies, Sleep Music",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Tuned for Dreams',
        '@id': 'https://alybouchnak.com/album/tuned-for-dreams'
      },
      datePublished: '2026-01-09',
      isrcCode: 'GXJ2E2542577',
      description: 'Soft, gradually fading melodies mimicking natural sunset dimming to help children transition to sleep.',
      image: 'https://alybouchnak.com/images/dimming-light-soft-sleepy-music-cover.webp'
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
