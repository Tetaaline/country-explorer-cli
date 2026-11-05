#!/usr/bin/env node

import { Command } from "commander";
import dotenv from "dotenv";
import { registerCountryCommands } from "./commands/countries.js";
import { registerFavoriteCommands } from "./commands/favorites.js";

// Load the .env file
dotenv.config();

// Set up our CLI
const program = new Command();

program
  .name("country-explorer")
  .description("A CLI tool for exploring countries around the world")
  .version("1.0.0");

// Add the country commands
registerCountryCommands(program);
registerFavoriteCommands(program);

// Some command examples
program.addHelpText(
  "after",
  `
Examples:
  $ country-explorer countries search Rwanda
  $ country-explorer countries info Rwanda
  `
);

// Read what the user enters
program.parse(process.argv);
