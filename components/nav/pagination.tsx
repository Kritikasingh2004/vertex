import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-4 text-small text-neutral-500"
    >
      <button aria-label="Previous page" className="hover:text-primary-500">
        <ChevronLeft size={14} />
      </button>
      <button
        aria-current="page"
        className="grid h-7 w-7 place-items-center rounded-xs border border-primary-500 text-primary-500"
      >
        1
      </button>
      <button className="hover:text-primary-500">2</button>
      <button className="hover:text-primary-500">3</button>
      <span>…</span>
      <button className="hover:text-primary-500">8</button>
      <button aria-label="Next page" className="hover:text-primary-500">
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}
