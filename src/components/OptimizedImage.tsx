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

// Common breakpoints for responsive images
const BREAKPOINTS = [256, 320, 384, 512, 640, 768, 896, 1024, 1280, 1536, 1920];

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
    ({ src, alt, width, height, quality = 85, className, loading, sizes, ...props }, ref) => {
        // If the image is external (not from our domain) or an SVG, don't pass it through optimization
        if (src.startsWith('http') || src.endsWith('.svg')) {
            return <img ref={ref} src={src} alt={alt} width={width} height={height} className={className} loading={loading} sizes={sizes} {...props} />;
        }

        // Netlify Image CDN structure: /.netlify/images?url={url}&w={width}&h={height}&q={quality}
        // Ensure the src has a leading slash for the url parameter
        const imagePath = src.startsWith('/') ? src : `/${src}`;
        const aspectRatio = height / width;

        // Base optimized fallback
        const fallbackSrc = `/.netlify/images?url=${encodeURIComponent(imagePath)}&w=${width}&h=${height}&q=${quality}&fm=webp`;

        // If 'sizes' is provided, generate a full responsive srcSet using breakpoints
        let generatedSrcSet = '';
        if (sizes) {
            generatedSrcSet = BREAKPOINTS.map(w => {
                const h = Math.round(w * aspectRatio);
                return `/.netlify/images?url=${encodeURIComponent(imagePath)}&w=${w}&h=${h}&q=${quality}&fm=webp ${w}w`;
            }).join(', ');
        } else {
            // Default 1x / 2x behavior based on explicit width/height
            const retinaSrc = `/.netlify/images?url=${encodeURIComponent(imagePath)}&w=${width * 2}&h=${height * 2}&q=${quality}&fm=webp`;
            generatedSrcSet = `${fallbackSrc} 1x, ${retinaSrc} 2x`;
        }

        return (
            <img
                ref={ref}
                src={fallbackSrc}
                srcSet={generatedSrcSet}
                sizes={sizes}
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
