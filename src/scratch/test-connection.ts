import { get } from "../client.js";

async function main() {
  try {
    const data = await get(
      "FlavorDB",
      "/properties/synthesis",
      { values: "acid" }
  );
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Connection test failed:", e);
  }
}

main();