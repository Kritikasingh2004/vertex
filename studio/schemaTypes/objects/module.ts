import { defineArrayMember, defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons/Book";

export const moduleSchema = defineType({
  name: "module",
  title: "Module",
  type: "object",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lessons",
      title: "Lessons",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "lesson" }] })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: { title: "title", lessons: "lessons" },
    prepare: ({ title, lessons }) => ({
      title,
      subtitle: `${lessons?.length ?? 0} lessons`,
    }),
  },
});
