import { BarChart3, Clock3, FolderOpen } from "lucide-react";
import Link from "next/link";

export type CourseCardProps = {
  mark: string;
  markClassName: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  href?: string;
};

export function CourseCard({
  mark,
  markClassName,
  title,
  description,
  level,
  duration,
  modules,
  href,
}: CourseCardProps) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <div
          className={`grid h-[74px] w-[74px] shrink-0 place-items-center rounded-lg ${markClassName}`}
        >
          <span className="text-[28px] font-semibold tracking-[-0.08em]">
            {mark}
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-display text-[21px] font-bold leading-7 text-neutral-900">
          {title}
        </h3>
        <p className="mt-4 max-w-[220px] text-body leading-6 text-neutral-500">
          {description}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-warm-300 pt-5 text-[10px] text-neutral-500">
        <span className="inline-flex items-center gap-1">
          <BarChart3 size={12} />
          {level}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 size={12} />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1">
          <FolderOpen size={12} />
          {modules}
        </span>
      </div>
    </>
  );
  const className =
    "flex min-h-[372px] flex-col gap-7 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";

  return href ? (
    <Link className={className} href={href}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
