"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronDown, ChevronLeft, Play } from "lucide-react";
import { useState } from "react";
import type { LESSON_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { courseHref, lessonHref } from "@/lib/routes";
import { formatDuration, lessonLabel } from "@/lib/format";

type Course = NonNullable<LESSON_BY_SLUG_QUERY_RESULT>["course"];

export function LessonSidebar({
  course,
  currentSlug,
  activeModuleIndex,
}: {
  course: Course;
  currentSlug: string;
  activeModuleIndex: number;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModules, setOpenModules] = useState(
    new Set([course?.modules?.[activeModuleIndex]?._key]),
  );
  if (!course) return null;
  const modules = course.modules ?? [];

  const content = (
    <div className="space-y-0 border-t border-warm-300">
      {modules.map((module, moduleIndex) => {
        const isOpen = openModules.has(module._key);
        const isActive = moduleIndex === activeModuleIndex;
        const panelId = `lesson-module-${module._key}`;
        return (
          <div key={module._key} className="border-b border-warm-300">
            <button
              className="flex w-full items-center gap-3 px-3 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpenModules((current) => {
                  const next = new Set(current);
                  if (next.has(module._key)) next.delete(module._key);
                  else next.add(module._key);
                  return next;
                })
              }
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-small ${isActive ? "border-primary-500 bg-primary-500 text-white" : "border-warm-400 text-neutral-700"}`}
                aria-hidden="true"
              >
                {moduleIndex + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-small font-semibold text-neutral-900">
                  {module.title}
                </span>
                <span className="mt-1 block text-[11px] text-neutral-500">
                  {formatDuration(module.durationSeconds)}
                </span>
              </span>
              {isActive && (
                <CheckCircle2
                  className="text-primary-500"
                  size={16}
                  aria-hidden="true"
                />
              )}
              <ChevronDown
                className={`shrink-0 text-primary-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                size={15}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div
                id={panelId}
                className="relative bg-primary-100/40 px-3 pb-3 pl-12"
                role="region"
              >
                {(module.lessons ?? []).map((lesson, lessonIndex) => {
                  const current = lesson.slug === currentSlug;
                  return lesson.slug ? (
                    <Link
                      key={lesson._id}
                      href={lessonHref(lesson.slug)}
                      aria-current={current ? "page" : undefined}
                      className="relative flex min-h-12 items-center gap-2 border-l border-warm-400 py-2 pl-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <span
                        className={`absolute -left-[5px] h-2 w-2 rounded-full border ${current ? "border-primary-500 bg-primary-500" : "border-warm-400 bg-warm-50"}`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-small ${current ? "font-semibold text-neutral-900" : "text-neutral-700"}`}
                        >
                          {lessonLabel(moduleIndex, lessonIndex)} {lesson.title}
                        </span>
                        <span className="mt-1 block text-[11px] text-neutral-500">
                          {current ? (
                            <span className="text-primary-500">
                              Now playing
                            </span>
                          ) : (
                            formatDuration(lesson.duration)
                          )}
                        </span>
                      </span>
                      {current && (
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-500 text-white">
                          <Play
                            size={12}
                            fill="currentColor"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </Link>
                  ) : null;
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <aside className="hidden w-[278px] shrink-0 border-r border-warm-300 lg:block">
        <Link
          className="flex items-center gap-1 px-3 pb-7 text-small text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          href={courseHref(course.slug ?? "")}
        >
          <ChevronLeft size={14} aria-hidden="true" /> Back to course
        </Link>
        <div className="mb-4 flex items-center gap-3 px-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-md bg-neutral-900">
            {course.coverImage?.asset?.url && (
              <Image
                src={course.coverImage.asset.url}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-small font-semibold text-neutral-900">
              {course.title}
            </p>
            <p className="mt-2 text-[11px] text-neutral-500">35% complete</p>
            <div className="mt-1 h-1 rounded-full bg-warm-300">
              <div className="h-full w-[35%] rounded-full bg-primary-500" />
            </div>
          </div>
        </div>
        <p className="border-y border-warm-300 px-3 py-4 text-small font-semibold text-neutral-900">
          Module {activeModuleIndex + 1} of {modules.length}
        </p>
        {content}
      </aside>
      <div className="mb-6 lg:hidden">
        <button
          className="flex w-full items-center justify-between border-y border-warm-300 py-4 text-left text-body font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          type="button"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span>Course content</span>
          <ChevronDown
            className={mobileOpen ? "rotate-180" : ""}
            size={17}
            aria-hidden="true"
          />
        </button>
        {mobileOpen && (
          <div className="border-b border-warm-300">{content}</div>
        )}
      </div>
    </>
  );
}
