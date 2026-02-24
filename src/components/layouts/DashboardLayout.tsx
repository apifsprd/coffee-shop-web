import React, { useEffect, useState } from "react";
import Image from "next/image";
import { withAuth } from "./withAuth";
import { Text } from "../ui/Text";
import { useAppSelector } from "@/lib/hooks";
import { Heart, Home, List, User } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

const BOTTOM_NAV = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <Home size={20} className="text-gray-300" />,
    activeIcon: <Home size={20} className="text-white" />,
  },
  {
    name: "Order",
    href: "/dashboard/order",
    icon: <List size={20} className="text-gray-300" />,
    activeIcon: <List size={20} className="text-white" />,
  },
  {
    name: "Favorite",
    href: "/dashboard/favorite",
    icon: <Heart size={20} className="text-gray-300" />,
    activeIcon: <Heart size={20} className="text-white" />,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: <User size={20} className="text-gray-300" />,
    activeIcon: <User size={20} className="text-white" />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  const { asPath } = useRouter();

  const [greetings, setGreetings] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreetings("Good Morning");
      else if (hour < 18) setGreetings("Good Afternoon");
      else setGreetings("Good Evening");
    };

    updateGreeting(); // Jalankan sekali saat mount
    const timer = setInterval(updateGreeting, 60000); // Cek tiap 1 menit

    return () => clearInterval(timer); // Cleanup agar tidak memory leak
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex  items-center gap-2">
            <div className="w-14 h-14 relative">
              <Image
                src={user?.profilePictureUrl || "/images/logo.png"}
                alt={`Logo`}
                fill
                sizes="100vw"
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <Text variant="span" className="text-gray-600">
                {greetings}
              </Text>
              <Text variant="p" className="text-gray-900 font-semibold">
                {user?.name}
              </Text>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="flex-1 w-full mx-auto px-2 py-22">{children}</main>

      {/* BOTTOM NAV */}
      {[
        "/dashboard",
        "/dashboard/order",
        "/dashboard/profile",
        "/dashboard/favorite",
      ].includes(asPath) && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 z-[999]">
          {/* Gunakan grid-cols-4 untuk membagi ruang menjadi 4 bagian sama rata */}
          <div className="grid grid-cols-4 w-full h-16">
            {BOTTOM_NAV.map((item, index) => {
              const isActive = asPath === item.href;

              return (
                <Link
                  href={item.href}
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="flex flex-col gap-1 items-center justify-center w-full">
                    {/* Bagian Icon: Hilangkan px-4 yang terlalu lebar agar tidak sumpek */}
                    <div
                      className={`${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-white text-gray-400"
                      } rounded-full py-1 px-3 transition-colors duration-200`}
                    >
                      {isActive ? item.activeIcon : item.icon}
                    </div>

                    {/* Bagian Teks: Gunakan text-[10px] agar aman di layar kecil */}
                    <Text
                      variant="span"
                      className={`text-xs sm:text-xs leading-tight ${
                        isActive
                          ? "text-black font-semibold"
                          : "text-gray-400 font-medium"
                      }`}
                    >
                      {item.name}
                    </Text>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}

export default withAuth(DashboardLayout);
