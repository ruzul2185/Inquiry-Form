import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import supabase from "../../auth/supabaseClient";
import { Link } from "react-router-dom";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";



const Header = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out: " + error.message);
      return;
    }
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white shadow-md relative">
      {/* Drawer trigger button */}
      <Button
        variant="outline"
        onClick={() => setIsDrawerOpen(true)}
        className="text-sm px-3 py-1 sm:px-4 sm:py-2"
      >
        Open Menu
      </Button>

      {/* Centered Logo */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src="/vite.svg"
          alt="Vite Logo"
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
      </div>

      {/* Sign Out Button aligned right */}
      <div className="flex items-center">
        <Button
          variant="destructive"
          onClick={handleSignOut}
          className="text-sm px-3 py-1 sm:px-4 sm:py-2"
        >
          Sign Out
        </Button>
      </div>

      {/* Drawer component */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">Menu</DrawerTitle>
            <DrawerClose asChild>
              <button aria-label="Close menu" className="btn-close">
                ✕
              </button>
            </DrawerClose>
          </DrawerHeader>

          <div className="p-4 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h6v6H3V3zm0 12h6v6H3v-6zm12-12h6v6h-6V3zm0 12h6v6h-6v-6z"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              to="/inquiry"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8h18M3 16h18M4 12h16"
                />
              </svg>
              Inquiry
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
