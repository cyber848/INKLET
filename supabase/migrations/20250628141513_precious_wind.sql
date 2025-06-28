/*
  # Create submissions table for content approval workflow

  1. New Tables
    - `submissions`
      - `id` (uuid, primary key)
      - `type` (text) - 'poem' or 'blog_post'
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `author_name` (text)
      - `author_bio` (text)
      - `category_id` (uuid, foreign key to categories)
      - `tags` (text array)
      - `reading_time` (integer, for blog posts)
      - `status` (text) - 'pending', 'approved', 'rejected'
      - `admin_notes` (text)
      - `user_id` (uuid, foreign key to users)
      - `reviewed_by` (uuid, foreign key to users)
      - `reviewed_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `submissions` table
    - Add policies for users to create and view their own submissions
    - Add policies for admins to manage all submissions
*/

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('poem', 'blog_post')),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_name text NOT NULL,
  author_bio text,
  category_id uuid REFERENCES categories(id),
  tags text[] DEFAULT '{}',
  reading_time integer,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Users can insert their own submissions
CREATE POLICY "Users can create submissions"
  ON submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Admins can update all submissions
CREATE POLICY "Admins can update all submissions"
  ON submissions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Admins can delete submissions
CREATE POLICY "Admins can delete submissions"
  ON submissions
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS submissions_user_id_idx ON submissions(user_id);
CREATE INDEX IF NOT EXISTS submissions_status_idx ON submissions(status);
CREATE INDEX IF NOT EXISTS submissions_type_idx ON submissions(type);
CREATE INDEX IF NOT EXISTS submissions_created_at_idx ON submissions(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS submissions_updated_at_trigger ON submissions;
CREATE TRIGGER submissions_updated_at_trigger
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_submissions_updated_at();