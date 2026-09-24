import "server-only";

import { lessonHref } from "@/lib/routes";
import { lessonLabel } from "@/lib/format";
import { sanityFetch } from "@/lib/sanity/fetch";
import { LESSONS_BY_IDS_QUERY } from "@/lib/sanity/queries";
import { SearchResultSchema, type ModelHit, type SearchResult } from "./types";

type GroundLesson = {
  _id: string;
  title: string;
  slug: string;
  duration?: number;
  freePreview?: boolean;
  keyPoints?: string[];
  poster?: { asset?: { url?: string } };
  createdAt?: string;
  course?: {
    title?: string;
    slug?: string;
    modules?: Array<{ title?: string; lessons?: Array<{ _id: string }> }>;
  };
};

export async function groundSearchHits(
  hits: ModelHit[],
  sort: "relevance" | "newest" | "duration",
) {
  const uniqueIds = [...new Set(hits.slice(0, 100).map((hit) => hit.lessonId))];
  if (!uniqueIds.length) return [];
  const lessons = await sanityFetch<GroundLesson[]>({
    query: LESSONS_BY_IDS_QUERY,
    params: { ids: uniqueIds },
    tags: ["lesson", "course"],
  });
  const byId = new Map(lessons.map((lesson) => [lesson._id, lesson]));
  const grounded: SearchResult[] = [];

  for (const hit of hits.slice(0, 100)) {
    const lesson = byId.get(hit.lessonId);
    const course = lesson?.course;
    if (!lesson || !course?.slug || !course.title || !lesson.slug) continue;
    const moduleIndex =
      course.modules?.findIndex((module) =>
        module.lessons?.some((item) => item._id === lesson._id),
      ) ?? -1;
    const lessonIndex =
      moduleIndex >= 0
        ? (course.modules?.[moduleIndex]?.lessons?.findIndex(
            (item) => item._id === lesson._id,
          ) ?? -1)
        : -1;
    if (moduleIndex < 0 || lessonIndex < 0) continue;

    const base = {
      lessonId: lesson._id,
      lessonTitle: lesson.title,
      lessonSlug: lesson.slug,
      courseTitle: course.title,
      courseSlug: course.slug,
      moduleTitle: course.modules?.[moduleIndex]?.title ?? "Module",
      label: lessonLabel(moduleIndex, lessonIndex),
      description: hit.reason,
      keyPoints: lesson.keyPoints ?? [],
      duration: lesson.duration ?? 0,
      thumbnail: lesson.poster?.asset?.url ?? null,
      freePreview: lesson.freePreview ?? false,
      href: lessonHref(
        lesson.slug,
        hit.kind === "video" ? (hit.startSeconds ?? undefined) : undefined,
      ),
      reason: hit.reason,
      rank: hit.rank,
    };

    if (hit.kind === "video" && hit.startSeconds != null) {
      grounded.push(
        SearchResultSchema.parse({
          ...base,
          kind: "video",
          startSeconds: Math.max(0, Math.floor(hit.startSeconds)),
          matchedLabel: hit.reason,
        }),
      );
    } else if (hit.kind === "lesson") {
      grounded.push(SearchResultSchema.parse({ ...base, kind: "lesson" }));
    }
  }

  if (sort === "newest")
    grounded.sort((a, b) =>
      (byId.get(b.lessonId)?.createdAt ?? "").localeCompare(
        byId.get(a.lessonId)?.createdAt ?? "",
      ),
    );
  if (sort === "duration") grounded.sort((a, b) => a.duration - b.duration);
  return grounded;
}
