import { CheckCircle2, Circle, LockKeyhole, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "in-progress" | "completed" | "now-playing" | "locked";
type StatusIndicatorProps = { status: Status; className?: string };

const labels: Record<Status, string> = { "in-progress": "In Progress", completed: "Completed", "now-playing": "Now Playing", locked: "Locked" };

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const icon = { "in-progress": <Circle className="text-primary-500" size={14} />, completed: <CheckCircle2 className="text-green-600" size={14} />, "now-playing": <PlayCircle className="fill-primary-500 text-primary-500" size={14} />, locked: <LockKeyhole className="text-neutral-500" size={14} /> }[status];
  return <span className={cn("inline-flex items-center gap-1.5 text-small text-neutral-700", className)}>{icon}{labels[status]}</span>;
}