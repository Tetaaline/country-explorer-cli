import { getCountryByName } from "../services/countryApi.js";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../storage/favorites.js";
import { displayCountries } from "../utils/display.js";

// 1. Register favorite country commands.
export function registerFavoriteCommands(program) {
  const favorites = program
    .command("favorites")
    .description("Manage your favorite countries");

  // 2. Add a country to favorites.
  favorites
    .command("add <name>")
    .description("Add a country to your favorites")
    .action(async (name) => {
      try {
        const country = await getCountryByName(name);

        await addFavorite(country);

        console.log(`${country.names.common} added to favorites successfully!`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    });

  // 3. Display saved favorite countries.
  favorites
    .command("list")
    .description("View your favorite countries")
    .action(async () => {
      try {
        const savedFavorites = await getFavorites();

        console.log("\nYour favorite countries:");

        displayCountries(savedFavorites);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    });

  // 4. Remove a country from favorites.
  favorites
    .command("remove <name>")
    .description("Remove a country from your favorites")
    .action(async (name) => {
      try {
        await removeFavorite(name);

        console.log(`${name} removed from favorites successfully!`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    });
}
