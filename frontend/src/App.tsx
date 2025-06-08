// Core React Router imports
import { BrowserRouter, Routes, Route } from "react-router";

// Page components
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ListInquiryPage from "./pages/ListInquiryPage";

// Layout components
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";

// Auth components
import RouteProtection from "./auth/RouteProtection";
import RedirectIfAuthenticated from "./auth/RedirectIfAuthenticated";

// UI components
import { Toaster } from "@/components/ui/sonner";

// Root Application Component
// Handles routing and layout structure of the application

const App = () => {
  return (
    <BrowserRouter>
      {/* Global toast notifications */}
      <Toaster position="top-right" />

      <Routes>
        {/* Public routes - Wrapped in AuthLayout and redirect if user is already authenticated */}
        <Route
          element={
            <RedirectIfAuthenticated>
              <AuthLayout />
            </RedirectIfAuthenticated>
          }
        >
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* Protected routes - Wrapped in RootLayout and require authentication */}
        <Route
          element={
            <RouteProtection>
              <RootLayout />
            </RouteProtection>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inquiry" element={<ListInquiryPage />} />
        </Route>

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
