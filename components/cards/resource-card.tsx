import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ResourceCard() {
  return (
    <Card className="flex min-h-40 flex-col gap-3">
      <div className="flex items-start gap-3">
        <FileText className="mt-0.5 shrink-0 text-neutral-700" size={20} />
        <div>
          <h3 className="text-heading-3">Caching and Revalidation Guide</h3>
          <p className="mt-1 text-small text-neutral-500">
            Deep dive into Next.js caching strategies.
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between text-[10px] text-neutral-500">
        <span>PDF · 1.2 MB</span>
        <Link
          aria-label="Open resource"
          className="text-primary-500"
          href="/resources/caching"
        >
          <ExternalLink size={14} />
        </Link>
      </div>
    </Card>
  );
}
