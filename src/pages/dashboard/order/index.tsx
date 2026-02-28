import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import { getTransactionbyUser } from "@/lib/api-list/transaction";
import { toast } from "next-toast";
import React, { useEffect, useState } from "react";
import OrderList from "../components/order/molecules/OrderList";
import { SpinnerLoading } from "@/components/ui/loading";
import { ClipboardList } from "lucide-react";
import Link from "next/link";

export default function Order() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getTransactionbyUser();
      if (response.code === "200") {
        const sorted = response.data.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        setData(sorted);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | My Order";
    getData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <Text variant="h4" className="font-bold text-gray-900">
              My Order
            </Text>
            <p className="text-gray-500 max-w-sm mt-2 mb-8">
              Monitor your order status and transaction history
            </p>
          </div>
          <div className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
            {data.length} Transaction(s)
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col gap-4 min-h-[50vh]">
          {loading ? (
            <div className="flex-1 flex flex-col justify-center items-center gap-3">
              <SpinnerLoading />
              <Text variant="span" className="text-gray-400 animate-pulse">
                Mengambil riwayat pesanan...
              </Text>
            </div>
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {data.map((item, index) => (
                <div key={index}>
                  <OrderList item={item} role="user" onRefetch={getData} />
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY STATE: Sangat penting untuk UX */
            <div className="flex-1 flex flex-col justify-center items-center py-20 text-center">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                <ClipboardList size={48} className="text-gray-300" />
              </div>
              <Text variant="h6" className="font-bold text-gray-800">
                Belum ada pesanan
              </Text>
              <Text variant="p" className="text-gray-500 max-w-xs mx-auto mt-2">
                Sepertinya Anda belum memesan makanan apa pun hari ini. Yuk,
                jelajahi menu kami!
              </Text>
              <Link
                href="/dashboard"
                className="mt-6 bg-primary text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Mulai Pesan
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
