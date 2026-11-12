import "@/styles/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/config/site.config";
import { AuthProvider } from "@/features/auth/context/auth-context";
import { AuthModal } from "@/features/auth/components/auth-modal";
import { SearchTransitionProvider } from "@/features/bookings/context/search-transition-context";
import { SearchTransitionOverlay } from "@/features/bookings/components/search-transition-overlay";

export const metadata = {
  title: {
    default: `${siteConfig.name} | Luxury Hotels, Resorts & Private Villas`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Luxury Hotel",
    "Hotel Reservation System",
    "Private Island Resorts",
    "Boutique Villas",
    "5 Star Booking",
    "VIP Concierge",
    "Santorini Suites",
    "Maldives Overwater",
  ],
  authors: [{ name: "AuraLuxe Hospitality" }],
  creator: "AuraLuxe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/icon.webp",
    shortcut: "/icon.webp",
    apple: "/icon.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased selection:bg-teal-600 selection:text-white dark:bg-slate-950 dark:text-slate-100">
        <AuthProvider>
          <SearchTransitionProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AuthModal />
            <SearchTransitionOverlay />
          </SearchTransitionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
