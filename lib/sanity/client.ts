import { createClient } from "@sanity/client";
import "server-only";
import { sanityToken } from "./token";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-15",
  useCdn: false,
  token: sanityToken,
  perspective: "published",
});
