import { Link } from "react-router-dom";
import { Icon } from "@iconify/react"; 

const Navbar = () => {
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left Logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon icon="mdi:message-text" className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="btn btn-sm gap-2 transition-colors"
            >
              <Icon icon="mdi:cog" className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
