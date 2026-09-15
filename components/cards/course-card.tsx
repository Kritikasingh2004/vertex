import { BarChart3, Clock3, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

export function CourseCard() {
  return (
    <Card className="flex min-h-40 flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-neutral-900 text-heading-3 text-white">
          N
        </div>
        <div>
          <h3 className="text-heading-3">Next.js for Production</h3>
          <p className="mt-1 text-small text-neutral-500">
            Build scalable, high-performance web applications with Next.js.
          </p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-3 text-[10px] text-neutral-500">
        <span className="inline-flex items-center gap-1">
          <BarChart3 size={12} />
          Intermediate
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 size={12} />
          18h 24m
        </span>
        <span className="inline-flex items-center gap-1">
          <FolderOpen size={12} />
          12 modules
        </span>
      </div>
    </Card>
  );
}
