import { z } from "zod";
export const recipeIdSchema = z.object({
    recipe_id: z.string().describe("The RecipeDB recipe identifier"),
});
export const cuisineSchema = z.object({
    region: z.string().describe('Cuisine region, e.g. "Indian", "Italian"'),
    limit: z.number().optional().default(10).describe("Max results to return"),
});
export const synthesisSchema = z.object({
    values: z.string().describe('Property to filter synthesis data by, e.g. "acid"'),
});
//# sourceMappingURL=types.js.map