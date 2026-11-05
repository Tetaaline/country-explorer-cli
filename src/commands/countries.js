import { searchCountries, getCountryByName } from "../services/countryApi.js";
import { displayCountries, displayCountryInfo } from "../utils/display.js";
import ora from "ora";

// 1. Register country commands.
export function registerCountryCommands(program) {
  const countries = program
    .command("countries")
    .description("Explore countries around the world");

  // 2. Search for countries by name.
  countries
    .command("search <name>")
    .description("Search for a country by name")
    .action(async (name) => {
      const spinner = ora(`Searching for ${name}...`).start();

      try {
        const results = await searchCountries(name);

        spinner.succeed(`Search completed for ${name}.`);
        displayCountries(results);
      } catch (error) {
        spinner.fail("Country search failed.");
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    });

  // 3. Display detailed information about one country.
  countries
    .command("info <name>")
    .description("View information about a country")
    .action(async (name) => {
      const spinner = ora(`Getting information for ${name}...`).start();

      try {
        const country = await getCountryByName(name);

        spinner.succeed(`Information retrieved for ${name}.`);
        displayCountryInfo(country);
      } catch (error) {
        spinner.fail("Could not retrieve country information.");
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    });
}
