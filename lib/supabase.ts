import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getPosts(page = 1, limit = 10) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      excerpt,
      created_at,
      categories,
      image_url,
      author:authors(name, avatar_url)
    `
    )
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data;
}

export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      content,
      created_at,
      categories,
      image_url,
      author:authors(name, avatar_url)
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
}

export async function getFeaturedPosts(limit = 3) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      excerpt,
      image_url
    `
    )
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }

  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('name')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data.map((category) => category.name);
}

export async function searchPosts(query: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      excerpt,
      categories
    `
    )
    .textSearch('title', query)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching posts:', error);
    return [];
  }

  return data;
}

export async function getPostsByCategory(category: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      excerpt,
      created_at,
      categories,
      author:authors(name, avatar_url)
    `
    )
    .contains('categories', [category])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }

  return data;
}

export async function getAuthorById(id: string) {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching author:', error);
    return null;
  }

  return data;
}

export async function getPostsByAuthor(authorId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      excerpt,
      created_at,
      categories
    `
    )
    .eq('author_id', authorId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by author:', error);
    return [];
  }

  return data;
}
