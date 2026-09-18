import { category } from "./category";
import { course } from "./course";
import { instructor } from "./instructor";
import { lesson } from "./lesson";
import { learningOutcome } from "./objects/learningOutcome";
import { moduleSchema } from "./objects/module";
import { resource } from "./objects/resource";
import { blockContent } from "./objects/blockContent";

export const schemaTypes = [
  course,
  lesson,
  instructor,
  category,
  moduleSchema,
  learningOutcome,
  resource,
  blockContent,
];
