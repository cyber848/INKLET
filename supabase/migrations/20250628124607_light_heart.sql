/*
  # Initial Schema Setup for Inklet Poetry Platform

  1. New Tables
    - `profiles` - Extended user profile information
    - `categories` - Content categories for poems and blog posts
    - `poems` - Poetry submissions and content
    - `blog_posts` - Blog articles and editorial content
    - `poem_likes` - User likes for poems
    - `blog_post_likes` - User likes for blog posts
    - `poem_views` - Track poem view counts
    - `blog_post_views` - Track blog post view counts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own content
    - Add policies for public read access to published content
    - Add admin policies for content management

  3. Functions
    - Auto-create profile on user signup
    - Update view counts
    - Handle like/unlike functionality
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  bio text,
  avatar_url text,
  website text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create poems table
CREATE TABLE IF NOT EXISTS poems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_name text NOT NULL,
  author_bio text,
  category_id uuid REFERENCES categories(id),
  tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  likes_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_name text NOT NULL,
  author_bio text,
  category_id uuid REFERENCES categories(id),
  tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  reading_time integer DEFAULT 5,
  likes_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create poem_likes table
CREATE TABLE IF NOT EXISTS poem_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id uuid REFERENCES poems(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(poem_id, user_id)
);

-- Create blog_post_likes table
CREATE TABLE IF NOT EXISTS blog_post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(blog_post_id, user_id)
);

-- Create poem_views table
CREATE TABLE IF NOT EXISTS poem_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id uuid REFERENCES poems(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

-- Create blog_post_views table
CREATE TABLE IF NOT EXISTS blog_post_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_views ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Categories policies (public read, admin write)
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Poems policies
CREATE POLICY "Published poems are viewable by everyone"
  ON poems FOR SELECT
  USING (published = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own poems"
  ON poems FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own poems"
  ON poems FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own poems"
  ON poems FOR DELETE
  USING (auth.uid() = user_id);

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (published = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own blog posts"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blog posts"
  ON blog_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blog posts"
  ON blog_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Poem likes policies
CREATE POLICY "Poem likes are viewable by everyone"
  ON poem_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own poem likes"
  ON poem_likes FOR ALL
  USING (auth.uid() = user_id);

-- Blog post likes policies
CREATE POLICY "Blog post likes are viewable by everyone"
  ON blog_post_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own blog post likes"
  ON blog_post_likes FOR ALL
  USING (auth.uid() = user_id);

-- Views policies
CREATE POLICY "Poem views are viewable by everyone"
  ON poem_views FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert poem views"
  ON poem_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Blog post views are viewable by everyone"
  ON blog_post_views FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert blog post views"
  ON blog_post_views FOR INSERT
  WITH CHECK (true);

-- Function to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, is_admin)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    CASE 
      WHEN new.email IN ('amr.abdulgawad123@gmail.com', 'emailedbyproseidon@gmail.com') 
      THEN true 
      ELSE false 
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update poem likes count
CREATE OR REPLACE FUNCTION update_poem_likes_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE poems 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.poem_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE poems 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.poem_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for poem likes count
DROP TRIGGER IF EXISTS poem_likes_count_trigger ON poem_likes;
CREATE TRIGGER poem_likes_count_trigger
  AFTER INSERT OR DELETE ON poem_likes
  FOR EACH ROW EXECUTE FUNCTION update_poem_likes_count();

-- Function to update blog post likes count
CREATE OR REPLACE FUNCTION update_blog_post_likes_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blog_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.blog_post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blog_posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.blog_post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for blog post likes count
DROP TRIGGER IF EXISTS blog_post_likes_count_trigger ON blog_post_likes;
CREATE TRIGGER blog_post_likes_count_trigger
  AFTER INSERT OR DELETE ON blog_post_likes
  FOR EACH ROW EXECUTE FUNCTION update_blog_post_likes_count();

-- Function to update poem views count
CREATE OR REPLACE FUNCTION update_poem_views_count()
RETURNS trigger AS $$
BEGIN
  UPDATE poems 
  SET views_count = views_count + 1 
  WHERE id = NEW.poem_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for poem views count
DROP TRIGGER IF EXISTS poem_views_count_trigger ON poem_views;
CREATE TRIGGER poem_views_count_trigger
  AFTER INSERT ON poem_views
  FOR EACH ROW EXECUTE FUNCTION update_poem_views_count();

-- Function to update blog post views count
CREATE OR REPLACE FUNCTION update_blog_post_views_count()
RETURNS trigger AS $$
BEGIN
  UPDATE blog_posts 
  SET views_count = views_count + 1 
  WHERE id = NEW.blog_post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for blog post views count
DROP TRIGGER IF EXISTS blog_post_views_count_trigger ON blog_post_views;
CREATE TRIGGER blog_post_views_count_trigger
  AFTER INSERT ON blog_post_views
  FOR EACH ROW EXECUTE FUNCTION update_blog_post_views_count();