import { Link } from "react-router-dom";
import ModeToggle from "./ModeToggle";

function Header() {
  return (
    <header className="bg-white dark:bg-[#2C3743] duration-100 shadow-md px-4 sm:px-1">
      <div className="container mx-auto py-5 flex items-center justify-between">
        <Link to={"/"}>
          <h2 className="text-2xl dark:text-[#FEFFFF]">Where in the world!</h2>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
