import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { CourseCard, type CourseCardProps } from "@/components/cards/course-card";
import { Navbar } from "@/components/nav/navbar";
import { SearchInput } from "@/components/ui/search-input";

const courses: CourseCardProps[] = [
  {
    mark: "N",
    markClassName: "bg-neutral-900 text-white",
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
  },
  {
    mark: "▣",
    markClassName: "bg-docker-blue text-white",
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
  },
  {
    mark: "TS",
    markClassName: "bg-brand-blue text-white",
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
  },
];

export default function Home() {
  return (
    <div className="vertex-page min-h-screen">
      <div className="mx-auto min-h-screen max-w-[960px] border-x border-warm-200 bg-warm-50 shadow-[0_0_40px_rgba(164,91,55,0.03)]">
        <header className="border-b border-warm-300 px-8 py-5 sm:px-12">
          <Navbar />
        </header>

        <main>
          <section className="px-6 pb-14 pt-16 text-center sm:px-12 sm:pb-16 sm:pt-16">
            <span className="inline-flex rounded-md border border-primary-100 bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-500">
              Intelligent learning
            </span>
            <h1 className="mx-auto mt-8 max-w-[720px] font-display text-[48px] font-bold leading-[1.08] tracking-[-0.035em] text-neutral-900 sm:text-[64px]">
              Search your learning
              <br />
              in plain English.
            </h1>
            <p className="mx-auto mt-7 max-w-[560px] text-body-large leading-8 text-neutral-500 sm:text-[18px]">
              Vertex understands what you want to learn and
              <br className="hidden sm:block" /> finds the exact lessons across all your courses.
            </p>
            <Link
              className="mx-auto mt-8 inline-flex h-12 items-center gap-5 rounded-md bg-primary-500 px-6 text-body-large text-white shadow-md transition hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              href="/courses"
            >
              Explore Courses
              <ArrowRight size={21} aria-hidden="true" />
            </Link>
            <SearchInput
              className="mx-auto mt-10 max-w-[746px] text-left"
              placeholder="Ask anything about your learning..."
            />
          </section>

          <section className="border-t border-[#eee7e3] px-8 pb-0 pt-12 sm:px-12 sm:pt-14" aria-labelledby="all-courses-heading">
            <div className="flex items-center justify-between gap-4">
              <h2 id="all-courses-heading" className="font-display text-[26px] font-bold text-neutral-900">
                All Courses
              </h2>
              <Link className="inline-flex items-center gap-3 text-body text-primary-500 hover:text-primary-600" href="/courses">
                View all courses
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </div>
          </section>

          <section className="px-0 pt-16 text-center" aria-label="New content announcement">
            <div className="mx-8 flex items-center gap-2 text-body-large text-neutral-700 sm:mx-12 sm:gap-7">
              <span className="h-px flex-1 bg-warm-400" />
              <span className="inline-flex min-w-0 max-w-[240px] items-center justify-center gap-2 text-center sm:max-w-none sm:gap-4">
                <Star size={22} strokeWidth={1.5} className="text-primary-500" aria-hidden="true" />
                New courses and lessons added every week.
              </span>
              <span className="h-px flex-1 bg-warm-400" />
            </div>
            <div className="home-bars mt-8 h-48" aria-hidden="true">
              <span className="h-16" />
              <span className="h-24" />
              <span className="h-36" />
              <span className="h-44" />
              <span className="h-28" />
              <span className="h-20" />
              <span className="h-12" />
              <span className="h-24" />
              <span className="h-32" />
              <span className="h-44" />
              <span className="h-28" />
              <span className="h-20" />
              <span className="h-32" />
              <span className="h-40" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
