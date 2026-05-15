import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

export function ThemeToggle(props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      {...props}
      className="p-2 rounded-full border border-gray hover:bg-gold transition-colors"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gold" />
      ) : (
        <Moon className="w-5 h-5 text-gray" />
      )}
    </button>
  );
}

// 'use client' directive
export const __client__ = true;
