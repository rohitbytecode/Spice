import path from 'path';

import { copyDirectory } from "../engines/copy.engine.js";
import { renderDirectory } from '../engines/template.engine.js';
import { getTemplateDirectory } from "../utils/path.js";
import { isProjectNameValid } from "../utils/validate.js";
import type { TemplateContext } from '../types/template.js';

export async function createApp(projectName:string) {
    if (!isProjectNameValid(projectName)) {
        throw new Error("Invalid project name.");
    }
    
    const template = getTemplateDirectory("monolith");
    const target = path.resolve(process.cwd(), projectName);

    await copyDirectory(template, target);

    const context: TemplateContext = {
        projectName,
    };

    await renderDirectory(target, context);

    console.log(`Created ${projectName}`);
}