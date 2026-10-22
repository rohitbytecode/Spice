import path from 'path';
import fs from 'fs-extra';

import { copyDirectory } from "../engines/copy.engine.js";
import { renderDirectory } from '../engines/template.engine.js';
import { getTemplateDirectory } from "../utils/path.js";
import { isProjectNameValid } from "../utils/validate.js";
import type { TemplateContext } from '../types/template.js';
import { deriveNamingConvention } from '../utils/naming.js';

export async function createApp(projectName:string) {
    if (!isProjectNameValid(projectName)) {
        throw new Error("Invalid project name.");
    }
    
    const template = getTemplateDirectory("monolith");
    const target = path.resolve(process.cwd(), projectName);
    const targetExists = await fs.pathExists(target);

    if (targetExists) {
        throw new Error(
            `Directory "${projectName}" already exists. Choose another project name.`,
        );
    }

    const naming = deriveNamingConvention(projectName);

    await copyDirectory(template, target);

    const context: TemplateContext = {
        projectName,
        kebabName: naming.kebabName,
        camelName: naming.camelName,
        pascalName: naming.pascalName,
        constantName: naming.constantName,
    };

    await renderDirectory(target, context);

    console.log(`Created ${projectName}`);
}