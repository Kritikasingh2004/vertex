import { PortableText } from "@portabletext/react";
import type { LESSON_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type Notes = NonNullable<NonNullable<LESSON_BY_SLUG_QUERY_RESULT>["notes"]>;

export function lessonLead(notes: Notes | null | undefined) {
  const first = notes?.find((block) => block._type === "block");
  return first?.children?.map((child) => child.text ?? "").join("") ?? "";
}

export function LessonNotes({ notes }: { notes: Notes | null | undefined }) {
  const body = notes?.slice(1);
  if (!body?.length) return null;
  return (
    <section aria-labelledby="overview-heading">
      <h2
        id="overview-heading"
        className="font-display text-[20px] font-bold text-neutral-900"
      >
        Overview
      </h2>
      <div className="mt-4 text-body leading-7 text-neutral-700 [&_a]:text-primary-500 [&_a]:underline [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-[18px] [&_h2]:font-bold [&_h3]:mt-5 [&_h3]:font-semibold [&_li]:ml-5 [&_li]:pl-1 [&_ol]:list-decimal [&_p+p]:mt-4 [&_strong]:font-semibold [&_ul]:list-disc">
        <PortableText value={body} />
      </div>
    </section>
  );
}
