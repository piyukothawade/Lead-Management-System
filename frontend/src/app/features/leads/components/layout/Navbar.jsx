import { useState } from "react";
import {
  Search,
  User,
  Settings,
  MessageSquare,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

import NotificationPanel from "../notifications/NotificationPanel";
import Breadcrumbs from "./Breadcrumbs";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

function Navbar() {
  const [openNotif, setOpenNotif] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  };

  return (
    <div className="sticky top-0 z-30 flex justify-between items-center px-6 py-3 bg-white border-b border-gray-100 shadow-sm">

      {/* LEFT SECTION */}
      <div className="flex flex-col gap-1">

        {/* 🔗 Breadcrumbs */}
        <Breadcrumbs />

        {/* 🔍 Search */}
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <Input
            placeholder="Search... "
            className="pl-9 bg-gray-50 border-none focus:bg-white"
          />
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">

        {/* 🔔 Notifications */}
        <NotificationPanel open={openNotif} setOpen={setOpenNotif} />

        {/* 👤 Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://i.pravatar.cc/40?img=5"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700 hidden md:block">
                Bonnie Green
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 p-2 rounded-xl shadow-xl border border-gray-100 bg-white">

            {/* Profile */}
            <DropdownMenuItem asChild>
              <Link
                to="/profile"
                className="flex items-center gap-2 w-full"
              >
                <User size={16} /> My Profile
              </Link>
            </DropdownMenuItem>

            {/* Settings */}
            <DropdownMenuItem asChild>
              <Link
                to="/settings"
                className="flex items-center gap-2 w-full"
              >
                <Settings size={16} /> Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex gap-2 items-center hover:bg-gray-100">
              <MessageSquare size={16} /> Messages
            </DropdownMenuItem>

            <DropdownMenuItem className="flex gap-2 items-center hover:bg-gray-100">
              <LifeBuoy size={16} /> Support
            </DropdownMenuItem>

            <div className="border-t my-2" />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex gap-2 items-center text-red-500 cursor-pointer"
            >
              <LogOut size={16} /> Logout
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
}

export default Navbar;