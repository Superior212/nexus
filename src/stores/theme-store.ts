import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: "dark",

        setTheme: (theme) => {
          set({ theme }, false, "setTheme");

          // Update DOM
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(theme);
        },

        toggleTheme: () => {
          const { theme } = get();
          const newTheme = theme === "light" ? "dark" : "light";
          get().setTheme(newTheme);
        },
      }),
      {
        name: "theme-storage",
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Apply theme on hydration
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(state.theme);
          }
        },
      }
    ),
    {
      name: "theme-store",
    }
  )
);
