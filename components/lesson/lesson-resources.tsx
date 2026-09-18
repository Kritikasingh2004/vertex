"use client";

import Link from "next/link";
import {
  ExternalLink,
  FileCode2,
  FileText,
  FolderGit2,
  Link2,
  Presentation,
} from "lucide-react";
import posthog from "posthog-js";
import type { LESSON_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type Resources = NonNullable<
  NonNullable<LESSON_BY_SLUG_QUERY_RESULT>["resources"]
>;
const icons = {
  code: FileCode2,
  link: Link2,
  pdf: FileText,
  repo: FolderGit2,
  slides: Presentation,
} as const;

export function LessonResources({
  resources,
}: {
  resources: Resources | null | undefined;
}) {
  const valid = resources?.filter((resource) =>
    resource.url?.startsWith("https://"),
  );
  if (!valid?.length) return null;
  return (
    <section className="mt-8 border-t border-warm-300 pt-6">
      <h2 className="font-display text-[20px] font-bold text-neutral-900">
        Resources
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {valid.map((resource) => {
          const Icon = icons[resource.type ?? "link"] ?? Link2;
          return (
            <Link
              key={resource._key}
              href={resource.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-36 flex-col rounded-md border border-warm-300 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              onClick={() =>
                posthog.capture("lesson_resource_clicked", {
                  resource_type: resource.type,
                })
              }
            >
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary-100 text-primary-500">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-small font-semibold text-neutral-900">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-5 text-neutral-500">
                    {resource.description}
                  </p>
                </div>
              </div>
              <ExternalLink
                className="mt-auto ml-auto text-primary-500 transition-transform group-hover:translate-x-0.5"
                size={15}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
