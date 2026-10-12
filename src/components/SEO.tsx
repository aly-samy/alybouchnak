import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'music.song' | 'music.album' | 'music.playlist' | 'article';
  schemaData?: Record<string, unknown>;
  noIndex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords = "children's music, kids songs, educational music, toddler songs, family music, digital pop for kids",
  canonical: canonicalProp,
  ogImage = 'https://alybouchnak.com/images/Aly-bouchnak-profile.webp',
  ogType = 'website',
  schemaData,
  noIndex = false,
}: SEOProps) => {
  const location = useLocation();
  const canonical = canonicalProp || `https://alybouchnak.com${location.pathname}`;
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('theme-color', '#C8F0F7');
    updateMetaTag('msapplication-TileColor', '#C8F0F7');

    // Canonical
    updateLinkTag('canonical', canonical);

    // Open Graph
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', canonical);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Classification
    updateMetaTag('classification', "Children's Music, Kids Songs, Family Music, Toddler Music, Educational Music, Digital Pop for Kids");
    updateMetaTag('subject', "Children's Music & Family Entertainment");
    updateMetaTag('topic', 'Digital Pop Music for Kids');
    updateMetaTag('summary', description);

    // Schema.org JSON-LD
    {
      const existingScript = document.querySelector('script[data-seo="schema"]');
      if (existingScript) {
        existingScript.remove();
      }
      if (schemaData) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'schema');
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
      }
    }

    return () => {
      // Cleanup schema script on unmount
      const schemaScript = document.querySelector('script[data-seo="schema"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schemaData, noIndex]);

  return null;
};

export default SEO;
