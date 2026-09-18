export type SanityImage = {
  asset?: { _id: string; url: string };
  alt?: string;
};

export type Instructor = {
  _id: string;
  name: string;
  slug: string;
  photo?: SanityImage;
  expertise: string[];
  bio: unknown[];
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description: string;
};

export type Resource = {
  _key: string;
  type: string;
  title: string;
  description: string;
  url: string;
};

export type Lesson = {
  _id: string;
  title: string;
  slug: string;
  videoUrl: string;
  poster?: SanityImage;
  duration: number;
  freePreview: boolean;
  studentCount: number;
  notes: unknown[];
  keyPoints: string[];
  proTip?: string;
  resources: Resource[];
};

export type CourseModule = {
  _key: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type LearningOutcome = {
  _key: string;
  icon: string;
  title: string;
  description: string;
};

export type Course = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage?: SanityImage;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  popular?: boolean;
  studentCount: number;
  learningOutcomes: LearningOutcome[];
  instructor: Instructor;
  category: Category;
  modules: CourseModule[];
};

export type LessonDetail = Lesson & {
  course: Course;
  module: Pick<CourseModule, "_key" | "title" | "summary">;
};
