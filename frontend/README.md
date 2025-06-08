# 🚀 Project Setup Guide

This guide walks you through setting up the project and running the development environment.

---

## 📦 Installation

First, install all required dependencies and devDependencies:

```bash
npm install
```

## ⚙️ Environment Configuration

Create your `.env` file using the example provided:

```bash
cp ./.env.example ./.env
```

Then, configure the following environment variables in the `.env` file:

| Variable                  | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `VITE_SUPABASE_URL`       | URL of your Supabase project                            |
| `VITE_SUPABASE_ANON_KEY`  | Public anonymous API key for Supabase authentication    |
| `VITE_INQUIRY_ENDPOINT`   | Endpoint path or URL for handling inquiries             |
| `VITE_DASHBOARD_ENDPOINT` | Endpoint path or URL for dashboard-related API requests |

## 📁 Project Structure

```bash
root/
├── public/                             # Static files like icons, images, or robots.txt
│
├── src/                                # Source code for the application
│   ├── assets/                         # Project assets like images, fonts, etc.
│
│   ├── auth/                           # Authentication utilities
│   │   ├── RedirectIfAuthenticated.tsx # Redirects authenticated users away from auth pages
│   │   ├── RouteProtection.tsx         # Protects routes from unauthenticated access
│   │   └── supabaseClient.tsx          # Initializes and configures Supabase client
│
│   ├── components/                     # Reusable UI and custom components
│   │   ├── custom/                     # App-specific custom components
│   │   │   ├── AddInquiryDialog.tsx    # Dialog to add new inquiries
│   │   │   ├── DeleteInquiryDialog.tsx # Dialog to confirm inquiry deletion
│   │   │   ├── Header.tsx              # App header/navigation
│   │   │   ├── InquiryActions.tsx      # Action buttons for each inquiry row
│   │   │   ├── InquiryPagination.tsx   # Pagination component for inquiry list
│   │   │   ├── InquiryTable.tsx        # Renders the inquiry data table
│   │   │   ├── UpdateInquiryDialog.tsx # Dialog for updating inquiry details
│   │   │   └── ViewInquiryDialog.tsx   # Dialog to view inquiry details
│   │   │
│   │   └── ui/                         # Shared UI primitives (from shadcn/ui)
│   │       ├── button.tsx              # Styled button component
│   │       ├── card.tsx                # Card layout component
│   │       ├── chart.tsx               # Chart wrapper or setup
│   │       ├── dialog.tsx              # Modal dialog component
│   │       ├── drawer.tsx              # Drawer/side panel component
│   │       ├── input.tsx               # Styled input field
│   │       ├── label.tsx               # Label component
│   │       ├── navigation-menu.tsx     # Navigation menu component
│   │       ├── pagination.tsx          # Pagination controls
│   │       ├── select.tsx              # Dropdown/select field
│   │       ├── skeleton.tsx            # Loading skeletons for placeholders
│   │       ├── sonner.tsx              # Toaster/notification integration
│   │       ├── table.tsx               # Table wrapper/layout
│   │       └── textarea.tsx            # Styled textarea
│
│   ├── layout/                         # Layout components for routes
│   │   ├── AuthLayout.tsx              # Layout for authentication pages
│   │   └── RootLayout.tsx              # Main layout for authenticated routes
│
│   ├── lib/                            # Utilities, helpers, and shared logic
│   │   └── utils.ts                    # Common utility functions
│
│   ├── pages/                          # Top-level pages (routed views)
│   │   ├── DashboardPage.tsx           # Dashboard screen
│   │   ├── ListInquiryPage.tsx         # Page displaying a list of inquiries
│   │   └── LoginPage.tsx               # Login screen
│
│   ├── types/                          # TypeScript type definitions
│   │   └── InquiryTypes.tsx            # Types related to inquiries
│
│   ├── App.tsx                         # Main app component with routing
│   ├── index.css                       # Global styles
│   ├── main.tsx                        # Entry point - renders App to the DOM
│   └── vite-env.d.ts                   # Vite's type declarations
│
├── .env.example                        # Example environment config
├── components.json                     # Possibly shadcn/ui component registry
├── eslint.config.js                    # ESLint configuration for code quality
├── index.html                          # HTML entry point for Vite
├── package-lock.json                   # Lockfile for exact dependency versions
├── package.json                        # Project metadata and dependencies
├── tsconfig.app.json                   # TypeScript config specific to app
├── tsconfig.json                       # Main TypeScript configuration
├── tsconfig.node.json                  # TypeScript config for Node.js environment
└── vite.config.ts                      # Vite build configuration
```
