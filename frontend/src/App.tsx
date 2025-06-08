import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

import AuthLayout from './layouts/AuthLayout'
import RootLayout from './layouts/RootLayout'

import RouteProtection from './auth/RouteProtection'
import RedirectIfAuthenticated from './auth/RedirectIfAuthenticated'

import { Toaster } from "@/components/ui/sonner"
import ListInquiryPage from './pages/ListInquiryPage'

const App = () => {
  
  return (
    <BrowserRouter>
      {/* Place Toaster here, inside BrowserRouter */}
      <Toaster position="top-right" />

      <Routes>
        {/* AuthLayout wraps "/" and "/login" */}
        <Route element={<RedirectIfAuthenticated><AuthLayout /></RedirectIfAuthenticated>}>
          <Route path="/" element={
              <LoginPage />
          } />
        </Route>

        {/* RootLayout wraps protected dashboard route */}
        <Route element={<RouteProtection><RootLayout /></RouteProtection>}>
          <Route
            path="/dashboard"
            element={
                <DashboardPage />
            }
          />
          <Route
            path="/inquiry"
            element={
                <ListInquiryPage />
            }
          />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
