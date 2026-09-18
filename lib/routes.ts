export const coursesHref = "/courses";

export function courseHref(slug: string) {
  return `/courses/${slug}`;
}

export function lessonHref(slug: string, startSeconds?: number) {
  return startSeconds != null
    ? `/lessons/${slug}?t=${Math.max(0, Math.floor(startSeconds))}`
    : `/lessons/${slug}`;
}
