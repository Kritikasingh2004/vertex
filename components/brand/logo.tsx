import { cn } from "@/lib/utils";

type LogoProps = { className?: string; showWordmark?: boolean };

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-heading-3", className)}>
      <svg aria-hidden="true" className="h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none">
        <path d="M3 3h26L18.5 27h-5L3 3Z" fill="currentColor" className="text-primary-500" />
        <path d="m9 9 5.5 11L20 9h-4l-1.5 5L13 9H9Z" fill="white" />
      </svg>
      {showWordmark && <span className="font-semibold tracking-tight">Vertex</span>}
    </span>
  );
}