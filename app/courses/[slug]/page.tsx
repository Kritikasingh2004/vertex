import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseContent } from "@/components/course/course-content";
import { CourseHero } from "@/components/course/course-hero";
import { CourseProgressBar } from "@/components/course/course-progress-bar";
import { LearningOutcomes } from "@/components/course/learning-outcomes";
import { Navbar } from "@/components/nav/navbar";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { coursesHref, lessonHref } from "@/lib/routes";
import { sanityFetch } from "@/lib/sanity/fetch";
import { COURSE_BY_SLUG_QUERY, COURSE_SLUGS_QUERY } from "@/lib/sanity/queries";
import type {
  COURSE_BY_SLUG_QUERY_RESULT,
  COURSE_SLUGS_QUERY_RESULT,
} from "@/sanity.types";

export async function generateStaticParams() {
  const courses = await sanityFetch<COURSE_SLUGS_QUERY_RESULT>({
    query: COURSE_SLUGS_QUERY,
    tags: ["course"],
  });
  return courses.flatMap((course) =>
    course.slug ? [{ slug: course.slug }] : [],
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await sanityFetch<COURSE_BY_SLUG_QUERY_RESULT>({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["course", "lesson"],
  });
  return {
    title: course?.title ?? "Course",
    description: course?.summary ?? undefined,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await sanityFetch<COURSE_BY_SLUG_QUERY_RESULT>({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["course", "lesson"],
  });

  if (!course) {
    notFound();
  }

  const modules = course.modules ?? [];
  const firstLesson = modules[0]?.lessons?.[0];

  return (
    <div className="vertex-page min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] border-x border-warm-200 bg-warm-50 shadow-[0_0_40px_rgba(164,91,55,0.03)]">
        <header className="border-b border-warm-300 px-6 py-5 sm:px-12">
          <Navbar />
        </header>

        <main className="px-6 pb-16 sm:px-12">
          <div className="py-7">
            <Breadcrumbs
              items={[
                { label: "All Courses", href: coursesHref },
                { label: course.title ?? "Course" },
              ]}
            />
          </div>
          <CourseHero course={course} />
          <div className="mt-12 sm:mt-14">
            <LearningOutcomes
              outcomes={(course.learningOutcomes ?? []).filter(
                (outcome) => outcome.title && outcome.description,
              )}
            />
          </div>
          <div className="mt-8">
            <CourseContent modules={modules} />
          </div>
          <div className="sticky bottom-4 z-10 mt-8">
            <CourseProgressBar
              percentComplete={0}
              resumeHref={
                firstLesson?.slug ? lessonHref(firstLesson.slug) : undefined
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
}
