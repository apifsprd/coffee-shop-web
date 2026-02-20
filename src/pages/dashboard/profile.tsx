import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ButtonBase } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    router.push("/auth/login");
  };

  console.log(user);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center gap-4">
        <div className="w-40 h-40 relative">
          <Image
            src={user?.profilePictureUrl || "/images/logo.png"}
            alt={`Logo`}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Text variant="h4">{user?.name}</Text>
          <Text variant="p" className="text-gray-400">
            {user?.email}
          </Text>
        </div>
        <ButtonBase
          label="Logout"
          variant="primary"
          eventClick={handleLogout}
        />
      </div>
    </DashboardLayout>
  );
}
