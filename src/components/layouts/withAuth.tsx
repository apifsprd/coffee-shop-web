import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { logout, setCredentials } from "@/lib/features/auth/authSlice";
import { getUserData } from "@/lib/api-list/auth";

export function withAuth(Component: any) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated, token: reduxToken } = useAppSelector(
      (state) => state.auth,
    );
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        const loginTimestamp = localStorage.getItem("login_timestamp");

        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        const now = new Date().getTime();

        // 1. Cek Expiry
        const isExpired =
          loginTimestamp && now - parseInt(loginTimestamp) > TWENTY_FOUR_HOURS;

        if (isExpired || !token) {
          if (token || isAuthenticated) {
            localStorage.removeItem("token");
            localStorage.removeItem("login_timestamp");
            dispatch(logout());
          }
          router.replace("/auth/login");
          setIsChecking(false);
          return;
        }

        if (!isAuthenticated && token) {
          try {
            const response = await getUserData();
            const user = response ? response.user : null;

            dispatch(setCredentials({ user, token }));
          } catch (e) {
            console.error("Auth verification failed", e);
            localStorage.clear();
            router.replace("/auth/login");
          }
        }

        setIsChecking(false);
      };

      checkAuth();
    }, [isAuthenticated, router, dispatch]);

    if (isChecking) {
      return (
        <div className="flex h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 font-medium">
              Memverifikasi Akses...
            </p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) return null;

    return <Component {...props} />;
  };
}
