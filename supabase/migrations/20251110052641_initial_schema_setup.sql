/*
  # Initial Schema Setup for Netflix Clone

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
    
    - `watchlist`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `content_id` (integer)
      - `created_at` (timestamp)
    
    - `viewing_history`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `content_id` (integer)
      - `progress` (integer)
      - `last_watched` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Policies ensure users can only access data for profiles they own
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, name)
);

-- Create watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  content_id integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(profile_id, content_id)
);

-- Create viewing_history table
CREATE TABLE IF NOT EXISTS viewing_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  content_id integer NOT NULL,
  progress integer DEFAULT 0,
  last_watched timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE viewing_history ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profiles"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Watchlist policies
CREATE POLICY "Users can view their watchlist"
  ON watchlist
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = watchlist.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add to watchlist"
  ON watchlist
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = watchlist.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update watchlist"
  ON watchlist
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = watchlist.profile_id
      AND profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = watchlist.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can remove from watchlist"
  ON watchlist
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = watchlist.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Viewing history policies
CREATE POLICY "Users can view their viewing history"
  ON viewing_history
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = viewing_history.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add to viewing history"
  ON viewing_history
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = viewing_history.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update viewing history"
  ON viewing_history
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = viewing_history.profile_id
      AND profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = viewing_history.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete viewing history"
  ON viewing_history
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = viewing_history.profile_id
      AND profiles.user_id = auth.uid()
    )
  );