import { searchCountries, getCountryByName } from "../services/countryApi.js";
import { displayCountries, displayCountryInfo } from "../utils/display.js";

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
      try {
        console.log(`Searching for ${name}...`);

        const results = await searchCountries(name);

        displayCountries(results);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    });

  // 3. Display detailed information about one country.
  countries
    .command("info <name>")
    .description("View information about a country")
    .action(async (name) => {
      try {
        console.log(`Getting information for ${name}...`);

        const country = await getCountryByName(name);

        displayCountryInfo(country);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    });
}
