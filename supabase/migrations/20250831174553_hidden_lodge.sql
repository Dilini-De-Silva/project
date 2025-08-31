/*
  # Add additional profile fields

  1. New Columns
    - `phone` (text) - User's phone number
    - `address` (text) - User's address
    - `date_of_birth` (date) - User's date of birth
    - `emergency_contact_name` (text) - Primary emergency contact name
    - `emergency_contact_phone` (text) - Primary emergency contact phone
    - `notification_preferences` (jsonb) - User notification settings
    - `privacy_settings` (jsonb) - User privacy preferences

  2. Security
    - Maintain existing RLS policies
    - Users can only update their own profile data
*/

DO $$
BEGIN
  -- Add phone number field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone text;
  END IF;

  -- Add address field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'address'
  ) THEN
    ALTER TABLE profiles ADD COLUMN address text;
  END IF;

  -- Add date of birth field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE profiles ADD COLUMN date_of_birth date;
  END IF;

  -- Add emergency contact name field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'emergency_contact_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN emergency_contact_name text;
  END IF;

  -- Add emergency contact phone field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'emergency_contact_phone'
  ) THEN
    ALTER TABLE profiles ADD COLUMN emergency_contact_phone text;
  END IF;

  -- Add notification preferences field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'notification_preferences'
  ) THEN
    ALTER TABLE profiles ADD COLUMN notification_preferences jsonb DEFAULT '{
      "email_alerts": true,
      "sms_alerts": true,
      "community_updates": true,
      "safety_tips": true
    }'::jsonb;
  END IF;

  -- Add privacy settings field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'privacy_settings'
  ) THEN
    ALTER TABLE profiles ADD COLUMN privacy_settings jsonb DEFAULT '{
      "profile_visibility": "community",
      "location_sharing": true,
      "activity_visibility": true
    }'::jsonb;
  END IF;
END $$;

-- Update existing profiles with default values for new fields
UPDATE profiles 
SET 
  notification_preferences = COALESCE(notification_preferences, '{
    "email_alerts": true,
    "sms_alerts": true,
    "community_updates": true,
    "safety_tips": true
  }'::jsonb),
  privacy_settings = COALESCE(privacy_settings, '{
    "profile_visibility": "community",
    "location_sharing": true,
    "activity_visibility": true
  }'::jsonb)
WHERE notification_preferences IS NULL OR privacy_settings IS NULL;