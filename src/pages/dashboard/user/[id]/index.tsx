import DashboardLayout from "@/components/layouts/DashboardLayout";
import { api } from "@/lib/api";
import { checkAuth } from "@/lib/auth";
import { User } from "@/types/auth";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface UserPageProps {
  token: string;
}

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (
  context
) => {
  return checkAuth(context);
};

function Index({ token }: UserPageProps) {
  const router = useRouter();
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.getUser(Number(router.query.id), token);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [token, router.query.id]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white border border-gray-200">
        {!loading ? (
          <div className="flex flex-col gap-4 items-center">
            <div className="w-32 h-32 overflow-hidden relative">
              <Image
                src={data?.avatar || ""}
                alt="Avatar"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1 items-center text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {data?.first_name + " " + data?.last_name}
              </h1>
              <p className="text-gray-600 text-base">{data?.email}</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-32 flex justify-center items-center">
            <p className="text-gray-600 text-base animate-pulse">Loading...</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Index;
