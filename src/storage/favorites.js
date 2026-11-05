import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 1. Get the current file's directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Build the path to favorites.json.
const FAVORITES_FILE = path.join(__dirname, "../../data/favorites.json");

// 3. Read all saved favorite countries.
export async function getFavorites() {
  try {
    const data = await readFile(FAVORITES_FILE, "utf-8");
    const favorites = JSON.parse(data);

    if (!Array.isArray(favorites)) {
      throw new Error("Favorites file must contain a JSON array.");
    }

    return favorites;
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(FAVORITES_FILE, "[]", "utf-8");
      return [];
    }

    if (error instanceof SyntaxError) {
      throw new Error("Favorites file contains invalid JSON.");
    }

    throw error;
  }
}

// 4. Save a country to favorites.
export async function addFavorite(country) {
  if (!country || typeof country !== "object") {
    throw new Error("Please provide valid country information.");
  }

  const countryName = country.names?.common;

  if (!countryName) {
    throw new Error("Country must have a common name.");
  }

  const favorites = await getFavorites();

  // Prevent duplicate favorite countries.
  const alreadyExists = favorites.some(
    (favorite) =>
      favorite.names?.common?.toLowerCase() === countryName.toLowerCase(),
  );

  if (alreadyExists) {
    throw new Error(`${countryName} is already in your favorites.`);
  }

  favorites.push(country);

  await writeFile(FAVORITES_FILE, JSON.stringify(favorites, null, 2), "utf-8");

  return country;
}

// 5. Remove a country from favorites.
export async function removeFavorite(countryName) {
  if (typeof countryName !== "string" || !countryName.trim()) {
    throw new Error("Please provide a valid country name.");
  }

  const favorites = await getFavorites();

  const updatedFavorites = favorites.filter(
    (country) =>
      country.names?.common?.toLowerCase() !== countryName.trim().toLowerCase(),
  );

  if (updatedFavorites.length === favorites.length) {
    throw new Error(`${countryName} was not found in your favorites.`);
  }

  await writeFile(
    FAVORITES_FILE,
    JSON.stringify(updatedFavorites, null, 2),
    "utf-8",
  );

  return updatedFavorites;
}
