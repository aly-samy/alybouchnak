import { forwardRef } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width: number;
    height: number;
    quality?: number;
    fetchPriority?: 'high' | 'low' | 'auto';
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
    ({ src, alt, width, height, quality = 85, className, loading, ...props }, ref) => {
        // If the image is external (not from our domain) or an SVG, don't pass it through Cloudflare image resizing
        if (src.startsWith('http') || src.endsWith('.svg')) {
            return <img ref={ref} src={src} alt={alt} width={width} height={height} className={className} loading={loading} {...props} />;
        }

        // Cloudflare Images path structure: /cdn-cgi/image/width={w},height={h},quality={q},format=webp/image_path
        // Remove leading slash if present to avoid double slashes
        const cleanSrc = src.startsWith('/') ? src.substring(1) : src;

        // Format the URL
        const optimizedSrc = `/cdn-cgi/image/width=${width},height=${height},quality=${quality},format=auto/${cleanSrc}`;

        // Create a 2x source for retina displays automatically
        const retinaSrc = `/cdn-cgi/image/width=${width * 2},height=${height * 2},quality=${quality},format=auto/${cleanSrc}`;

        return (
            <img
                ref={ref}
                src={optimizedSrc}
                srcSet={`${optimizedSrc} 1x, ${retinaSrc} 2x`}
                alt={alt}
                width={width}
                height={height}
                className={className}
                loading={loading || 'lazy'}
                {...props}
            />
        );
    }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
