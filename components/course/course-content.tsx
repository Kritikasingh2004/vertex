"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { Badge } from "@/components/ui/badge";
import { lessonHref } from "@/lib/routes";
import { formatDuration, lessonLabel, moduleLabel } from "@/lib/format";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;
type Module = NonNullable<Course["modules"]>[number];

export function CourseContent({ modules }: { modules: Module[] }) {
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const visibleModules = showAll ? modules : modules.slice(0, 6);
  const totalDuration = modules.reduce(
    (total, module) =>
      total +
      (module.lessons?.reduce(
        (sum, lesson) => sum + (lesson.duration ?? 0),
        0,
      ) ?? 0),
    0,
  );

  function toggleModule(key: string) {
    setOpenModules((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <section aria-labelledby="content-heading">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <h2
          id="content-heading"
          className="font-display text-[22px] font-bold text-neutral-900"
        >
          Course Content
        </h2>
        <p className="text-small text-neutral-500">
          {modules.length} modules <span className="px-1">•</span>{" "}
          {formatDuration(totalDuration)}
        </p>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-warm-300">
        {visibleModules.map((module, moduleIndex) => {
          const isOpen = openModules.has(module._key);
          const moduleDuration =
            module.lessons?.reduce(
              (sum, lesson) => sum + (lesson.duration ?? 0),
              0,
            ) ?? 0;
          const panelId = `module-lessons-${module._key}`;

          return (
            <div
              className="border-b border-warm-300 last:border-b-0"
              key={module._key}
            >
              <button
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 sm:px-5"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleModule(module._key)}
              >
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-warm-300 text-small text-neutral-700"
                  aria-hidden="true"
                >
                  {moduleIndex + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-[15px] font-bold text-neutral-900">
                    {moduleLabel(moduleIndex).replace("Module ", "")}.{" "}
                    {module.title}
                  </span>
                  {module.summary && (
                    <span className="mt-0.5 block truncate text-small text-neutral-500">
                      {module.summary}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-small text-neutral-500">
                  {formatDuration(moduleDuration)}
                </span>
                <ChevronDown
                  className={`shrink-0 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  size={16}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div
                  id={panelId}
                  className="border-t border-warm-300 bg-white/40"
                  role="region"
                >
                  {module.lessons?.map(
                    (lesson, lessonIndex) =>
                      lesson.slug && (
                        <Link
                          className="flex items-center gap-3 border-b border-warm-300 px-5 py-3 pl-16 last:border-b-0 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
                          href={lessonHref(lesson.slug)}
                          key={lesson._id}
                        >
                          <span className="min-w-0 flex-1 truncate text-small text-neutral-900">
                            {lessonLabel(moduleIndex, lessonIndex)}{" "}
                            {lesson.title}
                          </span>
                          {lesson.freePreview && (
                            <Badge variant="lesson">Preview</Badge>
                          )}
                          <span className="text-small text-neutral-500">
                            {formatDuration(lesson.duration)}
                          </span>
                        </Link>
                      ),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {modules.length > 6 && (
        <button
          className="mx-auto mt-[-1px] flex h-11 items-center gap-3 rounded-md border border-warm-300 bg-warm-50 px-5 text-body text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          type="button"
          onClick={() => setShowAll((current) => !current)}
        >
          {showAll
            ? "Show fewer modules"
            : `Show all ${modules.length} modules`}
          <ChevronDown
            className={showAll ? "rotate-180" : ""}
            size={16}
            aria-hidden="true"
          />
        </button>
      )}
    </section>
  );
}
