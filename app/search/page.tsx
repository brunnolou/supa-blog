import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage({ searchParams }) {
  const query = searchParams.q;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Search Results for "{query}"</h1>
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}