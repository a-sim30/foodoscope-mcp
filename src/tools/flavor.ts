import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { get } from "../client.js";
import {
  tasteThresholdSchema,
  synthesisSchema,
  tradeAssociationGuidelinesSchema,
  naturalOccurrenceSchema,
  iofiCategorisationSchema,
  einecsSchema,
  descriptionSchema,
  coeApprovalSchema,
  aromaThresholdSchema,
  nasRangeSchema,
  jecfaRangeSchema,
  flNoRangeSchema,
  femaRangeSchema,
  coeRangeSchema,
  surfaceAreaRangeSchema,
  rotatableBondsRangeSchema,
  numberOfAtomsRangeSchema,
  numRingsRangeSchema,
  energyRangeSchema,
  aromaticRingsRangeSchema,
  aromaticBondsRangeSchema,
  alogpRangeSchema,
  morePropsPubchemIdRangeSchema,
  molWeightRangeSchema,
  moleculeTypeSchema,
  hbdCountRangeSchema,
  tpsaRangeSchema,
  moleculesPubchemIdRangeSchema,
  monoisotopicMassRangeSchema,
  heavyAtomCountRangeSchema,
  functionalGroupsSchema,
  flavorProfileSchema,
  femaFlavorProfileSchema,
  commonNameSchema,
  moleculeEntitiesByIdSchema,
  naturalSourceSchema,
  nameAndCategorySchema,
  entityAliasReadableSchema,
  entityIdPathSchema,
  foodByAliasSchema,
  connectionLinksSchema,
} from "../types.js";

// Join arrays with commas so multi-value queries fit a single ?param= slot.
// Flip to axios's default (drop the join) if the API expects repeated params.
const toParam = (v: string | string[]) => (Array.isArray(v) ? v.join(",") : v);
const maybeParam = (v: string | string[] | undefined) =>
  v === undefined ? undefined : toParam(v);

const jsonReply = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerFlavorTools(server: McpServer) {
  // ---------- /properties/* ----------

  server.registerTool(
    "get_taste_threshold_info",
    {
      title: "Get Flavor Compound by Taste Thresholds",
      description:
        "Get flavor compounds filtered by a taste/odor descriptor or reported taste-threshold concentration.",
      inputSchema: tasteThresholdSchema.shape,
    },
    async ({ values }) => {
      const data = await get("FlavorDB", "/properties/taste-threshold", {
        values: toParam(values),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_synthesis_info",
    {
      title: "Get Flavor Compound by Synthesis Methods",
      description:
        "Get flavor compounds filtered by a synthesis / production keyword (reagent, reaction type, or process).",
      inputSchema: synthesisSchema.shape,
    },
    async ({ values }) => {
      const data = await get("FlavorDB", "/properties/synthesis", {
        values: toParam(values),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_trade_association_guidelines",
    {
      title: "Get Trade Association Guidelines",
      description:
        "Get trade-association intake guidelines for flavor compounds by guideline value (mg).",
      inputSchema: tradeAssociationGuidelinesSchema.shape,
    },
    async ({ guideline }) => {
      const data = await get(
        "FlavorDB",
        "/properties/by-tradeAssociationGuidelines",
        { guideline: toParam(guideline) }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_natural_occurrence",
    {
      title: "Get Natural Occurrence Information for a Flavor Compound",
      description:
        "Get natural-occurrence information for flavor compounds by source-food phrase or notation.",
      inputSchema: naturalOccurrenceSchema.shape,
    },
    async ({ occurrence }) => {
      const data = await get("FlavorDB", "/properties/by-naturalOccurrence", {
        occurrence: toParam(occurrence),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_iofi_categorisation",
    {
      title: "Get IOFI Categorization for a Flavor Compound",
      description:
        "Get IOFI categorisation (Natural / Nature Identical / Artificial variants) for flavor compounds.",
      inputSchema: iofiCategorisationSchema.shape,
    },
    async ({ category }) => {
      const data = await get("FlavorDB", "/properties/by-iofi-categorisation", {
        category: toParam(category),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_einecs",
    {
      title: "Get Flavor Compound by EINECS Number",
      description:
        "Get a flavor compound by its EINECS registry number (format nnn-nnn-n).",
      inputSchema: einecsSchema.shape,
    },
    async ({ einecs_no }) => {
      const data = await get("FlavorDB", "/properties/by-einecs", {
        einecs_no: toParam(einecs_no),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_description",
    {
      title: "Get Molecule Description for a Flavor Compound",
      description:
        "Get molecule descriptions for flavor compounds by a free-form descriptor keyword.",
      inputSchema: descriptionSchema.shape,
    },
    async ({ desc }) => {
      const data = await get("FlavorDB", "/properties/by-description", {
        desc: toParam(desc),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_coe_approval",
    {
      title: "Get Council of Europe Approval Status for a Flavor Compound",
      description:
        "Get the Council of Europe (CoE) approval status for flavor compounds by keyword or usage-level phrase.",
      inputSchema: coeApprovalSchema.shape,
    },
    async ({ coe_approval }) => {
      const data = await get("FlavorDB", "/properties/by-coe-approval", {
        coe_approval: toParam(coe_approval),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_aroma_threshold_values",
    {
      title: "Get Aroma Threshold Values for a Flavor Compound",
      description:
        "Get reported aroma threshold values (ppb / ppm) for flavor compounds.",
      inputSchema: aromaThresholdSchema.shape,
    },
    async ({ threshold }) => {
      const data = await get("FlavorDB", "/properties/by-aromaThresholdValues", {
        threshold: toParam(threshold),
      });
      return jsonReply(data);
    }
  );

  // ---------- /properties/*-range ----------

  server.registerTool(
    "get_by_nas_range",
    {
      title: "Get Flavor Compound by National Academy of Sciences Number",
      description:
        "Get a flavor compound by its National Academy of Sciences (NAS) number (21–8811).",
      inputSchema: nasRangeSchema.shape,
    },
    async ({ NAS_No }) => {
      const data = await get("FlavorDB", "/properties/by-nas-range", { NAS_No });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_jecfa_range",
    {
      title: "Get Flavor Compound by JECFA Number",
      description: "Get a flavor compound by its JECFA number (1–1897).",
      inputSchema: jecfaRangeSchema.shape,
    },
    async ({ JECFA_No }) => {
      const data = await get("FlavorDB", "/properties/by-jecfa-range", { JECFA_No });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_fl_no_range",
    {
      title: "Get Flavor Compound by FLAVIS Number",
      description: "Get a flavor compound by its FLAVIS (FL) number (1001–56000).",
      inputSchema: flNoRangeSchema.shape,
    },
    async ({ FL_No }) => {
      const data = await get("FlavorDB", "/properties/by-flNo-range", { FL_No });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_fema_range",
    {
      title: "Get Flavor Compound by FEMA Number",
      description: "Get a flavor compound by its FEMA number (2001–4905).",
      inputSchema: femaRangeSchema.shape,
    },
    async ({ FEMA_No }) => {
      const data = await get("FlavorDB", "/properties/by-fema-range", { FEMA_No });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_coe_range",
    {
      title: "Get Flavor Compound by Council of Europe Number",
      description:
        "Get a flavor compound by its Council of Europe (CoE) number (2–2100).",
      inputSchema: coeRangeSchema.shape,
    },
    async ({ CoE_No }) => {
      const data = await get("FlavorDB", "/properties/by-coe-range", { CoE_No });
      return jsonReply(data);
    }
  );

  // ---------- /more_properties/*-range ----------

  server.registerTool(
    "get_by_surface_area_range",
    {
      title: "Find Flavor Compounds by Surface Area",
      description: "Find flavor compounds by molecular surface area (24.63–1000).",
      inputSchema: surfaceAreaRangeSchema.shape,
    },
    async ({ surface_area }) => {
      const data = await get("FlavorDB", "/more_properties/by-surfaceArea-range", {
        surface_area,
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_rotatable_bonds_range",
    {
      title: "Find Flavor Compounds by Rotatable Bond Count",
      description: "Find flavor compounds by rotatable-bond count (0–40).",
      inputSchema: rotatableBondsRangeSchema.shape,
    },
    async ({ numRotatableBonds }) => {
      const data = await get(
        "FlavorDB",
        "/more_properties/by-rotatableBonds-range",
        { numRotatableBonds }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_number_of_atoms_range",
    {
      title: "Find Flavor Compounds by Atom Count",
      description: "Find flavor compounds by total atom count (1–150).",
      inputSchema: numberOfAtomsRangeSchema.shape,
    },
    async ({ numberOfAtoms }) => {
      const data = await get(
        "FlavorDB",
        "/more_properties/by-numberOfAtoms-range",
        { numberOfAtoms }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_num_rings_range",
    {
      title: "Find Flavor Compounds by Ring Count",
      description: "Find flavor compounds by ring count (0–10).",
      inputSchema: numRingsRangeSchema.shape,
    },
    async ({ numRings }) => {
      const data = await get("FlavorDB", "/more_properties/by-numRings-range", {
        numRings,
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_energy_range",
    {
      title: "Find Flavor Compounds by Energy",
      description: "Find flavor compounds by molecular energy value (-20–200).",
      inputSchema: energyRangeSchema.shape,
    },
    async ({ energy }) => {
      const data = await get("FlavorDB", "/more_properties/by-energy-range", {
        energy,
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_aromatic_rings_range",
    {
      title: "Find Flavor Compounds by Aromatic Ring Count",
      description: "Find flavor compounds by aromatic-ring count (0–10).",
      inputSchema: aromaticRingsRangeSchema.shape,
    },
    async ({ numberOfAromaticRings }) => {
      const data = await get(
        "FlavorDB",
        "/more_properties/by-aromaticRings-range",
        { numberOfAromaticRings }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_aromatic_bonds_range",
    {
      title: "Find Flavor Compounds by Aromatic Bond Count",
      description: "Find flavor compounds by aromatic-bond count (0–60).",
      inputSchema: aromaticBondsRangeSchema.shape,
    },
    async ({ numberOfAromaticBonds }) => {
      const data = await get(
        "FlavorDB",
        "/more_properties/by-aromaticBonds-range",
        { numberOfAromaticBonds }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_alogp_range",
    {
      title: "Find Flavor Compounds by Fat-Solubility",
      description:
        "Find flavor compounds by fat-solubility, expressed as aLogP (-10–10).",
      inputSchema: alogpRangeSchema.shape,
    },
    async ({ alogp }) => {
      const data = await get("FlavorDB", "/more_properties/by-alogp-range", {
        alogp,
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_by_pubchem_id_range",
    {
      title: "Find Flavor Compounds by PubChem ID",
      description:
        "Find flavor compounds by PubChem ID via the more_properties table (1–100000000).",
      inputSchema: morePropsPubchemIdRangeSchema.shape,
    },
    async ({ pubchemId }) => {
      const data = await get("FlavorDB", "/more_properties/by-pubchemId-range", {
        pubchemId,
      });
      return jsonReply(data);
    }
  );

  // ---------- /molecules_data/* ----------

  server.registerTool(
    "get_molecules_by_weight_range",
    {
      title: "Filter Flavor Compounds by Weight Range",
      description: "Filter flavor compounds by molecular weight range (4–1000).",
      inputSchema: molWeightRangeSchema.shape,
    },
    async ({ molecularWeight }) => {
      const data = await get(
        "FlavorDB",
        "/molecules_data/filter-by-weight-range",
        { molecularWeight }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_type",
    {
      title: "Filter Flavor Compounds by their Type",
      description: "Filter flavor compounds by type: natural or synthetic.",
      inputSchema: moleculeTypeSchema.shape,
    },
    async ({ type }) => {
      const data = await get("FlavorDB", "/molecules_data/filter-by-type", {
        type: toParam(type),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_hbd_count_range",
    {
      title: "Filter Flavor Compounds by H-Bond Donor Count",
      description: "Filter flavor compounds by hydrogen-bond donor count (0–20).",
      inputSchema: hbdCountRangeSchema.shape,
    },
    async ({ hbdCount }) => {
      const data = await get(
        "FlavorDB",
        "/molecules_data/filter-by-hbd-count-range",
        { hbdCount }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_tpsa_range",
    {
      title: "Find Flavor Compounds by Polar Surface Area",
      description:
        "Find flavor compounds by topological polar surface area (TPSA, 0–500).",
      inputSchema: tpsaRangeSchema.shape,
    },
    async ({ topologicalPolarSurfaceArea }) => {
      const data = await get(
        "FlavorDB",
        "/molecules_data/by-topologicalPolarSurfaceArea-range",
        { topologicalPolarSurfaceArea }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_pubchem_id_range",
    {
      title: "Find Flavor Compound by PubChem ID",
      description:
        "Find a flavor compound by PubChem ID via the molecules_data table (4–100000000).",
      inputSchema: moleculesPubchemIdRangeSchema.shape,
    },
    async ({ pubchemId }) => {
      const data = await get("FlavorDB", "/molecules_data/by-pubchemId-range", {
        pubchemId,
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_monoisotopic_mass_range",
    {
      title: "Find Flavor Compounds by Monoisotopic Mass",
      description: "Find flavor compounds by monoisotopic mass (4–1000).",
      inputSchema: monoisotopicMassRangeSchema.shape,
    },
    async ({ monoisotopicMass }) => {
      const data = await get(
        "FlavorDB",
        "/molecules_data/by-monoisotopicMass-range",
        { monoisotopicMass }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_heavy_atom_count_range",
    {
      title: "Find Flavor Compounds by Heavy Atom Count",
      description: "Find flavor compounds by heavy-atom count (1–100).",
      inputSchema: heavyAtomCountRangeSchema.shape,
    },
    async ({ heavyAtomCount }) => {
      const data = await get(
        "FlavorDB",
        "/molecules_data/by-heavyAtomCount-range",
        { heavyAtomCount }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_functional_groups",
    {
      title: "Find Flavor Compound by its Functional Group",
      description: "Find flavor compounds by functional-group name.",
      inputSchema: functionalGroupsSchema.shape,
    },
    async ({ functional_groups }) => {
      const data = await get(
        "FlavorDB",
        "/molecules_data/by-functionalGroups",
        { functional_groups: toParam(functional_groups) }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_flavor_profile",
    {
      title: "Find Flavor Compound by General Flavor Profile",
      description: "Find flavor compounds by a general flavor-profile descriptor.",
      inputSchema: flavorProfileSchema.shape,
    },
    async ({ flavor_profile }) => {
      const data = await get("FlavorDB", "/molecules_data/by-flavorProfile", {
        flavor_profile: toParam(flavor_profile),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_fema_flavor_profile",
    {
      title: "Get FEMA Flavor Profile for a Flavor Compound",
      description: "Get the FEMA flavor profile for flavor compounds by descriptor.",
      inputSchema: femaFlavorProfileSchema.shape,
    },
    async ({ fema_flavor_profile }) => {
      const data = await get(
        "FlavorDB",
        "/molecules_data/by-femaFlavorProfile",
        { fema_flavor_profile: toParam(fema_flavor_profile) }
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecules_by_common_name",
    {
      title: "Find Flavor Compound by its Common Name",
      description: "Find a flavor compound by its common / trivial name.",
      inputSchema: commonNameSchema.shape,
    },
    async ({ common_name }) => {
      const data = await get("FlavorDB", "/molecules_data/by-commonName", {
        common_name: toParam(common_name),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_molecule_entities_by_pubchem_id",
    {
      title: "Get Ingredients Containing a Molecule",
      description:
        "Given a molecule's PubChem ID, return all ingredients that contain that molecule.",
      inputSchema: moleculeEntitiesByIdSchema.shape,
    },
    async ({ pubchemId }) => {
      const data = await get(
        "FlavorDB",
        `/molecules_data/by-id/${pubchemId}/entities`
      );
      return jsonReply(data);
    }
  );

  // ---------- /entities/* ----------

  server.registerTool(
    "get_entities_by_natural_source",
    {
      title: "Get Food by their Natural Source",
      description:
        "Get foods (ingredients) by their natural source (taxon or common name).",
      inputSchema: naturalSourceSchema.shape,
    },
    async ({ natural_source_name }) => {
      const data = await get("FlavorDB", "/entities/by-natural-source", {
        natural_source_name: toParam(natural_source_name),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_entities_by_name_and_category",
    {
      title: "Get Ingredient by Name and Category",
      description: "Get an ingredient by alias name constrained to a food category.",
      inputSchema: nameAndCategorySchema.shape,
    },
    async ({ entity_alias, category }) => {
      const data = await get("FlavorDB", "/entities/by-name-and-category", {
        entity_alias: toParam(entity_alias),
        category: toParam(category),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_entities_by_alias_readable",
    {
      title: "Get Ingredient by Readable Name",
      description: "Get an ingredient by its human-readable name.",
      inputSchema: entityAliasReadableSchema.shape,
    },
    async ({ entity_alias_readable }) => {
      const data = await get("FlavorDB", "/entities/by-entity-alias-readable", {
        entity_alias_readable: toParam(entity_alias_readable),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_entity_molecules",
    {
      title: "Get Molecules in an Ingredient",
      description:
        "Given an ingredient ID, return all flavor molecules in that ingredient, sorted from rarest to most common.",
      inputSchema: entityIdPathSchema.shape,
    },
    async ({ entityId }) => {
      const data = await get(
        "FlavorDB",
        `/entities/by-id/${entityId}/molecules`
      );
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_entity_molecules_compact",
    {
      title: "Get Molecules in an Ingredient (Compact)",
      description:
        "Same as get_entity_molecules but each molecule carries only pubchem_id and common_name.",
      inputSchema: entityIdPathSchema.shape,
    },
    async ({ entityId }) => {
      const data = await get(
        "FlavorDB",
        `/entities/by-id/${entityId}/molecules-compact`
      );
      return jsonReply(data);
    }
  );

  // ---------- /food/* + /connections/* ----------

  server.registerTool(
    "get_food_by_alias",
    {
      title: "Get Flavor Pairings by Ingredient Name",
      description: "Get flavor pairings for an ingredient by its alias name.",
      inputSchema: foodByAliasSchema.shape,
    },
    async ({ food_pair }) => {
      const data = await get("FlavorDB", "/food/by-alias", {
        food_pair: toParam(food_pair),
      });
      return jsonReply(data);
    }
  );

  server.registerTool(
    "get_connection_links",
    {
      title: "Get Dataset Connection Links (FDB Playground)",
      description:
        "Fetch dataset-connection links for an ingredient in the FDB Playground. Provide exactly one of: entity_id, entity_alias_readable, or ingredient.",
      inputSchema: connectionLinksSchema.shape,
    },
    async ({ entity_id, entity_alias_readable, ingredient }) => {
      if (!entity_id && !entity_alias_readable && !ingredient) {
        throw new Error(
          "get_connection_links: provide at least one of entity_id, entity_alias_readable, ingredient."
        );
      }
      const data = await get("FlavorDB", "/connections/links", {
        entity_id: maybeParam(entity_id),
        entity_alias_readable: maybeParam(entity_alias_readable),
        ingredient: maybeParam(ingredient),
      });
      return jsonReply(data);
    }
  );
}
