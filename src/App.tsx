import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import { registerSW } from 'virtual:pwa-register';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import VendorLayout from './layouts/VendorLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import ProductsPage from './pages/customer/ProductsPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import CategoryPage from './pages/customer/CategoryPage';
import BrandPage from './pages/customer/BrandPage';
import SearchPage from './pages/customer/SearchPage';
import WishlistPage from './pages/customer/WishlistPage';
import ComparePage from './pages/customer/ComparePage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import ProfilePage from './pages/customer/ProfilePage';
import OrdersPage from './pages/customer/OrdersPage';
import OrderDetailPage from './pages/customer/OrderDetailPage';
import SettingsPage from './pages/customer/SettingsPage';
import FlashSalesPage from './pages/customer/FlashSalesPage';
import DealsPage from './pages/customer/DealsPage';
import ContactPage from './pages/static/ContactPage';
import TrackOrderPage from './pages/customer/TrackOrderPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Vendor Pages
import SellOnShopzeroPage from './pages/vendor/SellOnShopzeroPage';
import VendorLoginPage from './pages/vendor/VendorLoginPage';
import VendorDashboardPage from './pages/vendor/VendorDashboardPage';
import VendorProductsPage from './pages/vendor/VendorProductsPage';
import NewProductPage from './pages/vendor/NewProductPage';
import EditProductPage from './pages/vendor/EditProductPage';
import VendorOrdersPage from './pages/vendor/VendorOrdersPage';
import VendorEarningsPage from './pages/vendor/VendorEarningsPage';
import VendorSettingsPage from './pages/vendor/VendorSettingsPage';
import VendorMessagesPage from './pages/vendor/VendorMessagesPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminVendorsPage from './pages/admin/AdminVendorsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminFlashSalesPage from './pages/admin/AdminFlashSalesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Static Pages
import AboutPage from './pages/static/AboutPage';
import TermsPage from './pages/static/TermsPage';
import PrivacyPage from './pages/static/PrivacyPage';
import FAQPage from './pages/static/FAQPage';
import NewsletterPage from './pages/static/NewsletterPage';
import AppDownloadPage from './pages/static/AppDownloadPage';

// Protected Route Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import VendorProtectedRoute from './components/auth/VendorProtectedRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
    
    // Register service worker for PWA
    const updateSW = registerSW({
      onNeedRefresh() {
        console.log('New content available, please refresh!');
      },
      onOfflineReady() {
        console.log('App ready to work offline');
      },
    });
  }, [initialize]);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="brand/:slug" element={<BrandPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="flash-sales" element={<FlashSalesPage />} />
          <Route path="deals-of-the-day" element={<DealsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="track-order" element={<TrackOrderPage />} />
          
          {/* Protected Customer Routes */}
          <Route path="wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } />
          <Route path="compare" element={
            <ProtectedRoute>
              <ComparePage />
            </ProtectedRoute>
          } />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="orders" element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route path="order/:id" element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          } />
          <Route path="settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Vendor Routes */}
        <Route path="/sell-on-shopzero" element={<SellOnShopzeroPage />} />
        <Route path="/vendor-login" element={<VendorLoginPage />} />
        <Route path="/vendor-dashboard" element={<VendorLayout />}>
          <Route index element={
            <VendorProtectedRoute>
              <VendorDashboardPage />
            </VendorProtectedRoute>
          } />
          <Route path="products" element={
            <VendorProtectedRoute>
              <VendorProductsPage />
            </VendorProtectedRoute>
          } />
          <Route path="products/new" element={
            <VendorProtectedRoute>
              <NewProductPage />
            </VendorProtectedRoute>
          } />
          <Route path="products/:id/edit" element={
            <VendorProtectedRoute>
              <EditProductPage />
            </VendorProtectedRoute>
          } />
          <Route path="orders" element={
            <VendorProtectedRoute>
              <VendorOrdersPage />
            </VendorProtectedRoute>
          } />
          <Route path="earnings" element={
            <VendorProtectedRoute>
              <VendorEarningsPage />
            </VendorProtectedRoute>
          } />
          <Route path="settings" element={
            <VendorProtectedRoute>
              <VendorSettingsPage />
            </VendorProtectedRoute>
          } />
          <Route path="messages" element={
            <VendorProtectedRoute>
              <VendorMessagesPage />
            </VendorProtectedRoute>
          } />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } />
          <Route path="products" element={
            <AdminProtectedRoute>
              <AdminProductsPage />
            </AdminProtectedRoute>
          } />
          <Route path="vendors" element={
            <AdminProtectedRoute>
              <AdminVendorsPage />
            </AdminProtectedRoute>
          } />
          <Route path="orders" element={
            <AdminProtectedRoute>
              <AdminOrdersPage />
            </AdminProtectedRoute>
          } />
          <Route path="users" element={
            <AdminProtectedRoute>
              <AdminUsersPage />
            </AdminProtectedRoute>
          } />
          <Route path="flash-sales" element={
            <AdminProtectedRoute>
              <AdminFlashSalesPage />
            </AdminProtectedRoute>
          } />
          <Route path="settings" element={
            <AdminProtectedRoute>
              <AdminSettingsPage />
            </AdminProtectedRoute>
          } />
        </Route>

        {/* Static Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/app-download" element={<AppDownloadPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;