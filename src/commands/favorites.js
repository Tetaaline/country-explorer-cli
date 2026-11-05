
export function registerFavoriteCommands(program) {
  const favorites = program
    .command("favorites")
    .description("Manage your favorite countries");

  favorites
    .command("add <name>")
    .description("Add a country to your favorites")
    .action((name) => {
      console.log(`Adding ${name} to favorites...`);
    });

  favorites
    .command("list")
    .description("View your favorite countries")
    .action(() => {
      console.log("Your favorite countries:");
    });

  favorites
    .command("remove <name>")
    .description("Remove a country from your favorites")
    .action((name) => {
      console.log(`Removing ${name} from favorites...`);
    });
}
