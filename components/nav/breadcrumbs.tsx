import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Breadcrumb = { label: string; href?: string };
export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return <nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-1 text-small text-neutral-500">{items.map((item, index) => <li className="inline-flex items-center gap-1" key={item.label}>{index > 0 && <ChevronRight aria-hidden="true" size={12} />}{item.href ? <Link className="hover:text-primary-500" href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}