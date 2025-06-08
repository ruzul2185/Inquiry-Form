# 🚀 Project Setup Guide

This guide walks you through setting up the project, configuring Prisma ORM with Supabase, and running the development environment.

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

| Variable       | Description                                      |
| -------------- | ------------------------------------------------ |
| `PORT`         | Port on which the server will run (e.g. 3000)    |
| `DATABASE_URL` | Supabase PostgreSQL connection URL               |
| `DIRECT_URL`   | Direct URL for Prisma ORM to connect to Supabase |
| `CORS_ORIGIN`  | URL of your deployed frontend (for CORS policy)  |

## 🔧 Prisma Setup

#### 1. Initialize **Prisma**:

```bash
npx prisma init
```

#### 2. Update the output directory in `prisma/schema.prisma`:

Change this:

```prisma
output = "../src/generated/prisma"
```

To this:

```prisma
output = "../generated/prisma"
```

#### 3. Add `directUrl` to your `datasource` block in `prisma/schema.prisma`:

```prisma
datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
}
```

## 🧩 Supabase Table Creation

Run the following SQL query in the Supabase SQL Editor to create the `inquiries` table:

```PostgreSQL
CREATE TABLE public.inquiries (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone_number numeric NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL,
  email text,
  reference text NOT NULL,
  current_address text,
  permanent_address text,
  course_selection text,
  course_duration text,
  user_availability text,
  job_guarentee text,
  job_assistance text,
  job_location text,
  expected_package text,
  future_goal text,
  career_transition_reason text,
  recent_education text,
  passing_year bigint,
  cgpa bigint,
  CONSTRAINT inquiries_pkey PRIMARY KEY (id)
);
```

🛡️ **Note:** You may need to configure Row Level Security (RLS) policies to allow CRUD operations.

## 🔄 Syncronize Database Schema

#### 1. Pull the current database schema:

```bash
npx prisma db pull
```

If your database contains unnecessary tables, you can remove them from the `schema.prisma` file after the pull.

#### 2. Generate the Prisma Client:

```bash
npx prisma generate
```

✅ **Note:** This step is necessary as some imports are taken directly from the generated files.

## 🚀 Run the Project

Start the development server:

```bash
npm run dev
```

## 🧹 Other Useful Commands

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run clean` | Remove the `./dist` directory                 |
| `npm run build` | Transpile `.ts` files to CommonJS `.js` files |
| `npm run start` | Start the compiled Node.js project            |

## 📁 Project Structure

```bash
📁 root/
├── 📄 .env.example                # 🌱 Example environment variables
├── 📄 package.json               # 📦 Node.js dependencies and scripts
├── 📄 package-lock.json          # 🔒 Dependency lockfile
├── 📄 tsconfig.json              # 🛠️ TypeScript configuration
├── 📄 tsconfig.tsbuildinfo       # 🧱 TypeScript build info (auto-generated)
│
└── 📂 src/                       # 🔧 Source code directory
    └── 📂 client/
        └── prismaClient.ts      # 🔌 Prisma client instance
    │
    ├── 📂 controllers/           # 🎮 Request handlers for each route
    │   ├── appScriptController.ts    # Handles app script-related logic
    │   ├── dashboardController.ts    # Handles dashboard logic
    │   └── inquiryController.ts      # Handles inquiry-related logic
    │
    ├── 📂 middleware/            # 🧱 Custom middleware functions
    │   └── verifySupabaseToken.ts   # Verifies JWT token from Supabase
    │
    ├── 📂 routes/                # 🚏 API route definitions
    │   ├── appScriptRoutes.ts       # Routes for app script endpoints
    │   ├── dashboardRoutes.ts       # Routes for dashboard data
    │   └── inquiryRoutes.ts         # Routes for inquiries
    │
    ├── 📂 types/                 # 🧾 TypeScript custom types
    │   └── appScriptTypes.ts        # Types for app script data
    │
    ├── 📂 utils/                 # 🧠 Utility/helper functions
    │   └── inquiryUtils.ts          # Helper functions for inquiries
    │
    └── 📄 index.ts
```
