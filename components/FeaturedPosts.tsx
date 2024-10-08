"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedPosts } from '@/lib/supabase';

export default function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      const posts = await getFeaturedPosts();
      setFeaturedPosts(posts);
    }
    fetchFeaturedPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredPosts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-0">
            <Link href={`/post/${post.id}`}>
              <Image
                src={post.image_url}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}