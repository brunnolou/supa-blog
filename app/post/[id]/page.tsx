import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import { formatDistanceToNow } from 'date-fns';
import DisqusComments from '@/components/DisqusComments';
import ShareButtons from '@/components/ShareButtons';
import { getPostById } from '@/lib/supabase';

export default async function PostPage({ params }) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar>
          <AvatarImage src={post.author.avatar_url} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>
      {post.image_url && (
        <div className="mb-6">
          <Image
            src={post.image_url}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="prose dark:prose-invert max-w-none mb-6">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {post.categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>
      <ShareButtons url={`https://yourblog.com/post/${post.id}`} title={post.title} />
      <Suspense fallback={<Skeleton className="h-[200px]" />}>
        <DisqusComments post={post} />
      </Suspense>
    </article>
  );
}