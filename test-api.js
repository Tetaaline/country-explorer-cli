import {
  searchCountries,
  getCountryByName,
} from "./src/services/countryApi.js";

// Test 1: Search for Rwanda.
const results = await searchCountries("Rwanda");
console.log("Search results:", results);

// Test 2: Retrieve Rwanda's details.
const country = await getCountryByName("Rwanda");
console.log("Country details:", country);
