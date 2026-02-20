import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getFoods } from "@/lib/api-list/food";
import { food } from "@/lib/types/food";
import ProductList from "./components/index/molecules/ProductList";
import { toast } from "next-toast";
import { SearchInput } from "@/components/ui/input";
import ButtonFilter from "@/components/ui/Button/ButtonFilter";
import { SpinnerLoading } from "@/components/ui/loading";
import { ButtonIcon } from "@/components/ui/Button";
import { History, ShoppingCart } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Dashboard";
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getFoods();
        if (response.code === "200") {
          setData(response.data);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <SearchInput label="" placeholder="Search" />

          <ButtonIcon
            icon={<ShoppingCart size={20} />}
            label=""
            variant="primary"
            shape="square"
          />
        </div>
        <div>
          <ButtonFilter items={[{}, {}, {}, {}, {}, {}]} />
        </div>
        <div className="w-full flex flex-col gap-2">
          {!loading ? (
            data.map((item: food) => <ProductList key={item.id} item={item} />)
          ) : (
            <div className="h-64 flex flex-col justify-center items-center">
              <SpinnerLoading />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
