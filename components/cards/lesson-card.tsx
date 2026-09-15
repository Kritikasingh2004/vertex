import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function LessonCard() {
  return (
    <Card className="flex min-h-40 flex-col gap-2">
      <Badge variant="lesson" />
      <h3 className="text-heading-3">Data Fetching &amp; Caching</h3>
      <p className="text-small text-neutral-500">
        Explore different data fetching methods in Next.js and how to cache and
        revalidate data for optimal performance.
      </p>
      <div className="mt-auto flex items-center justify-between text-[10px] text-neutral-500">
        <span>Module 5</span>
        <Link
          className="inline-flex items-center gap-1 font-medium text-primary-500"
          href="/lesson/data-fetching"
        >
          View lesson <ExternalLink size={12} />
        </Link>
      </div>
    </Card>
  );
}
