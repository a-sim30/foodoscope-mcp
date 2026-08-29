import "dotenv/config";
import axios from "axios";
const AUTH_TOKEN = process.env.FOODOSCOPE_AUTH_TOKEN ?? "";
const BASE_URL = process.env.FOODOSCOPE_BASE_URL ?? "";
if (!AUTH_TOKEN || !BASE_URL) {
    console.error("Missing FOODOSCOPE_AUTH_TOKEN or FOODOSCOPE_BASE_URL in .env");
}
const DATABASE_PATHS = {
    FlavorDB: "/flavordb",
    Recipe2: "/recipe2-api",
    SpiceRx: "/spicerx",
    CocktailDB: "/cocktaildb",
    SustainableFoodDB: "/sustainablefooddb",
    DietRxDB: "/dietrx",
    RecipeDB3: "/recipedb3",
};
export async function get(dbName, path, params) {
    const dbPath = DATABASE_PATHS[dbName];
    if (!dbPath) {
        throw new Error(`Unknown database: ${dbName}`);
    }
    const url = `${BASE_URL}${dbPath}${path}`;
    try {
        const response = await axios.get(url, {
            params,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(`${dbName} API error ${err.response.status}: ${JSON.stringify(err.response.data)}`);
        }
        throw new Error(`${dbName} API request failed: ${err.message}`);
    }
}
//# sourceMappingURL=client.js.map