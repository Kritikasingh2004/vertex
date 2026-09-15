import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";
type ButtonSize = "lg" | "md";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  showIcon?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-100 disabled:text-primary-300",
  secondary: "border border-primary-500 text-primary-500 hover:bg-primary-100 disabled:border-primary-200 disabled:text-primary-300",
  tertiary: "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 disabled:text-neutral-300",
  text: "px-0 text-primary-500 hover:text-primary-600 disabled:text-primary-300",
};

export function Button({ variant = "primary", size = "lg", showIcon, className, children, ...props }: ButtonProps) {
  const icon = showIcon ?? (variant === "tertiary" || variant === "text");
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none",
        size === "lg" ? "px-4" : "px-3",
        variant === "text" && "h-auto",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon && (variant === "tertiary" ? <ExternalLink aria-hidden="true" size={14} /> : <PlayCircle aria-hidden="true" size={15} />)}
    </button>
  );
}