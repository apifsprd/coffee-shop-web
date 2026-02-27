import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getFoods } from "@/lib/api-list/food";
import { food } from "@/lib/types/food";
import { toast } from "next-toast";
import React, { useEffect, useState, useRef, useCallback } from "react"; // Tambahkan useRef & useCallback
import ProductList from "../components/index/molecules/ProductList";
import { Text } from "@/components/ui/Text";
import { SearchInput } from "@/components/ui/input";

function Menu() {
  const [menus, setMenu] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false); // State untuk loading indicator

  // 1. Tambahkan ref untuk observer
  const observer = useRef<IntersectionObserver | null>(null);

  // 2. Buat callback ref untuk elemen terakhir dalam list
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return; // Jangan trigger jika sedang loading
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // Jika elemen terakhir terlihat di layar
        if (entries[0].isIntersecting) {
          // Cek apakah masih ada data yang bisa dimuat
          const totalAvailable = searchTerm
            ? filteredData.length
            : menus.length;
          if (visibleCount < totalAvailable) {
            setVisibleCount((prev) => prev + 10);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleCount, filteredData.length, menus.length, searchTerm],
  );

  const handleRefreshData = () => {
    setTriggerRefresh(Math.random().toString());
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Menu";
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getFoods();
        if (response.code === "200") {
          setMenu(response.data);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [triggerRefresh]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = menus.filter((item: food) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(filtered);
      setVisibleCount(10);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, menus]);

  const displayData = searchTerm
    ? filteredData.slice(0, visibleCount)
    : menus.slice(0, visibleCount);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between items-start gap-2 sm:flex-row">
          <div className="flex flex-col gap-1">
            <Text variant="h4">Menu</Text>
            <p className="text-sm text-gray-500">
              Manage your menu, currently {menus.length} items
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <SearchInput
              label=""
              placeholder="Search"
              onChangeText={(keyword: string) => {
                setSearchTerm(keyword);
              }}
            />
          </div>
        </div>

        {/* LIST GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
          {displayData.map((item: food, index: number) => {
            // Cek apakah ini item terakhir yang ditampilkan
            const isLastElement = displayData.length === index + 1;

            return (
              <div
                key={item.id || index}
                ref={isLastElement ? lastElementRef : null} // Pasang ref di sini
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                <ProductList
                  item={item}
                  onRefetch={handleRefreshData}
                  variant="admin"
                />
              </div>
            );
          })}
        </div>

        {/* 3. Loading Indicator saat scroll */}
        {visibleCount < (searchTerm ? filteredData.length : menus.length) && (
          <div className="py-8 flex justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Menu;
