/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `vendor_id` (uuid, foreign key to vendors)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `compare_price` (decimal, optional)
      - `category` (text)
      - `brand` (text, optional)
      - `sku` (text, unique)
      - `stock_quantity` (integer)
      - `images` (text array)
      - `is_featured` (boolean, default false)
      - `is_flash_sale` (boolean, default false)
      - `flash_sale_price` (decimal, optional)
      - `flash_sale_end` (timestamp, optional)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policies for vendors to manage their products
    - Add policy for public to read active products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  compare_price decimal(10,2),
  category text NOT NULL,
  brand text,
  sku text UNIQUE NOT NULL,
  stock_quantity integer DEFAULT 0,
  images text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_flash_sale boolean DEFAULT false,
  flash_sale_price decimal(10,2),
  flash_sale_end timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Everyone can read active products
CREATE POLICY "Everyone can read active products"
  ON products
  FOR SELECT
  USING (is_active = true);

-- Vendors can manage their own products
CREATE POLICY "Vendors can manage own products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_vendor_id ON products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_flash_sale ON products(is_flash_sale);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_flash_sale_end ON products(flash_sale_end);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();