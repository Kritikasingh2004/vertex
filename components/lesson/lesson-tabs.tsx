"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import posthog from "posthog-js";

export function LessonTabs({
  content,
  notes,
}: {
  content: ReactNode;
  notes: ReactNode;
}) {
  const [active, setActive] = useState<"content" | "notes">("content");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const select = (value: "content" | "notes") => {
    setActive(value);
    posthog.capture("lesson_tab_changed", { tab: value });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = active === "content" ? "notes" : "content";
    select(next);
    tabs.current[next === "content" ? 0 : 1]?.focus();
  };
  return (
    <div className="mt-8">
      <div
        className="flex gap-7 border-b border-warm-300"
        role="tablist"
        aria-label="Lesson sections"
      >
        {(["content", "notes"] as const).map((tab, index) => (
          <button
            key={tab}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            className={`border-b-2 px-1 pb-3 text-small ${active === tab ? "border-primary-500 text-primary-500" : "border-transparent text-neutral-500"}`}
            type="button"
            role="tab"
            aria-selected={active === tab}
            aria-controls={`panel-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => select(tab)}
            onKeyDown={onKeyDown}
          >
            {tab === "content" ? "Lesson Content" : "Notes"}
          </button>
        ))}
      </div>
      <div
        id="panel-content"
        role="tabpanel"
        hidden={active !== "content"}
        className="pt-7"
      >
        {content}
      </div>
      <div
        id="panel-notes"
        role="tabpanel"
        hidden={active !== "notes"}
        className="pt-7"
      >
        <p className="text-body text-neutral-500">Your notes live here soon.</p>
        {notes}
      </div>
    </div>
  );
}
