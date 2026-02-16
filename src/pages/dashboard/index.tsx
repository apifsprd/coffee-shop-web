import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getFoods } from "@/lib/api-list/food";
import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { Heart, Star } from "lucide-react";
import { food } from "@/lib/types/food";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getFoods();
      if (response.code === "200") {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Dashboard";

    // 1. Buat flag untuk melacak status mount
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await getFoods();
        if (isMounted && response.code === "200") {
          setData(response.data);
        }
      } catch (error) {
        if (isMounted) console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-2">
        {data.map((item: food) => (
          <button
            key={item.id}
            className="bg-white h-32 rounded-2xl p-2 border border-gray-200 flex flex-row justify-start items-start gap-4"
          >
            <div>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-2xl"
                placeholder="blur"
                blurDataURL="https://commons.wikimedia.org/wiki/Category:Image_placeholders#/media/File:DefaultImage.png"
              />
            </div>
            <div className="h-full flex flex-col gap-1 justify-between items-start">
              <div>
                <Text variant="h5" className="text-start text-gray-900">
                  {item.name}
                </Text>
                <div className="flex flex-row justify-start items-center gap-4">
                  <div className="flex flex-row justify-start items-center gap-1">
                    <Heart className="w-4 h-4 text-red-600" />
                    <Text variant="span" className="text-start text-gray-900">
                      {item.totalLikes}
                    </Text>
                  </div>
                  <div className="flex flex-row justify-start items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <Text variant="span" className="text-start text-gray-900">
                      {item.rating}
                    </Text>
                  </div>
                </div>
              </div>
              <Text variant="h6" className="text-start text-orange-600">
                {formatRupiah(item.price)}
              </Text>
            </div>
          </button>
        ))}
      </div>
    </DashboardLayout>
  );
}
