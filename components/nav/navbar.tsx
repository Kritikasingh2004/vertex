import Link from "next/link";
import { Bell, UserRound } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export function Navbar() {
  return (
    <nav className="flex min-w-0 items-center justify-between gap-2 sm:gap-6" aria-label="Primary">
      <Link href="/">
        <Logo />
      </Link>
      <div className="mr-auto flex min-w-0 items-center gap-4 pl-2 text-[12px] sm:gap-8 sm:pl-8 sm:text-body">
        <Link className="font-semibold text-primary-500" href="/courses">
          Courses
        </Link>
        <Link className="text-neutral-900 hover:text-primary-500" href="/my-learning">
          My Learning
        </Link>
      </div>
      <button className="shrink-0 rounded-full p-1.5 text-neutral-700 transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:p-2" type="button" aria-label="Notifications">
        <Bell size={21} strokeWidth={1.7} aria-hidden="true" />
      </button>
      <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-warm-400 bg-primary-100 text-neutral-700 sm:h-10 sm:w-10" aria-label="Account">
        <UserRound size={22} strokeWidth={1.5} aria-hidden="true" />
      </div>
    </nav>
  );
}
