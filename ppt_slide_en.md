# 🏨 Project Presentation: AuraLuxe - Hotel Reservation & Management System

---

## 📌 Slide 1: Project Title & Team Details
- **Project Name:** AuraLuxe - Hotel Reservation & Operations Management Web Application
- **Domain:** Full-Stack Web Development / Cloud-Based Enterprise Software
- **Tech Stack:** Next.js 14 (App Router), JavaScript (ES6+), Tailwind CSS, Supabase PostgreSQL, Razorpay
- **Project Members:**
  - [Member 1 Name] - [Roll / Registration No]
  - [Member 2 Name] - [Roll / Registration No]
  - [Member 3 Name] - [Roll / Registration No]
- **Project Supervisor:** [Supervisor / Professor Name]
- **Department & Institution:** [e.g., Dept. of Computer Science & Engineering, College Name]

---

## 📌 Slide 2: Project Introduction & Scope
- **What is AuraLuxe?**
  - AuraLuxe is a full-featured web platform where guests can discover and book luxury hotel stays, while hotel property managers and platform administrators manage operations through dedicated backend portals.
- **Three Core User Roles in the System:**
  1. **Guest / Customer:** Search hotels, apply filters, select suites, complete payments, and generate instant digital vouchers.
  2. **Hotel Partner (Manager):** Monitor hotel-specific reservations, update room rates/availability, and manage front-desk check-in statuses.
  3. **Super Admin:** Access global platform metrics, monitor cross-hotel reservation records, and govern property accounts.
- **Project Objective:** Build a fully responsive, fast, and secure web application backed by a real-time cloud database.

---

## 📌 Slide 3: Technology Stack & Tools Used
- **Frontend & Routing:**
  - **Next.js 14 (App Router):** Modern balance of Server and Client Components.
  - **JavaScript (`.js`) & JSX (`.jsx`):** Pure JavaScript with clean domain-driven modular architecture.
- **Styling & UI Components:**
  - **Tailwind CSS:** Modern luxury design system with responsive layouts.
  - **Lucide React:** Clean, lightweight, and professional vector icons.
- **Backend & Database:**
  - **Next.js API Routes (`/api/v1/...`):** Serverless RESTful backend endpoints.
  - **Supabase (PostgreSQL):** Relational database managing `clients`, `bookings`, `hotel_admins`, and `inquiries`.
- **Authentication & Security:**
  - **JWT (`jose`) & HttpOnly Cookies:** Secure, tamper-proof session handling.
- **Payment Gateway:**
  - **Razorpay SDK:** Online payment processing with cryptographic HMAC-SHA256 signature verification.
- **Hosting & Deployment:**
  - **Vercel:** Automated CI/CD pipeline with live serverless cloud deployment.

---

## 📌 Slide 4: System Architecture & User Flow
- **High-Level Flow Diagram:**
  - **Public User Flow:** Home Page ➔ Search Bar ➔ Hotel Directory (`/hotels`) ➔ Hotel Details (`/hotels/[slug]`) ➔ Checkout (`/checkout`) ➔ Digital Voucher Modal
  - **Client Dashboard:** User Profile (`/user`) ➔ My Bookings ➔ Cancel Booking ➔ Saved Wishlist
  - **Internal Operations Gateway:** Hidden Hub (`/management`) ➔ Hotel Login ➔ Hotel Dashboard OR Super Admin Login ➔ Admin Command Center
- **Security & Access Separation:**
  - The management portal is completely unlinked from standard user navigation and protected via separate credential authentication.

---

## 📌 Slide 5: Module 1 - Landing Page & Smart Search
- **Home Page Features (`/`):**
  - High-conversion luxury hero section with handpicked hotel recommendations.
  - Curated world destinations showcase (Maldives, Switzerland, Japan, etc.).
- **Smart Search Bar Component:**
  - **Destination Selection:** Dropdown selector with city and country indexing.
  - **Google-Style Recent Search Memory:** Caches and surfaces the user's latest 2 searches for 1-click re-queries.
  - **Stay Dates Picker:** Synchronized Check-In and Check-Out date selection.
  - **Guest & Room Selector:** Counter controls for Adults, Children, and Room quantity.
- **Zero-Latency Transition:** Proactive route prefetching enables instantaneous navigation from the search bar to search results.

---

## 📌 Slide 6: Module 2 - Hotel Directory & Room Selection
- **Hotel Directory Page (`/hotels`):**
  - **Category Tabs:** Filter by Urban Luxury, Beachfront, Royal Heritage, and Mountain Lodges.
  - **Live Sorting:** Sort by Price (Low to High / High to Low), Guest Ratings, and Recommended.
  - **In-Page Live Search:** Real-time keyword filtering by hotel name, address, or location.
- **Hotel Details Page (`/hotels/[slug]`):**
  - **5-Photo Responsive Gallery:** 1 large spotlight image alongside 4 thumbnail suites with modal preview.
  - Property amenities grid (High-speed Wi-Fi, Pool, Breakfast, Concierge) and description.
  - **Interactive Room Selection Cards:** Displays bed types, guest capacity badges, and real-time remaining suite counters.

---

## 📌 Slide 7: Module 3 - Checkout & Payment Integration
- **Checkout Process (`/checkout`):**
  - Guest personal information entry (Full Name, Email, Phone Number).
  - Automated bill calculation factoring in nightly suite rates, stay duration, and applicable taxes.
- **Flexible Payment Options:**
  1. **Razorpay Online Payment:** Supports Credit/Debit Cards, UPI, and Net Banking.
  2. **Pay at Hotel Desk:** Guarantees reservation online without immediate payment, settling charges upon physical arrival.
- **Digital Booking Voucher:**
  - Official confirmation modal with unique booking reference (e.g., `AUR-849201`).
  - Printable voucher view with barcode and QR representations.
  - Persistent offline caching via **IndexedDB** for guaranteed offline access.

---

## 📌 Slide 8: Module 4 - User Account & Profile Portal
- **User Dashboard (`/user`):**
  - Authenticated guest dashboard featuring 4 dedicated management sections:
  1. **My Bookings Tab:** View active, upcoming, and past reservation history.
  2. **Cancel Booking Feature:** Cancellation modal with reason capture and status updates.
  3. **Saved Hotels (Wishlist):** Quick-access collection of user-bookmarked properties.
  4. **Profile Settings:** Update guest contact details (Phone Number, Address, Name).

---

## 📌 Slide 9: Module 5 - Hotel Partner Management Portal
- **Access Route:** `/management/hotel/login`
- **Hotel Authentication:**
  - Hotel managers search and select their property from a catalog and authenticate with property-specific credentials.
- **Hotel Dashboard Capabilities (`/management/hotel/dashboard`):**
  - **Daily Operations KPIs:** Real-time counters for Today's Arrivals, Departures, Revenue, and Occupancy Rate.
  - **Property Bookings Table:** Filtered view displaying only guests registered for that specific hotel.
  - **Status Updates:** Mark guest payment as received, complete stay, or process cancellation (with confirmation modals).
  - **Dynamic Price & Inventory Overrides:** Managers can live-edit nightly suite rates (e.g., promotional rate from ₹950 to ₹550), updating public pages in real time.
  - **One-Click CSV Export:** Export complete property booking logs to spreadsheet/CSV format.

---

## 📌 Slide 10: Module 6 - Super Admin Command Center
- **Access Route:** `/management/admin/login`
- **Authentication:** Master administrator credentials with elevated access.
- **Global Overview Dashboard (`/management/admin/dashboard`):**
  - Platform-wide gross revenue breakdown across multiple currencies.
  - Total registered client count, global booking volume, and top-performing hotels.
- **All-Bookings Explorer:**
  - Multi-filter explorer across all properties with payment ID and transaction ID filtering.
  - Global master CSV export including Razorpay payment references.
- **Property Governance & Concierge Inquiries:**
  - Master controls to toggle hotel partner accounts between 'Active' and 'Suspended'.
  - Centralized resolver for contact form submissions and VIP concierge requests.

---

## 📌 Slide 11: Database Schema & Data Modeling
- **PostgreSQL Database Tables (Supabase):**
  1. **`clients` Table:** User names, emails, password hashes, phone numbers, addresses, and creation timestamps.
  2. **`bookings` Table:** Booking IDs, reference codes, guest details, hotel IDs, room IDs, check-in/out dates, totals, payment methods (`online` / `pay_at_hotel`), statuses, and Razorpay payment IDs.
  3. **`hotel_admins` Table:** Property password hashes, account statuses (`active` / `suspended`), and live JSON room overrides.
  4. **`inquiries` Table:** Contact form submissions, concierge requests, and inquiry statuses.
- **Automated Migration Runner:** Backend checks and verifies PostgreSQL table schemas automatically upon deployment.

---

## 📌 Slide 12: Conclusion & Q&A
- **Summary of Developed System:**
  - Seamless, modern booking interface for guests.
  - Automated front-desk operations and dynamic pricing portal for hotel partners.
  - Centralized administrative command center for platform owners.
  - Fully tested, production-grade web application deployed on live cloud infrastructure.
- **Project Links:**
  - **Live Website:** https://auraluxe.mozahidur.online
  - **Source Code (GitHub):** https://github.com/mozahidur07/Hospitality-Resorts
- **Thank You!**
  - We are now open for questions and evaluation.
