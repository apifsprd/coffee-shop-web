import React, { useState } from "react";
import { ButtonBase, ButtonLink } from "../ui/Button";
import Image from "next/image";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/images/logo.png"
                alt={`Logo`}
                fill
                className="object-cover rounded-full"
              />
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-4">
              <ButtonLink href="/dashboard" title="Home" />
              <ButtonLink href="/dashboard/user/4" title="Profile" />
            </div>
          </div>

          {/* RIGHT DESKTOP */}
          <div className="hidden md:block">
            <ButtonBase
              eventClick={handleLogout}
              label="Logout"
              variant="danger"
            />
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4">
            <ButtonLink href="/dashboard" title="Dashboard" />
            <ButtonBase
              eventClick={handleLogout}
              label="Logout"
              variant="danger"
            />
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
