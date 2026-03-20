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
// More granular breakpoints for better matching to display sizes (DPR 1x, 2x, 3x)
const BREAKPOINTS = [256, 320, 384, 512, 640, 768, 896, 1024, 1280, 1536, 1920];

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
    ({ src, alt, width, height, quality = 85, className, loading, sizes, ...props }, ref) => {
        // If the image is external (not from our domain) or an SVG, don't pass it through Cloudflare image resizing
        if (src.startsWith('http') || src.endsWith('.svg')) {
            return <img ref={ref} src={src} alt={alt} width={width} height={height} className={className} loading={loading} sizes={sizes} {...props} />;
        }

        // Cloudflare Images path structure: /cdn-cgi/image/width={w},height={h},quality={q},format=webp/image_path
        // Remove leading slash if present to avoid double slashes
        const cleanSrc = src.startsWith('/') ? src.substring(1) : src;
        const aspectRatio = height / width;

        // Base optimized fallback
        const fallbackSrc = `/cdn-cgi/image/width=${width},height=${height},quality=${quality},format=auto/${cleanSrc}`;

        // If 'sizes' is provided, generate a full responsive srcSet using breakpoints
        let generatedSrcSet = '';
        if (sizes) {
            generatedSrcSet = BREAKPOINTS.map(w => {
                const h = Math.round(w * aspectRatio);
                return `/cdn-cgi/image/width=${w},height=${h},quality=${quality},format=auto/${cleanSrc} ${w}w`;
            }).join(', ');
        } else {
            // Default 1x / 2x behavior based on explicit width/height
            const retinaSrc = `/cdn-cgi/image/width=${width * 2},height=${height * 2},quality=${quality},format=auto/${cleanSrc}`;
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
