"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getCategories } from '@/lib/supabase';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link key={category} href={`/category/${category}`}>
            <Badge variant="secondary" className="text-sm">
              {category}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}