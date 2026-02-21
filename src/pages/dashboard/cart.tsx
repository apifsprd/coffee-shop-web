import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getCart } from "@/lib/api-list/cart";
import { toast } from "next-toast";
import React, { useEffect, useState } from "react";
import ProductList from "./components/index/molecules/ProductList";
import { Text } from "@/components/ui/Text";

export default function Cart() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await getCart();
      if (response.code === "200") {
        setData(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Cart";
    getData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 pb-8">
        <Text variant="h5">Cart ({data.length})</Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.map((item: food, index: number) => (
            <ProductList
              key={index}
              item={item.food}
              onRefetch={getData}
              variant="cart"
              cartID={item.id}
              cartQty={item.quantity}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
