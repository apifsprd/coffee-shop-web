import React, { useEffect, useState } from "react";
import Image from "next/image";
import { withAuth } from "./withAuth";
import { Text } from "../ui/Text";
import { useAppSelector } from "@/lib/hooks";
import { Home, List, User } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

const BOTTOM_NAV = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <Home size={24} className="text-gray-600" />,
  },
  {
    name: "Order",
    href: "/dashboard/order",
    icon: <List size={24} className="text-gray-600" />,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: <User size={24} className="text-gray-600" />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

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
      <nav className="bg-white border-b border-gray-200 fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex  items-center gap-2">
            <div className="w-14 h-14 relative">
              <Image
                src="/images/logo.png"
                alt={`Logo`}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <Text variant="span" className="text-gray-600">
                {greetings}
              </Text>
              <Text variant="p" className="text-gray-900">
                {user?.name}
              </Text>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="flex-1 w-full mx-auto px-2 py-22">{children}</main>

      {/* BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="w-full mx-auto px-4 py-2 flex flex-row gap-4 items-center justify-between">
          {BOTTOM_NAV.map((item, index) => (
            <Link href={item.href} key={index} className="flex-1">
              <div className="flex px-4 py-2 flex-col gap-1 justify-center items-center ">
                {item.icon}
                <Text variant="span" className="text-gray-600">
                  {item.name}
                </Text>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default withAuth(DashboardLayout);
