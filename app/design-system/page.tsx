import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  BarChart3,
  Bell,
  Bookmark,
  CheckCircle2,
  Clock3,
  FileText,
  Grid2X2,
  LockKeyhole,
  PlayCircle,
  Search,
  Target,
  UserRound,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { CourseCard } from "@/components/cards/course-card";
import { LessonCard } from "@/components/cards/lesson-card";
import { LessonVideoCard } from "@/components/cards/lesson-video-card";
import { ResourceCard } from "@/components/cards/resource-card";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { Navbar } from "@/components/nav/navbar";
import { Pagination } from "@/components/nav/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { StatusIndicator } from "@/components/ui/status-indicator";

function Section({
  number,
  title,
  className,
  children,
}: {
  number: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`min-w-0 rounded-lg border border-neutral-200 bg-white p-5 ${className ?? ""}`}
    >
      <div className="mb-5 flex items-center gap-2">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-primary-500">
          {number}
        </span>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-900">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

const colors = [
  ["Primary 500", "#F97316", "bg-primary-500"],
  ["Primary 400", "#FB923C", "bg-primary-400"],
  ["Primary 300", "#FDBA74", "bg-primary-300"],
  ["Primary 200", "#FED7AA", "bg-primary-200"],
  ["Primary 100", "#FFEEE5", "bg-primary-100"],
  ["Neutral 900", "#0F172A", "bg-neutral-900"],
  ["Neutral 700", "#334155", "bg-neutral-700"],
  ["Neutral 500", "#64748B", "bg-neutral-500"],
  ["Neutral 300", "#CBD5E1", "bg-neutral-300"],
  ["Neutral 200", "#E2E8F0", "bg-neutral-200"],
  ["Neutral 100", "#F1F5F9", "bg-neutral-100"],
  ["Neutral 50", "#FAFAFC", "bg-neutral-50"],
  ["White", "#FFFFFF", "bg-white"],
];

const iconSet: LucideIcon[] = [
  Bell,
  Search,
  PlayCircle,
  FileText,
  Bookmark,
  BarChart3,
  Clock3,
  UserRound,
  CheckCircle2,
  LockKeyhole,
];
const typeRows = [
  ["Display 1", "Playfair Display", "48 / 56", "Bold", "Page titles"],
  ["Display 2", "Playfair Display", "36 / 44", "Bold", "Section titles"],
  ["Heading 1", "Inter", "28 / 36", "Semi Bold", "Card titles"],
  ["Heading 2", "Inter", "22 / 30", "Semi Bold", "Sub section"],
  ["Heading 3", "Inter", "18 / 26", "Medium", "Small titles"],
  ["Body Large", "Inter", "16 / 24", "Regular", "Body copy"],
  ["Body", "Inter", "14 / 20", "Regular", "Supporting text"],
  ["Small", "Inter", "12 / 16", "Regular", "Captions, meta"],
];

export default function DesignSystemPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-3 py-3 text-neutral-900 sm:px-5 lg:px-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_2.2fr]">
        <Section
          number="00"
          title="Brand"
          className="flex min-h-[272px] flex-col justify-between"
        >
          <div>
            <Logo />
            <h1 className="mt-6 font-display text-display-2">Design System</h1>
            <p className="mt-3 max-w-xs text-body leading-6 text-neutral-500">
              A unified design language for Vertex learning platform. Clean,
              modern and focused on clarity, consistency and intuitive learning
              experiences.
            </p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.08em] text-neutral-500">
            Version 1.0 &nbsp;·&nbsp; May 2025
          </p>
        </Section>
        <Section number="01" title="Colors">
          <div className="grid grid-cols-5 gap-x-3 gap-y-5 sm:grid-cols-7">
            {colors.map(([name, hex, swatch]) => (
              <div key={name} className="min-w-0">
                <div
                  className={`h-10 rounded-xs ${swatch} ${name === "White" ? "border border-neutral-200" : ""}`}
                />
                <p className="mt-2 truncate text-[9px] text-neutral-700">
                  {name}
                </p>
                <p className="text-[9px] text-neutral-500">{hex}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Section number="02" title="Typography">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-display text-[42px] leading-none">Ag</p>
              <p className="mt-2 text-heading-3">Playfair Display</p>
              <p className="text-small text-neutral-500">
                Elegant&nbsp; · &nbsp;Readable&nbsp; · &nbsp;Timeless
              </p>
            </div>
            <div>
              <p className="text-[42px] leading-none">Ag</p>
              <p className="mt-2 text-heading-3">Inter</p>
              <p className="text-small text-neutral-500">
                Clean&nbsp; · &nbsp;Modern&nbsp; · &nbsp;Highly legible
              </p>
            </div>
          </div>
        </Section>
        <Section number="03" title="Type Scale">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-[10px]">
              <thead className="text-neutral-500">
                <tr>
                  <th className="pb-2 font-normal">Style</th>
                  <th className="pb-2 font-normal">Font</th>
                  <th className="pb-2 font-normal">Size / Line Height</th>
                  <th className="pb-2 font-normal">Weight</th>
                  <th className="pb-2 font-normal">Use</th>
                </tr>
              </thead>
              <tbody>
                {typeRows.map((row) => (
                  <tr key={row[0]} className="border-t border-neutral-100">
                    <td className="py-1.5">{row[0]}</td>
                    <td className="py-1.5 text-neutral-500">{row[1]}</td>
                    <td className="py-1.5 text-neutral-500">{row[2]}</td>
                    <td className="py-1.5 text-neutral-500">{row[3]}</td>
                    <td className="py-1.5 text-neutral-500">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <Section number="04" title="Spacing System">
          <p className="mb-5 text-small text-neutral-700">Base unit: 4px</p>
          <div className="flex items-end justify-between gap-2">
            {[
              [4, 1],
              [8, 2],
              [12, 3],
              [16, 4],
              [24, 6],
              [32, 8],
              [40, 10],
              [48, 12],
              [64, 16],
            ].map(([px, size]) => (
              <div
                className="flex min-w-0 flex-1 flex-col items-center gap-2"
                key={px}
              >
                <div
                  className="w-full max-w-12 rounded-xs bg-primary-200"
                  style={{ height: `${size * 2}px` }}
                />
                <span className="text-[10px] font-medium">{px}</span>
                <span className="text-center text-[9px] text-neutral-500">
                  ({px / 16}rem)
                </span>
              </div>
            ))}
          </div>
        </Section>
        <Section number="05" title="Radius & Shadows">
          <p className="mb-3 text-small text-neutral-700">Radius</p>
          <div className="flex justify-between gap-2">
            {[
              ["xs", "4px"],
              ["sm", "8px"],
              ["md", "12px"],
              ["lg", "16px"],
              ["xl", "24px"],
              ["full", "circle"],
            ].map(([name, value]) => (
              <div className="text-center" key={name}>
                <div
                  className={`mx-auto h-10 w-10 border border-neutral-200 bg-white ${name === "full" ? "rounded-full" : `rounded-${name}`}`}
                />
                <p className="mt-2 text-[9px]">{value}</p>
                <p className="text-[9px] text-neutral-500">({name})</p>
              </div>
            ))}
          </div>
          <p className="mb-2 mt-5 text-small text-neutral-700">Shadows</p>
          <div className="grid grid-cols-4 gap-2">
            {["Sm", "Md", "Lg", "Xl"].map((name) => (
              <div
                className={`rounded-xs bg-white p-2 text-[9px] shadow-${name.toLowerCase()}`}
                key={name}
              >
                <b>{name}</b>
                <span className="mt-1 block text-neutral-500">
                  0 4px 12px -2px
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_1.5fr_1fr]">
        <Section number="06" title="Icons">
          <p className="mb-3 text-small text-neutral-700">Outline Style</p>
          <div className="flex flex-wrap gap-4">
            {iconSet.map((Icon, i) => (
              <Icon
                aria-hidden="true"
                className="text-neutral-700"
                key={i}
                size={15}
              />
            ))}
          </div>
          <p className="mb-3 mt-5 text-small text-neutral-700">Filled Style</p>
          <div className="flex flex-wrap gap-4">
            {iconSet.slice(0, 9).map((Icon, i) => (
              <Icon
                aria-hidden="true"
                className="fill-neutral-900 text-neutral-900"
                key={i}
                size={15}
              />
            ))}
          </div>
          <ul className="mt-5 space-y-1 text-[10px] text-neutral-500">
            <li>• Icon size: 24px</li>
            <li>• 2px stroke width (outline)</li>
            <li>• Rounded line caps</li>
            <li>• Consistent optical balance</li>
          </ul>
        </Section>
        <Section number="07" title="Buttons">
          <div className="overflow-x-auto">
            <div className="grid min-w-[520px] grid-cols-4 gap-x-3 gap-y-2 text-center text-[9px]">
              <span>Primary</span>
              <span>Secondary</span>
              <span>Tertiary</span>
              <span>Text</span>
              {(["Default", "Hover", "Disabled"] as const).map((state) => (
                <div className="contents" key={state}>
                  <span className="self-center text-left text-neutral-500">
                    {state}
                  </span>
                  <Button disabled={state === "Disabled"}>Get Started</Button>
                  <Button variant="secondary" disabled={state === "Disabled"}>
                    Explore Courses
                  </Button>
                  <Button variant="tertiary" disabled={state === "Disabled"}>
                    View Lesson
                  </Button>
                  <Button variant="text" disabled={state === "Disabled"}>
                    Watch Video
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 text-small text-neutral-700">Button Specs</p>
          <ul className="mt-1 space-y-1 text-[10px] text-neutral-500">
            <li>• Height: 44px (default)</li>
            <li>• Padding: 0 16px (lg), 0 12px (md)</li>
            <li>• Radius: 12px</li>
            <li>• Font: Inter Medium (14–16px)</li>
          </ul>
        </Section>
        <Section number="08" title="Inputs">
          <p className="mb-2 text-small text-neutral-700">
            Search / Text Input
          </p>
          <SearchInput />
          <p className="mb-2 mt-4 text-small text-neutral-700">Select</p>
          <Select />
          <p className="mb-2 mt-4 text-small text-neutral-700">Field Specs</p>
          <ul className="space-y-1 text-[10px] text-neutral-500">
            <li>• Height: 44px</li>
            <li>• Radius: 12px</li>
            <li>• Border: 1px solid #E2E8F0</li>
            <li>• Padding: 0 16px</li>
            <li>• Focus: Border color #FB923C</li>
          </ul>
        </Section>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.3fr_1.5fr]">
        <Section number="09" title="Badges / Tags">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px]">Video</p>
              <Badge variant="video" />
            </div>
            <div>
              <p className="mb-2 text-[10px]">Lesson</p>
              <Badge variant="lesson" />
            </div>
            <div>
              <p className="mb-2 text-[10px]">Popular</p>
              <Badge variant="popular" />
            </div>
          </div>
        </Section>
        <Section number="10" title="Status / Indicators">
          <div className="flex flex-wrap gap-5 pt-2">
            <StatusIndicator status="in-progress" />
            <StatusIndicator status="completed" />
            <StatusIndicator status="now-playing" />
            <StatusIndicator status="locked" />
          </div>
        </Section>
        <Section number="11" title="Progress Bar">
          <ProgressBar className="mt-6" value={35} />
        </Section>
      </div>

      <Section number="12" title="Cards" className="mt-3">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="mb-2 text-[10px] text-neutral-500">Course Card</p>
            <CourseCard
              mark="N"
              markClassName="bg-neutral-900 text-white"
              title="Next.js for Production"
              description="Build scalable, high-performance web applications with Next.js."
              level="Intermediate"
              duration="18h 24m"
              modules="12 modules"
            />
          </div>
          <div>
            <p className="mb-2 text-[10px] text-neutral-500">
              Lesson Card (Video)
            </p>
            <LessonVideoCard />
          </div>
          <div>
            <p className="mb-2 text-[10px] text-neutral-500">
              Lesson Card (Lesson)
            </p>
            <LessonCard />
          </div>
          <div>
            <p className="mb-2 text-[10px] text-neutral-500">Resource Card</p>
            <ResourceCard />
          </div>
        </div>
      </Section>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Section number="13" title="Navigation">
          <Navbar />
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] text-neutral-500">Breadcrumbs</p>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "/courses" },
                  { label: "Next.js for Production", href: "/courses/next" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>
            <div>
              <p className="mb-2 text-[10px] text-neutral-500">Pagination</p>
              <Pagination />
            </div>
          </div>
        </Section>
        <Section number="14" title="Principles">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              [
                Target,
                "Clarity First",
                "Every element should communicate clearly.",
              ],
              [
                Grid2X2,
                "Consistency",
                "Use components and patterns consistently across the platform.",
              ],
              [
                Target,
                "Focus & Calm",
                "Remove noise and help learners focus on what matters.",
              ],
              [
                Accessibility,
                "Accessible",
                "Design with accessibility and inclusivity in mind.",
              ],
            ].map(([Icon, title, description]) => (
              <div className="flex gap-3" key={title as string}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-neutral-200 text-neutral-500">
                  <Icon aria-hidden="true" size={16} />
                </span>
                <div>
                  <h3 className="text-small font-semibold">
                    {title as string}
                  </h3>
                  <p className="mt-1 text-[10px] leading-4 text-neutral-500">
                    {description as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
