import { copyDirectory } from "../engines/copy.engine.js";
import { getTemplateDirectory } from "../utils/path.js";
import { isProjectNameValid } from "../utils/validate.js";

export async function createApp(projectName:string) {
    if (!isProjectNameValid(projectName)) {
        throw new Error("Invalid project name.");
    }
    
    const template = getTemplateDirectory("monolith");
    await copyDirectory(template, projectName);

    console.log(`Created ${projectName}`);
}