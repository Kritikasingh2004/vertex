import { defineQuery } from "next-sanity";

const imageProjection = `{ asset->{_id, url}, alt }`;
const instructorProjection = `{ _id, name, "slug": slug.current, photo ${imageProjection}, expertise, bio }`;
const categoryProjection = `{ _id, title, "slug": slug.current, description }`;
const lessonCardProjection = `{ _id, title, "slug": slug.current, duration, freePreview }`;

export const COURSES_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] | order(popular desc, title asc) {
    _id, title, "slug": slug.current, summary, level, price, popular, studentCount,
    coverImage ${imageProjection},
    "instructor": instructor->{ _id, name, "slug": slug.current },
    "category": category->{ _id, title, "slug": slug.current },
    "moduleCount": count(modules),
    "totalDuration": math::sum(modules[].lessons[]->duration)
  }
`);

export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]{ "slug": slug.current }
`);

export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, summary, coverImage ${imageProjection}, level, price, popular, studentCount,
    learningOutcomes[]{_key, icon, title, description},
    "instructor": instructor->${instructorProjection},
    "category": category->${categoryProjection},
    modules[]{_key, title, summary, lessons[]->${lessonCardProjection}}
  }
`);

export const LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && defined(slug.current)]{ "slug": slug.current }
`);

export const LESSON_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, videoUrl, poster ${imageProjection}, duration, freePreview,
    studentCount, notes, keyPoints, proTip, resources[]{_key, type, title, description, url},
    "course": *[_type == "course" && references(^._id)][0] {
      _id, title, "slug": slug.current, "instructor": instructor->${instructorProjection},
      modules[]{_key, title, lessons[]->${lessonCardProjection}}
    },
    "module": *[_type == "course" && references(^._id)][0].modules[references(^._id)][0]{_key, title, summary}
  }
`);

export const INSTRUCTORS_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && defined(slug.current)] | order(name asc) ${instructorProjection}
`);

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, photo ${imageProjection}, expertise, bio,
    "courses": *[_type == "course" && references(^._id)]{
      _id, title, "slug": slug.current, summary, level, price, popular, studentCount,
      coverImage ${imageProjection}, "moduleCount": count(modules),
      "totalDuration": math::sum(modules[].lessons[]->duration)
    }
  }
`);

export const CATEGORIES_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && defined(slug.current)] | order(title asc){ _id, title, "slug": slug.current, description }
`);

export const COURSES_QUERY = COURSES_LIST_QUERY;
export const INSTRUCTORS_QUERY = INSTRUCTORS_LIST_QUERY;
export const CATEGORIES_QUERY = CATEGORIES_LIST_QUERY;
