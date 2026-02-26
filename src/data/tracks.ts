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
    id: 1,
    slug: 'bock-bock-chicken',
    title: 'Bock Bock Chicken',
    subtitle: 'Fun farm animal movement song (Ages 2–6)',
    description: 'A lively chicken dance song that encourages children to mimic chicken movements and sounds while developing motor skills and rhythm.',
    coverImage: '/images/bock-bock-chicken-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2025-09-16',
    duration: '1:56',
    bpm: 113,
    genre: "Children's Music, Pop, Electronic, Nursery Rhymes",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Playtime',
    isrc: 'GXF972564744',
    upc: '5063845149704',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/4AimLy0XuYJQMxMKySCbO6',
    appleMusicUrl: 'https://music.apple.com/us/song/bock-bock-chicken/1845936213',
    youtubeUrl: 'https://youtu.be/rvmLSLbVJ_k',
    amazonUrl: 'https://music.amazon.com/tracks/B0FVYDQ5M5',
    lyricsPreview: [
      "Bock bock bock bock chicken!",
      "On Bock bock bock bock banana",
      "In a bock bock bock bandana!"
    ],
    lyricsFull: `Bock bock bock bock chicken!
On Bock bock bock bock banana
Bock bock bock bock chicken!
In a bock bock bock bandana!

Bock bock chicken
On a bock bock banana
In a bock bock bandana

Bock bock chicken
On a bock bock banana
In a Bock Bock bandana

Bock bock bock bock chicken!
On Bock bock bock bock banana
Bock bock bock bock chicken!
In a bock bock bock bandana!

Bock bock chicken
On a bock bock banana
In a bock bock bandana

Bock bock chicken
On a bock bock banana
In a bock bock bandana

Bock bock bock bock chicken!
On Bock bock bock bock banana
Bock bock bock bock chicken!
In a bock bock bock bandana!

Bock bock chicken
On a bock bock banana
In a bock bock bandana

Bock bock chicken
On a bock bock banana
In a bock bock bandana

Bock (bock) bock (bock) chickens!
(On a bock) bock (bock) bock (banana.)
Bock (bock) bock (bock) chickens!
(In a bock) bock (bock) bandana!

Bock bock chickens
(on a bock bock banana)
In a bock bock bandanas

(Bock bock chickens)
On a bock bock banana
(In a bock bock bandanas)

Bock bock bock bock chicken!
On bock bock bock bock banana
Bock bock bock bock chicken!
In a bock bock bock bandana!

Bock bock chicken
On a bock bock banana
In a bock bock bandana

Bock bock chicken
On a bock bock banana
In a bock bock bandana

Bock bock bock bock chicken!
On bock bock bock bock banana`,
    educationalBenefits: [
      { title: 'Animal Recognition', description: 'Teaches children about farm animals and their sounds.' },
      { title: 'Motor Skills', description: 'Develops coordination through chicken dance movements.' },
      { title: 'Rhythm & Timing', description: 'Builds musical awareness through dance and movement.' },
      { title: 'Social Skills', description: 'Encourages group participation and shared fun.' }
    ],
    artistNote: 'I wrote this song while watching my niece imitate chickens at a farm visit. The joy on her face as she flapped her arms and made "bock bock" sounds inspired me to create a song that celebrates that pure, uninhibited joy of movement and sound.',
    relatedTracks: [2, 3, 7],
    seo: {
      title: 'Bock Bock Chicken | Fun Farm Animal Dance Song | Aly Bouchnak',
      description: 'A lively chicken dance song for kids ages 2-6. Teach farm animal sounds while developing motor skills through movement and rhythm.',
      keywords: 'chicken song, farm animal songs, kids dance song, toddler movement song, animal sounds song, Aly Bouchnak',
      canonical: 'https://alybouchnak.com/track/bock-bock-chicken',
      ogImage: 'https://alybouchnak.com/images/bock-bock-chicken-cover.webp'
    },
    trackSchema: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      '@id': 'https://alybouchnak.com/track/bock-bock-chicken#recording',
      name: 'Bock Bock Chicken',
      url: 'https://alybouchnak.com/track/bock-bock-chicken',
      duration: 'PT1M56S',
      genre: "Children's Music, Pop, Electronic, Nursery Rhymes",
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Aly Bouchnak'
      },
      inAlbum: {
        '@type': 'MusicAlbum',
        name: "The Bloom's House: Volume 1",
        '@id': 'https://alybouchnak.com/album/the-blooms-house-volume-1'
      },
      datePublished: '2025-09-16',
      isrcCode: 'GXF972564744',
      description: 'A lively chicken dance song that encourages children to mimic chicken movements and sounds while developing motor skills and rhythm.',
      image: 'https://alybouchnak.com/images/bock-bock-chicken-cover.webp'
    }
  },
  {
    id: 2,
    slug: 'pet-pop-animal-song',
    title: 'Pet-Pop | The Animal Song',
    subtitle: 'Fun pet animal movement song (Ages 2–6)',
    description: 'A lively song about different pets and their sounds, encouraging children to mimic animal movements and sounds. Perfect for pet-themed activities and learning about domestic animals.',
    coverImage: '/images/pet-pop-animal-song-cover.webp',
    artist: 'Aly Bouchnak',
    releaseDate: '2025-12-19',
    duration: '2:09',
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
      duration: 'PT2M09S',
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
    routine: 'Playtime',s
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
    duration: '2:35',
    bpm: 135,
    genre: "Children's Pop, Counting Songs",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Playtime',
    isrc: 'GXF972564749',
    upc: '198391926948',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Five little monkeys jumping on the bed",
      "One fell off and bumped his head",
      "Mama called the doctor and the doctor said",
      "No more monkeys jumping on the bed"
    ],
    lyricsFull: `Verse 1:
Five little monkeys jumping on the bed
One fell off and bumped his head
Mama called the doctor and the doctor said
"No more monkeys jumping on the bed!"

Chorus:
It's a jungle party, swing and sway
Jungle party, let's all play
Monkey see and monkey do
Dancing at the zoo!

Verse 2:
Four little monkeys jumping on the bed
One fell off and bumped his head
Mama called the doctor and the doctor said
"No more monkeys jumping on the bed!"

(Repeat Chorus)

Verse 3:
Three little monkeys jumping on the bed
One fell off and bumped his head
Mama called the doctor and the doctor said
"No more monkeys jumping on the bed!"

(Continue counting down...)

Outro:
No little monkeys jumping on the bed
None fell off and bumped their head
Mama called the doctor and the doctor said
"Put those monkeys right to bed!"`,
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
      duration: 'PT2M35S',
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
      isrcCode: 'GXF972564749',
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
    duration: '2:40',
    bpm: 130,
    genre: "Children's Pop, Transportation Songs",
    ageRange: '2-6 years',
    mood: 'Energetic',
    routine: 'Movement',
    isrc: 'GXF972564750',
    upc: '198391926948',
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
    lyricsFull: `Verse 1:
The wheels on the bus go round and round
Round and round, round and round
The wheels on the bus go round and round
All through the town

Chorus:
Party ride, party ride
Everybody dance inside
Party ride, party ride
Let's have fun, let's take a ride!

Verse 2:
The wipers on the bus go swish swish swish
Swish swish swish, swish swish swish
The wipers on the bus go swish swish swish
All through the town

(Repeat Chorus)

Verse 3:
The horn on the bus goes beep beep beep
Beep beep beep, beep beep beep
The horn on the bus goes beep beep beep
All through the town

(Repeat Chorus)

Verse 4:
The people on the bus go up and down
Up and down, up and down
The people on the bus go up and down
All through the town

(Repeat Chorus)`,
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
      duration: 'PT2M40S',
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
      isrcCode: 'GXF972564750',
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
    duration: '2:30',
    bpm: 135,
    genre: "Children's Pop, Action Songs",
    ageRange: '2-6 years',
    mood: 'Celebratory',
    routine: 'Celebration',
    isrc: 'GXF972564751',
    upc: '198391926948',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "If you're happy and you know it, clap your hands",
      "If you're happy and you know it, clap your hands",
      "If you're happy and you know it, then your face will surely show it",
      "If you're happy and you know it, clap your hands"
    ],
    lyricsFull: `Verse 1:
If you're happy and you know it, clap your hands
If you're happy and you know it, clap your hands
If you're happy and you know it, then your face will surely show it
If you're happy and you know it, clap your hands

Chorus:
Party time, everybody dance
Party time, clap your hands
Party time, stomp your feet
Party time, feeling sweet!

Verse 2:
If you're happy and you know it, stomp your feet
If you're happy and you know it, stomp your feet
If you're happy and you know it, then your face will surely show it
If you're happy and you know it, stomp your feet

(Repeat Chorus)

Verse 3:
If you're happy and you know it, shout "Hooray!"
If you're happy and you know it, shout "Hooray!"
If you're happy and you know it, then your face will surely show it
If you're happy and you know it, shout "Hooray!"

(Repeat Chorus)

Verse 4:
If you're happy and you know it, do all three
If you're happy and you know it, do all three
If you're happy and you know it, then your face will surely show it
If you're happy and you know it, do all three`,
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
      duration: 'PT2M30S',
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
      isrcCode: 'GXF972564751',
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
    duration: '2:20',
    bpm: 130,
    genre: "Children's Pop, Body Awareness Songs",
    ageRange: '2-6 years',
    mood: 'Energetic',
    routine: 'Movement',
    isrc: 'GXF972564752',
    upc: '198391926948',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Head, shoulders, knees and toes, knees and toes",
      "Head, shoulders, knees and toes, knees and toes",
      "Eyes and ears and mouth and nose",
      "Head, shoulders, knees and toes, knees and toes"
    ],
    lyricsFull: `Verse 1:
Head, shoulders, knees and toes, knees and toes
Head, shoulders, knees and toes, knees and toes
Eyes and ears and mouth and nose
Head, shoulders, knees and toes, knees and toes

Chorus:
Body party, everybody move
Body party, find your groove
Touch your head, touch your toes
Everybody knows!

Verse 2:
Head, shoulders, knees and toes, knees and toes
Head, shoulders, knees and toes, knees and toes
Eyes and ears and mouth and nose
Head, shoulders, knees and toes, knees and toes

(Repeat Chorus - speed up!)

Verse 3 (fast):
Head, shoulders, knees and toes, knees and toes
Head, shoulders, knees and toes, knees and toes
Eyes and ears and mouth and nose
Head, shoulders, knees and toes, knees and toes

(Repeat Chorus - super fast!)

Outro:
Body party, slow it down
Body party, all around
Great job learning body parts
You're super smart!`,
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
      duration: 'PT2M20S',
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
      isrcCode: 'GXF972564752',
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
    duration: '2:15',
    bpm: 125,
    genre: "Children's Pop, Educational Songs",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Learning',
    isrc: 'GXF972564753',
    upc: '198391926948',
    album: "The Bloom's House: Party Classics",
    albumUrl: '/album/the-blooms-house-classics-party',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "A-B-C-D-E-F-G",
      "H-I-J-K-L-M-N-O-P",
      "Q-R-S, T-U-V",
      "W-X, Y and Z"
    ],
    lyricsFull: `Verse 1:
A-B-C-D-E-F-G
H-I-J-K-L-M-N-O-P
Q-R-S, T-U-V
W-X, Y and Z

Chorus:
Now I know my ABCs
Next time, won't you sing with me?
Alphabet party, everybody sing
Learn the letters, let them ring!

Verse 2:
A is for apple, B is for ball
C is for cat, D is for doll
E is for elephant, F is for fun
G is for go, let's sing everyone!

(Repeat Chorus)

Verse 3:
H is for happy, I is for ice
J is for jump, K is for kite
L is for love, M is for me
N is for nice, as nice as can be!

(Repeat Chorus)`,
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
      duration: 'PT2M15S',
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
      isrcCode: 'GXF972564753',
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
    duration: '2:25',
    bpm: 120,
    genre: "Children's Pop, Animal Songs",
    ageRange: '2-6 years',
    mood: 'Playful',
    routine: 'Playtime',
    isrc: 'GXF972564754',
    upc: '198391926947',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Little duckie, swimming in the pond",
      "Quack, quack, quack, waving her little wand",
      "Little duckie, playing in the rain",
      "Quack, quack, quack, feeling no pain"
    ],
    lyricsFull: `Verse 1:
Little duckie, swimming in the pond
Quack, quack, quack, waving her little wand
Little duckie, playing in the rain
Quack, quack, quack, feeling no pain

Chorus:
Duckie, duckie, splashing all around
Duckie, duckie, making happy sounds
Quack, quack, quack, all day long
Duckie sings her happy song!

Verse 2:
Little duckie, waddling on the shore
Quack, quack, quack, wanting to explore
Little duckie, finding friends to play
Quack, quack, quack, having fun all day

(Repeat Chorus)

Bridge:
Swimming, splashing, diving deep
Little duckie never sleeps
Paddling through the water blue
Duckie loves the pond, it's true!

(Repeat Chorus)

Outro:
Little duckie, time to rest
Quack, quack, quack, you did your best
Little duckie, say goodnight
Sleep tight, duckie, sleep tight!`,
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
      duration: 'PT2M25S',
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
      isrcCode: 'GXF972564754',
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
    duration: '2:50',
    bpm: 118,
    genre: "Children's Pop, Story Songs",
    ageRange: '2-6 years',
    mood: 'Adventurous',
    routine: 'Playtime',
    isrc: 'GXF972564755',
    upc: '198391926947',
    album: "The Bloom's House: Volume 1",
    albumUrl: '/album/the-blooms-house-volume-1',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Zakzooka the bear, big and brown",
      "Walking through the forest town",
      "With his friends so brave and true",
      "Adventure awaits me and you"
    ],
    lyricsFull: `Verse 1:
Zakzooka the bear, big and brown
Walking through the forest town
With his friends so brave and true
Adventure awaits me and you

Chorus:
Zakzooka, Zakzooka, bear so kind
Zakzooka, Zakzooka, fun to find
Through the forest, through the trees
Adventure with the greatest ease!

Verse 2:
Zakzooka meets a rabbit small
Hopping down the forest hall
"Come with me," the rabbit says
"Let's explore the woodland ways!"

(Repeat Chorus)

Verse 3:
Zakzooka and the owl wise
Looking with those big round eyes
"The forest is our home," they sing
"Where every creature is a king!"

(Repeat Chorus)

Outro:
Zakzooka waves goodbye for now
To the forest town he takes a bow
Adventures done for this fine day
Come back soon, come back and play!`,
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
      duration: 'PT2M50S',
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
      isrcCode: 'GXF972564755',
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
    releaseDate: '2026-02-16',
    duration: '3:30',
    bpm: 60,
    genre: "Children's Lullabies, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Calming',
    routine: 'Bedtime',
    isrc: 'GXF972564756',
    upc: '198391926950',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Safe and warm, you're in my arms",
      "Protected from all harm",
      "Gentle dreams will come your way",
      "Sleep now, sleep now, safe today"
    ],
    lyricsFull: `Verse 1:
Safe and warm, you're in my arms
Protected from all harm
Gentle dreams will come your way
Sleep now, sleep now, safe today

Chorus:
Safe container, soft and deep
Safe container, drift to sleep
All is well, all is right
Sleep in peace tonight

Verse 2:
Close your eyes, breathe so slow
Let your worries go
Mommy's here, Daddy's near
There's nothing to fear

(Repeat Chorus)

Outro:
Safe and sound, you're in your bed
Rest your little head
Dreams are waiting just for you
Sleep tight the whole night through`,
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
      duration: 'PT3M30S',
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
      datePublished: '2026-02-16',
      isrcCode: 'GXF972564756',
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
    releaseDate: '2026-02-18',
    duration: '4:00',
    bpm: 55,
    genre: "Children's Lullabies, Infant Sleep",
    ageRange: '0-2 years',
    mood: 'Soothing',
    routine: 'Bedtime',
    isrc: 'GXF972564757',
    upc: '198391926950',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Rock a bye, gentle and slow",
      "Pendulum swings to and fro",
      "Baby sleeps, dreams so sweet",
      "Rocking rhythm, complete"
    ],
    lyricsFull: `Verse 1:
Rock a bye, gentle and slow
Pendulum swings to and fro
Baby sleeps, dreams so sweet
Rocking rhythm, complete

Chorus:
Swinging, swaying, soft and low
Like a pendulum's gentle flow
Back and forth, a soothing dance
Drift into sleep's sweet trance

Verse 2:
Close your eyes, my little one
The day is done, the night begun
Stars are shining in the sky
Rest your head, lullaby

(Repeat Chorus)

Bridge:
Tick tock, tick tock, time slows down
Tick tock, tick tock, no more frown
Peaceful rest is coming near
Sleep in comfort, have no fear

(Repeat Chorus)

Outro:
Rock a bye, baby, sleep tight
Everything is alright
Pendulum swings, dreams take flight
Goodnight, my love, goodnight`,
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
      duration: 'PT4M00S',
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
      datePublished: '2026-02-18',
      isrcCode: 'GXF972564757',
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
    releaseDate: '2026-02-20',
    duration: '5:00',
    bpm: 50,
    genre: "Children's Sleep, White Noise",
    ageRange: '0-1 years',
    mood: 'Tranquil',
    routine: 'Bedtime',
    isrc: 'GXF972564758',
    upc: '198391926950',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Shh, shh, shh, close your eyes",
      "Shh, shh, shh, no more cries",
      "Shh, shh, shh, peaceful rest",
      "Shh, shh, shh, sleep is best"
    ],
    lyricsFull: `Verse 1:
Shh, shh, shh, close your eyes
Shh, shh, shh, no more cries
Shh, shh, shh, peaceful rest
Shh, shh, shh, sleep is best

Chorus:
Sacred shush, ancient sound
Calming babies all around
Shh, shh, drift away
To dreamland, far away

Verse 2:
Shh, shh, shh, mama's near
Shh, shh, shh, have no fear
Shh, shh, shh, daddy's here
Shh, shh, shh, sleep my dear

(Repeat Chorus)

Bridge:
The shush that mothers softly sing
The comfort that this sound can bring
Across the world, in every place
This gentle sound brings sweet embrace

(Repeat Chorus)

Outro:
Shh, shh, shh, rest your head
Shh, shh, shh, in your bed
Shh, shh, shh, dreams so deep
Shh, shh, shh, go to sleep`,
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
      duration: 'PT5M00S',
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
      datePublished: '2026-02-20',
      isrcCode: 'GXF972564758',
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
    releaseDate: '2026-02-22',
    duration: '6:00',
    bpm: 45,
    genre: "Children's Meditation, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Meditative',
    routine: 'Bedtime',
    isrc: 'GXF972564759',
    upc: '198391926950',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Hum, hum, deep and low",
      "Hum, hum, watch you grow",
      "Hum, hum, peaceful dreams",
      "Hum, hum, moonlight beams"
    ],
    lyricsFull: `Verse 1:
Hum, hum, deep and low
Hum, hum, watch you grow
Hum, hum, peaceful dreams
Hum, hum, moonlight beams

Chorus:
Ancient sounds, soft and deep
Ancient sounds, drift to sleep
Hum with me, hum along
Sleep is sweet, all night long

Verse 2:
Hum, hum, voices old
Hum, hum, stories told
Hum, hum, calming art
Hum, hum, from the heart

(Repeat Chorus)

Bridge:
Before words, there was the hum
Soothing beats of the drum
Voice to voice, heart to heart
Sleep in peace, sleep and part

(Repeat Chorus)

Outro:
Hum, hum, fade away
Hum, hum, end the day
Hum, hum, sleep so deep
Hum, hum, dreams to keep`,
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
      duration: 'PT6M00S',
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
      datePublished: '2026-02-22',
      isrcCode: 'GXF972564759',
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
    releaseDate: '2026-02-24',
    duration: '8:00',
    bpm: 40,
    genre: "Children's Ambient, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Continuous',
    routine: 'Bedtime',
    isrc: 'GXF972564760',
    upc: '198391926950',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Soft and gentle, night long",
      "Peaceful music, sweet song",
      "Dreams continue, through the night",
      "Morning comes, with golden light"
    ],
    lyricsFull: `Verse 1:
Soft and gentle, night long
Peaceful music, sweet song
Dreams continue, through the night
Morning comes, with golden light

Chorus:
Infinite loop, endless peace
Infinite loop, sweet release
Music flows without an end
Sleep my child, my little friend

Verse 2:
Stars are shining in the sky
Clouds drift slowly passing by
Moonlight fills your room with grace
A peaceful, sleeping place

(Repeat Chorus)

Bridge:
No beginning, no end
Just love that I send
Through the music, through the sound
Safe and warm and always around

(Repeat Chorus)

Outro:
Infinite loop, gently fade
Infinite loop, dreams are made
Sleep in peace through the night
Wake with morning's golden light`,
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
      duration: 'PT8M00S',
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
      datePublished: '2026-02-24',
      isrcCode: 'GXF972564760',
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
    releaseDate: '2026-02-26',
    duration: '7:00',
    bpm: 35,
    genre: "Children's Drone, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Protective',
    routine: 'Bedtime',
    isrc: 'GXF972564761',
    upc: '198391926950',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Shadow stays, through the night",
      "Guardian angel, watching bright",
      "Safe and sound, in your bed",
      "Protected dreams, fill your head"
    ],
    lyricsFull: `Verse 1:
Shadow stays, through the night
Guardian angel, watching bright
Safe and sound, in your bed
Protected dreams, fill your head

Chorus:
Protective shadow, standing guard
Protective shadow, not so hard
Like a blanket, soft and deep
Watch over me while I sleep

Verse 2:
Through the darkness, light remains
Protective energy, break the chains
Of fear and worry, doubt and care
Love is with you everywhere

(Repeat Chorus)

Bridge:
Like a parent standing near
Like a whisper in your ear
"You are safe, you are loved"
Blessings from above

(Repeat Chorus)

Outro:
Shadow fades with morning light
Protected through the night
Wake with joy, wake with glee
Safe as safe can be`,
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
      duration: 'PT7M00S',
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
      datePublished: '2026-02-26',
      isrcCode: 'GXF972564761',
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
    releaseDate: '2026-02-28',
    duration: '10:00',
    bpm: 30,
    genre: "Children's White Noise, Infant Sleep",
    ageRange: '0-1 years',
    mood: 'Womb-like',
    routine: 'Bedtime',
    isrc: 'GXF972564762',
    upc: '198391926950',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Like the womb, safe and warm",
      "Liquid sounds, gentle storm",
      "Brown noise, soft and low",
      "Baby sleeps, starts to grow"
    ],
    lyricsFull: `Verse 1:
Like the womb, safe and warm
Liquid sounds, gentle storm
Brown noise, soft and low
Baby sleeps, starts to grow

Chorus:
Liquid room, fluid space
Liquid room, safe embrace
Sounds of before you were born
Comfort through the night till morn

Verse 2:
Remember this, from the start
The beating of your mother's heart
Fluid all around you flowed
Love and safety overflowed

(Repeat Chorus)

Bridge:
Brown noise gentle, deep and wide
Like the ocean's rolling tide
Constant, steady, always there
Love beyond compare

(Repeat Chorus)

Outro:
Liquid room, gently fade
Memories that we made
Grow in peace, grow in love
Blessings from above`,
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
      duration: 'PT10M00S',
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
      datePublished: '2026-02-28',
      isrcCode: 'GXF972564762',
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
    releaseDate: '2026-03-01',
    duration: '4:30',
    bpm: 50,
    genre: "Children's Lullabies, Sleep Music",
    ageRange: '0-3 years',
    mood: 'Transitional',
    routine: 'Bedtime',
    isrc: 'GXF972564763',
    upc: '198391926950',
    album: 'Tuned for Dreams',
    albumUrl: '/album/tuned-for-dreams',
    spotifyUrl: 'https://open.spotify.com/track/placeholder',
    appleMusicUrl: 'https://music.apple.com/placeholder',
    youtubeUrl: 'https://youtube.com/placeholder',
    amazonUrl: 'https://music.amazon.com/placeholder',
    lyricsPreview: [
      "Light is fading, day is done",
      "Evening shadows, everyone",
      "Stars are twinkling, in the sky",
      "Time to sleep, lullaby"
    ],
    lyricsFull: `Verse 1:
Light is fading, day is done
Evening shadows, everyone
Stars are twinkling, in the sky
Time to sleep, lullaby

Chorus:
Dimming light, soft and slow
Dimming light, watch it go
Sunset colors, fade to dark
Sleepy time, in the park

Verse 2:
Colors melting, into night
Softly fading, golden light
Moon is rising, clear and bright
Guiding dreams, through the night

(Repeat Chorus)

Bridge:
Like the sun that sets to rest
You have done your very best
Now it is time to close your eyes
Under starry skies

(Repeat Chorus - very softly)

Outro:
Dimming light, nearly gone
Dimming light, sing your song
Sleep in peace, dream in light
Goodnight, goodnight, goodnight`,
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
      duration: 'PT4M30S',
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
      datePublished: '2026-03-01',
      isrcCode: 'GXF972564763',
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
