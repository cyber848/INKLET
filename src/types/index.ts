export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  is_admin: boolean;
}

export interface Poem {
  id: string;
  title: string;
  content: string;
  author: string;
  author_bio?: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  author_bio?: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  reading_time: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  created_at: string;
}