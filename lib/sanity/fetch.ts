import "server-only";

import { sanityClient } from "./client";

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
};

export function sanityFetch<T>({ query, params, tags, revalidate }: SanityFetchOptions) {
  return sanityClient.fetch<T>(query, params ?? {}, {
    next: {
      tags,
      revalidate: revalidate ?? (tags?.length ? false : 3600),
    },
  });
}