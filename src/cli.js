#!/usr/bin/env node

import { Command } from "commander";
import dotenv from "dotenv";

import { registerCountryCommands } from "./commands/countries.js";
import { registerFavoriteCommands } from "./commands/favorites.js";
import { runMenu } from "./utils/menu.js";

// Load environment variables.
dotenv.config();

// Set up our CLI.
const program = new Command();

program
  .name("country-explorer")
  .description("A CLI tool for exploring countries around the world")
  .version("1.0.0");

// Register country and favourite commands.
registerCountryCommands(program);
registerFavoriteCommands(program);

// Add command examples.
program.addHelpText(
  "after",
  `
Examples:
  $ country-explorer countries search Rwanda
  $ country-explorer countries info Rwanda
  $ country-explorer favorites add Rwanda
  $ country-explorer favorites list
  $ country-explorer favorites remove Rwanda
  `,
);

// Decide whether to show the interactive menu or run a command.
if (process.argv.length === 2) {
  await runMenu();
} else {
  program.parse(process.argv);
}
