import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { checkAuth } from "@/lib/auth";
import { User } from "@/types/auth";
import Link from "next/link";
import { api } from "@/lib/api";
import { PaginationBase } from "@/components/ui/pagination";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Image from "next/image";

interface DashboardProps {
  token: string;
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context
) => {
  return checkAuth(context);
};

export default function Dashboard({ token }: DashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 6,
    total: 0,
  });

  useEffect(() => {
    fetchUser();
    fetchUsers(pagination.page, 6, token);
    document.title = "Indo Cafe n Resto | Dashboard";
  }, [pagination.page, token]);

  const fetchUser = async () => {
    try {
      const response = await api.getUser(4, token);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const fetchUsers = async (page: number, per_page: number, token: string) => {
    try {
      setLoadingList(true);
      const response = await api.getUsers(page, per_page, token);

      setPagination({
        page: response.page,
        per_page: response.per_page,
        total: response.total_pages,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setTimeout(() => {
        setLoadingList(false);
      }, 1500);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Welcome back to Indo Cafe n Resto!
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading user data...</p>
        ) : user ? (
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 relative">
              <Image
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name} avatar`}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Failed to load user data</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Users</h2>
        {!loadingList ? (
          users.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <li key={user.id}>
                  <Link
                    href={`/dashboard/user/${user.id}`}
                    className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-200  hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={user.avatar}
                          alt={`${user.first_name} ${user.last_name} avatar`}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : !loading ? (
            <p className="text-gray-500 h-32 w-full">No users found</p>
          ) : (
            <p className="text-gray-500 h-32 w-full">Loading...</p>
          )
        ) : (
          <div className="h-44 w-full flex justify-center items-center bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500  animate-pulse">Loading...</p>
          </div>
        )}

        <div
          className={`w-full flex flex-row justify-center items-center ${
            pagination.total == 1 ? "hidden" : ""
          }`}
        >
          <PaginationBase
            currentPage={pagination.page}
            totalPages={pagination.total}
            eventNext={() =>
              setPagination({
                ...pagination,
                page:
                  pagination.page == pagination.total
                    ? pagination.page
                    : pagination.page + 1,
              })
            }
            eventPrev={() =>
              setPagination({
                ...pagination,
                page:
                  pagination.page == 1 ? pagination.page : pagination.page - 1,
              })
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
