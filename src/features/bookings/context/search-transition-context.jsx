"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const SearchTransitionContext = createContext(null);

export function SearchTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // 'idle' | 'expanding' | 'fadeout'
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [originRect, setOriginRect] = useState(null);
  const [activeParams, setActiveParams] = useState(null);

  const isNavigatingRef = useRef(false);
  const safetyTimerRef = useRef(null);

  /**
   * Forward Transition: Home Hero -> /hotels
   * Expands white container from search bar coordinates to fullscreen.
   * STAYS visible with skeleton running until the user actually arrives on /hotels!
   */
  const triggerExpand = useCallback(
    ({ rect, params, targetUrl }) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      setOriginRect(rect);
      setActiveParams(params);

      // Step 1: Start expanding from origin rect to fullscreen
      setTransitionPhase("expanding");

      // Step 2: Trigger route navigation as soon as expansion begins covering the screen
      setTimeout(() => {
        router.push(targetUrl);
      }, 380);

      // Step 3: Safety fallback timer (10 seconds) only in case navigation completely fails
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        if (isNavigatingRef.current) {
          setTransitionPhase("fadeout");
          setTimeout(() => {
            setTransitionPhase("idle");
            isNavigatingRef.current = false;
          }, 250);
        }
      }, 10000);
    },
    [router]
  );

  /**
   * Listens for route arrival on /hotels:
   * Only fades out the overlay AFTER /hotels has actually rendered!
   */
  useEffect(() => {
    if (transitionPhase === "expanding" && pathname === "/hotels") {
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
      }

      // Allow /hotels page DOM 250ms to settle under the overlay, then smoothly fade out
      const settleTimer = setTimeout(() => {
        setTransitionPhase("fadeout");

        const finishTimer = setTimeout(() => {
          setTransitionPhase("idle");
          isNavigatingRef.current = false;
        }, 250);

        return () => clearTimeout(finishTimer);
      }, 250);

      return () => clearTimeout(settleTimer);
    }
  }, [pathname, transitionPhase]);

  return (
    <SearchTransitionContext.Provider
      value={{
        transitionPhase,
        originRect,
        activeParams,
        triggerExpand,
        isTransitioning: transitionPhase !== "idle",
      }}
    >
      {children}
    </SearchTransitionContext.Provider>
  );
}

export function useSearchTransition() {
  const context = useContext(SearchTransitionContext);
  if (!context) {
    throw new Error("useSearchTransition must be used within a SearchTransitionProvider");
  }
  return context;
}
