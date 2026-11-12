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
  - AuraLuxe হলো একটি পূর্ণাঙ্গ ওয়েব প্ল্যাটফর্ম, যেখানে সাধারণ ইউজাররা হোটেল খুঁজে বুক করতে পারে এবং হোটেল কর্তৃপক্ষ ও অ্যাডমিনরা ব্যাকএন্ড থেকে তা নিয়ন্ত্রণ করতে পারে।
- **Three Core User Roles in the System:**
  1. **Guest / Customer:** হোটেল সার্চ, ফিল্টারিং, রুম সিলেক্ট, পেমেন্ট এবং বুকিং ভাউচার জেনারেট করা।
  2. **Hotel Partner (Manager):** নিজের নির্দিষ্ট হোটেলের বুকিং স্ট্যাটাস চেক, রুমের রেট পরিবর্তন এবং ফ্রন্ট-ডেস্ক হ্যান্ডেল করা।
  3. **Super Admin:** সমস্ত হোটেলের ডেটা দেখা, গ্লোবাল বুকিং রেকর্ড মনিটর এবং হোটেল অ্যাকাউন্ট পরিচালনা করা।
- **Project Target:** একটি সম্পূর্ণ রেসপনসিভ, দ্রুতগতির ও লাইভ ডেটাবেস যুক্ত প্রজেক্ট তৈরি করা।

---

## 📌 Slide 3: Technology Stack & Tools Used
- **Frontend & Routing:**
  - **Next.js 14 (App Router):** ক্লায়েন্ট ও সার্ভার কম্পোনেন্টের পারফেক্ট ব্যালান্স।
  - **JavaScript (`.js`) & JSX (`.jsx`):** নো-টাইপস্ক্রিপ্ট, ডোমেন-ড্রাইভেন মডিউলার আর্কিটেকচার।
- **Styling & UI Components:**
  - **Tailwind CSS:** মডার্ন ডিজাইন সিস্টেম ও রেসপনসিভ লেআউট।
  - **Lucide React:** ক্লিন ও প্রফেশনাল ভেক্টর আইকন।
- **Backend & Database:**
  - **Next.js API Routes (`/api/v1/...`):** সার্ভারলেস ব্যাকএন্ড এন্ডপয়েন্ট।
  - **Supabase (PostgreSQL):** রিলেশনাল ডেটাবেস (`clients`, `bookings`, `hotel_admins`, `inquiries`)।
- **Authentication & Security:**
  - **JWT (`jose`) & HttpOnly Cookies:** সুরক্ষিত সেশন হ্যান্ডলিং।
- **Payment Gateway:**
  - **Razorpay SDK:** অনলাইন লেনদেন ও ক্রিপ্টোগ্রাফিক সিগনেচার ভেরিফিকেশন।
- **Hosting & Deployment:**
  - **Vercel:** অটোমেটিক সিআই/সিডি এবং লাইভ ক্লাউড হোস্টিং।

---

## 📌 Slide 4: System Architecture & User Flow
- **High-Level Flow Diagram:**
  - **Public User Flow:** Home Page ➔ Search Bar ➔ Hotel Listing (`/hotels`) ➔ Hotel Details (`/hotels/[slug]`) ➔ Checkout (`/checkout`) ➔ Digital Voucher Modal
  - **Client Dashboard:** User Profile (`/user`) ➔ My Bookings ➔ Cancel Booking ➔ Wishlist
  - **Internal Management Gateway:** Hidden Hub (`/management`) ➔ Hotel Login ➔ Hotel Dashboard OR Super Admin Login ➔ Admin Command Center
- **Security Separation:**
  - ম্যানেজমেন্ট পোর্টাল সাধারণ ইউজারের মেনুতে দৃশ্যমান নয়; এটি আলাদা হিডেন রুটে সুরক্ষিত।

---

## 📌 Slide 5: Module 1 - Landing Page & Smart Search
- **Home Page Features (`/`):**
  - আকর্ষণীয় হিরো সেকশন এবং হ্যান্ডপিকড হোটেলের গ্রিড।
  - বিশ্বমানের জনপ্রিয় ডেস্টিনেশন কার্ড (মালদ্বীপ, সুইজারল্যান্ড, জাপান, ইত্যাদি)।
- **Smart Search Bar Component:**
  - **গন্তব্য নির্বাচন (Destination):** ড্রপডাউন থেকে শহর সিলেক্ট করা।
  - **গুগল-স্টাইল রিসেন্ট সার্চ মেমরি:** ব্রাউজারে ইউজারের শেষ ২টি সার্চ মনে রাখে ও দেখায়।
  - **তারিখ নির্বাচন:** Check-In ও Check-Out ডেট পিকার।
  - **গেস্ট ও রুম সংখ্যা:** অ্যাডাল্ট, চিলড্রেন ও রুমের সংখ্যা কমানো-বাড়ানোর কাউন্টার।
- **Zero-Latency Transition:** হোম পেজ থেকে সার্চ বাটনে ক্লিক করলে স্মুথ লোডার সহ সরাসরি সার্চ রেজাল্ট পেজে চলে যায়।

---

## 📌 Slide 6: Module 2 - Hotel Directory & Room Selection
- **Hotel Directory Page (`/hotels`):**
  - **ক্যাটাগরি ফিল্টার:** Urban Luxury, Beachfront, Royal Heritage, Mountain Lodges।
  - **লাইভ সর্টিং:** কম দাম থেকে বেশি দাম, রেটিং এবং রিকমেন্ডেড ফিল্টারিং।
  - **ইন-পেজ সার্চ:** সরাসরি নাম বা লোকেশন দিয়ে টাইপ করে খোঁজার ব্যবস্থা।
- **Hotel Details Page (`/hotels/[slug]`):**
  - **৫-ফটো রেসপনসিভ গ্যালারি:** ১টি বড় স্পটলাইট ছবি এবং ৪টি ছোট থাম্বনেইল ভিউ।
  - হোটেলের সুযোগ-সুবিধা (Wi-Fi, Pool, Breakfast) এবং বিবরণ।
  - **রুম সিলেকশন কার্ড:** প্রতিটি রুমের বেড টাইপ, গেস্ট ধারণক্ষমতা এবং কতটি রুম ফাঁকা আছে তা লাইভ প্রদর্শন।

---

## 📌 Slide 7: Module 3 - Checkout & Payment Integration
- **Checkout Process (`/checkout`):**
  - গেস্টের নাম, ইমেইল ও ফোন নম্বর ইনপুট।
  - রুমের ভাড়া, রাতের সংখ্যা এবং ট্যাক্স মিলিয়ে স্বয়ংক্রিয় বিল ক্যালকুলেশন।
- **Payment Options:**
  1. **Razorpay Online Payment:** ক্রেডিট/ডেবিট কার্ড, UPI ও নেট ব্যাংকিং।
  2. **Pay at Hotel Desk:** অনলাইনে কোনো পেমেন্ট ছাড়া সিট কনফার্ম করে হোটেলে পৌঁছানোর পর পেমেন্ট করার বিকল্প।
- **Digital Booking Voucher:**
  - বুকিং সম্পন্ন হলে ইউনিক রেফারেন্স নম্বর (যেমন: `AUR-849201`) সহ অফিসিয়াল ভাউচার পপ-আপ।
  - ভাউচারে প্রিন্ট করার অপশন এবং বারকোড ডিসপ্লে।
  - ইন্টারনেট চলে গেলেও যাতে দেখা যায় সেজন্য **IndexedDB**-তে ভাউচার সেভ রাখা হয়।

---

## 📌 Slide 8: Module 4 - User Account & Profile Portal
- **User Dashboard (`/user`):**
  - ইউজার লগইন করার পর ৩টি ডেডিকেটেড ট্যাব পায়:
  1. **My Bookings Tab:** ইউজারের সমস্ত কনফার্মড ও পূর্ববর্তী বুকিংয়ের তালিকা।
  2. **Cancel Booking Feature:** কোনো বুকিং বাতিল করার জন্য কারণ উল্লেখ করে রিকোয়েস্ট পাঠানোর মোডাল।
  3. **Saved Hotels (Wishlist):** পছন্দ করা হোটেলগুলো এক ক্লিকে দেখার সুবিধা।
  4. **Profile Settings:** ইউজারের ফোন নম্বর, ঠিকানা ও নাম এডিট করার ব্যবস্থা।

---

## 📌 Slide 9: Module 5 - Hotel Partner Management Portal
- **Access Route:** `/management/hotel/login`
- **Hotel Authentication:**
  - ড্রপডাউন থেকে নিজের হোটেল সিলেক্ট করে হোটেলের অ্যাডমিনিস্ট্রেটিভ পাসওয়ার্ড দিয়ে লগইন।
- **Hotel Dashboard Capabilities (`/management/hotel/dashboard`):**
  - **দৈনিক মেট্রিকস:** আজকের আগমন (Arrivals), প্রস্থান (Departures), মোট আয় এবং অকুপেন্সি রেট।
  - **বুকিং টেবিল:** শুধু সেই হোটেলের গেস্টদের লিস্ট।
  - **স্ট্যাটাস পরিবর্তন:** গেস্টকে 'Paid' বা 'Completed' মার্ক করা অথবা ক্যানসেল করা (সাথে কনফার্মেশন মোডাল)।
  - **লাইভ রুম প্রাইস ও ইনভেন্টরি এডিট:** হোটেল ম্যানেজার চাইলে যেকোনো রুমের প্রতি রাতের দাম (যেমন ৯৫০ টাকা থেকে ৫৫০ টাকা) পরিবর্তন করতে পারে, যা সাথে সাথে পাবলিক সাইটে বদলে যায়।
  - **CSV Export:** হোটেলের সমস্ত বুকিং হিস্ট্রি এক ক্লিকে এক্সেল/CSV ফাইলে ডাউনলোড।

---

## 📌 Slide 10: Module 6 - Super Admin Command Center
- **Access Route:** `/management/admin/login`
- **Authentication:** মাস্টার সিকিউর ইমেইল ও অ্যাডমিন পাসওয়ার্ড।
- **Global Overview Dashboard (`/management/admin/dashboard`):**
  - প্ল্যাটফর্মের সমস্ত হোটেলের সম্মিলিত আয় (Gross Revenue)।
  - মোট ক্লায়েন্ট ও বুকিংয়ের সংখ্যা এবং টপ পারফর্মিং হোটেল।
- **All-Bookings Explorer:**
  - প্ল্যাটফর্মের যেকোনো হোটেলের বুকিং খোঁজা, পেমেন্ট আইডি ও ট্রানজাকশন আইডি দিয়ে ফিল্টার করা।
  - গ্লোবাল মাস্টার CSV এক্সপোর্ট (রেজরপে পেমেন্ট আইডি সহ)।
- **Hotel Governance & Concierge:**
  - যেকোনো হোটেলের অ্যাকাউন্ট 'Active' বা 'Suspended' করার ব্যবস্থা।
  - কন্টাক্ট পেজ থেকে আসা গেস্টদের মেসেজ ও স্পেশাল রিকোয়েস্ট ম্যানেজ করা।

---

## 📌 Slide 11: Database Schema & Data Modeling
- **PostgreSQL Database Tables (Supabase):**
  1. **`clients` Table:** ইউজারের নাম, ইমেইল, পাসওয়ার্ড হ্যাশ, ফোন, ঠিকানা ও টাইমস্ট্যাম্প।
  2. **`bookings` Table:** বুকিং আইডি, রেফারেন্স কোড, গেস্ট ইনফো, হোটেল আইডি, রুম আইডি, Check-in/out তারিখ, মোট টাকা, পেমেন্ট মেথড (`online` / `pay_at_hotel`), পেমেন্ট স্ট্যাটাস এবং Razorpay পেমেন্ট আইডি।
  3. **`hotel_admins` Table:** প্রতিটি হোটেলের নিজস্ব পাসওয়ার্ড হ্যাশ, অ্যাকাউন্ট স্ট্যাটাস (`active`/`suspended`) এবং লাইভ রুম ওভাররাইড ডেটা (JSON)।
  4. **`inquiries` Table:** কন্টাক্ট ফর্ম থেকে পাঠানো ইউজারদের বার্তা ও কনসিয়ের্জ রিকোয়েস্ট।
- **Automated Migration Runner:** কোড ডিপ্লয় হলে ব্যাকএন্ড নিজে থেকেই টেবিল স্কিমা ভেরিফাই করে নেয়।

---

## 📌 Slide 12: Conclusion & Q&A
- **Summary of Developed System:**
  - সাধারণ গেস্টদের জন্য সহজ ও আধুনিক হোটেল বুকিং অভিজ্ঞতা।
  - হোটেলের জন্য স্বয়ংক্রিয় ফ্রন্ট-ডেস্ক ও লাইভ প্রাইসিং পোর্টাল।
  - প্ল্যাটফর্ম ওনারের জন্য সেন্ট্রালাইজড সুপার অ্যাডমিন ড্যাশবোর্ড।
  - সম্পূর্ণ লাইভ, টেস্টেড এবং ক্লাউডে হোস্ট করা প্রোডাকশন ওয়েব অ্যাপ।
- **Project Links:**
  - **Live Website:** https://auraluxe.mozahidur.online
  - **Source Code (GitHub):** https://github.com/mozahidur07/Hospitality-Resorts
- **Thank You!**
  - We are now open for questions and evaluation.