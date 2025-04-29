export const loadPartial = async (path) => {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Erro ao carregar o arquivo: ${path}`);
    }

    const isJson = path.endsWith(".json");
    return isJson ? await response.json() : await response.text();
};
