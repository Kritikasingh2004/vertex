import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons/Link";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["pdf", "link", "repo", "code", "slides"], layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() }),
  ],
});