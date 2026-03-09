import type { Article } from '../../data/articles';

const ARTICLE_INTERFACE = `export interface Article {
  id: number;
  slug: string;
  type: 'NewsArticle' | 'BlogPosting';
  title: string;
  description: string;
  content: string;
  category: 'News' | 'Resources' | 'Press' | 'Educational' | 'Music News' | 'Parenting' | 'Activity' | 'NeuroParenting';
  coverImage: {
    url: string;
    width: number;
    height: number;
    caption: string;
  };
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url: string;
    role: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogType: 'article';
    readingTime: string;
  };
  connections: {
    relatedTracks: number[];
    relatedAlbums: string[];
    youtubeVideoId?: string;
  };
  articleSchema: {
    "@context": "https://schema.org";
    "@type": "NewsArticle" | "BlogPosting";
    "headline": string;
    "image": string[];
    "datePublished": string;
    "dateModified": string;
    "author": {
      "@type": "Person";
      "name": string;
      "url": string;
    }[];
    "video"?: {
      "@type": "VideoObject";
      "name": string;
      "description": string;
      "thumbnailUrl": string;
      "contentUrl": string;
      "embedUrl": string;
    };
    "about"?: {
      "@type": "MusicRecording" | "MusicAlbum";
      "name": string;
      "url": string;
    }[];
  };
}`;

const ARTICLE_FUNCTIONS = `
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getAllArticles(): Article[] {
  return articles;
}
`;

export function generateArticlesFile(articles: Article[]): string {
  const dataString = JSON.stringify(articles, null, 2);
  return `${ARTICLE_INTERFACE}\n\nexport const articles: Article[] = ${dataString};\n${ARTICLE_FUNCTIONS}`;
}
