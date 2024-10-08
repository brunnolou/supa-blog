import { Suspense } from 'react';
import PostList from '@/components/PostList';
import SearchBar from '@/components/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import FeaturedPosts from '@/components/FeaturedPosts';
import CategoryList from '@/components/CategoryList';

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome to Our Blog</h1>
      <SearchBar />
      <FeaturedPosts />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <Suspense fallback={<PostListSkeleton />}>
            <PostList />
          </Suspense>
        </div>
        <div className="space-y-6">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}

function PostListSkeleton() {
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