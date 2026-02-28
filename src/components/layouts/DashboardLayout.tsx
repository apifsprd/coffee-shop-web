import React, { useEffect, useState } from "react";
import Image from "next/image";
import { withAuth } from "./withAuth";
import { Text } from "../ui/Text";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Heart,
  Home,
  List,
  User,
  ChartNoAxesCombined,
  CircleDollarSign,
  Pizza,
  Users,
} from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { logout } from "@/lib/features/auth/authSlice";
import { ButtonBase } from "../ui/Button";

const BOTTOM_NAV = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <Home size={22} />,
    activeIcon: <Home size={22} />,
  },
  {
    name: "Order",
    href: "/dashboard/order",
    icon: <List size={22} />,
    activeIcon: <List size={22} />,
  },
  {
    name: "Favorite",
    href: "/dashboard/favorite",
    icon: <Heart size={22} />,
    activeIcon: <Heart size={22} />,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: <User size={22} />,
    activeIcon: <User size={22} />,
  },
];
const BOTTOM_NAV_ADMIN = [
  {
    name: "Dashboard",
    href: "/dashboard/admin/overview",
    icon: <ChartNoAxesCombined size={22} />,
    activeIcon: <ChartNoAxesCombined size={22} />,
  },
  {
    name: "Transaction",
    href: "/dashboard/admin/transaction",
    icon: <CircleDollarSign size={22} />,
    activeIcon: <CircleDollarSign size={22} />,
  },
  {
    name: "Menu",
    href: "/dashboard/admin/menu/list",
    icon: <Pizza size={22} />,
    activeIcon: <Pizza size={22} />,
  },
  {
    name: "Customer",
    href: "/dashboard/admin/customer",
    icon: <Users size={22} />,
    activeIcon: <Users size={22} />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { asPath } = useRouter();
  const [greetings, setGreetings] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    router.push("/auth/login");
  };

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreetings("Good Morning");
      else if (hour < 18) setGreetings("Good Afternoon");
      else setGreetings("Good Evening");
    };
    updateGreeting();
    const timer = setInterval(updateGreeting, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-white border-r border-gray-200 flex-col fixed h-full z-50">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold relative">
            <Image src="/images/logo-transparent.png" alt="logo" fill />
          </div>
          <p className="font-bold text-base">INDO CAFE N RESTO</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {user?.role === "admin"
            ? BOTTOM_NAV_ADMIN.map((item) => {
                const isActive = asPath === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-primary text-white shadow-lg shadow-orange-100" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: isActive ? "text-white" : "text-gray-400",
                    })}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })
            : BOTTOM_NAV.map((item) => {
                const isActive = asPath === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-primary text-white shadow-lg shadow-orange-100" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: isActive ? "text-white" : "text-gray-400",
                    })}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <ButtonBase
            label="Logout"
            variant="danger"
            shape="rounded"
            eventClick={handleLogout}
            fullWidth
          />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:pl-64 lg:pl-72">
        {/* TOP NAVBAR */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-18rem)] z-40">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 relative border-2 border-white shadow-sm rounded-full overflow-hidden">
                <Image
                  src={user?.profilePictureUrl || "/images/logo.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Text
                  variant="span"
                  className="text-xs md:text-xs text-gray-500 uppercase  font-normal"
                >
                  {greetings}
                </Text>
                <Text
                  variant="p"
                  className="text-base md:text-base text-gray-900 font-semoibold leading-none"
                >
                  {user?.name}
                </Text>
              </div>
            </div>

            <div className="hidden sm:block"></div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-8 mt-20 mb-20 md:mb-0">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        {/* MOBILE BOTTOM NAV  */}
        {[
          "/dashboard",
          "/dashboard/order",
          "/dashboard/profile",
          "/dashboard/favorite",
          "/dashboard/admin/overview",
          "/dashboard/admin/transaction",
          "/dashboard/admin/customer",
          "/dashboard/admin/menu/list",
        ].includes(asPath) && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-1 z-999 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-4 h-16">
              {user?.role === "admin"
                ? BOTTOM_NAV_ADMIN.map((item) => {
                    const isActive = asPath === item.href;
                    return (
                      <Link
                        href={item.href}
                        key={item.name}
                        className="flex flex-col items-center justify-center gap-1"
                      >
                        <div
                          className={`p-2 rounded-xl transition-all ${isActive ? "bg-primary text-white scale-110" : "text-gray-400"}`}
                        >
                          {isActive ? item.activeIcon : item.icon}
                        </div>
                        <span
                          className={`text-xs ${isActive ? "text-primary font-semibold" : "text-gray-400  font-normal "}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    );
                  })
                : BOTTOM_NAV.map((item) => {
                    const isActive = asPath === item.href;
                    return (
                      <Link
                        href={item.href}
                        key={item.name}
                        className="flex flex-col items-center justify-center gap-1"
                      >
                        <div
                          className={`p-2 rounded-xl transition-all ${isActive ? "bg-primary text-white scale-110" : "text-gray-400"}`}
                        >
                          {isActive ? item.activeIcon : item.icon}
                        </div>
                        <span
                          className={`text-xs ${isActive ? "text-primary font-semibold" : "text-gray-400  font-normal "}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
