import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { get } from "../client.js";
import { recipeIdSchema, cuisineSchema } from "../types.js";

export function registerRecipeTools(server: McpServer) {
  server.registerTool(
    "get_recipe_info",
    {
      title: "Get Recipe Info",
      description: "Get full ingredient composition, nutrition, and metadata for a recipe by ID from RecipeDB.",
      inputSchema: recipeIdSchema.shape,
    },
    async ({ recipe_id }) => {
      const data = await get(
        "RecipeDB3",
        "/recipesinfo",
        { id: recipe_id }
    );
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "recipes_by_cuisine",
    {
      title: "Recipes By Cuisine",
      description: "Fetch recipes filtered by world cuisine/region from RecipeDB.",
      inputSchema: cuisineSchema.shape,
    },
    async ({ region, limit }) => {
      const data = await get(
        "RecipeDB3",
        `/recipes_cuisine/cuisine/${region}`,
        { limit }
    );
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "recipe_of_the_day",
    {
      title: "Recipe Of The Day",
      description: "Get the daily featured recipe from RecipeDB.",
      inputSchema: {},
    },
    async () => {
      const data = await get(
        "RecipeDB3",
        "/recipeofday"
    );
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );
}