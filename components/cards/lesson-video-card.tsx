import Link from "next/link";
import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function LessonVideoCard() {
  return <Card className="flex min-h-40 flex-col gap-2"><Badge variant="video" /><h3 className="text-heading-3">Data Fetching in Server Components</h3><p className="text-small text-neutral-500">Learn how to fetch data on the server using async/await and Next.js best practices.</p><div className="mt-auto flex items-center justify-between gap-2 text-[10px] text-neutral-500"><span className="inline-flex items-center gap-1"><Clock3 size={12} />Lesson 5.1 · 12:45</span><Link className="font-medium text-primary-500 hover:text-primary-600" href="/lesson/data-fetching?start=765">Watch from 12:45</Link></div></Card>;
}