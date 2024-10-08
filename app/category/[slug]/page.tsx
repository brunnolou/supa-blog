import { Suspense } from 'react';
import CategoryPosts from '@/components/CategoryPosts';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPage({ params }) {
  const { slug } = params;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold capitalize">Category: {slug}</h1>
      <Suspense fallback={<CategoryPostsSkeleton />}>
        <CategoryPosts category={slug} />
      </Suspense>
    </div>
  );
}

function CategoryPostsSkeleton() {
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