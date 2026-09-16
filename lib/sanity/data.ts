import "server-only";

import { sanityFetch } from "./fetch";
import {
  CATEGORIES_LIST_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSES_LIST_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  INSTRUCTORS_LIST_QUERY,
  LESSON_BY_SLUG_QUERY,
} from "./queries";
import type { Category, Course, Instructor, LessonDetail } from "./types";

export function getCourses() {
  return sanityFetch<Course[]>({
    query: COURSES_LIST_QUERY,
    tags: ["courses"],
  });
}

export function getCourseBySlug(slug: string) {
  return sanityFetch<Course | null>({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`course:${slug}`],
  });
}

export function getLessonBySlug(slug: string) {
  return sanityFetch<LessonDetail | null>({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
    tags: [`lesson:${slug}`],
  });
}

export function getInstructors() {
  return sanityFetch<Instructor[]>({
    query: INSTRUCTORS_LIST_QUERY,
    tags: ["instructors"],
  });
}

export function getCategories() {
  return sanityFetch<Category[]>({
    query: CATEGORIES_LIST_QUERY,
    tags: ["categories"],
  });
}

export function getInstructorBySlug(slug: string) {
  return sanityFetch<Instructor | null>({
    query: INSTRUCTOR_BY_SLUG_QUERY,
    params: { slug },
    tags: [`instructor:${slug}`],
  });
}
