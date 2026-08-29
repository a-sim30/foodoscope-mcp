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
  nasRangeSchema,
  jecfaRangeSchema,
  flNoRangeSchema,
  femaRangeSchema,
} from "../types.js";

// Join arrays with commas so multi-value queries fit in a single ?param= slot.
// Flip to axios's default (drop the join) if the API expects repeated params.
const toParam = (v: string | string[]) => (Array.isArray(v) ? v.join(",") : v);

const jsonReply = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerFlavorTools(server: McpServer) {
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
}
