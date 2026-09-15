import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = { label?: string; className?: string; options?: string[] };

export function Select({
  label = "Select",
  className,
  options = ["Most Relevant", "Newest", "Popular"],
}: SelectProps) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{label}</span>
      <select className="h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white px-4 pr-10 text-body text-neutral-900 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
        size={16}
      />
    </label>
  );
}
