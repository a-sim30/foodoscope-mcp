#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerRecipeTools } from "./tools/recipe.js";
import { registerFlavorTools } from "./tools/flavor.js";

const server = new McpServer({ name: "foodoscope-mcp", version: "1.0.0" });

registerRecipeTools(server);
registerFlavorTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("foodoscope-mcp server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});