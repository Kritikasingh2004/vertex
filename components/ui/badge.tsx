import { cn } from "@/lib/utils";

type BadgeVariant = "video" | "lesson" | "popular";
type BadgeProps = { variant: BadgeVariant; children?: string; className?: string };

const styles: Record<BadgeVariant, string> = {
  video: "bg-primary-100 text-primary-500",
  lesson: "bg-indigo-50 text-indigo-600",
  popular: "bg-primary-100 text-primary-500 font-semibold",
};

export function Badge({ variant, children, className }: BadgeProps) {
  return <span className={cn("inline-flex rounded-[6px] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em]", styles[variant], className)}>{children ?? variant}</span>;
}