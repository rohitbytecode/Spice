import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getRootDirectory() {
    return path.resolve(__dirname, "../../");
}

export function getTemplateDirectory(name: string) {
    return path.join(
        getRootDirectory(),
        "template",
        name
    );
}