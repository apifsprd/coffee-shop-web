import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import { getLikedFoods } from "@/lib/api-list/food";
import { toast } from "next-toast";
import React, { useEffect, useState } from "react";
import ProductList from "./components/index/molecules/ProductList";
import { food } from "@/lib/types/food";

export default function Favorite() {
  const [data, setData] = useState<food[]>([]);

  const getData = async () => {
    try {
      const response = await getLikedFoods();
      if (response.code === "200") {
        setData(response.data);
      }
    } catch (error) {
      toast.error("Failed to get favorite, please try again.");
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Favorite";
    getData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <Text variant="h5">My Favorite</Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.map((item: food, index: number) => (
            <ProductList
              key={item.id || index} // Selalu utamakan ID unik
              item={item}
              onRefetch={getData}
              variant="add"
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
