import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import { getFoods } from "@/lib/api-list/food";
import { getAllUser } from "@/lib/api-list/user";
import { User } from "@/lib/types/auth";
import { food } from "@/lib/types/food";
import formatRupiah from "@/utils/formatRupiah";
import { Heart, Star, UserIcon } from "lucide-react";
import { toast } from "next-toast";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getAllTransaction } from "@/lib/api-list/transaction";
import { order } from "@/lib/types/order";

// 1. Registrasi Komponen Chart.js yang dibutuhkan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const CardList = ({ data, type }: { data: food; type: string }) => {
  return (
    <div key={data.id} className="flex flex-row gap-4 items-center">
      <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
        <Image
          src={data.imageUrl}
          alt={data.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1 md:gap-2 flex-1 min-w-0">
        <Text
          variant="h5"
          className="text-gray-900 capitalize truncate"
          key={data.id}
        >
          {data.name}
        </Text>
        {type === "rating" ? (
          <div className="flex flex-row gap-1 items-center">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
            <Text variant="p" className="text-gray-700 text-sm md:text-base">
              {data.rating}
            </Text>
          </div>
        ) : type === "like" ? (
          <div className="flex flex-row gap-1 items-center">
            <Heart size={18} className="fill-red-400 text-red-400" />
            <Text variant="p" className="text-gray-700 text-sm md:text-base">
              {data.totalLikes}
            </Text>
          </div>
        ) : (
          <div className="flex flex-row gap-2 md:gap-3 flex-wrap">
            <div className="flex flex-row gap-1 items-center">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <Text variant="p" className="text-gray-700 text-sm md:text-base">
                {data.rating}
              </Text>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Heart size={18} className="fill-red-400 text-red-400" />
              <Text variant="p" className="text-gray-700 text-sm md:text-base">
                {data.totalLikes}
              </Text>
            </div>
          </div>
        )}
      </div>
      <div className="shrink-0 text-right">
        <Text
          variant="h6"
          className="text-gray-900 text-sm md:text-base font-semibold"
        >
          {formatRupiah(data.price)}
        </Text>
      </div>
    </div>
  );
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Penting untuk responsivitas chart
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Last 7 Days Transactions",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

function Overview() {
  const [menuByRating, setMenuByRating] = useState<food[]>([]);
  const [menuByLike, setMenuByLike] = useState<food[]>([]);
  const [menuByPrice, setMenuByPrice] = useState<food[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [admin, setAdmin] = useState<User[]>([]);
  const [transaction, setTransaction] = useState<order[]>([]);

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Overview";
    const fetchData = async () => {
      try {
        const response = await getFoods();
        if (response.code === "200") {
          const dataSort = [...response.data];

          const sortByRating = [...dataSort].sort(
            (a: food, b: food) => b.rating - a.rating,
          );
          setMenuByRating(sortByRating.slice(0, 5));

          const sortByLike = [...dataSort].sort(
            (a: food, b: food) => b.totalLikes - a.totalLikes,
          );
          setMenuByLike(sortByLike.slice(0, 5));

          const sortByPrice = [...dataSort].sort(
            (a: food, b: food) => b.price - a.price,
          );
          setMenuByPrice(sortByPrice.slice(0, 5));
        }
      } catch (error: unknown) {
        toast.error(
          "Failed to get menu, please try again (error: an unknown error occurred)",
        );
      }
    };
    fetchData();

    const getCustomers = async () => {
      try {
        const response = await getAllUser();
        if (response.code === "200") {
          const sorted = response.data.sort((a: User, b: User) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA.localeCompare(nameB);
          });
          const customer = sorted.filter((item: User) => item.role === "user");
          const adminUsers = sorted.filter(
            (item: User) => item.role === "admin",
          );

          setUser(customer);
          setAdmin(adminUsers);
        }
      } catch (error: unknown) {
        toast.error(
          "Failed to get users, please try again (error: an unknown error occurred)",
        );
      }
    };
    getCustomers();

    const getTransaction = async () => {
      try {
        const response = await getAllTransaction();
        if (response.code === "200") {
          const sorted = response.data.sort((a: order, b: order) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          setTransaction(sorted);
        }
      } catch (error: unknown) {
        toast.error(
          "Failed to get transaction, please try again (error: an unknown error occurred)",
        );
      }
    };
    getTransaction();
  }, []);

  // --- MEMPROSES DATA CHART ---
  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    const transactionCounts = last7Days.map((date) => {
      return transaction.filter((t) => {
        const transactionDate = new Date(t.createdAt)
          .toISOString()
          .split("T")[0];
        return transactionDate === date;
      }).length;
    });

    const labels = last7Days.map((date) => {
      return new Date(date).toLocaleDateString("en-EN", {
        weekday: "short",
        day: "numeric",
      });
    });

    return {
      labels: labels,
      datasets: [
        {
          fill: true,
          label: "Transaction",
          data: transactionCounts,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };
  }, [transaction]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-2 md:p-4">
        {/* Row 1: Chart & Stats */}
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-1 h-100 xl:h-auto">
            <Line data={chartData} options={options} />
          </div>

          <div className="flex flex-col sm:flex-row xl:flex-col gap-4 xl:w-1/4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-1 flex-col gap-2">
              <div className="flex flex-row gap-2 justify-start items-center">
                <div className="bg-gray-200 p-2 rounded-xl">
                  <UserIcon size={20} className="fill-gray-900" />
                </div>
                <Text variant="p">Total Users</Text>
              </div>
              <Text variant="h3">{user.length}</Text>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-1 flex-col gap-2">
              <div className="flex flex-row gap-2 justify-start items-center">
                <div className="bg-gray-200 p-2 rounded-xl">
                  <UserIcon size={20} className="fill-gray-900" />
                </div>
                <Text variant="p">Total Admin</Text>
              </div>
              <Text variant="h3">{admin.length}</Text>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-1 flex-col gap-2">
              <div className="flex flex-row gap-2 justify-start items-center">
                <div className="bg-gray-200 p-2 rounded-xl">
                  <UserIcon size={20} className="fill-gray-900" />
                </div>
                <Text variant="p">Total Transaction</Text>
              </div>
              <Text variant="h3">{transaction.length}</Text>
            </div>
          </div>
        </div>

        {/* Row 2: Tables */}
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-1 flex-col gap-4">
            <Text variant="h5" className="font-semibold">
              Top Rated Menu
            </Text>
            <div className="flex flex-col gap-4">
              {menuByRating.map((food: food) => (
                <CardList key={food.id} data={food} type="rating" />
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-1 flex-col gap-4">
            <Text variant="h5" className="font-semibold">
              Top Liked Menu
            </Text>
            <div className="flex flex-col gap-4">
              {menuByLike.map((food: food) => (
                <CardList key={food.id} data={food} type="like" />
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-1 flex-col gap-4">
            <Text variant="h5" className="font-semibold">
              Top Expensive
            </Text>
            <div className="flex flex-col gap-4">
              {menuByPrice.map((food: food) => (
                <CardList key={food.id} data={food} type="all" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Overview;
