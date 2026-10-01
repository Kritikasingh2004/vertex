import { z } from "zod";

export const SearchRequestSchema = z.object({
  query: z.string().trim().min(1).max(200),
  sort: z.enum(["relevance", "newest", "duration"]).default("relevance"),
});

export const ModelHitSchema = z.object({
  lessonId: z.string(),
  kind: z.enum(["lesson", "video"]),
  reason: z.string(),
  rank: z.number(),
  startSeconds: z.number().nullable(),
});

export const ModelSearchSchema = z.object({
  reply: z.string(),
  hits: z.array(ModelHitSchema),
});

const SharedResultSchema = z.object({
  lessonId: z.string(),
  lessonTitle: z.string(),
  lessonSlug: z.string(),
  courseTitle: z.string(),
  courseSlug: z.string(),
  moduleTitle: z.string(),
  label: z.string(),
  description: z.string(),
  keyPoints: z.array(z.string()),
  duration: z.number(),
  thumbnail: z.string().nullable(),
  freePreview: z.boolean(),
  href: z.string(),
  reason: z.string(),
  rank: z.number(),
});

export const SearchResultSchema = z.discriminatedUnion("kind", [
  SharedResultSchema.extend({ kind: z.literal("lesson") }),
  SharedResultSchema.extend({
    kind: z.literal("video"),
    startSeconds: z.number(),
    matchedLabel: z.string(),
  }),
]);

export const SearchResponseSchema = z.object({
  query: z.string(),
  sort: z.enum(["relevance", "newest", "duration"]),
  count: z.number(),
  reply: z.string(),
  results: z.array(SearchResultSchema),
});

export type ModelHit = z.infer<typeof ModelHitSchema>;
export type ModelSearch = z.infer<typeof ModelSearchSchema>;
export type SearchRequest = z.infer<typeof SearchRequestSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
