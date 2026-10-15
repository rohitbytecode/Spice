export interface NamingConvention {
    originName: string;
    kebabName: string;
    camelName: string;
    pascalName: string;
    constantName: string;
}

function splitWords(input: string): string[] {
    return input
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
        .split(/[^a-zA-Z0-9]+/)
        .filter(Boolean)
        .map((word) => word.toLowerCase());
}

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function deriveNamingConvention(
    input: string,
): NamingConvention {
    const words = splitWords(input);

    if (words.length === 0) {
        throw new Error("Name must contain letters or numbers.");
    }

    const kebabName = words.join("-");
    const pascalName = words.map(capitalize).join("");
    const camelName =
        words[0] +
        words.slice(1).map(capitalize).join("");
    const constantName = words.join("_").toUpperCase();

    return {
        originName: input,
        kebabName,
        camelName,
        pascalName,
        constantName,
    };
}