// lib/store/theme.ts
import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme:
        (typeof window !== "undefined" &&
            (localStorage.getItem("theme") as Theme)) ||
        "light",
    setTheme: (theme: Theme) => {
        if (typeof window !== "undefined") localStorage.setItem("theme", theme);
        set({ theme });
    },
    toggleTheme: () =>
        set((state) => {
            const newTheme: Theme = state.theme === "light" ? "dark" : "light";
            if (typeof window !== "undefined") localStorage.setItem("theme", newTheme);
            return { theme: newTheme };
        }),
}));
