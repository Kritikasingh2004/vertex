"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Play,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { formatDuration, formatTimestamp } from "@/lib/format";
import type { SearchResponse, SearchResult } from "@/lib/search/types";

type SearchResultsProps = { initialQuery: string };
type Sort = "relevance" | "newest" | "duration";

function ResultImage({ result }: { result: SearchResult }) {
  return result.thumbnail ? (
    <div
      className="h-full min-h-32 w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${result.thumbnail})` }}
      role="img"
      aria-label={result.lessonTitle}
    />
  ) : (
    <div className="flex h-full min-h-32 items-center justify-center bg-primary-100 text-primary-500">
      <Play size={28} fill="currentColor" aria-hidden="true" />
    </div>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  const isVideo = result.kind === "video";
  return (
    <article className="grid overflow-hidden rounded-lg border border-warm-300 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[220px_1fr]">
      <div className="relative">
        <ResultImage result={result} />
        <span className="absolute left-3 top-3 rounded-[6px] bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-600">
          {isVideo ? "Video moment" : "Lesson"}
        </span>
        {isVideo && (
          <span className="absolute bottom-3 left-3 rounded-[4px] bg-neutral-900/85 px-2 py-1 text-[11px] font-medium text-white">
            {formatTimestamp(result.startSeconds)}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-500">
          {result.courseTitle} · Lesson {result.label}
        </p>
        <h2 className="mt-2 font-display text-[24px] font-bold leading-tight text-neutral-900">
          {result.lessonTitle}
        </h2>
        <p className="mt-3 line-clamp-2 text-body text-neutral-500">
          {result.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-neutral-500">
          <span>{result.moduleTitle}</span>
          <span className="inline-flex items-center gap-1">
            <Clock3 size={13} /> {formatDuration(result.duration)}
          </span>
        </div>
        <Link
          className="mt-5 inline-flex items-center gap-2 text-body font-semibold text-primary-500 hover:text-primary-600"
          href={result.href}
        >
          {isVideo
            ? `Watch from ${formatTimestamp(result.startSeconds)}`
            : "Open lesson"}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function SearchResults({ initialQuery }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>("relevance");
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(Boolean(initialQuery));
  const [error, setError] = useState("");

  async function search(value: string, nextSort = sort) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    try {
      const result = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, sort: nextSort }),
      });
      const payload = await result.json();
      if (!result.ok) throw new Error(payload.error ?? "Search failed.");
      setResponse(payload as SearchResponse);
    } catch (searchError) {
      setError(
        searchError instanceof Error ? searchError.message : "Search failed.",
      );
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialQuery) {
      void Promise.resolve().then(() => search(initialQuery));
    }
    // The page query is the source of truth for the initial search only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void search(query);
  }

  function changeSort(nextSort: Sort) {
    setSort(nextSort);
    if (query.trim()) void search(query, nextSort);
  }

  return (
    <main className="mx-auto w-full max-w-[1040px] px-6 pb-20 pt-12 sm:px-12 sm:pt-16">
      <div className="max-w-[760px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-500">
          Intelligent search
        </p>
        <h1 className="mt-4 font-display text-[42px] font-bold leading-[1.08] text-neutral-900 sm:text-[56px]">
          Find the lesson you need.
        </h1>
        <p className="mt-5 max-w-[600px] text-body-large leading-7 text-neutral-500">
          Search across every course in plain English, then jump straight into
          the lesson that answers your question.
        </p>
        <form className="relative mt-8" onSubmit={submit}>
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            size={19}
            aria-hidden="true"
          />
          <input
            className="h-14 w-full rounded-md border border-warm-300 bg-white pl-12 pr-28 text-body-large text-neutral-900 shadow-sm outline-none placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask anything about your learning..."
            aria-label="Search lessons"
          />
          <button
            className="absolute right-2 top-2 h-10 rounded-md bg-primary-500 px-4 text-body font-semibold text-white transition hover:bg-primary-600"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      {response && !loading && (
        <div className="mt-14 flex flex-wrap items-end justify-between gap-4 border-b border-warm-300 pb-5">
          <div>
            <p className="text-body text-neutral-500">
              {response.count
                ? `Found ${response.count} ${response.count === 1 ? "result" : "results"}`
                : "No results found"}
            </p>
            <p className="mt-2 text-body-large text-neutral-700">
              {response.reply}
            </p>
          </div>
          <label className="inline-flex items-center gap-2 text-small text-neutral-500">
            <SlidersHorizontal size={15} aria-hidden="true" />
            <span className="sr-only">Sort results</span>
            <select
              className="rounded-md border border-warm-300 bg-white px-3 py-2 text-body text-neutral-700 outline-none focus:border-primary-400"
              value={sort}
              onChange={(event) => changeSort(event.target.value as Sort)}
            >
              <option value="relevance">Most relevant</option>
              <option value="newest">Newest</option>
              <option value="duration">Shortest</option>
            </select>
          </label>
        </div>
      )}

      <section className="mt-8 space-y-5" aria-live="polite">
        {loading && (
          <p className="py-16 text-center text-body text-neutral-500">
            Searching your courses...
          </p>
        )}
        {error && (
          <div className="border border-red-200 bg-red-50 px-5 py-4 text-body text-red-700">
            {error}
          </div>
        )}
        {!loading &&
          response?.results.map((result) => (
            <ResultCard
              key={`${result.kind}-${result.lessonId}-${result.rank}`}
              result={result}
            />
          ))}
        {!loading && response && response.results.length === 0 && !error && (
          <div className="border border-warm-300 bg-white px-6 py-14 text-center shadow-sm">
            <h2 className="font-display text-[28px] font-bold text-neutral-900">
              Try a broader question.
            </h2>
            <p className="mx-auto mt-3 max-w-[420px] text-body text-neutral-500">
              Nothing in the catalog matched this search. Browse all courses to
              find another direction.
            </p>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-body font-semibold text-primary-500"
              href="/courses"
            >
              Browse all courses <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
