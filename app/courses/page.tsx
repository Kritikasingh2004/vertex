import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { CourseGrid } from "@/components/cards/course-grid";
import { Navbar } from "@/components/nav/navbar";
import { sanityFetch } from "@/lib/sanity/fetch";
import { COURSES_LIST_QUERY } from "@/lib/sanity/queries";
import type { COURSES_LIST_QUERY_RESULT } from "@/sanity.types";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Explore every course available in Vertex.",
};

export default async function CoursesPage() {
  const courses = await sanityFetch<COURSES_LIST_QUERY_RESULT>({
    query: COURSES_LIST_QUERY,
    tags: ["course", "lesson"],
  });
  const validCourses = courses.filter((course) => course.slug && course.title);

  return (
    <div className="vertex-page min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] border-x border-warm-200 bg-warm-50 shadow-[0_0_40px_rgba(164,91,55,0.03)]">
        <header className="border-b border-warm-300 px-6 py-5 sm:px-12">
          <Navbar />
        </header>

        <main className="px-6 pb-16 sm:px-12">
          <div className="py-7">
            <Breadcrumbs items={[{ label: "All Courses" }]} />
          </div>

          <section aria-labelledby="all-courses-heading">
            <div className="flex items-baseline justify-between gap-4">
              <h1
                id="all-courses-heading"
                className="font-display text-[32px] font-bold text-neutral-900"
              >
                All Courses
              </h1>
              <p className="text-small text-neutral-500">
                {validCourses.length}{" "}
                {validCourses.length === 1 ? "course" : "courses"}
              </p>
            </div>

            {validCourses.length > 0 ? (
              <div className="mt-8">
                <CourseGrid courses={validCourses} />
              </div>
            ) : (
              <p className="mt-8 text-body text-neutral-500">
                No courses are available yet.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
