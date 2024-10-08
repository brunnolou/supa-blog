"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { searchPosts } from '@/lib/supabase';

export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      const searchResults = await searchPosts(query);
      setResults(searchResults);
    }
    fetchSearchResults();
  }, [query]);

  return (
    <div className="space-y-6">
      {results.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/post/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
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
      {results.length === 0 && (
        <p>No results found for "{query}". Try a different search term.</p>
      )}
    </div>
  );
}