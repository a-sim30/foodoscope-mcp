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
      title: "Get Taste Threshold Info",
      description:
        "Filter FlavorDB molecules by taste/odor descriptor or reported threshold concentration.",
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
      title: "Get Synthesis Info",
      description:
        "Filter FlavorDB molecules by a synthesis / production keyword (reagent, reaction, or process).",
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
      title: "Get By Trade Association Guidelines",
      description:
        "Filter FlavorDB molecules by trade-association intake guideline value (mg).",
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
      title: "Get By Natural Occurrence",
      description:
        "Filter FlavorDB molecules by natural-occurrence phrase (source food or notation).",
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
      title: "Get By IOFI Categorisation",
      description:
        "Filter FlavorDB molecules by IOFI category (Natural / Nature Identical / Artificial variants).",
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
      title: "Get By EINECS Number",
      description:
        "Look up FlavorDB molecules by EINECS registry number (format nnn-nnn-n).",
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
      title: "Get By Description",
      description:
        "Search FlavorDB molecules by a free-form descriptor keyword found in their description.",
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
      title: "Get By CoE Approval",
      description:
        "Filter FlavorDB molecules by Council of Europe (CoE) approval keyword or usage-level phrase.",
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
      title: "Get By Aroma Threshold",
      description:
        "Filter FlavorDB molecules by reported aroma threshold concentration (ppb / ppm).",
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
      title: "Get By NAS Number",
      description: "Look up FlavorDB molecules by NAS number (21–8811).",
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
      title: "Get By JECFA Number",
      description: "Look up FlavorDB molecules by JECFA number (1–1897).",
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
      title: "Get By FL Number",
      description: "Look up FlavorDB molecules by FL number (1001–56000).",
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
      title: "Get By FEMA Number",
      description: "Look up FlavorDB molecules by FEMA number (2001–4905).",
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
      title: "Get By CoE Number",
      description: "Look up FlavorDB molecules by Council of Europe (CoE) number (2–2100).",
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
      title: "Get By Surface Area",
      description: "Filter FlavorDB molecules by molecular surface area (24.63–1000).",
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
      title: "Get By Rotatable Bonds",
      description: "Filter FlavorDB molecules by rotatable-bond count (0–40).",
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
      title: "Get By Number Of Atoms",
      description: "Filter FlavorDB molecules by total atom count (1–150).",
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
      title: "Get By Ring Count",
      description: "Filter FlavorDB molecules by ring count (0–10).",
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
      title: "Get By Energy",
      description: "Filter FlavorDB molecules by molecular energy value (-20–200).",
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
      title: "Get By Aromatic Rings",
      description: "Filter FlavorDB molecules by aromatic-ring count (0–10).",
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
      title: "Get By Aromatic Bonds",
      description: "Filter FlavorDB molecules by aromatic-bond count (0–60).",
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
      title: "Get By aLogP",
      description: "Filter FlavorDB molecules by aLogP partition coefficient (-10–10).",
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
      title: "Get More-Properties By PubChem CID",
      description:
        "Look up FlavorDB more_properties rows by PubChem CID (1–100000000).",
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
      title: "Get Molecules By Weight",
      description: "Filter FlavorDB molecules by molecular weight (4–1000).",
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
      title: "Get Molecules By Type",
      description: "Filter FlavorDB molecules by type (natural or synthetic).",
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
      title: "Get Molecules By H-Bond Donor Count",
      description: "Filter FlavorDB molecules by hydrogen-bond donor count (0–20).",
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
      title: "Get Molecules By TPSA",
      description:
        "Filter FlavorDB molecules by topological polar surface area (0–500).",
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
      title: "Get Molecules By PubChem CID",
      description: "Look up FlavorDB molecules by PubChem CID (4–100000000).",
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
      title: "Get Molecules By Monoisotopic Mass",
      description: "Filter FlavorDB molecules by monoisotopic mass (4–1000).",
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
      title: "Get Molecules By Heavy Atom Count",
      description: "Filter FlavorDB molecules by heavy-atom count (1–100).",
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
      title: "Get Molecules By Functional Groups",
      description: "Filter FlavorDB molecules by functional-group name.",
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
      title: "Get Molecules By Flavor Profile",
      description: "Filter FlavorDB molecules by flavor-profile descriptor.",
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
      title: "Get Molecules By FEMA Flavor Profile",
      description: "Filter FlavorDB molecules by FEMA flavor-profile descriptor.",
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
      title: "Get Molecules By Common Name",
      description: "Look up FlavorDB molecules by common / trivial name.",
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
      title: "Get Molecule Entities By PubChem CID",
      description: "Fetch entities linked to a given molecule by its PubChem CID.",
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
      title: "Get Entities By Natural Source",
      description: "Filter FlavorDB entities by natural-source taxon or common name.",
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
      title: "Get Entities By Name And Category",
      description:
        "Look up FlavorDB entities by alias name constrained to a category.",
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
      title: "Get Entities By Readable Alias",
      description: "Look up FlavorDB entities by human-readable alias.",
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
      title: "Get Entity Molecules",
      description: "Fetch molecules linked to a FlavorDB entity by entity ID.",
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
      title: "Get Entity Molecules (Compact)",
      description:
        "Fetch a compact list of molecules linked to a FlavorDB entity by entity ID.",
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
      title: "Get Food By Alias",
      description: "Fetch flavor-pairing information for a food by its alias.",
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
      title: "Get Connection Links",
      description:
        "Fetch flavor-connection links for an entity. Provide exactly one of: entity_id, entity_alias_readable, or ingredient.",
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
