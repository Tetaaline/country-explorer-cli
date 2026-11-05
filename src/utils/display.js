import chalk from "chalk";
import Table from "cli-table3";

// Display a list of countries
export function displayCountries(countries) {
  const table = new Table({
    head: ["Country", "Capital", "Region", "Population"],
    style: { head: ["cyan"] }
  });

  countries.forEach((country) => {
    table.push([
      country.name,
      country.capital,
      country.region,
      country.population
    ]);
  });

  console.log(table.toString());
}

// Display details of one country
export function displayCountryInfo(country) {
  console.log(chalk.green.bold(`\n${country.name}`));
  console.log(`Capital: ${country.capital}`);
  console.log(`Region: ${country.region}`);
  console.log(`Population: ${country.population}`);
  console.log(`Currency: ${country.currency}`);
  console.log(`Languages: ${country.languages}`);
  console.log(`Flag: ${country.flag}\n`);
}
