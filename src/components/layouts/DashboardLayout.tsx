import React, { useState } from "react";
import { ButtonBase, ButtonLink } from "../ui/Button";

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
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Dashboard
            </h1>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-4">
              <ButtonLink href="/dashboard" title="Dashboard" />
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
            ☰
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
