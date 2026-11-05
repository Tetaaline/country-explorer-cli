import chalk from "chalk";
import Table from "cli-table3";

// 1. Get the common country name.
function getCountryName(country) {
  return country.names?.common || "Unknown";
}

// 2. Format country information that may contain arrays or objects.
function formatDetails(value) {
  if (!value) return "Not available";

  if (Array.isArray(value)) {
    return (
      value
        .map((item) =>
          typeof item === "object"
            ? item.name || item.common || item.code || ""
            : item,
        )
        .filter(Boolean)
        .join(", ") || "Not available"
    );
  }

  if (typeof value === "object") {
    return (
      Object.values(value)
        .map((item) =>
          typeof item === "object"
            ? item.name || item.common || item.code || ""
            : item,
        )
        .filter(Boolean)
        .join(", ") || "Not available"
    );
  }

  return String(value);
}

// 3. Display a list of countries in a table.
export function displayCountries(countries) {
  if (!countries.length) {
    console.log(chalk.yellow("No countries found."));
    return;
  }

  const table = new Table({
    head: ["Country", "Capital", "Region", "Population"],
    style: { head: ["cyan"] },
  });

  countries.forEach((country) => {
    table.push([
      getCountryName(country),
      formatDetails(country.capitals),
      country.region || "Not available",
      country.population?.toLocaleString() || "Not available",
    ]);
  });

  console.log(table.toString());
}

// 4. Display detailed information about one country.
export function displayCountryInfo(country) {
  console.log(chalk.green.bold(`\n${getCountryName(country)}`));

  console.log(`Official Name: ${country.names?.official || "Not available"}`);
  console.log(`Capital: ${formatDetails(country.capitals)}`);
  console.log(`Region: ${country.region || "Not available"}`);
  console.log(
    `Population: ${country.population?.toLocaleString() || "Not available"}`,
  );
  console.log(`Currency: ${formatDetails(country.currencies)}`);
  console.log(`Languages: ${formatDetails(country.languages)}`);
  console.log(
    `Flag: ${country.flag?.emoji || country.flag?.url_png || "Not available"}\n`,
  );
}
