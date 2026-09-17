import {
  Code2,
  Gauge,
  Layers3,
  Puzzle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;
type Outcome = NonNullable<Course["learningOutcomes"]>[number];

const outcomeIcons = {
  sparkles: Sparkles,
  layers: Layers3,
  code: Code2,
  rocket: Rocket,
  shield: ShieldCheck,
  gauge: Gauge,
  puzzle: Puzzle,
  workflow: Workflow,
} as const;

export function LearningOutcomes({ outcomes }: { outcomes: Outcome[] }) {
  if (!outcomes.length) {
    return null;
  }

  return (
    <section
      className="rounded-lg border border-warm-300 p-5 sm:p-7"
      aria-labelledby="outcomes-heading"
    >
      <h2
        id="outcomes-heading"
        className="font-display text-[22px] font-bold text-neutral-900"
      >
        What you&apos;ll learn
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {outcomes.map((outcome) => {
          const Icon =
            outcomeIcons[outcome.icon as keyof typeof outcomeIcons] ?? Sparkles;

          return (
            <article
              className="flex gap-5 rounded-md border border-warm-300 p-5 sm:p-7"
              key={outcome._key}
            >
              <Icon
                className="mt-1 shrink-0 text-primary-500"
                size={40}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-[17px] font-bold text-neutral-900">
                  {outcome.title}
                </h3>
                <p className="mt-2 text-body leading-6 text-neutral-500">
                  {outcome.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
