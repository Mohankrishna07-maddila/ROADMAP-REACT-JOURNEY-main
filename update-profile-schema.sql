-- Add missing columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS github TEXT,
ADD COLUMN IF NOT EXISTS linkedin TEXT;

-- Update existing profiles to have default values for new columns
UPDATE profiles 
SET 
  location = COALESCE(location, ''),
  website = COALESCE(website, ''),
  github = COALESCE(github, ''),
  linkedin = COALESCE(linkedin, '')
WHERE location IS NULL OR website IS NULL OR github IS NULL OR linkedin IS NULL; 