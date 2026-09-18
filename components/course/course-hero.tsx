"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Clock3,
  Layers3,
  Users,
} from "lucide-react";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { Badge } from "@/components/ui/badge";
import { lessonHref } from "@/lib/routes";
import { formatCount, formatDuration, formatLevel } from "@/lib/format";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;

export function CourseHero({ course }: { course: Course }) {
  const firstLesson = course.modules?.[0]?.lessons?.[0];
  const totalDuration =
    course.modules?.reduce(
      (total, module) =>
        total +
        (module.lessons?.reduce(
          (sum, lesson) => sum + (lesson.duration ?? 0),
          0,
        ) ?? 0),
      0,
    ) ?? 0;

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center lg:gap-16 xl:gap-20">
      <div className="relative aspect-[280/328] w-full max-w-[400px] overflow-hidden rounded-lg bg-neutral-900">
        {course.coverImage?.asset?.url ? (
          <Image
            src={course.coverImage.asset.url}
            alt={
              course.coverImage.alt ??
              `Cover image for ${course.title ?? "course"}`
            }
            fill
            priority
            sizes="(max-width: 1023px) 100vw, (max-width: 1439px) 32vw, 400px"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center font-display text-8xl text-white">
            V
          </div>
        )}
      </div>

      <div className="max-w-[700px]">
        {course.popular && <Badge variant="popular">Popular</Badge>}
        <h1 className="mt-7 font-display text-[40px] font-bold leading-[1.12] text-neutral-900 sm:text-[52px] sm:leading-[1.15]">
          {course.title}
        </h1>
        <p className="mt-4 max-w-[560px] text-[16px] leading-8 text-neutral-500 sm:text-[17px]">
          {course.summary}
        </p>

        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-small text-neutral-500">
          {course.level && (
            <span className="inline-flex items-center gap-2">
              <BarChart3 size={16} aria-hidden="true" />
              {formatLevel(course.level)}
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <Clock3 size={16} aria-hidden="true" />
            {formatDuration(totalDuration)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Layers3 size={16} aria-hidden="true" />
            {course.modules?.length ?? 0} modules
          </span>
          {course.studentCount != null && (
            <span className="inline-flex items-center gap-2">
              <Users size={16} aria-hidden="true" />
              {formatCount(course.studentCount)} students
            </span>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {firstLesson?.slug && (
            <Link
              className="inline-flex h-14 items-center gap-5 rounded-md bg-primary-500 px-5 text-body text-white shadow-md transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              href={lessonHref(firstLesson.slug)}
              onClick={() => {
                if (
                  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
                  process.env.NEXT_PUBLIC_POSTHOG_HOST
                ) {
                  posthog.capture("learning_started", {
                    course_id: course._id,
                    lesson_id: firstLesson._id,
                    course_level: course.level,
                    module_count: course.modules?.length ?? 0,
                  });
                }
              }}
            >
              Continue Learning <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
          <button
            className="inline-flex h-14 items-center gap-3 rounded-md border border-warm-400 bg-warm-50 px-5 text-body text-neutral-900 transition hover:border-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            type="button"
            onClick={() => {
              if (
                process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
                process.env.NEXT_PUBLIC_POSTHOG_HOST
              ) {
                posthog.capture("course_bookmark_clicked", {
                  course_id: course._id,
                  course_level: course.level,
                });
              }
            }}
          >
            <Bookmark size={17} strokeWidth={1.7} aria-hidden="true" />
            Bookmark
          </button>
        </div>
      </div>
    </section>
  );
}
