import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { getUserData } from "@/lib/api-list/auth";

export function withAuth(Component: any) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        const userJson = await getUserData();

        if (!isAuthenticated && token) {
          try {
            const user = userJson ? userJson.user : null;
            dispatch(setCredentials({ user, token }));
          } catch (e) {
            localStorage.clear();
            router.replace("/auth/login");
          }
        } else if (!isAuthenticated && !token) {
          router.replace("/auth/login");
        }

        setIsChecking(false);
      };

      checkAuth();
    }, [isAuthenticated, dispatch, router]);

    if (isChecking) {
      return (
        <div className="flex h-screen items-center justify-center">
          <p className="animate-pulse text-sm text-gray-500">
            Authenticating...
          </p>
        </div>
      );
    }
    if (!isAuthenticated) return null;

    return <Component {...props} />;
  };
}
