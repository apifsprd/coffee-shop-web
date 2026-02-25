import { useEffect, useState, useRef, useCallback } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getFoods } from "@/lib/api-list/food";
import { food } from "@/lib/types/food";
import ProductList from "./components/index/molecules/ProductList";
import { toast } from "next-toast";
import { SearchInput } from "@/components/ui/input";
import { SpinnerLoading } from "@/components/ui/loading";
import { ButtonIcon } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { getCart } from "@/lib/api-list/cart";

export default function Dashboard() {
  const [data, setData] = useState<food[]>([]);
  const [filteredData, setFilteredData] = useState<food[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const [visibleCount, setVisibleCount] = useState(10);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMore = () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 10);
      setIsFetchingMore(false);
    }, 500);
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const totalAvailable = keyword ? filteredData.length : data.length;
          if (visibleCount < totalAvailable) {
            loadMore();
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleCount, data.length, filteredData.length, keyword],
  );

  const fetchData = async () => {
    // setLoading(true);
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
        setCartCount(response.data.length);
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
      const filtered = data.filter((item: food) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()),
      );
      setFilteredData(filtered);
      setVisibleCount(10);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, data]);

  const displayData = keyword
    ? filteredData.slice(0, visibleCount)
    : data.slice(0, visibleCount);

  return (
    <DashboardLayout>
      {/* SEARCH SECTION: Diperbaiki agar pas dengan header fixed di desktop & mobile */}
      <div className="w-full flex flex-col gap-4 sticky top-[64px] md:top-[72px] bg-gray-50/90 backdrop-blur-sm pt-4 pb-4 z-30">
        <div className="flex flex-row items-center gap-3">
          <div className="flex-1">
            <SearchInput
              label=""
              placeholder="Cari menu favoritmu..."
              onChangeText={(text: string) => setKeyword(text)}
            />
          </div>
          <div className="relative">
            <ButtonIcon
              icon={<ShoppingCart size={22} color="white" />}
              label=""
              variant="primary"
              shape="square"
              type="link"
              href="/dashboard/cart"
              className="shadow-md hover:shadow-lg transition-all"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID: Responsif untuk 4 jenis device */}
      <div className="w-full flex flex-col gap-6 mt-4 pb-24 md:pb-12">
        {!loading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {displayData.map((item: food, index: number) => (
                <div
                  key={item.id || index}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                >
                  <ProductList item={item} onRefetch={refetch} variant="add" />
                </div>
              ))}
            </div>

            {/* INFINITE SCROLL TRIGGER */}
            <div
              ref={lastElementRef}
              className="w-full py-10 flex flex-col items-center justify-center"
            >
              {isFetchingMore ? (
                <div className="flex flex-col items-center gap-3">
                  <SpinnerLoading />
                  <p className="text-sm text-gray-400 font-medium">
                    Menyiapkan menu lainnya...
                  </p>
                </div>
              ) : (
                displayData.length >=
                  (keyword ? filteredData.length : data.length) &&
                data.length > 0 && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[1px] w-20 bg-gray-200" />
                    <p className="text-sm text-gray-400">
                      Kamu sudah melihat semua menu
                    </p>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <div className="h-[60vh] flex flex-col justify-center items-center gap-4">
            <SpinnerLoading />
            <p className="text-gray-500 animate-pulse">Memuat data resto...</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
