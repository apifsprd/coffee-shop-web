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
  const [filteredData, setFilteredData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const fetchData = async () => {
    setLoading(false);
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
  const refetch = () => {
    fetchData();
    getCarts();
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Dashboard";
    fetchData();
    getCarts();
  }, []);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLoading(true);
      const filtered = data.filter((item: food) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()),
      );
      setFilteredData(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, data]);

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-4 sticky top-18.25 bg-white pt-2 pb-2 z-50">
        <div className="flex flex-row items-center gap-2">
          <SearchInput
            label=""
            placeholder="Search"
            onChangeText={(text: string) => setKeyword(text)}
          />
          <div className="relative w-fit">
            <ButtonIcon
              icon={<ShoppingCart size={20} color="white" />}
              label=""
              variant="primary"
              shape="square"
              type="link"
              href="/dashboard/cart"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white shadow-sm transform translate-x-1/4 -translate-y-1/4">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>
        {/* <div>
          <ButtonFilter items={[{}, {}, {}, {}, {}, {}]} />
        </div> */}
      </div>
      <div className="w-full flex flex-col gap-2 mt-2">
        {!loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredData.length > 0
              ? filteredData.map((item: food, index: number) => (
                  <ProductList
                    key={index}
                    item={item}
                    onRefetch={refetch}
                    variant="add"
                  />
                ))
              : data.map((item: food, index: number) => (
                  <ProductList
                    key={index}
                    item={item}
                    onRefetch={refetch}
                    variant="add"
                  />
                ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col justify-center items-center">
            <SpinnerLoading />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
