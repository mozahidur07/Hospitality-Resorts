"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const CACHE_CLIENT_KEY = "auraluxe_client_profile";

const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthModalOpen: false,
  authModalInitialEmail: "",
  openAuthModal: () => {},
  closeAuthModal: () => {},
  checkSession: async () => {},
  login: async () => {},
  logout: async () => {},
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialEmail, setAuthModalInitialEmail] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  // Helper to persist or wipe local client cache
  const updateCachedUser = useCallback((userData) => {
    if (typeof window === "undefined") return;
    try {
      if (userData) {
        localStorage.setItem(CACHE_CLIENT_KEY, JSON.stringify(userData));
      } else {
        localStorage.removeItem(CACHE_CLIENT_KEY);
      }
    } catch (e) {
      console.debug("[Auth Cache Storage Warning]:", e);
    }
  }, []);

  // 1. Instant Optimistic Hydration (Instagram Pattern)
  // Reads saved user info immediately so the app opens feeling instantly logged in
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cached = localStorage.getItem(CACHE_CLIENT_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.email) {
          setUser(parsed);
          setLoading(false);
        }
      }
    } catch (e) {
      console.debug("[Auth Cache Parse Warning]:", e);
    }
  }, []);

  // 2. Silent Background Session Verification
  // Revalidates session token & machineId on the server. If invalid, does silent logout.
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/auth/session", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      const data = await res.json();

      if (data?.authenticated && data?.user) {
        // Session verified: update state and refresh cache with latest server data
        setUser(data.user);
        updateCachedUser(data.user);
      } else {
        // Session invalid, expired, or machineId mismatch:
        // Silent Logout -> wipe cached user info and reset state just like Instagram
        setUser(null);
        updateCachedUser(null);
      }
    } catch (err) {
      console.warn("[Background Auth Revalidation Error]:", err);
    } finally {
      setLoading(false);
    }
  }, [updateCachedUser]);

  // Run background verification on mount
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const openAuthModal = useCallback((initialEmail = "") => {
    setAuthModalInitialEmail(initialEmail);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setAuthModalInitialEmail("");
  }, []);

  const login = async ({ email, password }) => {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Authentication failed.");
    }

    // Save user immediately to local cache for instant future hydration
    setUser(data.user);
    updateCachedUser(data.user);

    closeAuthModal();
    return data;
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      // 1. Wipe browser local storage cache immediately
      updateCachedUser(null);
      setUser(null);

      // 2. Clear server-side HttpOnly cookies
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("[Logout Error]:", err);
    } finally {
      router.push("/");
      router.refresh();
      setTimeout(() => {
        setIsLoggingOut(false);
      }, 500);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        authModalInitialEmail,
        isLoggingOut,
        openAuthModal,
        closeAuthModal,
        checkSession,
        login,
        logout,
        setUser: (userData) => {
          setUser(userData);
          updateCachedUser(userData);
        },
      }}
    >
      {children}
      {isLoggingOut && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md text-white animate-in fade-in p-6 text-center select-none">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl">
            <Image
              src="/icon.webp"
              alt="AuraLuxe Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div className="mt-5 flex items-center gap-2.5 justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-teal-400" />
            <span className="text-base font-extrabold tracking-wide">
              Signing you out securely...
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-300 max-w-xs">
            Clearing active session credentials and redirecting to public site
          </p>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
