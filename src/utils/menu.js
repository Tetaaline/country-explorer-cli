import { select, input } from "@inquirer/prompts";
import ora from "ora";

import { searchCountries, getCountryByName } from "../services/countryApi.js";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../storage/favorites.js";

import { displayCountries, displayCountryInfo } from "./display.js";

// Ask the user for a country name.
async function askCountryName() {
  const name = await input({
    message: "Enter the country name:",
    validate: (value) =>
      value.trim().length > 0 || "Please enter a country name.",
  });

  return name.trim();
}

// Pause before returning to the main menu.
async function pause() {
  await input({
    message: "Press Enter to return to the main menu.",
  });
}

// Display the interactive menu.
export async function runMenu() {
  let running = true;

  console.log("\n🌍 Welcome to Country Explorer CLI!");
  console.log("Explore countries around the world.\n");

  while (running) {
    const choice = await select({
      message: "What would you like to do?",
      choices: [
        {
          name: "🔍 Search for a country",
          value: "search",
        },
        {
          name: "🌍 View country information",
          value: "info",
        },
        {
          name: "⭐ Add a country to favourites",
          value: "add",
        },
        {
          name: "❤️ View my favourite countries",
          value: "list",
        },
        {
          name: "❌ Remove a country from favourites",
          value: "remove",
        },
        {
          name: "🚪 Exit",
          value: "exit",
        },
      ],
    });

    // Exit the application.
    if (choice === "exit") {
      console.log("\nThank you for using Country Explorer CLI. Goodbye! 👋");
      running = false;
      continue;
    }

    try {
      switch (choice) {
        // Search for countries.
        case "search": {
          const name = await askCountryName();
          const spinner = ora(`Searching for ${name}...`).start();

          try {
            const results = await searchCountries(name);

            spinner.succeed(`Search completed for ${name}.`);
            displayCountries(results);
          } catch (error) {
            spinner.fail("Country search failed.");
            console.error(`Error: ${error.message}`);
          }

          break;
        }

        // View detailed country information.
        case "info": {
          const name = await askCountryName();
          const spinner = ora(`Getting information for ${name}...`).start();

          try {
            const country = await getCountryByName(name);

            spinner.succeed(`Information retrieved for ${name}.`);
            displayCountryInfo(country);
          } catch (error) {
            spinner.fail("Could not retrieve country information.");
            console.error(`Error: ${error.message}`);
          }

          break;
        }

        // Add a country to favourites.
        case "add": {
          const name = await askCountryName();
          const spinner = ora(`Adding ${name} to favourites...`).start();

          try {
            const country = await getCountryByName(name);

            await addFavorite(country);

            spinner.succeed(
              `${country.names.common} added to favourites successfully!`,
            );
          } catch (error) {
            spinner.fail("Could not add country to favourites.");
            console.error(`Error: ${error.message}`);
          }

          break;
        }

        // Display saved favourite countries.
        case "list": {
          const savedFavorites = await getFavorites();

          console.log("\n❤️ Your favourite countries:\n");

          if (savedFavorites.length === 0) {
            console.log("You haven't saved any favourite countries yet.");
          } else {
            displayCountries(savedFavorites);
          }

          break;
        }

        // Remove a country from favourites.
        case "remove": {
          const name = await askCountryName();

          try {
            await removeFavorite(name);

            console.log(`\n${name} removed from favourites successfully!`);
          } catch (error) {
            console.error(`Error: ${error.message}`);
          }

          break;
        }
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }

    // Return to the main menu after completing an operation.
    if (running) {
      await pause();
      console.log("\n----------------------------------------\n");
    }
  }
}
