import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value)
    throw new Error(`Missing required Studio environment variable: ${name}`);
  return value;
}

export default defineConfig({
  name: "default",
  title: "Vertex Studio",
  projectId: requiredEnv("SANITY_STUDIO_PROJECT_ID"),
  dataset: requiredEnv("SANITY_STUDIO_DATASET"),
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
