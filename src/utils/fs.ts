import fs from "fs-extra";
import path from "node:path";

// Creates a unique temp dir beside target project

export async function createTempDirectory(
    parentDirectory: string,
    projectName: string,
): Promise<string> {
    const prefix = `.${projectName}.spice-`;

    return fs.mkdtemp(path.join(parentDirectory, prefix));
}

export async function moveDirectoryContents(source: string, destination: string): Promise<void> {
    const entries = await fs.readdir(source);

    for (const entry of entries) {
        await fs.move(path.join(source, entry), path.join(destination, entry), {
            overwrite: false,
        });
    }
}

export async function removeDirectory(directory: string): Promise<void> {
    await fs.remove(directory);
}
