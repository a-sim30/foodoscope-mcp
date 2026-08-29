import { z } from "zod";

// ---------- Recipe schemas ----------

export const recipeIdSchema = z.object({
  recipe_id: z.string().describe("The RecipeDB recipe identifier"),
});

export const cuisineSchema = z.object({
  region: z.string().describe('Cuisine region, e.g. "Indian", "Italian"'),
  limit: z.number().optional().default(10).describe("Max results to return"),
});

// ---------- Shared helpers ----------

// A vocabulary param accepts either one allowed value or an array of them.
// LLM sees the full enum in the tool schema; invalid values fail zod before the API call.
const oneOrMany = <T extends readonly [string, ...string[]]>(vals: T) =>
  z.union([z.enum(vals), z.array(z.enum(vals)).min(1)]);

const intRange = (min: number, max: number) => z.number().int().min(min).max(max);
const numRange = (min: number, max: number) => z.number().min(min).max(max);

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

const coeApprovalValues = [
  "beverages", "5 ppm", "10 ppm", "candy", "1 ppm", "baked", "baked goods",
  "goods", "20 ppm", "soft", "soft candy", "Approved", "dairy", "frozen",
  "frozen dairy", "gelatins", "puddings", "gelatins puddings", "category",
  "2 ppm", "products", "30 ppm", "use", "3 ppm", "meat", "meat products",
  "15 ppm", "10", "50 ppm", "40 ppm",
] as const;

const aromaThresholdValues = [
  "100 ppb", "400 ppb", "1 ppm", "25 ppb", "10 ppm", "50 ppb", "140 ppb",
  "500 ppb", "5 ppb", "3 ppb", "7 ppb", "0.2 ppb", "2 ppm", "10 ppb", "4 ppb",
  "19 ppb", "1.2 ppm", "80 ppb", "300 ppb", "800 ppb", "4 ppm", "60 ppb",
  "30 ppb", "150 ppb", "200 ppb", "20 ppb", "1 ppb", "250 ppb", "90 ppb",
  "0.01 ppb",
] as const;

const moleculeTypeValues = ["natural", "synthetic"] as const;

const functionalGroupValues = [
  "alkene", "aromatic compound", "acetal", "isothiocyanate", "thioether",
  "heterocyclic compound", "enol ether", "carbonitrile", "hydroperoxide",
  "sulfone", "nitrite", "alkyne", "thioacetal", "thiourea",
  "co2 derivative (general)", "sulfoxide", "nitroso compound", "n-oxide",
  "guanidine", "enol", "imine", "oxime", "azo compound", "anion",
] as const;

const flavorProfileValues = [
  "sweet-like", "sweet", "bitter", "odorless", "fruity", "bland", "alkane",
  "minty", "sulfurous", "musky", "green", "meaty", "pungent", "sulfury",
  "fruit", "nutty", "woody", "roasted", "fatty", "herbal", "ammoniacal",
  "fishy", "camphor", "caramellic", "earthy", "sweetbitter", "floral",
  "blackcurrant", "dill", "spicy",
] as const;

const femaFlavorProfileValues = [
  "fruit", "savory", "floral", "green", "spice", "dairy", "mint, cool", "nuts",
  "heat", "savory, umami", "mouthfeel", "herb", "balsamic", "honey",
  "grapefruit", "flower", "peach", "lemon", "fruity", "sulfur", "garlic",
  "phenol", "oil", "fruit, rose", "onion", "cucumber", "fat", "pineapple",
  "fish", "cocoa", "imparts a cooling sensation",
] as const;

const commonNameValues = [
  "stevioside", "hesperidin", "neohesperidin", "galactinol", "eriocitrin",
  "neoeriocitrin", "rubusoside", "cellobiose", "maltotriose", "maltose",
  "glycyrrhizin", "lactulose", "glycyrrhizic acid", "neodiosmin", "melibiose",
  "isomaltose", "pectolinarin", "diammonium glycyrrhizinate", "osladin",
  "37063-35-7", "2''-o-beta-l-galactopyranosylorientin", "neokestose", "phytol",
  "mannobiose", "68445-41-0", "dehydrosoyasaponin i",
  "2'-monophosphoadenosine-5'-diphosphate", "xylosucrose", "betavulgaroside iv",
  "2'-adenylic acid",
] as const;

const naturalSourceValues = [
  "cattle", "poacceae", "citrus", "grape", "prunus", "maize", "vaccinium",
  "ribes", "solanum", "theobroma", "crustacean", "rubus", "wheat", "sheep",
  "mollusca", "fish", "allium", "glycine", "brassica oleracea", "vigna",
  "oncorhynchus", "vitis vinifera", "salvia", "apple", "corn",
  "camellia sinensis", "flatfish", "vitis", "cinnamomum", "cucurbitaceae",
] as const;

const entityAliasValues = [
  "grass", "beer", "orange", "papaya", "beans", "egg", "bakery", "bread",
  "bread-rye", "bread-wheaten", "bread-white", "bread-wholewheat", "wort",
  "arrack", "brandy", "brandy-anise", "brandy-apple", "brandy-armagnac",
  "brandy-blackberry", "brandy-cherry", "brandy-cognac", "brandy-papaya",
  "brandy-pear", "brandy-plum", "brandy-raspberry", "brandy-weinbrand", "gin",
  "rum", "whisky", "whisky-bourbon",
] as const;

const entityCategoryValues = [
  "essentialoil", "beverage-alcoholic", "fruit", "nutseed-legume",
  "animalproduct", "bakery", "beverage",
] as const;

const entityAliasReadableValues = [
  "grass", "orange", "beer", "lemon", "lime", "papaya", "beans", "peanut",
  "mustard", "egg", "bakery", "bread", "bread-rye", "bread-wheaten",
  "bread-white", "bread-wholewheat", "wort", "arrack", "brandy", "brandy-anise",
  "brandy-apple", "brandy-armagnac", "brandy-blackberry", "brandy-cherry",
  "brandy-cognac", "brandy-papaya", "brandy-pear", "brandy-plum",
  "brandy-raspberry", "brandy-weinbrand",
] as const;

const foodAliasValues = [
  "Mango", "Orange", "bakery products", "bread", "beer", "brandy",
  "apple brandy", "blackberry brandy", "japenese whisky", "cherry brandy",
  "raspberry brandy", "gin", "wholewheat bread", "apple", "Arabica coffee",
  "green tea", "sweetcorn", "cider", "roibos tea", "Oats", "Rice", "Corn",
  "Popcorn", "barley", "Malt", "Sake", "Coffee", "Wort", "wine",
] as const;

const connectionEntityIdValues = [
  "259", "307", "339", "88", "330", "332", "780", "333", "62", "291",
] as const;

const connectionEntityAliasValues = [
  "Garlic", "Olive", "Pepper", "Milk", "Cinnamon", "Cumin", "Cream", "Ginger",
  "Cheese", "Soybean Sauce",
] as const;

const connectionIngredientValues = [
  "Garlic", "Olive Oil", "Black Pepper", "Milk", "Cinnamon", "Cumin", "Cream",
  "Ginger", "parmesan cheese", "Soy Sauce",
] as const;

// ---------- FlavorDB schemas: /properties/* ----------

export const tasteThresholdSchema = z.object({
  values: oneOrMany(tasteThresholdValues).describe(
    "Taste / odor descriptor or reported threshold concentration to filter by."
  ),
});

export const synthesisSchema = z.object({
  values: oneOrMany(synthesisValues).describe(
    "Synthesis-method keyword to filter flavor molecules by (reagent, reaction type, or process)."
  ),
});

export const tradeAssociationGuidelinesSchema = z.object({
  guideline: oneOrMany(tradeAssociationGuidelineValues).describe(
    "Trade-association intake guideline value (mg). Must match one of the listed exact strings."
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

export const coeApprovalSchema = z.object({
  coe_approval: oneOrMany(coeApprovalValues).describe(
    "Council of Europe (CoE) approval keyword or usage-level phrase to filter by."
  ),
});

export const aromaThresholdSchema = z.object({
  threshold: oneOrMany(aromaThresholdValues).describe(
    "Reported aroma threshold concentration (ppb / ppm) to filter molecules by."
  ),
});

// ---------- FlavorDB range schemas: /properties/* + /more_properties/* ----------

export const nasRangeSchema = z.object({
  NAS_No: intRange(21, 8811).describe("NAS number (21–8811)."),
});

export const jecfaRangeSchema = z.object({
  JECFA_No: intRange(1, 1897).describe("JECFA number (1–1897)."),
});

export const flNoRangeSchema = z.object({
  FL_No: intRange(1001, 56000).describe("FL number (1001–56000)."),
});

export const femaRangeSchema = z.object({
  FEMA_No: intRange(2001, 4905).describe("FEMA number (2001–4905)."),
});

export const coeRangeSchema = z.object({
  CoE_No: intRange(2, 2100).describe("Council of Europe (CoE) number (2–2100)."),
});

export const surfaceAreaRangeSchema = z.object({
  surface_area: numRange(24.63, 1000).describe("Molecular surface area (24.63–1000)."),
});

export const rotatableBondsRangeSchema = z.object({
  numRotatableBonds: intRange(0, 40).describe("Rotatable-bond count (0–40)."),
});

export const numberOfAtomsRangeSchema = z.object({
  numberOfAtoms: intRange(1, 150).describe("Total atom count (1–150)."),
});

export const numRingsRangeSchema = z.object({
  numRings: intRange(0, 10).describe("Ring count (0–10)."),
});

export const energyRangeSchema = z.object({
  energy: numRange(-20, 200).describe("Molecular energy value (-20–200)."),
});

export const aromaticRingsRangeSchema = z.object({
  numberOfAromaticRings: intRange(0, 10).describe("Aromatic-ring count (0–10)."),
});

export const aromaticBondsRangeSchema = z.object({
  numberOfAromaticBonds: intRange(0, 60).describe("Aromatic-bond count (0–60)."),
});

export const alogpRangeSchema = z.object({
  alogp: numRange(-10, 10).describe("aLogP partition coefficient (-10–10)."),
});

export const morePropsPubchemIdRangeSchema = z.object({
  pubchemId: intRange(1, 100_000_000).describe(
    "PubChem CID for the more_properties table (1–100000000)."
  ),
});

// ---------- FlavorDB molecules_data schemas ----------

export const molWeightRangeSchema = z.object({
  molecularWeight: numRange(4, 1000).describe("Molecular weight (4–1000)."),
});

export const moleculeTypeSchema = z.object({
  type: oneOrMany(moleculeTypeValues).describe("Molecule type: natural or synthetic."),
});

export const hbdCountRangeSchema = z.object({
  hbdCount: intRange(0, 20).describe("Hydrogen-bond donor count (0–20)."),
});

export const tpsaRangeSchema = z.object({
  topologicalPolarSurfaceArea: numRange(0, 500).describe(
    "Topological polar surface area (0–500)."
  ),
});

export const moleculesPubchemIdRangeSchema = z.object({
  pubchemId: intRange(4, 100_000_000).describe(
    "PubChem CID for the molecules_data table (4–100000000)."
  ),
});

export const monoisotopicMassRangeSchema = z.object({
  monoisotopicMass: numRange(4, 1000).describe("Monoisotopic mass (4–1000)."),
});

export const heavyAtomCountRangeSchema = z.object({
  heavyAtomCount: intRange(1, 100).describe("Heavy-atom count (1–100)."),
});

export const functionalGroupsSchema = z.object({
  functional_groups: oneOrMany(functionalGroupValues).describe(
    "Functional-group name to filter molecules by."
  ),
});

export const flavorProfileSchema = z.object({
  flavor_profile: oneOrMany(flavorProfileValues).describe(
    "Flavor-profile descriptor to filter molecules by."
  ),
});

export const femaFlavorProfileSchema = z.object({
  fema_flavor_profile: oneOrMany(femaFlavorProfileValues).describe(
    "FEMA flavor-profile descriptor to filter molecules by."
  ),
});

export const commonNameSchema = z.object({
  common_name: oneOrMany(commonNameValues).describe(
    "Common / trivial molecule name to look up."
  ),
});

export const moleculeEntitiesByIdSchema = z.object({
  pubchemId: intRange(1, 100_000_000).describe(
    "PubChem CID whose linked entities to fetch."
  ),
});

// ---------- FlavorDB entities + food + connections schemas ----------

export const naturalSourceSchema = z.object({
  natural_source_name: oneOrMany(naturalSourceValues).describe(
    "Natural-source taxon or common name to filter entities by."
  ),
});

export const nameAndCategorySchema = z.object({
  entity_alias: oneOrMany(entityAliasValues).describe(
    "Entity alias (short name) to look up."
  ),
  category: oneOrMany(entityCategoryValues).describe(
    "Entity category to constrain the lookup by."
  ),
});

export const entityAliasReadableSchema = z.object({
  entity_alias_readable: oneOrMany(entityAliasReadableValues).describe(
    "Human-readable entity alias to look up."
  ),
});

export const entityIdPathSchema = z.object({
  entityId: intRange(1, 100_000).describe("FlavorDB entity ID (path parameter)."),
});

export const foodByAliasSchema = z.object({
  food_pair: oneOrMany(foodAliasValues).describe(
    "Food alias to fetch flavor-pairing information for."
  ),
});

// "At least one of" is enforced in the tool handler at runtime — MCP's
// registerTool takes a raw shape, so we can't attach zod .refine() here.
export const connectionLinksSchema = z.object({
  entity_id: oneOrMany(connectionEntityIdValues)
    .optional()
    .describe("Numeric entity ID (as string) to fetch connection links for."),
  entity_alias_readable: oneOrMany(connectionEntityAliasValues)
    .optional()
    .describe("Human-readable entity alias to fetch connection links for."),
  ingredient: oneOrMany(connectionIngredientValues)
    .optional()
    .describe("Ingredient name to fetch connection links for."),
});
