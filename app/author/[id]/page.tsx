import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import AuthorPosts from '@/components/AuthorPosts';
import { getAuthorById } from '@/lib/supabase';

export default async function AuthorPage({ params }) {
  const author = await getAuthorById(params.id);

  if (!author) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={author.avatar_url} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">{author.name}</h1>
          <p className="text-muted-foreground">{author.bio}</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold">Posts by {author.name}</h2>
      <Suspense fallback={<AuthorPostsSkeleton />}>
        <AuthorPosts authorId={params.id} />
      </Suspense>
    </div>
  );
}

function AuthorPostsSkeleton() {
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