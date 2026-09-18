import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { LESSON_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { lessonHref } from "@/lib/routes";
import { formatDuration } from "@/lib/format";

type Course = NonNullable<LESSON_BY_SLUG_QUERY_RESULT>["course"];
type Module = NonNullable<NonNullable<Course>["modules"]>[number];
type Lesson = NonNullable<Module["lessons"]>[number];
export function LessonFooterNav({
  previous,
  next,
}: {
  previous?: Lesson;
  next?: Lesson;
}) {
  return (
    <nav
      className="mt-10 flex flex-col gap-4 border-t border-warm-300 py-5 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Lesson navigation"
    >
      {previous ? (
        <Link
          className="flex min-w-0 items-center gap-3 rounded-md border border-warm-300 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          href={lessonHref(previous.slug!)}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-small text-neutral-900">
              Previous Lesson
            </span>
            <span className="block truncate text-[11px] text-neutral-500">
              {previous.title} · {formatDuration(previous.duration)}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          className="flex items-center justify-center gap-3 rounded-md bg-primary-500 px-5 py-3 text-small font-semibold text-white hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          href={lessonHref(next.slug!)}
        >
          Next Lesson <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  );
}
