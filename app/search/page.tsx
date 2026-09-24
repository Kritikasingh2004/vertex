import { Navbar } from "@/components/nav/navbar";
import { SearchResults } from "@/components/search/search-results";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const value = Array.isArray(params.q) ? params.q[0] : params.q;
  return (
    <div className="vertex-page min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] border-x border-warm-200 bg-warm-50 shadow-[0_0_40px_rgba(164,91,55,0.03)]">
        <header className="border-b border-warm-300 px-8 py-5 sm:px-12">
          <Navbar />
        </header>
        <SearchResults initialQuery={value?.slice(0, 200) ?? ""} />
      </div>
    </div>
  );
}
