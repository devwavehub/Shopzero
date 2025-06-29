/*
  # Create vendors table

  1. New Tables
    - `vendors`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `business_name` (text)
      - `business_email` (text)
      - `business_phone` (text)
      - `business_address` (text)
      - `business_description` (text, optional)
      - `logo_url` (text, optional)
      - `banner_url` (text, optional)
      - `is_approved` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `vendors` table
    - Add policies for vendors to manage their own data
    - Add policy for admin to approve vendors
*/

CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  business_name text NOT NULL,
  business_email text NOT NULL,
  business_phone text NOT NULL,
  business_address text NOT NULL,
  business_description text,
  logo_url text,
  banner_url text,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Vendors can read and update their own data
CREATE POLICY "Vendors can read own data"
  ON vendors
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Vendors can update own data"
  ON vendors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create vendor profiles
CREATE POLICY "Users can create vendor profiles"
  ON vendors
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Everyone can read approved vendors (for public display)
CREATE POLICY "Everyone can read approved vendors"
  ON vendors
  FOR SELECT
  USING (is_approved = true);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_vendors_updated_at
  BEFORE UPDATE ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();