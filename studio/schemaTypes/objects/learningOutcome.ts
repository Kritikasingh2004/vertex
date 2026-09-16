import { defineArrayMember, defineField, defineType } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";

export const learningOutcome = defineType({
  name: "learningOutcome",
  title: "Learning Outcome",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({ 
        name: "icon", 
        title: "Icon", 
        type: "string", 
        validation: (rule) => rule.required() 
    }),
    defineField({ 
        name: "title", 
        title: "Title", 
        type: "string", 
        validation: (rule) => rule.required() 
    }),
    defineField({ 
        name: "description", 
        title: "Description", 
        type: "text", 
        rows: 3, 
        validation: (rule) => rule.required() 
    }),
  ],
});

export const learningOutcomeMember = defineArrayMember({ type: "learningOutcome" });