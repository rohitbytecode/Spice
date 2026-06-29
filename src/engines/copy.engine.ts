import fs from "fs-extra";

export async function copyDirectory(
    source:string,
    destination: string
) {
    await fs.copy(source, destination);
}