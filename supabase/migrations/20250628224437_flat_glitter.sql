/*
  # Create admin_settings table

  1. New Tables
    - `admin_settings`
      - `id` (uuid, primary key)
      - `admin_password` (text) - default: "Dara2002"
      - `site_name` (text)
      - `site_description` (text, optional)
      - `contact_email` (text)
      - `contact_phone` (text, optional)
      - `paystack_public_key` (text)
      - `paystack_secret_key` (text)
      - `updated_at` (timestamp)

  2. Security
    - No RLS needed as this will be accessed via server functions
    - Insert default settings

  3. Insert default admin settings
*/

CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_password text NOT NULL DEFAULT 'Dara2002',
  site_name text NOT NULL DEFAULT 'Shopzero',
  site_description text DEFAULT 'Multi-vendor eCommerce marketplace for zero stress shopping',
  contact_email text NOT NULL DEFAULT 'admin@shopzero.ng',
  contact_phone text DEFAULT '+234 800 SHOPZERO',
  paystack_public_key text DEFAULT '',
  paystack_secret_key text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Insert default admin settings (only if table is empty)
INSERT INTO admin_settings (
  admin_password,
  site_name,
  site_description,
  contact_email,
  contact_phone
) 
SELECT 
  'Dara2002',
  'Shopzero',
  'Multi-vendor eCommerce marketplace for zero stress shopping',
  'admin@shopzero.ng',
  '+234 800 SHOPZERO'
WHERE NOT EXISTS (SELECT 1 FROM admin_settings);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();