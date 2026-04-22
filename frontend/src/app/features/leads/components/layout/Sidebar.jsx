import { useState } from "react";
import {
  Home,
  Package,
  Settings,
  User,
  LogOut,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  // 📊 MAIN
  const mainMenu = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Leads", icon: Package, path: "/leads" },
  ];

  // 👤 ACCOUNT
  const accountMenu = [
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  // 🔐 AUTH
  const authMenu = [
    { name: "Logout", icon: LogOut, path: "/logout" },
  ];

  const renderMenu = (items) =>
    items.map((item, i) => {
      const Icon = item.icon;
      const isActive = location.pathname === item.path;

      return (
        <Link to={item.path} key={i}>
          <div className="relative group">

            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${
                isActive
                  ? "bg-[#7A1CAC]/30 text-[#EBD3F8]"
                  : "hover:bg-[#7A1CAC]/20 text-gray-300"
              }`}
            >
              <Icon size={18} />

              <span
                className={`transition-all duration-200 whitespace-nowrap ${
                  open ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.name}
              </span>
            </div>

            {!open && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 
                bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 
                group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                {item.name}
              </div>
            )}
          </div>
        </Link>
      );
    });

  return (
    <div
      className={`h-screen bg-[#2E073F] text-white flex flex-col 
      transition-all duration-300 ease-in-out
      ${open ? "w-64" : "w-20"}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-[#7A1CAC]/30">

        <h1
          className={`text-sm font-semibold tracking-wide transition-all duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          Admin Panel
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="bg-[#7A1CAC] hover:bg-[#AD49E1] w-8 h-8 flex items-center justify-center rounded-md"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 p-2 space-y-6 overflow-y-auto">

        {/* 📊 DASHBOARD SECTION */}
        <div>
          {open && (
            <p className="text-[10px] text-gray-400 px-3 mb-1 uppercase">
              Main
            </p>
          )}
          {renderMenu(mainMenu)}
        </div>

        {/* 👤 ACCOUNT SECTION */}
        <div>
          {open && (
            <p className="text-[10px] text-gray-400 px-3 mb-1 uppercase">
              Account
            </p>
          )}
          {renderMenu(accountMenu)}
        </div>

        {/* 🔐 AUTH SECTION */}
        <div>
          {open && (
            <p className="text-[10px] text-gray-400 px-3 mb-1 uppercase">
              Auth
            </p>
          )}
          {renderMenu(authMenu)}
        </div>

      </div>

      {/* FOOTER */}
      <div className="p-4 text-xs text-gray-400 border-t border-[#7A1CAC]/30 text-center">
        {open ? "© 2026 Admin Panel" : "©"}
      </div>
    </div>
  );
}

export default Sidebar;