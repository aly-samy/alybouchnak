export function spotifyEmbedUrl(url: string): string | undefined {
  const match = /^https:\/\/open\.spotify\.com\/(album|track|playlist)\/([A-Za-z0-9]+)(?:\?|$)/.exec(url);
  return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : undefined;
}

export function isReleased(date: string): boolean {
  return Number.isFinite(Date.parse(date)) && Date.parse(date) <= Date.now();
}
