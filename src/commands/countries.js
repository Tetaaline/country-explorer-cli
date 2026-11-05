
export function registerCountryCommands(program) {
  const countries = program.command("countries")
    .description("Explore countries around the world");

  countries
    .command("search <name>")
    .description("Search for a country by name")
    .action((name) => {
      console.log(`Searching for ${name}...`);
    });

  countries
    .command("info <name>")
    .description("View information about a country")
    .action((name) => {
      console.log(`Getting information for ${name}...`);
    });
}
