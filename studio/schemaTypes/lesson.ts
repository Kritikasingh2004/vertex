import { PlayIcon } from "@sanity/icons/Play";
import { defineArrayMember, defineField, defineType } from "sanity";

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  icon: PlayIcon,
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
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["https"] })
          .custom((value) => {
            if (!value) return true;
            try {
              const hostname = new URL(value).hostname.toLowerCase();
              return /(^|\.)((youtube\.com)|(youtu\.be)|(vimeo\.com)|(bunnycdn\.com)|(bunny\.net))$/.test(
                hostname,
              )
                ? true
                : "Use a YouTube, Vimeo, or Bunny video URL";
            } catch {
              return "Enter a valid video URL";
            }
          }),
    }),
    defineField({
      name: "poster",
      title: "Poster / Thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", validation: (rule) => rule.required() },
      ],
    }),
    defineField({
      name: "duration",
      title: "Duration (seconds)",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "freePreview",
      title: "Free Preview",
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
      name: "notes",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "keyPoints",
      title: "Key Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "proTip",
      title: "Pro Tip",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "resources",
      type: "array",
      of: [defineArrayMember({ type: "resource" })],
    }),
  ],
  preview: { select: { title: "title", media: "poster" } },
});
