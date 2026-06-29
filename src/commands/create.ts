import { Command } from "commander";
import { createApp } from "../actions/create-app.js";

export function registerCreateCommand(program: Command) {

    program
        .command("create")
        .argument("<project-name>")
        .description("Create a new Spice project")
        .action(async (projectName) => {
            await createApp(projectName);
        });
}