import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
}

const Breadcrumbs = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Aly Bouchnak', path: '/' }
    ];

    // Build breadcrumb trail based on current path
    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      let name = '';

      switch (segment) {
        case 'discography':
          name = 'Discography';
          break;
        case 'album':
          // Get album name from URL parameters or use a default
          const albumName = pathSegments[index + 1];
          if (albumName) {
            name = formatAlbumName(albumName);
            breadcrumbs.push({ name: 'Discography', path: '/discography' });
          }
          break;
        case 'track':
          // Get track name from URL parameters
          const trackName = pathSegments[index + 1];
          if (trackName) {
            name = formatTrackName(trackName);
            breadcrumbs.push({ name: 'Discography', path: '/discography' });
          }
          break;
        case 'faq':
          name = 'FAQ';
          break;
        case 'contact':
          name = 'Contact';
          break;
        default:
          if (segment && !['album', 'track'].includes(pathSegments[index - 1])) {
            name = formatName(segment);
          }
      }

      if (name && !breadcrumbs.find(item => item.path === path)) {
        breadcrumbs.push({ name, path });
      }
    });

    return breadcrumbs;
  };

  const formatAlbumName = (albumSlug: string): string => {
    const albumNames: { [key: string]: string } = {
      'tuned-for-dreams': 'Tuned for Dreams',
      'the-blooms-house-volume-1': "The Bloom's House: Volume 1",
      'the-blooms-house-classics-party': "The Bloom's House: Classics Party"
    };
    return albumNames[albumSlug] || formatName(albumSlug);
  };

  const formatTrackName = (trackSlug: string): string => {
    const trackNames: { [key: string]: string } = {
      'bock-bock-chicken': 'Bock Bock Chicken',
      'the-funny-bunny-jump': 'The Funny Bunny Jump',
      'boom-teka-boom': 'Boom Teka Boom',
      'the-wise-mice': 'The Wise Mice',
      'nanny-papa': 'Nanny & Papa',
      'the-yummy-spoon': 'The Yummy Spoon'
    };
    return trackNames[trackSlug] || formatName(trackSlug);
  };

  const formatName = (slug: string): string => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const breadcrumbs = getBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/' || location.pathname === '/#') {
    return null;
  }

  return (
    <nav className="breadcrumb-nav py-4 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm text-[#2A2A2A] flex-wrap">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-[#2A2A2A]/40" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-[#101010]">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="hover:text-[#F26B3A] transition-colors duration-200"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
