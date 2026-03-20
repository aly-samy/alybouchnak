/**
 * This script runs after the Vite build to inject the hashed CSS and JS filenames 
 * into the _headers file in the dist/ folder. 
 * This enables "Early Hints" for the browser to start downloading these 
 * critical assets before the HTML is fully parsed.
 */
import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const HEADERS_PATH = path.join(DIST_DIR, '_headers');

if (!fs.existsSync(HEADERS_PATH)) {
    console.log('⚠️ No _headers file found at:', HEADERS_PATH);
    process.exit(0);
}

console.log('🔍 Optimizing headers at:', HEADERS_PATH);

try {
    const assetsDir = path.join(DIST_DIR, 'assets');
    if (!fs.existsSync(assetsDir)) {
        console.log('⚠️ Assets directory not found:', assetsDir);
        process.exit(0);
    }

    const files = fs.readdirSync(assetsDir);
    console.log(`📂 Found ${files.length} files in /assets`);

    // Find the primary index.css and index.js
    const indexCss = files.find(f => f.startsWith('index-') && f.endsWith('.css'));
    const indexJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
    const vendorJs = files.find(f => f.startsWith('vendor-') && f.endsWith('.js'));

    console.log(`✨ Identified: CSS=${indexCss || 'none'}, JS=${indexJs || 'none'}, Vendor=${vendorJs || 'none'}`);

    let headers = fs.readFileSync(HEADERS_PATH, 'utf8');

    // Insert hashed assets into the top-level Link headers
    const linkHeaders = [];
    if (indexCss) linkHeaders.push(`Link: </assets/${indexCss}>; rel=preload; as=style`);
    if (indexJs) linkHeaders.push(`Link: </assets/${indexJs}>; rel=preload; as=script`);
    if (vendorJs) linkHeaders.push(`Link: </assets/${vendorJs}>; rel=preload; as=script`);

    if (linkHeaders.length > 0) {
        // Find where to insert (look for the first /* block)
        const match = headers.match(/\/\*(\r?\n)/);
        if (match) {
            const splitIndex = match.index + match[0].length;
            const start = headers.slice(0, splitIndex);
            const end = headers.slice(splitIndex);
            const indentation = '  ';
            const newHeaders = start + indentation + linkHeaders.join('\n' + indentation) + '\n' + end;
            fs.writeFileSync(HEADERS_PATH, newHeaders);
            console.log(`✅ Dynamically injected ${linkHeaders.length} hashed assets into _headers.`);
        } else {
            console.log('⚠️ Could not find "/*" block in _headers to inject assets.');
        }
    }
} catch (err) {
    console.error('❌ Failed to optimize _headers:', err);
}
