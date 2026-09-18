import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonFooterNav } from "@/components/lesson/lesson-footer-nav";
import { LessonHeader } from "@/components/lesson/lesson-header";
import { LessonKeyPoints } from "@/components/lesson/lesson-key-points";
import { LessonNotes, lessonLead } from "@/components/lesson/lesson-notes";
import { LessonResources } from "@/components/lesson/lesson-resources";
import { LessonSidebar } from "@/components/lesson/lesson-sidebar";
import { LessonTabs } from "@/components/lesson/lesson-tabs";
import { LessonVideo } from "@/components/lesson/lesson-video";
import { Navbar } from "@/components/nav/navbar";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { coursesHref, courseHref } from "@/lib/routes";
import { lessonLabel } from "@/lib/format";
import { sanityFetch } from "@/lib/sanity/fetch";
import { LESSON_BY_SLUG_QUERY, LESSON_SLUGS_QUERY } from "@/lib/sanity/queries";
import type {
  LESSON_BY_SLUG_QUERY_RESULT,
  LESSON_SLUGS_QUERY_RESULT,
} from "@/sanity.types";

type PageParams = { slug: string };
type SearchParams = { t?: string | string[] };

export async function generateStaticParams() {
  const lessons = await sanityFetch<LESSON_SLUGS_QUERY_RESULT>({
    query: LESSON_SLUGS_QUERY,
    tags: ["lesson"],
  });
  return lessons.flatMap((lesson) =>
    lesson.slug ? [{ slug: lesson.slug }] : [],
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await sanityFetch<LESSON_BY_SLUG_QUERY_RESULT>({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
    tags: ["lesson", "course"],
  });
  return {
    title: lesson?.title ?? "Lesson",
    description: lesson ? lessonLead(lesson.notes) : undefined,
  };
}

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const { t } = await searchParams;
  const lesson = await sanityFetch<LESSON_BY_SLUG_QUERY_RESULT>({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
    tags: ["lesson", "course"],
  });
  if (!lesson) notFound();

  const course = lesson.course;
  const modules = course?.modules ?? [];
  const activeModuleIndex = modules.findIndex((module) =>
    module.lessons?.some((item) => item.slug === lesson.slug),
  );
  const activeModule =
    activeModuleIndex >= 0 ? modules[activeModuleIndex] : null;
  const activeLessonIndex =
    activeModule?.lessons?.findIndex((item) => item.slug === lesson.slug) ?? -1;
  const curriculum = modules.flatMap((module) => module.lessons ?? []);
  const curriculumIndex = curriculum.findIndex(
    (item) => item.slug === lesson.slug,
  );
  const previous =
    curriculumIndex > 0 ? curriculum[curriculumIndex - 1] : undefined;
  const next =
    curriculumIndex >= 0 ? curriculum[curriculumIndex + 1] : undefined;
  const requestedStart = Number(Array.isArray(t) ? t[0] : t);
  const startSeconds = Number.isFinite(requestedStart)
    ? Math.min(
        Math.max(0, Math.floor(requestedStart)),
        lesson.duration ?? requestedStart,
      )
    : 0;
  const summary = lessonLead(lesson.notes);

  return (
    <div className="vertex-page min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-360 border-x border-warm-200 bg-warm-50 shadow-[0_0_40px_rgba(164,91,55,0.03)]">
        <header className="border-b border-warm-300 px-6 py-5 sm:px-12">
          <Navbar />
        </header>
        <main className="px-6 pb-0 sm:px-12">
          <div className="py-7 lg:ml-77.5">
            <Breadcrumbs
              items={[
                { label: "All Courses", href: coursesHref },
                ...(course?.slug
                  ? [
                      {
                        label: course.title ?? "Course",
                        href: courseHref(course.slug),
                      },
                    ]
                  : []),
                ...(activeModule?.title ? [{ label: activeModule.title }] : []),
                { label: lesson.title ?? "Lesson" },
              ]}
            />
          </div>
          <div className="flex items-start gap-8 lg:gap-9">
            <LessonSidebar
              course={course}
              currentSlug={lesson.slug ?? slug}
              activeModuleIndex={Math.max(activeModuleIndex, 0)}
            />
            <div className="min-w-0 flex-1 pb-4">
              <LessonHeader
                title={lesson.title ?? "Untitled lesson"}
                label={
                  activeModuleIndex >= 0 && activeLessonIndex >= 0
                    ? lessonLabel(activeModuleIndex, activeLessonIndex)
                    : ""
                }
                summary={summary}
                duration={lesson.duration}
                level={course?.level}
                studentCount={lesson.studentCount}
              />
              <div className="mt-8">
                <LessonVideo
                  title={lesson.title ?? "Lesson video"}
                  posterUrl={lesson.poster?.asset?.url}
                  posterAlt={lesson.poster?.alt}
                  videoUrl={lesson.videoUrl}
                  startSeconds={startSeconds}
                />
              </div>
              <LessonTabs
                content={
                  <>
                    <LessonNotes notes={lesson.notes} />
                    <LessonKeyPoints
                      points={lesson.keyPoints}
                      proTip={lesson.proTip}
                    />
                    <LessonResources resources={lesson.resources} />
                  </>
                }
                notes={null}
              />
            </div>
          </div>
          <div className="lg:pl-77.5">
            <LessonFooterNav previous={previous} next={next} />
          </div>
        </main>
      </div>
    </div>
  );
}
