import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ButtonBase } from "@/components/ui/Button";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/router";
import React from "react";

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    router.push("/auth/login");
  };
  return (
    <DashboardLayout>
      <div>
        Profile
        <ButtonBase
          label="Logout"
          variant="primary"
          eventClick={handleLogout}
        />
      </div>
    </DashboardLayout>
  );
}
