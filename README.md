# 🏨 AuraLuxe - Next.js Luxury Hotel Reservation & Management System

> **Enterprise-grade, micro-architected hospitality platform built with Next.js 14 App Router, pure JavaScript (`.js`), JSX (`.jsx`), Tailwind CSS, Supabase PostgreSQL, and Razorpay.**

---

## 🎯 Project Objective & Aim

### 1. Vision & Mission
Modern hospitality platforms often suffer from fragmented hotel inventory, clunky user interfaces, currency mismatch errors, and lack of real-time multi-property governance. **AuraLuxe** was engineered to deliver a seamless, high-conversion guest reservation experience alongside a secure, dual-tier administrative operations infrastructure.

### 2. Core Objectives
- **Zero Double-Booking Concurrency**: Guarantee room inventory integrity across overlapping dates using mathematical database constraints and real-time availability checks.
- **Dynamic Multi-Currency Financials**: Support seamless domestic and international transactions (INR, USD, EUR, GBP) via Razorpay with automated forex conversions and cryptographic signature verification.
- **Universal Inventory Coverage**: Provide comprehensive hotel discovery across both global luxury sanctuaries and budget-friendly regional stays (e.g., ₹500–₹1,500/night availability across West Bengal).
- **Hidden Dual-Tier Operations Infrastructure**: Enable individual hotel managers to control front-desk check-ins, room inventory, and dynamic rates while empowering platform executive administrators with global multi-property oversight and reporting.
- **Instant Client Hydration & Resilience**: Employ local IndexedDB offline caching and device-bound HttpOnly JWT sessions for 0ms page hydration and instantaneous voucher retrieval.

---

## ✨ Comprehensive Feature Matrix

### 1. Guest Experience & Public Discovery
- **Hero & Interactive Search Bar**: Multi-parameter search supporting destination city, check-in/check-out dates, guest count (adults & children), and required room quantity.
- **Google-Style Recent Search Memory**: Remembers and displays the user's latest 2 searches on top of recommendations for instant re-queries.
- **Curated World Destinations**: Shuffled, high-impact cards with realistic starting prices in local currencies ($ for international destinations, ₹ for India).
- **Universal Hotel Directory (`/hotels`)**: Multi-filter hotel discovery with live category switching (*Skyline & Urban Luxury, Beachfront, Heritage & Royal Palaces, Mountain Lodges*).
- **Gap-Free 5-Photo Responsive Gallery (`/hotels/[slug]`)**: 1 large spotlight photo alongside 4 thumbnail suites with modern view-all overlay.
- **Interactive Room Selection (`RoomCard`)**: Direct room-level pricing, guest capacity chips, remaining suite countdowns, and instant wishlist & Web Share API support.

### 2. Concurrency Control & Real-Time Availability
- **Date-Overlap Conflict Engine**: Strict temporal overlap calculation `(existing.check_in < requested.check_out) AND (existing.check_out > requested.check_in)` preventing overbooking.
- **Live Inventory Synchronizer (`/api/v1/bookings/availability-summary`)**: Aggregates live occupancy so cards show accurate remaining room inventory in real time.
- **Room Overrides Binding**: Dynamic rate overrides set by hotel managers automatically update public listings, hotel detail widgets, and checkout calculations.

### 3. Secure Multi-Currency Checkout (`/checkout`)
- **Multi-Currency Razorpay Gateway**: Automatic currency detection, live forex rate adaptation, and backend cryptographic signature verification (`verifyRazorpaySignature`).
- **Pay at Hotel Desk Alternative**: Flexible payment option allowing guests to secure reservations online and settle charges upon arrival.
- **Instant Digital Voucher**: Official voucher generation with unique booking reference (e.g., `AUR-849201`), printable summary, and IndexedDB caching.

### 4. Hidden Dual-Tier Management Portal (`/management`)
Access route: `/management` (unlinked from standard user navigation for administrative confidentiality).

```
                            /management (Hub)
                                   |
                +------------------+------------------+
                |                                     |
        Tier 1: Hotel Partner                Tier 2: Super Admin
        /management/hotel/login              /management/admin/login
        /management/hotel/dashboard          /management/admin/dashboard
```

#### A. Hotel Partner Portal
- **Property Selection & Authentication**: Hotel managers search their specific hotel and authenticate with property administrative passwords.
- **Front Desk Dashboard**: Real-time KPI metrics (today's arrivals, departures, revenue, occupancy rate).
- **Reservation Management**: Mark payments as received/verified, complete guest stays, or process cancellations.
- **Dynamic Rates & Room Overrides**: Live editing of room nightly prices, total room inventory, and guest capacity directly reflected across the public website.
- **CSV Data Export**: One-click download of hotel reservations formatted with check-in, check-out, and payment references.

#### B. Super Admin Command Center
- **Executive Platform Analytics**: Platform-wide gross revenue segmented by currency, global booking volume, active client count, and top-performing hotel properties.
- **All-Bookings Explorer**: Comprehensive multi-filter explorer with filtering by hotel, booking status, payment method, and custom date ranges.
- **Comprehensive CSV Export**: Complete multi-column data export including booking reference, hotel, city, guest details, check-in, check-out, nights, room count, total, payment method, and **Razorpay Payment ID**.
- **Hotels & Access Governance**: Master access control to override individual hotel passwords and toggle property accounts between Active and Suspended.
- **VIP Concierge & Inquiries Hub**: Centralized resolver for contact form submissions and special dietary/transfer requests.

### 5. Interaction Safety & Visual Feedback
- **Screen-Level Processing Loaders**: Full-screen branded loading overlays on Sign Out, Hotel Suite Reservation, and Payment Verification preventing duplicate clicks.
- **Action Confirmation Dialogs**: Interactive confirmation modals for critical actions (*Mark Paid, Complete Stay, Cancel Booking*) preventing accidental status modifications.
- **Rotating Refresh States**: Animated spin feedback on "Refresh Data" and "Sync Global Data" buttons.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technologies Used |
|---|---|
| **Framework** | Next.js 14 (App Router), React 18 |
| **Language & Architecture** | Pure JavaScript (`.js` for logic) & JSX (`.jsx` for components). Domain-Driven Micro-Architecture under `src/features/` |
| **Styling & Icons** | Tailwind CSS with custom luxury tokens, `lucide-react` |
| **Database** | Supabase PostgreSQL with Row Level Security (RLS) & Connection Pooling |
| **Authentication** | `jose` (JWT signing and verification), HttpOnly Lax Secure Cookies, `crypto` timing-safe HMAC password hashing |
| **Payment Gateway** | Razorpay Node.js SDK & Checkout.js with cryptographic HMAC-SHA256 signature verification |
| **Client Storage** | IndexedDB via native promise wrapper (instant offline voucher hydration) & `localStorage` (wishlist cache) |
| **Deployment Target** | Vercel (Edge-optimized serverless route handlers) |

---

## 🏛️ Directory & Folder Structure

```
Hotel_Reservation_System/
├── public/
│   ├── icon.webp                       # Official AuraLuxe brand icon
│   └── favicon.ico
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── (auth)/                     # Member Authentication
│   │   │   ├── login/page.jsx          # VIP member login
│   │   │   └── register/page.jsx       # Member registration
│   │   ├── (dashboard)/                # Member Protected Area
│   │   │   └── user/page.jsx           # Guest profile, reservations & saved hotels
│   │   ├── (public)/                   # Public Pages
│   │   │   ├── hotels/page.jsx         # Universal hotel directory & live search
│   │   │   ├── hotels/[slug]/page.jsx  # Hotel showcase, room cards & widget
│   │   │   ├── checkout/page.jsx       # Razorpay multi-currency checkout & voucher
│   │   │   └── contact/page.jsx        # Concierge support & inquiry submission
│   │   ├── api/v1/                     # REST API Endpoints
│   │   │   ├── auth/                   # Client login, register, session, profile, logout
│   │   │   ├── bookings/               # Reservation creation & availability summary
│   │   │   ├── database/migrate/       # Automated DB schema migration runner
│   │   │   ├── inquiries/              # Contact inquiry submission & handling
│   │   │   ├── management/             # Operations APIs (Hotel & Super Admin)
│   │   │   │   ├── hotel/              # Hotel login, logout, dashboard, rooms, bookings
│   │   │   │   └── admin/              # Super admin login, overview, actions, logout
│   │   │   └── payments/               # Razorpay create-order & signature verification
│   │   ├── management/                 # Hidden Management Web Portals
│   │   │   ├── page.jsx                # Management Hub & Portal Selector
│   │   │   ├── hotel/                  # Hotel Partner login & dashboard
│   │   │   └── admin/                  # Super Admin Command Center login & dashboard
│   │   ├── layout.jsx                  # Root Layout & Auth Provider wrapper
│   │   ├── page.jsx                    # High-conversion luxury landing page
│   │   └── not-found.jsx               # Branded 404 handler
│   ├── components/                     # Shared UI & Layout
│   │   ├── layout/                     # Navbar, Footer, MobileNav
│   │   └── ui/                         # Base atoms (Button, Badge, Card, Input)
│   ├── config/                         # App configuration, routes, site metadata
│   ├── database/                       # Database schema & automated migrations
│   │   ├── migrator.js                 # PostgreSQL table runner & version tracker
│   │   └── tables/                     # Schemas (clients, bookings, hotel_admins, etc.)
│   ├── data/                           # Master hotel data records & cities
│   │   ├── destinations.data.js        # Curated global destination list
│   │   └── hotels/                     # Regional hotel inventories (Kolkata, Mumbai, etc.)
│   ├── features/                       # Domain-Driven Micro Architecture
│   │   ├── auth/                       # Context, modals & credentials management
│   │   ├── bookings/                   # Search bar, voucher modal, reservation widget
│   │   └── hotels/                     # Hotel card, room card, category tabs, filter grid
│   └── lib/                            # Shared utilities
│       ├── auth/                       # JWT signing, management sessions, machine ID
│       ├── razorpay.js                 # Razorpay API client & signature validation
│       ├── supabase/                   # Admin & client Supabase instances
│       └── utils.js                    # Formatting utilities (currency, dates, cn)
├── .env.example                        # Production & local environment template
├── .gitignore                          # Strict gitignore protecting keys and build files
├── next.config.mjs                     # Image domains & Next.js configuration
├── package.json                        # Scripts & dependencies
├── tailwind.config.js                  # Luxury design tokens & custom colors
└── vercel.json                         # Vercel deployment specification
```

---

## 🚀 Setup & Installation Guide

### 1. Prerequisites
- **Node.js**: v18.17.0 or higher (Node.js 20+ recommended)
- **Package Manager**: `npm` (v9+) or `pnpm`
- **Supabase Project**: Free tier or paid project with PostgreSQL database
- **Razorpay Account**: Test or Live API keys

### 2. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/hotel-reservation-system.git

# Navigate to project folder
cd hotel-reservation-system

# Install dependencies
npm install
```

### 3. Configure Environment Variables
Copy the `.env.example` template to `.env`:
```bash
cp .env.example .env
```

Open `.env` and configure your credentials:
```env
# 1. APPLICATION
NEXT_PUBLIC_APP_NAME="AuraLuxe Hospitality & Resorts"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_BASE_URL="/api/v1"

# 2. SUPABASE POSTGRESQL & KEYS
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# 3. RAZORPAY KEYS
RAZORPAY_KEY="rzp_test_..."
NEXT_PUBLIC_RAZORPAY_KEY="rzp_test_..."
RAZORPAY_SECRET="..."

# 4. JWT & ENCRYPTION
JWT_SECRET="your-32-char-random-jwt-secret-string"

# 5. MANAGEMENT PORTAL CREDENTIALS
HOTEL_PASS="AuraHotel@2026"
DEFAULT_HOTEL_ADMIN_PASSWORD="AuraHotel@2026"
SUPER_ADMIN_EMAIL="admin@auraluxe.com"
SUPER_ADMIN_PASSWORD="AuraMaster@2026"
```

### 4. Database Schema Setup
You can run automated migrations through the database migration endpoint or directly in the Supabase SQL Editor:
- **Option A (API Endpoint)**: Run the server and send a GET request to `/api/v1/database/migrate`.
- **Option B (Direct SQL)**: Copy SQL schemas from `src/database/tables/` into your Supabase Dashboard SQL Editor.

### 5. Start the Development Server
```bash
npm run dev
```

Visit the application at:
- **Public Site**: [http://localhost:3000](http://localhost:3000)
- **Hotel Directory**: [http://localhost:3000/hotels](http://localhost:3000/hotels)
- **Hidden Management Portal**: [http://localhost:3000/management](http://localhost:3000/management)

---

## 🔑 Administrative Default Credentials

| Portal | Route | Default Identifier | Default Password |
|---|---|---|---|
| **Hotel Partner Portal** | `/management/hotel/login` | Select any registered hotel (e.g. *JW Marriott Kolkata*) | `AuraHotel@2026` |
| **Super Admin Command Center** | `/management/admin/login` | `admin@auraluxe.com` | `AuraMaster@2026` |

*(Note: Property passwords can be customized anytime from the Hotel Portal Settings tab or overwritten by the Super Admin).*

---

## 🚢 Production Build & Vercel Deployment

### 1. Local Production Build
```bash
# Verify code quality & linting
npm run lint

# Compile optimized production build
npm run build

# Start production server locally
npm start
```

### 2. Deploy to Vercel
1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select this repository. The `vercel.json` file will automatically configure the build command (`next build`).
4. In **Settings > Environment Variables**, copy and paste the keys from your `.env` file.
5. Click **Deploy**. Your luxury hotel platform is live!

---

## 📄 License
This project is proprietary and confidential. Created for luxury hospitality reservations and property management. All rights reserved.
