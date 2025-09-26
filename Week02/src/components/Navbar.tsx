import type { JSX } from "react";
import ThemeToggleButton from "../context/ThemeToggleButton";
import { useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

const Navbar = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <nav
      className={clsx(
        "flex justify-between items-center px-6 py-3 shadow-md rounded-lg mb-2 transition-colors duration-150",
        theme === "LIGHT" ? "bg-white text-black" : "bg-gray-800 text-white"
      )}
    >
      <h1 className="text-xl font-bold">UMC</h1>
      <ThemeToggleButton />
    </nav>
  );
};

export default Navbar;
