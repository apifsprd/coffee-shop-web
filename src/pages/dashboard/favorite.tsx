import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import { getLikedFoods } from "@/lib/api-list/food";
import { toast } from "next-toast";
import React, { useEffect, useState } from "react";
import ProductList from "./components/index/molecules/ProductList";
import { food } from "@/lib/types/food";
import { SpinnerLoading } from "@/components/ui/loading";
import { HeartOff } from "lucide-react";
import Link from "next/link";

export default function Favorite() {
  const [data, setData] = useState<food[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getLikedFoods();
      if (response.code === "200") {
        setData(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch favorites. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | My Favorites";
    getData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* HEADER */}
        <div className="border-b border-gray-100 pb-4">
          <Text variant="h4" className="font-bold text-gray-900">
            My Favorites
          </Text>
          <Text variant="span" className="text-gray-500 text-sm">
            Quickly access the meals you love the most.
          </Text>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="h-[50vh] flex flex-col justify-center items-center gap-4">
            <SpinnerLoading />
            <p className="text-gray-400 animate-pulse">
              Loading your favorites...
            </p>
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {data.map((item: food) => (
              <div
                key={item.id}
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                <ProductList item={item} onRefetch={getData} variant="add" />
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="h-[60vh] flex flex-col justify-center items-center text-center px-4">
            <div className="bg-red-50 p-6 rounded-full mb-6">
              <HeartOff size={48} className="text-red-300" />
            </div>
            <Text variant="h5" className="font-bold text-gray-800">
              No Favorites Yet
            </Text>
            <p className="text-gray-500 max-w-sm mt-2 mb-8">
              Tap the heart icon on any dish to save it here for later.
            </p>
            <Link
              href="/dashboard"
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
            >
              Explore Menu
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
