export function generateGenresFile(genres: string[]): string {
    return `export const genres: string[] = [
${genres.map(g => `    "${g.replace(/"/g, '\\"')}"`).join(',\n')}
];
`;
}

export function generateMoodsFile(moods: string[]): string {
    return `export const moods: string[] = [
${moods.map(m => `    "${m.replace(/"/g, '\\"')}"`).join(',\n')}
];
`;
}

export function generateRoutinesFile(routines: string[]): string {
    return `export const routines: string[] = [
${routines.map(r => `    "${r.replace(/"/g, '\\"')}"`).join(',\n')}
];
`;
}
