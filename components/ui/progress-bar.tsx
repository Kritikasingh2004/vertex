import { cn } from "@/lib/utils";

type ProgressBarProps = { value: number; label?: string; className?: string };

export function ProgressBar({ value, label = `${value}% complete`, className }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100" role="progressbar" aria-valuenow={safeValue} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-primary-500" style={{ width: `${safeValue}%` }} />
      </div>
      <span className="shrink-0 text-small text-neutral-700">{label}</span>
    </div>
  );
}