"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
};

export function SearchInput({
  label = "Search",
  placeholder = "Search anything...",
  className,
}: SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value) router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <form className={cn("relative block", className)} onSubmit={submit}>
      <span className="sr-only">{label}</span>
      <Search
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
        size={16}
      />
      <input
        className="h-11 w-full rounded-md border border-neutral-200 bg-white pl-10 pr-12 text-body text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xs border border-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-500 transition hover:border-primary-300 hover:text-primary-500"
        type="submit"
        aria-label="Search"
      >
        ⌘ K
      </button>
    </form>
  );
}
