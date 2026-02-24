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

  // --- STATE BARU UNTUK INFINITE SCROLL ---
  const [visibleCount, setVisibleCount] = useState(10); // Jumlah data awal yang tampil
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Fungsi untuk menambah data saat scroll sampai bawah
  const loadMore = () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);

    // Simulasi loading halus 500ms agar UX terasa "nyata"
    setTimeout(() => {
      setVisibleCount((prev) => prev + 10);
      setIsFetchingMore(false);
    }, 500);
  };

  // --- LOGIKA INTERSECTION OBSERVER ---
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // Jika elemen "sentinel" paling bawah terlihat di layar
        if (entries[0].isIntersecting) {
          // Cek apakah masih ada data yang bisa ditampilkan
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
      // Reset jumlah tampilan ke 10 setiap kali user mencari sesuatu
      setVisibleCount(10);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, data]);

  // --- DATA YANG AKAN DI-RENDER ---
  // Kita menggunakan slice untuk mengambil sebagian data sesuai visibleCount
  const displayData = keyword
    ? filteredData.slice(0, visibleCount)
    : data.slice(0, visibleCount);

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-4 sticky top-18 bg-white pt-2 pb-2 z-50">
        <div className="flex flex-row items-center gap-2">
          <SearchInput
            label=""
            placeholder="Search makanan enak..."
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
      </div>

      <div className="w-full flex flex-col gap-2 mt-2 pb-12">
        {!loading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayData.map((item: food, index: number) => (
                <ProductList
                  key={item.id || index} // Selalu utamakan ID unik
                  item={item}
                  onRefetch={refetch}
                  variant="add"
                />
              ))}
            </div>

            {/* ELEMENT TARGET UNTUK INFINITE SCROLL */}
            <div
              ref={lastElementRef}
              className="w-full h-20 flex items-center justify-center mt-4"
            >
              {isFetchingMore && (
                <div className="flex flex-col items-center gap-2">
                  <SpinnerLoading />
                  <p className="text-xs text-gray-400">
                    Memuat lebih banyak...
                  </p>
                </div>
              )}

              {/* Pesan jika semua data sudah tampil */}
              {!isFetchingMore &&
                displayData.length >=
                  (keyword ? filteredData.length : data.length) &&
                data.length > 0 && (
                  <p className="text-sm text-gray-400">
                    Semua menu sudah ditampilkan
                  </p>
                )}
            </div>
          </>
        ) : (
          <div className="h-64 flex flex-col justify-center items-center">
            <SpinnerLoading />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
