<div align="center">

# 🎓 Eduna — Enterprise Education & Learning Management System (LMS)

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![NextAuth.js](https://img.shields.io/badge/Auth-NextAuth.js_v4-purple?style=for-the-badge&logo=nextdotjs)](https://next-auth.js.org/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2340?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)

<p align="center">
  A state-of-the-art, full-stack Learning Management System built for modern educators, academies, and students. Featuring a responsive marketplace, interactive video classrooms with lesson tracking, virtual live session schedules, and an administrative curriculum and coupon suite.
</p>

[Explore Features](#-key-features) • [Platform Screenshots](#-platform-walkthrough--screenshots) • [Architecture](#-system-architecture) • [Getting Started](#-getting-started) • [Default Credentials](#-demo-accounts)

</div>

---

## 🌟 Key Features

### 👨‍🎓 1. Public Learning Marketplace
- **Dynamic Course Catalog**: Browse courses with category filtering (Web Dev, Data Science, UI/UX, Cloud, Cyber Security, Mobile) and live keyword search.
- **Rich Course Pages**: Curriculum preview, free preview lessons, instructor details, duration, skill level, and pricing.
- **E-Commerce & Payments**: Shopping cart system integrated with Razorpay checkout and coupon discounts.

### 💻 2. Student Learning Portal (`/dashboard`)
- **Student Command Center**: Real-time stats on enrolled programs, completed courses, active certificates, and scheduled live lectures.
- **My Courses Hub**: Progress tracking with percentage bars and dynamic "Start Study" / "Resume Study" / "Review Syllabus" state handlers.
- **Interactive Video Classroom (`/dashboard/my-courses/[id]`)**: Custom video lecture player with playback speed controls (0.75x–2x), full-screen toggle, expandable chapters syllabus sidebar, and one-click lesson completion toggles.
- **Virtual Live Classrooms**: Live video classes with Google Meet integrations and countdown schedules.
- **Purchase History**: Order invoices, date stamps, and transaction receipts.

### 🛡️ 3. Admin Command Center (`/admin`)
- **Real-Time Platform Analytics**: Total student headcounts, course catalog metrics, scheduled live streams, and active promotional coupons.
- **Course Catalog Manager**: Full CRUD for courses with level, category, price, duration, and instant one-click publish/unpublish toggles.
- **Curriculum & Syllabus Builder**: Drag-and-drop chapter and lesson hierarchy management, free preview lesson gating, notes/resources attachment, and video URL linking.
- **Live Class Scheduler**: Link interactive live broadcasts to specific courses with duration and meeting room URLs.
- **Coupon & Discount Engine**: Percentage discounts, usage quotas, expiration dates, and real-time redemption counters.
- **Student & User Directory**: Searchable list of registered students and administrative accounts with contact information.

---

## 📸 Platform Walkthrough & Screenshots

### 1. Modern Landing Page
> Responsive hero layout with search, category discovery, featured programs, and dynamic navigation.
<p align="center">
  <img src="docs/assets/screenshot-landing.png" alt="Eduna Landing Page" width="100%" />
</p>

---

### 2. Course Catalog & Discovery
> Live keyword search, category filtering, skill level indicators (Beginner, Intermediate, Advanced), and instant cart enrollment.
<p align="center">
  <img src="docs/assets/screenshot-courses.png" alt="Eduna Course Catalog" width="100%" />
</p>

---

### 3. Student Command Center (`/dashboard`)
> Real-time metric cards, progress tracking, quick navigation, and active enrolled courses.
<p align="center">
  <img src="docs/assets/screenshot-student-dashboard.png" alt="Student Dashboard" width="100%" />
</p>

---

### 4. Interactive Video Classroom & Syllabus Player
> In-depth learning interface featuring custom video player controls, speed adjustments, expandable chapters, and real-time progress checkmarks.
<p align="center">
  <img src="docs/assets/screenshot-student-classroom.png" alt="Student Classroom Player" width="100%" />
</p>

---

### 5. Student Enrolled Programs (`/dashboard/my-courses`)
> Course catalog view showing real-time syllabus completion percentages.
<p align="center">
  <img src="docs/assets/screenshot-student-my-courses.png" alt="Student Enrolled Courses" width="100%" />
</p>

---

### 6. Admin Command Center (`/admin`)
> Comprehensive overview displaying total platform students, courses, live sessions, coupons, and registered user tables.
<p align="center">
  <img src="docs/assets/screenshot-admin-dashboard.png" alt="Admin Dashboard" width="100%" />
</p>

---

### 7. Course Catalog Management (`/admin/courses`)
> Administration table with publishing toggles, price controls, edit drawers, and direct access to curriculum builders.
<p align="center">
  <img src="docs/assets/screenshot-admin-courses.png" alt="Admin Course Management" width="100%" />
</p>

---

### 8. Interactive Curriculum & Syllabus Builder
> Granular chapter and lesson creation with preview tags, sort ordering, and video resource links.
<p align="center">
  <img src="docs/assets/screenshot-admin-curriculum.png" alt="Curriculum Builder" width="100%" />
</p>

---

### 9. Live Session Scheduler (`/admin/live-classes`)
> Broadcast scheduler with course association, duration limits, and Google Meet integration.
<p align="center">
  <img src="docs/assets/screenshot-admin-live-classes.png" alt="Live Class Scheduler" width="100%" />
</p>

---

### 10. Promotional Coupons & Discount Management (`/admin/coupons`)
> Coupon management suite tracking usage limits, redemption counts, and discount percentages.
<p align="center">
  <img src="docs/assets/screenshot-admin-coupons.png" alt="Coupon Management" width="100%" />
</p>

---

## 🏗️ System Architecture

```
education-managment/
├── prisma/
│   ├── schema.prisma              # Database schema (User, Course, Chapter, Lesson, LiveClass, Coupon)
│   ├── seed.js                    # Core user and credentials seeder
│   └── seed-demo-data.js          # Realistic demo catalog & enrollment seeder
├── public/
│   └── assets/                    # Optimized stylesheets, images, icons, and fonts
├── docs/
│   └── assets/                    # Platform screenshots and documentation media
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/             # Role-aware authentication page
│   │   │   └── register/          # Student registration portal
│   │   ├── admin/                 # Admin Command Center routes
│   │   │   ├── courses/           # Course management & curriculum builder
│   │   │   ├── live-classes/      # Live session broadcasting scheduler
│   │   │   ├── students/          # Student directory & management
│   │   │   ├── coupons/           # Promotional discounts suite
│   │   │   └── settings/          # System configuration
│   │   ├── dashboard/             # Student Learning Portal routes
│   │   │   ├── my-courses/        # Enrolled courses & [id] classroom player
│   │   │   ├── live-classes/      # Scheduled live sessions with Meet links
│   │   │   ├── purchase-history/  # Transaction receipts
│   │   │   └── profile/           # Student profile settings
│   │   ├── api/                   # RESTful API endpoints
│   │   │   ├── admin/             # Protected admin API routes
│   │   │   ├── student/           # Protected student progress & courses API
│   │   │   ├── auth/              # NextAuth route handlers & register
│   │   │   └── courses/           # Public catalog queries
│   │   ├── courses/               # Public course marketplace
│   │   ├── course-details/        # Single course syllabus & enrollment
│   │   ├── cart/                  # Shopping cart
│   │   └── checkout/              # Razorpay checkout & coupon validation
│   ├── components/                # Reusable UI widgets & Video Player
│   ├── context/                   # AuthContext, CartContext, UIContext
│   ├── lib/                       # Prisma client singleton & auth helpers
│   └── middleware.js              # NextAuth JWT route protection & RBAC
├── docker-compose.yml             # PostgreSQL 15 & Next.js production stack
├── Dockerfile                     # Multi-stage production container
└── package.json
```

---

## 🛠️ Tech Stack & Libraries

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (Turbopack, App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Database** | [PostgreSQL 15+](https://www.postgresql.org/) |
| **ORM** | [Prisma ORM 7.8 with @prisma/adapter-pg](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js v4](https://next-auth.js.org/) (JWT + Role Guards) |
| **Payments** | [Razorpay SDK](https://razorpay.com/) |
| **Password Hashing** | [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| **Carousels & Sliders** | [Swiper 14](https://swiperjs.com/) |
| **Containerization** | [Docker & Docker Compose](https://www.docker.com/) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.18.0 or later
- **PostgreSQL**: v14+ (Local instance or via Docker)
- **npm** or **pnpm** / **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/virajsavaliya/education-managment.git
cd education-managment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Database Connection URL (PostgreSQL)
DATABASE_URL="postgresql://eduna:edunapassword@localhost:5432/edunadb?schema=public"

# NextAuth & JWT Secrets
JWT_SECRET="eduna_secret_jwt_sign_key_change_me_in_production_12345"
NEXTAUTH_SECRET="eduna_secret_jwt_sign_key_change_me_in_production_12345"
NEXTAUTH_URL="http://localhost:3000"

# Razorpay Payment Gateway (Optional for testing)
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_key_secret"
```

### 4. Setup Database & Seed Data
Push the Prisma schema to your PostgreSQL database and populate it with rich sample courses, syllabus lessons, live classes, and enrollments:
```bash
# Push schema migrations
npm run prisma:push

# Seed users, courses, chapters, live classes & coupons
npm run prisma:seed:demo
```

### 5. Run Local Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to experience the platform.

---

## 🐳 Docker Deployment

You can run the entire platform including the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```
The containerized setup automatically:
1. Spawns an isolated PostgreSQL 15 database (`eduna-db`).
2. Runs Prisma database migrations and seeds initial demo data.
3. Builds and serves the Next.js production server on `http://localhost:3000`.

---

## 🔑 Demo Accounts

Use the pre-seeded demo credentials to test and explore both role portals locally:

| Role | Demo Email | Password | Access Level |
|---|---|---|---|
| **Administrator** | `admin@eduna.com` | `admin123` | Full access to `/admin` command center, course builder, live class scheduling, promo coupons & user directories |
| **Student** | `student@eduna.com` | `student123` | Enrolled in courses with active progress tracking, interactive video classroom, and virtual sessions |

> [!NOTE]
> Demo accounts are generated via `npm run prisma:seed:demo`. Ensure you configure your own administrator accounts and rotate secrets before deploying to a production environment.

---

## 🛡️ License & Copyright

**Copyright © 2026 Viraj Savaliya. All Rights Reserved.**

This project, including its source code, assets, database architecture, design system, and documentation, is proprietary software owned exclusively by **Viraj Savaliya**. 

Unauthorized copying, commercial redistribution, sublicensing, reverse engineering, or claiming ownership of this repository or any portion thereof is strictly prohibited without prior written authorization.

For licensing inquiries, commercial permissions, or partnership requests, please contact:
- **Author & Copyright Holder**: Viraj Savaliya
- **Email**: [enquiry.virajsavaliya@gmail.com](mailto:enquiry.virajsavaliya@gmail.com)

See the full [LICENSE](LICENSE) file for complete terms and restrictions.
