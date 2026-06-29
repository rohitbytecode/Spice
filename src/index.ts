#!/user/bin/env node

import { Command } from "commander";
import { registerCreateCommand } from "./commands/create.js";

const program = new Command();

program
    .name("spice")
    .description("Production-grade project scaffolding CLI")
    .version("0.1.0");

registerCreateCommand(program);

program.parse();