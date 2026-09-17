import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const seedPath = resolve("scripts/seed/seed.ndjson");
const lines = (await readFile(seedPath, "utf8"))
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);
const documents = lines.map((line, index) => {
  try {
    return JSON.parse(line);
  } catch (error) {
    throw new Error(`Invalid JSON on seed line ${index + 1}: ${error.message}`);
  }
});

const byType = (type) =>
  documents.filter((document) => document._type === type);
const errors = [];
const ids = new Set();
const slugs = new Set();
const videoUrls = new Set();

for (const document of documents) {
  if (!document._id || !document._type)
    errors.push("Every document needs _id and _type");
  if (ids.has(document._id))
    errors.push(`Duplicate document id: ${document._id}`);
  ids.add(document._id);
  if (document.slug?.current) {
    if (slugs.has(document.slug.current))
      errors.push(`Duplicate slug: ${document.slug.current}`);
    slugs.add(document.slug.current);
  }
}

for (const lesson of byType("lesson")) {
  if (!lesson.poster?._sanityAsset || !lesson.poster.alt)
    errors.push(`${lesson._id} needs a poster asset and alt text`);
  if (!lesson.videoUrl || videoUrls.has(lesson.videoUrl))
    errors.push(`Duplicate or missing video URL: ${lesson._id}`);
  videoUrls.add(lesson.videoUrl);
  if (!Number.isInteger(lesson.duration) || lesson.duration <= 0)
    errors.push(`${lesson._id} needs a positive integer duration`);
}

const referencedLessons = new Set();
for (const course of byType("course")) {
  if (!course.coverImage?._sanityAsset || !course.coverImage.alt)
    errors.push(`${course._id} needs a cover image asset and alt text`);
  if (course.modules?.length !== 4)
    errors.push(`${course._id} must have 4 modules`);
  for (const module of course.modules ?? []) {
    if (module.lessons?.length !== 3)
      errors.push(`${course._id}/${module.title} must have 3 lessons`);
    for (const reference of module.lessons ?? []) {
      if (!ids.has(reference._ref))
        errors.push(
          `${course._id} references missing lesson ${reference._ref}`,
        );
      if (referencedLessons.has(reference._ref))
        errors.push(`Lesson referenced more than once: ${reference._ref}`);
      referencedLessons.add(reference._ref);
    }
  }
}

for (const lesson of byType("lesson")) {
  if (!referencedLessons.has(lesson._id))
    errors.push(`Orphaned lesson: ${lesson._id}`);
}

const expectedCounts = { category: 6, instructor: 5, course: 10, lesson: 120 };
for (const [type, expected] of Object.entries(expectedCounts)) {
  const actual = byType(type).length;
  if (actual !== expected)
    errors.push(`Expected ${expected} ${type} documents, found ${actual}`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `Seed is valid: ${documents.length} documents, ${referencedLessons.size} referenced lessons.`,
);
