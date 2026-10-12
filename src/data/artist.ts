export const artistSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://alybouchnak.com/#artist',
  name: 'Aly Bouchnak',
  url: 'https://alybouchnak.com/',
  image: 'https://alybouchnak.com/images/Aly-bouchnak-profile.webp',
  description: "Independent children's music artist, songwriter and producer, and creator of The Bloom's House.",
  knowsAbout: ["Children's Music", 'Songwriting', 'Music Production'],
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'ISNI', value: '0000000529569919' },
    { '@type': 'PropertyValue', propertyID: 'IPI', value: '01337888402' },
  ],
  sameAs: [
    'https://musicbrainz.org/artist/aaec4457-1558-4400-a316-72e14f698922',
    'https://music.apple.com/us/artist/aly-bouchnak/1840274949',
    'https://genius.com/artists/Aly-bouchnak',
    'https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8',
    'https://www.youtube.com/@alybouchnak',
    'https://www.instagram.com/alybouchnak/',
  ],
};
