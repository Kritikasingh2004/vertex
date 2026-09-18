import { CourseCard } from "@/components/cards/course-card";
import { formatDuration, formatLevel } from "@/lib/format";
import { courseHref } from "@/lib/routes";
import type { COURSES_LIST_QUERY_RESULT } from "@/sanity.types";

type CourseGridProps = {
  courses: COURSES_LIST_QUERY_RESULT;
  limit?: number;
};

export function CourseGrid({ courses, limit }: CourseGridProps) {
  const visibleCourses = courses
    .filter((course) => course.slug && course.title)
    .slice(0, limit);

  return (
    <div className="grid gap-4 md:grid-cols-3 md:px-15">
      {visibleCourses.map((course) => (
        <CourseCard
          key={course._id}
          href={courseHref(course.slug!)}
          coverImageUrl={course.coverImage?.asset?.url}
          coverImageAlt={course.coverImage?.alt}
          title={course.title!}
          description={course.summary ?? ""}
          level={formatLevel(course.level)}
          duration={formatDuration(course.totalDuration)}
          modules={`${course.moduleCount ?? 0} modules`}
        />
      ))}
    </div>
  );
}
