import { Album } from './albums';

export interface ThemeCollection extends Album {
    // Theme Collections share the same structure as Albums for now
}

export const themeCollections: ThemeCollection[] = [];

export function getThemeCollectionBySlug(slug: string): ThemeCollection | undefined {
    return themeCollections.find(collection => collection.slug === slug);
}

export function getAllThemeCollections(): ThemeCollection[] {
    return themeCollections;
}
