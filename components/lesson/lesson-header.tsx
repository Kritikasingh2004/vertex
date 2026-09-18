"use client";

import { BarChart3, Bookmark, Clock3, Users } from "lucide-react";
import { useEffect } from "react";
import posthog from "posthog-js";
import { Badge } from "@/components/ui/badge";
import { formatCount, formatDuration, formatLevel } from "@/lib/format";

export function LessonHeader({
  title,
  label,
  summary,
  duration,
  level,
  studentCount,
}: {
  title: string;
  label: string;
  summary?: string;
  duration: number | null;
  level?: string | null;
  studentCount?: number | null;
}) {
  useEffect(() => {
    posthog.capture("lesson_viewed", { lesson_label: label });
  }, [label]);

  return (
    <header>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant="video">{`Lesson ${label}`}</Badge>
          <h1 className="mt-5 font-display text-[36px] font-bold leading-tight text-neutral-900 sm:text-[44px]">
            {title}
          </h1>
        </div>
        <button
          type="button"
          aria-label="Bookmark lesson"
          className="mt-8 grid h-11 w-11 shrink-0 place-items-center rounded-md border border-warm-300 text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Bookmark size={18} aria-hidden="true" />
        </button>
      </div>
      {summary && (
        <p className="mt-3 max-w-[680px] text-body-large leading-7 text-neutral-500">
          {summary}
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-small text-neutral-500">
        {duration != null && (
          <span className="inline-flex items-center gap-2">
            <Clock3 size={16} aria-hidden="true" />
            {formatDuration(duration)}
          </span>
        )}
        {level && (
          <span className="inline-flex items-center gap-2">
            <BarChart3 size={16} aria-hidden="true" />
            {formatLevel(level)}
          </span>
        )}
        {studentCount != null && (
          <span className="inline-flex items-center gap-2">
            <Users size={16} aria-hidden="true" />
            {formatCount(studentCount)} students
          </span>
        )}
      </div>
    </header>
  );
}
