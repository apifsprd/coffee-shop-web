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
import { ShoppingCart } from "lucide-react";
import { getCart } from "@/lib/api-list/cart";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getCarts = async () => {
    try {
      const response = await getCart();
      if (response.code === "200") {
        const length = response.data.length;
        setCartCount(length);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
    getCarts();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-4 sticky top-18.25 bg-white pr-4 py-2 z-50">
        <div className="flex flex-row items-center gap-2">
          <SearchInput label="" placeholder="Search" />
          <div className="relative w-fit">
            <ButtonIcon
              icon={<ShoppingCart size={20} color="white" />}
              label=""
              variant="primary"
              shape="square"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white shadow-sm transform translate-x-1/4 -translate-y-1/4">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>
        <div>
          <ButtonFilter items={[{}, {}, {}, {}, {}, {}]} />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 mt-2">
        {!loading ? (
          data.map((item: food) => (
            <ProductList key={item.id} item={item} onFetchCount={getCarts} />
          ))
        ) : (
          <div className="h-64 flex flex-col justify-center items-center">
            <SpinnerLoading />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
