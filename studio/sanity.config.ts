import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

import { apiVersion, dataset, projectId } from "./env";

export default defineConfig({
  name: "vertex",
  title: "Vertex",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
