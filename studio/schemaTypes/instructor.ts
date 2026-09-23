import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

export const instructor = defineType({
  name: "instructor",
  title: "Instructor",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", validation: (rule) => rule.required() },
      ],
    }),
    defineField({
      name: "expertise",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "bio",
      type: "blockContent",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { select: { title: "name", media: "photo" } },
});
