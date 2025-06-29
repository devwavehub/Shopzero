/*
  # Storage Policies for File Uploads

  1. Policies for product-images bucket
    - Public read access for all product images
    - Authenticated users can upload to their own folder
    - Users can manage their own files

  2. Policies for vendor-assets bucket
    - Public read access for vendor logos/banners
    - Authenticated users can upload to their own folder
    - Users can manage their own files

  3. Policies for uploads bucket (if created)
    - Private access - users can only see their own files
    - Authenticated users can upload to their own folder
    - Users can manage their own files

  Note: Buckets must be created manually in Supabase Dashboard first
*/

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

-- Storage policies for general uploads bucket (optional)
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