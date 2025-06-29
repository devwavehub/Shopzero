/*
  # Create storage bucket for file uploads

  1. Storage Setup
    - Create 'uploads' bucket for general file storage
    - Create 'product-images' bucket specifically for product images
    - Create 'vendor-assets' bucket for vendor logos and banners

  2. Security Policies
    - Allow authenticated users to upload files
    - Allow public read access to uploaded files
    - Restrict file types and sizes
    - Allow users to delete their own uploads

  3. Bucket Configuration
    - Set appropriate file size limits
    - Configure allowed file types
    - Enable public access for product images
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  (
    'product-images',
    'product-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ),
  (
    'vendor-assets',
    'vendor-assets', 
    true,
    3145728, -- 3MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'uploads',
    'uploads',
    false,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'text/plain']
  )
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product-images bucket
CREATE POLICY "Anyone can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Storage policies for vendor-assets bucket
CREATE POLICY "Anyone can view vendor assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'vendor-assets');

CREATE POLICY "Authenticated users can upload vendor assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'vendor-assets' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own vendor assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'vendor-assets' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own vendor assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'vendor-assets' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Storage policies for general uploads bucket
CREATE POLICY "Users can view their own uploads"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'uploads' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Authenticated users can upload files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'uploads' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own uploads"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'uploads' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own uploads"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'uploads' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Enable RLS on storage.objects (should already be enabled, but ensuring it)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;