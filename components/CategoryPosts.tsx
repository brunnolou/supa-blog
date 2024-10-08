"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { getPostsByCategory } from '@/lib/supabase';

export default function CategoryPosts({ category }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchCategoryPosts() {
      const fetchedPosts = await getPostsByCategory(category);
      setPosts(fetchedPosts);
    }
    fetchCategoryPosts();
  }, [category]);

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
            <div className="flex items-center space-x-4 mb-4">
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
            <p className="mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      {posts.length === 0 && (
        <p>No posts found in the category "{category}".</p>
      )}
    </div>
  );
}