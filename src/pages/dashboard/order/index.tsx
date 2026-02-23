import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import { getTransactionbyUser } from "@/lib/api-list/transaction";
import { toast } from "next-toast";
import React, { useEffect, useState } from "react";
import OrderList from "../components/order/molecules/OrderList";

export default function Order() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await getTransactionbyUser();
      if (response.code === "200") {
        setData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    document.title = "Indo Cafe n Resto | My Order";
    getData();
  }, []);
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <Text variant="h5">My Order</Text>
        <div>
          {data.map((item, index) => (
            <OrderList key={index} item={item} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
