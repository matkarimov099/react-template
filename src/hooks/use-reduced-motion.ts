import { useEffect, useState } from "react";

/**
 * Hook to detect user's reduced motion preference
 * Respects the prefers-reduced-motion media query
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Utility function to get reduced motion classes
 * Returns appropriate classes based on reduced motion preference
 */
export function getMotionClasses(
  normalClasses: string,
  reducedClasses?: string
): string {
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  if (prefersReducedMotion && reducedClasses) {
    return reducedClasses;
  }

  return normalClasses;
}

/**
 * CSS-in-JS utility for motion-safe animations
 * Only applies animations when user hasn't requested reduced motion
 */
export function motionSafe(styles: Record<string, any>): Record<string, any> {
  if (typeof window === "undefined") return styles;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Remove animation and transition properties
    const {
      animation,
      transition,
      transform,
      animationDuration,
      animationDelay,
      animationTimingFunction,
      transitionDuration,
      transitionDelay,
      transitionTimingFunction,
      ...safeStyles
    } = styles;

    return safeStyles;
  }

  return styles;
}
