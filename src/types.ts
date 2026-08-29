import { z } from "zod";

// ---------- Recipe schemas ----------

export const recipeIdSchema = z.object({
  recipe_id: z.string().describe("The RecipeDB recipe identifier"),
});

export const cuisineSchema = z.object({
  region: z.string().describe('Cuisine region, e.g. "Indian", "Italian"'),
  limit: z.number().optional().default(10).describe("Max results to return"),
});

// ---------- FlavorDB: allowed-value vocabularies ----------

const tasteThresholdValues = [
  "fruity", "green", "sweet", "waxy", "woody", "10 ppm", "floral", "creamy",
  "20 ppm", "fatty", "spicy", "citrus", "tropical", "30 ppm", "berry", "5 ppm",
  "fresh", "herbal", "nutty", "vegetative", "apple", "brown", "slight", "musty",
  "sweet fruity", "50 ppm", "cooling", "pineapple", "25 ppm", "oily",
] as const;

const synthesisValues = [
  "acid", "alcohol", "esterification", "sodium", "methyl", "ethyl", "chloride",
  "oxidation", "acetic", "heating", "distillation", "corresponding", "condensation",
  "reduction", "hydrogenation", "oil", "acetate", "direct", "h2so4", "butyl",
  "catalyst", "hcl", "anhydride", "acetic acid", "concentrated",
  "direct esterification", "reacting", "benzene", "methanol", "ester",
] as const;

const tradeAssociationGuidelineValues = [
  "0.390 mg", "4.338 mg", "0.051 mg", "0.001 mg", "0.209 mg", "0.003 mg",
  "0.033 mg", "0.008 mg", "0.293 mg", "0.021 mg", "1.471 mg", "0.005 mg",
  "0.014 mg", "0.017 mg", "0.046730 mg", "0.221 mg", "0.155 mg", "0.932 mg",
  "0.052 mg", "0.013 mg", "0.004 mg", "1.494 mg", "0.330 mg", "1.457 mg",
  "4.709 mg", "3.785 mg", "0.002 mg", "1.841 mg", "1.514 mg", "0.252 mg",
] as const;

const naturalOccurrenceValues = [
  "Dandelion", "Fagus species", "Found in Siam benzoin", "Natural",
  "Not found in nature", "Prepared from wood",
  "Reported found as a constituent in coffee", "Reported found in Bantu beer",
  "Reportedly present in sherry", "Reportedly present in popcorn",
  "Reportedly present in onion", "Reportedly present in coriander",
  "Reportedly present in cider", "Reported present in peanut (roasted)",
  "Reported present in beer", "Reported not found in nature",
  "Reported in Ceylon citronella oil", "Reported found in yeast extract",
  "Reported found in white truffle", "Reported found in violet leaves",
  "Reported found in tomato", "Reported found in strawberry",
  "Reported found in skim milk", "Reported found in rum",
  "Reported found in rose oil", "Reported found in raw and roasted peanut",
  "Reported found in purple passion fruit", "Reported found in pork liver",
  "Reported found in pepper", "Reported found in peppermint oil",
] as const;

const iofiCategoryValues = [
  "Artificial", "Artificial, Natural Identical", "Artificial, Nature Identical",
  "Artificial/Nature Identical", "Natural", "Natural Identical", "Natural:",
  "NaturalNatural", "Nature Identical", "Nature identical", "Not Nature Identical",
] as const;

const einecsValues = [
  "232-519-5", "203-310-6", "200-836-8", "264-948-9", "264-154-2", "235-839-3",
  "248-817-3", "231-327-9", "200-473-5", "202-815-9",
] as const;

const descriptionValues = [
  "sweet", "aroma", "fruity", "flavor", "leaves", "liquid", "plant", "flowers",
  "green", "colorless", "reminiscent", "bitter", "herbaceous", "distillation",
  "floral", "slightly", "pungent", "steam", "grows", "dried", "yellow", "fresh",
  "aromatic", "spicy", "tree", "strong", "fatty", "white", "seeds", "cultivated",
] as const;

// ---------- FlavorDB schemas ----------

// A vocabulary param accepts either one allowed value or an array of them.
// LLM sees the full enum in the tool schema; invalid values fail zod before the API call.
const oneOrMany = <T extends readonly [string, ...string[]]>(vals: T) =>
  z.union([z.enum(vals), z.array(z.enum(vals)).min(1)]);

export const tasteThresholdSchema = z.object({
  values: oneOrMany(tasteThresholdValues).describe(
    "Taste / odor descriptor or reported threshold concentration to filter by."
  ),
});

export const synthesisSchema = z.object({
  values: oneOrMany(synthesisValues).describe(
    "Synthesis-method keyword to filter flavor molecules by (e.g. reagent, reaction type, or process)."
  ),
});

export const tradeAssociationGuidelinesSchema = z.object({
  guideline: oneOrMany(tradeAssociationGuidelineValues).describe(
    "Trade-association intake guideline value (mg) to filter by. Must match one of the listed exact strings."
  ),
});

export const naturalOccurrenceSchema = z.object({
  occurrence: oneOrMany(naturalOccurrenceValues).describe(
    "Natural-occurrence phrase to filter flavor molecules by (source food / notation)."
  ),
});

export const iofiCategorisationSchema = z.object({
  category: oneOrMany(iofiCategoryValues).describe(
    "IOFI categorisation label (Natural / Nature Identical / Artificial variants)."
  ),
});

export const einecsSchema = z.object({
  einecs_no: oneOrMany(einecsValues).describe(
    "EINECS registry number to look up (format nnn-nnn-n)."
  ),
});

export const descriptionSchema = z.object({
  desc: oneOrMany(descriptionValues).describe(
    "Free-form descriptor keyword to search flavor molecule descriptions by."
  ),
});

// Range-based endpoints: single integer within the API's known bounds.
export const nasRangeSchema = z.object({
  NAS_No: z.number().int().min(21).max(8811).describe("NAS number (21–8811)."),
});

export const jecfaRangeSchema = z.object({
  JECFA_No: z.number().int().min(1).max(1897).describe("JECFA number (1–1897)."),
});

export const flNoRangeSchema = z.object({
  FL_No: z.number().int().min(1001).max(56000).describe("FL number (1001–56000)."),
});

export const femaRangeSchema = z.object({
  FEMA_No: z.number().int().min(2001).max(4905).describe("FEMA number (2001–4905)."),
});
