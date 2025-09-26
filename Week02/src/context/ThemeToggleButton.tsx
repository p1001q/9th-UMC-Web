import type { JSX } from "react";
import { useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

const ThemeToggleButton = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "LIGHT";

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "px-4 py-2 rounded-md transition-colors duration-150",
        isLight ? "bg-gray-200 text-black" : "bg-gray-700 text-white"
      )}
    >
      {isLight ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggleButton;
