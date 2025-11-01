"use client";

import { getCategoryTheme } from "@/src/lib/theme";
import { useEffect } from "react";

interface ThemeProviderProps {
  categorySlug?: string | null;
  children: React.ReactNode;
}

export default function ThemeProvider({
  categorySlug,
  children,
}: ThemeProviderProps) {
  const theme = getCategoryTheme(categorySlug);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement;

    if (categorySlug) {
      root.style.setProperty("--theme-gradient-from", theme.gradientFrom);
      root.style.setProperty("--theme-gradient-to", theme.gradientTo);
      root.style.setProperty("--theme-accent", theme.accent);
      root.classList.add(`theme-${theme.name}`);
    } else {
      root.style.removeProperty("--theme-gradient-from");
      root.style.removeProperty("--theme-gradient-to");
      root.style.removeProperty("--theme-accent");
      root.className = root.className.replace(/theme-\w+/g, "");
    }

    return () => {
      root.className = root.className.replace(/theme-\w+/g, "");
    };
  }, [categorySlug, theme]);

  return <>{children}</>;
}
