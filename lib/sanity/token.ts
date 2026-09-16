import "server-only";

const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error(
    "Missing required Sanity environment variable: SANITY_API_READ_TOKEN",
  );
}

export const sanityToken = token;
