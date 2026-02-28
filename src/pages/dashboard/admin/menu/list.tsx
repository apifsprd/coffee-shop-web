import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ButtonBase } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/input";
import { Text } from "@/components/ui/Text";
import { getFoods } from "@/lib/api-list/food";
import ProductList from "@/pages/dashboard/components/index/molecules/ProductList";
import { toast } from "next-toast";
import { food } from "@/lib/types/food";

function Menu() {
  const [menus, setMenu] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
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
      } catch (error: unknown) {
        toast.error(
          "Failed to get menu, please try again (error: an unknown error occurred)",
        );
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
            <Text variant="h3">Menu</Text>
            <p className="text-sm text-gray-500">
              Manage your menu, currently {menus.length} items
            </p>
          </div>
          <div className="w-full flex flex-col gap-2 sm:w-auto sm:flex-row">
            <div className="flex flex-1">
              <ButtonBase
                label="Create New Menu"
                type="link"
                href="/dashboard/admin/menu/form"
              />
            </div>
            <div className="flex">
              <SearchInput
                label=""
                placeholder="Search"
                onChangeText={(keyword: string) => {
                  setSearchTerm(keyword);
                }}
              />
            </div>
          </div>
        </div>

        {/* LIST GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
          {displayData.map((item: food, index: number) => {
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
