import { loadPartial } from "./loader.js";

export const globalCssLoader = async () => {
    const indexContent = await loadPartial("/src/shared/styles/index.css");

    const importRegex = /@import\s+url\(["']?(.*?)["']?\)/g;

    const paths = [];
    let match;
    while ((match = importRegex.exec(indexContent)) !== null) {
        paths.push(match[1]);
    }

    const cssChunks = await Promise.all(
        paths.map((path) => loadPartial(`/src/shared/styles/${path}`))
    );
    return cssChunks.join("\n");
};
