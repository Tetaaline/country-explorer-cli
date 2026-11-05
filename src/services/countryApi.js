import "dotenv/config";

// 1. REST Countries API v5 base URL.
const BASE_URL = "https://api.restcountries.com/countries/v5";

// 2. Read the API key from the .env file.
const API_KEY = process.env.REST_COUNTRIES_API_KEY;

// 3. Reusable function for making API requests.
async function makeApiRequest(url) {
  // Check whether the API key exists.
  if (!API_KEY) {
    throw new Error(
      "API key missing. Please add REST_COUNTRIES_API_KEY to your .env file.",
    );
  }

  let response;

  try {
    // Send a GET request to the API.
    response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });
  } catch (error) {
    // Handle network and connection errors.
    if (error.name === "TypeError") {
      throw new Error(
        "Unable to connect to the Countries API. Check your internet connection.",
      );
    }

    throw error;
  }

  let result;

  try {
    // Convert the API response into JSON.
    result = await response.json();
  } catch {
    throw new Error(
      `The Countries API returned an invalid response (HTTP ${response.status}).`,
    );
  }

  // Check for HTTP errors.
  if (!response.ok) {
    const message =
      result.errors?.[0]?.message ||
      `API request failed with status ${response.status}.`;

    throw new Error(message);
  }

  // Check for API errors.
  if (result.errors?.length > 0) {
    throw new Error(
      result.errors[0].message || "The Countries API returned an error.",
    );
  }

  // Check that the response contains country records.
  if (!Array.isArray(result.data?.objects)) {
    throw new Error("Unexpected response format from the Countries API.");
  }

  // Return the country records.
  return result.data.objects;
}

// 4. Search countries by name.
export async function searchCountries(countryName) {
  // Validate the country name.
  if (typeof countryName !== "string" || !countryName.trim()) {
    throw new Error("Please provide a valid country name to search.");
  }

  // Build the search URL.
  const url = `${BASE_URL}/name?q=${encodeURIComponent(countryName.trim())}`;

  // Return the matching countries.
  return await makeApiRequest(url);
}

// 5. Retrieve detailed information about one country.
export async function getCountryByName(countryName) {
  // Validate the country name.
  if (typeof countryName !== "string" || !countryName.trim()) {
    throw new Error("Please provide a valid country name.");
  }

  // Build the country details URL.
  const url = `${BASE_URL}/names.common/${encodeURIComponent(
    countryName.trim(),
  )}`;

  // Get the matching country records.
  const countries = await makeApiRequest(url);

  // Check whether the country exists.
  if (countries.length === 0) {
    throw new Error(`Country "${countryName}" was not found.`);
  }

  // Return the first matching country.
  return countries[0];
}
