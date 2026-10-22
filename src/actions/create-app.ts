import path from 'path';
import fs from 'fs-extra';

import { copyDirectory } from "../engines/copy.engine.js";
import { renderDirectory } from '../engines/template.engine.js';
import { getTemplateDirectory } from "../utils/path.js";
import { isProjectNameValid } from "../utils/validate.js";
import type { TemplateContext } from '../types/template.js';
import { deriveNamingConvention } from '../utils/naming.js';
import {
    createTempDirectory,
    moveDirectoryContents,
    removeDirectory,
} from "../utils/fs.js";

export async function createApp(projectName:string) {
    if (!isProjectNameValid(projectName)) {
        throw new Error("Invalid project name.");
    }
    
    const template = getTemplateDirectory("monolith");
    const target = path.resolve(process.cwd(), projectName);

    if (await fs.pathExists(target)) {
        throw new Error(
            `Directory "${projectName}" already exists. Choose another project name.`,
        );
    }

    const naming = deriveNamingConvention(projectName);

    const context: TemplateContext = {
        projectName,
        kebabName: naming.kebabName,
        camelName: naming.camelName,
        pascalName: naming.pascalName,
        constantName: naming.constantName,
    };

    let stagingDirectory: string | undefined;
    let targetCreated = false;

    try {
        stagingDirectory = await createTempDirectory(
            path.dirname(target),
            path.basename(target),
        );

        const stagedProject = path.join(stagingDirectory, "project");

        await copyDirectory(template, stagedProject);
        await renderDirectory(stagedProject, context);

        await fs.mkdir(target);
        targetCreated = true;

        await moveDirectoryContents(stagedProject, target);

        await removeDirectory(stagingDirectory);
        stagingDirectory = undefined;

        console.log(`Created ${projectName}`);
    } catch (error) {
        // Remove only destination this operation successfully created.

        if (targetCreated) {
            try {
                await removeDirectory(target);
            } catch (cleanupError) {
                console.error(
                    `Warning: could not clean up "${target}":`,
                    cleanupError,
                );
            }
        }

        if (stagingDirectory) {
            try {
                await removeDirectory(stagingDirectory);
            } catch (cleanupError) {
                console.error(
                    `Warning: could not clean up "${stagingDirectory}":`,
                    cleanupError,
                );
            }
        }
        throw error;
    }
}