import { useEffect } from "react";
import { useState } from "react";

import { BsMoonStarsFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";

function ModeToggle() {
  const getTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(getTheme);

  const element = document.documentElement;

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        break;
    }
  }, [theme]);

  return (
    <button
      className={`text-2xl bg-gray-100 flex items-center justify-center py-2 px-3 rounded dark:bg-slate-600 ${
        theme === "light" ? "text-sky-500" : "text-sky-100"
      }`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <BsMoonStarsFill size={22} />
      ) : (
        <IoSunny size={22} />
      )}
    </button>
  );
}

export default ModeToggle;
