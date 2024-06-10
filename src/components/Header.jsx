import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
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
    <header className="bg-white dark:bg-[#2C3743] duration-100 shadow-md px-4 sm:px-1">
      <div className="container mx-auto py-5 flex items-center justify-between">
        <Link to={"/"}>
          <h2 className="text-2xl dark:text-[#FEFFFF]">Where in the world!</h2>
        </Link>
        <button
          className={`text-2xl bg-gray-100 flex items-center justify-center py-2 px-3 rounded dark:bg-slate-600 ${
            theme === "light" ? "text-sky-500" : "text-sky-100"
          }`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <ion-icon name={`${theme === "light" ? "moon" : "sunny"}`}></ion-icon>
        </button>
      </div>
    </header>
  );
}

export default Header;
