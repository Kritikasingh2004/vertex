import { BookIcon } from "@sanity/icons/Book";
import { defineArrayMember, defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", validation: (rule) => rule.required() },
      ],
    }),
    defineField({
      name: "level",
      type: "string",
      options: {
        list: ["beginner", "intermediate", "advanced"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "studentCount",
      title: "Student Count",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "learningOutcomes",
      title: "What You Will Learn",
      type: "array",
      of: [defineArrayMember({ type: "learningOutcome" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "instructor",
      type: "reference",
      to: [{ type: "instructor" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "modules",
      type: "array",
      of: [defineArrayMember({ type: "module" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "level" },
  },
});
