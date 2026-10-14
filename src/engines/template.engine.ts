import fs from 'fs-extra';
import path from 'node:path';
import type { TemplateContext } from '../types/template.js';

const TEXT_EXTENSIONS = new Set([
    ".json",
    ".md",
    ".txt",
    ".yaml",
    ".yml",
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".html",
    ".css",
    ".scss",
    ".xml",
    ".toml",
    ".env",
    ".sh",
    ".ps1",
    ".gitignore",
]);

const TEXT_FILENAMES =new Set([
    ".gitignore",
    ".npmrc",
    ".nvmrc",
    "Dockerfile",
    "Makefile",
    "LICENSE",
]);

export function renderTemplate(
    content: string,
    context: TemplateContext,
): string {
    const rendered = content.replace(
        /\{\{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*\}\}/g,
        (placeholder, key: string) => {
            const value = context[key as keyof TemplateContext];

            if (value === undefined || value === null) {
                throw new Error(
                    `Missing template variable: ${key}`,    
                );
            }

            return String(value);
        },
    );

    return rendered;
}

export async function renderDirectory(
    directory: string,
    context: TemplateContext, 
): Promise<void> {
    const entries = await fs.readdir(directory, {
        withFileTypes: true,
    });

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            await renderDirectory(entryPath, context);
            continue;
        }

        if (!entry.isFile()) {
            continue;
        }

        const extension = path.extname(entry.name);
        const isTextFile = TEXT_EXTENSIONS.has(extension) || TEXT_FILENAMES.has(entry.name);

        if(!isTextFile) {
            continue;
        }

        const content = await fs.readFile(entryPath, "utf-8");
        const rendered = renderTemplate(content, context);

        await fs.writeFile(entryPath, rendered, "utf-8");
    }
}