/*
  # Create notifications system

  1. New Tables
    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `message` (text)
      - `type` (text) - emergency, safety, community, system, case, moderation
      - `priority` (text) - low, medium, high, critical
      - `read` (boolean, default false)
      - `action_required` (boolean, default false)
      - `metadata` (jsonb) - additional data like case_id, alert_id, etc.
      - `expires_at` (timestamptz) - optional expiration
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `notifications` table
    - Add policy for users to read their own notifications
    - Add policy for users to update their own notifications (mark as read)

  3. Indexes
    - Index on user_id for fast user queries
    - Index on created_at for chronological sorting
    - Index on read status for filtering
*/

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('emergency', 'safety', 'community', 'system', 'case', 'moderation')),
  priority text NOT NULL DEFAULT 'low' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  read boolean NOT NULL DEFAULT false,
  action_required boolean NOT NULL DEFAULT false,
  metadata jsonb DEFAULT '{}',
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read, delete)
CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own notifications
CREATE POLICY "Users can delete own notifications"
  ON notifications
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- System can insert notifications for any user (for automated notifications)
CREATE POLICY "System can insert notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);
CREATE INDEX IF NOT EXISTS notifications_priority_idx ON notifications(priority);
CREATE INDEX IF NOT EXISTS notifications_type_idx ON notifications(type);