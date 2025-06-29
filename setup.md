# Shopzero Setup Guide

This guide will help you set up Shopzero from scratch, including Supabase configuration, payment integration, and deployment.

## 📋 Prerequisites

Before you begin, make sure you have:
- Node.js 18 or later
- npm or yarn package manager
- A Supabase account
- A Paystack account (for Nigerian payments)
- A code editor (VS Code recommended)

## 🗄️ Supabase Setup

### 1. Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: Shopzero
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 2. Configure Database

1. In your Supabase dashboard, go to the **SQL Editor**
2. Run each migration file from the `supabase/migrations/` folder in order:
   - `create_users_table.sql`
   - `create_vendors_table.sql`
   - `create_products_table.sql`
   - `create_orders_table.sql`
   - `create_admin_settings_table.sql`
   - `create_contact_messages_table.sql`

### 3. Configure Authentication

1. Go to **Authentication** > **Settings**
2. Configure the following:
   - **Site URL**: `http://localhost:5173` (development) or your production URL
   - **Email Confirmation**: Disable for faster signup
   - **Email Templates**: Customize if needed

3. Set up OAuth providers:
   
   **Google OAuth:**
   1. Go to **Authentication**> **Providers**
   2. Enable Google
   3. Get credentials from [Google Cloud Console](https://console.cloud.google.com/)
   4. Add your client ID and secret

   **Facebook OAuth:**
   1. Enable Facebook in providers
   2. Get credentials from [Facebook Developers](https://developers.facebook.com/)
   3. Add your app ID and secret

### 4. Configure Storage

1. Go to **Storage**
2. Create a new bucket called `product-images`
3. Set the bucket to **Public**
4. Configure policies:
   ```sql
   -- Allow authenticated users to upload images
   CREATE POLICY "Authenticated users can upload images"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'product-images');

   -- Allow everyone to view images
   CREATE POLICY "Anyone can view images"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'product-images');
   ```

### 5. Get Your Supabase Credentials

1. Go to **Settings** > **API**
2. Copy the following:
   - **Project URL**
   - **Anon public key**
3. Add these to your `.env` file

## 💳 Paystack Setup

### 1. Create a Paystack Account

1. Go to [paystack.com](https://paystack.com)
2. Sign up for an account
3. Complete the verification process

### 2. Get API Keys

1. In your Paystack dashboard, go to **Settings** > **API Keys & Webhooks**
2. Copy your **Public Key** and **Secret Key**
3. Add the public key to your `.env` file

### 3. Configure Webhooks (Optional)

1. In Paystack dashboard, go to **Settings** > **API Keys & Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/webhooks/paystack`
3. Select events: `charge.success`, `charge.failed`

## 🔧 Environment Configuration

Create a `.env` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your-public-key

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=Shopzero
```

## 🚀 Running the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Admin panel: `http://localhost:5173/admin` (password: `Dara2002`)

## 👤 Initial Setup

### 1. Admin Configuration

1. Go to `/admin` and login with password `Dara2002`
2. Navigate to **Settings**
3. Update:
   - Site information
   - Contact details
   - Paystack keys
   - Change admin password

### 2. Create Test Data

1. **Create a vendor account:**
   - Go to `/sell-on-shopzero`
   - Fill out the vendor application
   - Approve the vendor in admin panel

2. **Add test products:**
   - Login as vendor
   - Add products with images
   - Set some as featured or flash sale

3. **Test customer flow:**
   - Create customer account
   - Browse products
   - Add to cart and checkout

## 📸 Image Management

### Upload Product Images

1. **Via Vendor Dashboard:**
   - Vendors can upload up to 5 images per product
   - Images are automatically resized and optimized
   - Supported formats: JPG, PNG, WebP

2. **Image Storage:**
   - All images are stored in Supabase Storage
   - Public URLs are generated automatically
   - Images are served via CDN for fast loading

### Image Guidelines

- **Recommended size**: 800x800px minimum
- **Aspect ratio**: 1:1 (square) preferred
- **File size**: Under 2MB per image
- **Format**: JPG or PNG

## 🔥 Flash Sales Management

### Setting Up Flash Sales

1. **In Admin Panel:**
   - Go to **Flash Sales**
   - Create new flash sale campaigns
   - Set start and end dates
   - Configure discount percentages

2. **Product Configuration:**
   - Mark products as flash sale items
   - Set flash sale prices
   - Configure countdown timers

## 🛍️ Product Categories

### Default Categories

The system comes with these categories:
- Electronics
- Fashion
- Home & Garden
- Sports
- Books
- Health & Beauty
- Toys
- Automotive
- Food & Beverages

### Adding New Categories

Categories are currently managed as text fields. To add new categories:
1. Update the categories array in `CustomerHeader.tsx`
2. Add category pages if needed
3. Update search filters

## 📱 PWA Configuration

### App Icons

1. Generate icons using a tool like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
2. Place icons in the `public` folder:
   - `pwa-192x192.png`
   - `pwa-512x512.png`
   - `apple-touch-icon.png`
   - `favicon.ico`

### Manifest Configuration

The PWA manifest is configured in `vite.config.ts`. Update:
- App name and description
- Theme colors
- Icon paths
- Start URL

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configure environment variables:**
   - Add all `.env` variables in Vercel dashboard
   - Update `VITE_APP_URL` to your production URL

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Netlify Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the `dist` folder
   - Or connect your Git repository

3. **Configure environment variables:**
   - Add all variables in Netlify dashboard

### Custom Domain

1. **Add domain in hosting platform**
2. **Update Supabase settings:**
   - Add production URL to allowed origins
   - Update OAuth redirect URLs

3. **Update environment variables:**
   - Change `VITE_APP_URL` to your domain

## 🔧 Troubleshooting

### Common Issues

1. **Supabase connection errors:**
   - Check your environment variables
   - Verify project URL and API key
   - Check network connectivity

2. **Authentication issues:**
   - Verify OAuth provider configuration
   - Check redirect URLs
   - Ensure email confirmation is disabled

3. **Image upload failures:**
   - Check storage bucket permissions
   - Verify file size limits
   - Check supported file formats

4. **Payment integration issues:**
   - Verify Paystack API keys
   - Check webhook configuration
   - Test with Paystack test keys first

### Getting Help

1. **Check the console** for error messages
2. **Review Supabase logs** in the dashboard
3. **Test API endpoints** manually
4. **Check network requests** in browser dev tools

## 📊 Monitoring and Analytics

### Built-in Analytics

The admin dashboard includes:
- Sales overview
- Product performance
- Vendor statistics
- Order tracking

### External Analytics

Consider adding:
- Google Analytics
- Hotjar for user behavior
- Sentry for error tracking

## 🔄 Updates and Maintenance

### Regular Tasks

1. **Database maintenance:**
   - Monitor storage usage
   - Clean up old data
   - Optimize queries

2. **Security updates:**
   - Update dependencies regularly
   - Monitor Supabase security advisories
   - Review access policies

3. **Performance monitoring:**
   - Check page load times
   - Monitor API response times
   - Optimize images and assets

### Backup Strategy

1. **Database backups:**
   - Supabase provides automatic backups
   - Consider additional backup solutions for critical data

2. **Code backups:**
   - Use Git for version control
   - Regular commits and pushes
   - Tag releases for easy rollback

---

This setup guide should get you up and running with Shopzero. For additional help, refer to the main README.md or create an issue in the repository.