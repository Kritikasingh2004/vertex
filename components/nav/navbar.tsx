import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  return <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-4" aria-label="Primary"><Link href="/"><Logo /></Link><div className="flex items-center gap-6 text-small"><Link className="font-semibold text-primary-500" href="/courses">Courses</Link><Link className="text-neutral-900 hover:text-primary-500" href="/my-learning">My Learning</Link><span className={cn("hidden text-neutral-500 sm:inline")} aria-hidden="true">•••</span></div></nav>;
}