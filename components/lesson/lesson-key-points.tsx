import { CheckCircle2, Lightbulb } from "lucide-react";

export function LessonKeyPoints({
  points,
  proTip,
}: {
  points: Array<string> | null | undefined;
  proTip: string | null | undefined;
}) {
  if (!points?.length && !proTip) return null;
  return (
    <div className="mt-7 space-y-7">
      {points?.length ? (
        <section className="border-t border-warm-300 pt-6">
          <h2 className="text-body font-semibold text-neutral-900">
            In this lesson you will:
          </h2>
          <ul className="mt-4 space-y-3">
            {points.map((point) => (
              <li className="flex gap-3 text-body text-neutral-700" key={point}>
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-primary-500"
                  size={16}
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {proTip ? (
        <aside className="rounded-md border border-primary-200 bg-primary-100/70 p-5">
          <div className="flex gap-3">
            <Lightbulb
              className="shrink-0 text-primary-500"
              size={20}
              aria-hidden="true"
            />
            <div>
              <h2 className="font-display text-[16px] font-bold text-neutral-900">
                Pro Tip
              </h2>
              <p className="mt-2 text-small leading-6 text-neutral-700">
                {proTip}
              </p>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
