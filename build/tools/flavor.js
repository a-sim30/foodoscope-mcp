import { get } from "../client.js";
import { synthesisSchema } from "../types.js";
export function registerFlavorTools(server) {
    server.registerTool("get_synthesis_info", {
        title: "Get Synthesis Info",
        description: "Get synthesis/production method data for flavor molecules matching a property from FlavorDB.",
        inputSchema: synthesisSchema.shape,
    }, async ({ values }) => {
        const data = await get("FlavorDB", "/properties/synthesis", { values });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
}
//# sourceMappingURL=flavor.js.map