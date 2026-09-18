import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";

export function CourseProgressBar({
  resumeHref,
  percentComplete = 0,
}: {
  resumeHref?: string;
  percentComplete?: number;
}) {
  return (
    <section
      className="flex flex-col gap-4 rounded-lg border border-warm-300 bg-warm-50 p-5 sm:flex-row sm:items-center sm:gap-7 sm:px-6"
      aria-label="Course progress"
    >
      <div className="min-w-[150px]">
        <p className="text-small text-neutral-500">Your Progress</p>
        <p className="mt-1 text-body text-neutral-900">
          {percentComplete ? `${percentComplete}% complete` : "Not started"}
        </p>
      </div>
      <ProgressBar
        value={percentComplete}
        label=""
        className="w-full flex-1 [&>span]:hidden"
      />
      {resumeHref && (
        <Link
          className="inline-flex h-14 shrink-0 items-center justify-center gap-5 rounded-md bg-primary-500 px-5 text-body text-white shadow-md transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:min-w-[218px]"
          href={resumeHref}
        >
          Continue Learning <ArrowRight size={18} aria-hidden="true" />
        </Link>
      )}
    </section>
  );
}
