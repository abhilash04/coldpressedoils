import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from "react-router-dom";
import { Box, Typography, Container, Divider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./componants/common/Layout";

// Storefront Imports
import HomePage from "./componants/pages/HomePage/index";
import ShopPage from "./componants/pages/Shop/index";
import CategoryPage from "./componants/pages/CategoryPage/index";
import ProductDetail from "./componants/pages/ProductDetail/index";
import AboutPage from "./componants/pages/About/index";
import ProcessPage from "./componants/pages/Process/index";
import BlogPage from "./componants/pages/Blog/index";
import BlogPost from "./componants/pages/Blog/BlogDetail";
import CartPage from "./componants/pages/Cart/index";
import CheckoutPage from "./componants/pages/Checkout/index";
import OrderSuccess from "./componants/pages/OrderSuccess";
import LoginPage from "./componants/pages/LoginPage";
import AccountPage from "./componants/pages/Account/index";
import ProfileOverview from "./componants/pages/Account/ProfileOverview";
import OrderHistory from "./componants/pages/Account/OrderHistory";
import Wishlist from "./componants/pages/Account/Wishlist";
import AddressBook from "./componants/pages/Account/AddressBook";
import ContactPage from "./componants/pages/Contact/index";
import FAQPage from "./componants/pages/FAQ/index";

// Dashboard Core
import DashHome from "./dashboard/pages/DashBoard";
import DashLogin from "./Authentication/Login";

// Inventory
import DashProductList from "./dashboard/pages/inventory/ProductList";
import DashAddProduct from "./dashboard/pages/inventory/AddProduct";
import DashCategoryList from "./dashboard/pages/inventory/CategoryList";

// Leads
import DashLeadsList from "./dashboard/pages/leadManager/LeadsList";

// Employees
import DashUserList from "./dashboard/pages/employeeManager/UserList";
import DashAddUser from "./dashboard/pages/employeeManager/AddUser";

// Blogs
import DashBlogList from "./dashboard/pages/blog/BlogList";
import DashAddBlog from "./dashboard/pages/blog/AddBlog";
import DashBlogApproval from "./dashboard/pages/blog/BlogApprovalList";

// SEO
import DashAddSite from "./dashboard/pages/seoManager/AddSite";

import { useCookies } from "react-cookie";
import { config } from "./config/config";
import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./componants/common/ProtectedRoute";

const AnimatedWrapper = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
    {children}
  </motion.div>
);

const PublicRoute = ({ children }) => {
  const { user } = useUser();

  if (user) {
    const userRoles = user.roles || [];
    const isStaff = userRoles.some(role => ["Admin", "Super Admin", "Team Leader"].includes(role));
    return <Navigate to={isStaff ? "/dashboard" : "/"} replace />;
  }

  return children;
};

const LeadWrapper = () => {
    const { status } = useParams();
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    return <DashLeadsList statusFilter={formattedStatus} />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Storefront */}
        <Route path="/" element={<AnimatedWrapper><HomePage /></AnimatedWrapper>} />
        <Route path="/shop" element={<AnimatedWrapper><ShopPage /></AnimatedWrapper>} />
        <Route path="/shop/:category" element={<AnimatedWrapper><CategoryPage /></AnimatedWrapper>} />
        <Route path="/product/:slug" element={<AnimatedWrapper><ProductDetail /></AnimatedWrapper>} />
        <Route path="/about" element={<AnimatedWrapper><AboutPage /></AnimatedWrapper>} />
        <Route path="/our-process" element={<AnimatedWrapper><ProcessPage /></AnimatedWrapper>} />
        <Route path="/blog" element={<AnimatedWrapper><BlogPage /></AnimatedWrapper>} />
        <Route path="/blog/:slug" element={<AnimatedWrapper><BlogPost /></AnimatedWrapper>} />
        <Route path="/cart" element={<AnimatedWrapper><CartPage /></AnimatedWrapper>} />
        <Route path="/checkout" element={<AnimatedWrapper><CheckoutPage /></AnimatedWrapper>} />
        <Route path="/order-success" element={<AnimatedWrapper><OrderSuccess /></AnimatedWrapper>} />
        <Route path="/login" element={<AnimatedWrapper><LoginPage /></AnimatedWrapper>} />
        <Route path="/account" element={<ProtectedRoute><AnimatedWrapper><AccountPage /></AnimatedWrapper></ProtectedRoute>}>
          <Route index element={<ProfileOverview />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="address" element={<AddressBook />} />
        </Route>
        <Route path="/contact" element={<AnimatedWrapper><ContactPage /></AnimatedWrapper>} />
        <Route path="/faq" element={<AnimatedWrapper><FAQPage /></AnimatedWrapper>} />

        {/* Dashboard Ecosystem */}
        <Route path="/dashboard/login" element={<PublicRoute><DashLogin /></PublicRoute>} />
        
        <Route path="/dashboard" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashHome /></ProtectedRoute>} />
        
        {/* Inventory Management */}
        <Route path="/inventory-manager/product-list" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashProductList /></ProtectedRoute>} />
        <Route path="/inventory-manager/add-new-product" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashAddProduct /></ProtectedRoute>} />
        <Route path="/inventory-manager/categories" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashCategoryList /></ProtectedRoute>} />
        
        {/* Lead Management */}
        <Route path="/lead-manager/:status" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><LeadWrapper /></ProtectedRoute>} />
        
        {/* Staff Management */}
        <Route path="/employee-manager/users" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashUserList /></ProtectedRoute>} />
        <Route path="/employee-manager/add-user" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashAddUser /></ProtectedRoute>} />
        
        {/* Content Management */}
        <Route path="/blog-manager/blog-list" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashBlogList /></ProtectedRoute>} />
        <Route path="/blog-manager/add-blog" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashAddBlog /></ProtectedRoute>} />
        
        {/* Editor's Queue */}
        <Route path="/blog-approval/blog-approve-list" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashBlogApproval isApprovedView={false} /></ProtectedRoute>} />
        <Route path="/blog-approval/approved-blog-list" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashBlogApproval isApprovedView={true} /></ProtectedRoute>} />
        
        {/* Marketing/SEO */}
        <Route path="/seo-manager/add-sites" element={<ProtectedRoute adminOnly={true} redirectTo="/dashboard/login"><DashAddSite /></ProtectedRoute>} />

        <Route path="*" element={<AnimatedWrapper><Box sx={{ py: 15, textAlign: 'center' }}><Typography variant="h2">404</Typography><Typography>Page Not Found</Typography></Box></AnimatedWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || 
                      location.pathname.includes('-manager') ||
                      location.pathname.includes('-approval');

  return (
    <>
      {isDashboard ? (
        <AnimatedRoutes />
      ) : (
        <Layout>
          <AnimatedRoutes />
        </Layout>
      )}
    </>
  );
}

export default App;
