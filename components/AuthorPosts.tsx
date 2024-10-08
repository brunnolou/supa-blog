"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { getPostsByAuthor } from '@/lib/supabase';

export default function AuthorPosts({ authorId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchAuthorPosts() {
      const fetchedPosts = await getPostsByAuthor(authorId);
      setPosts(fetchedPosts);
    }
    fetchAuthorPosts();
  }, [authorId]);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/post/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
            <p className="mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      {posts.length === 0 && (
        <p>No posts found for this author.</p>
      )}
    </div>
  );
}