import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import React, { useEffect, useState, useRef, useCallback } from "react";
import CustomerCardList from "./components/customer/molecules/CustomerCardList";
import { SearchInput } from "@/components/ui/input";
import { getAllUser } from "@/lib/api-list/user";
import { User } from "@/lib/types/auth";

const ITEMS_PER_PAGE = 8; // Jumlah data per "load"

function Customer() {
  // 1. STATES
  const [masterData, setMasterData] = useState<User[]>([]); // Data asli dari API
  const [displayData, setDisplayData] = useState<User[]>([]); // Data yang ditampilkan (sudah difilter & dipotong)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");

  const observer = useRef<IntersectionObserver | null>(null);

  // 2. FETCH DATA
  const getCustomers = async () => {
    try {
      const response = await getAllUser();
      if (response.code === "200") {
        setMasterData(response.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Customers";
    getCustomers();
  }, []);

  // 3. LOGIKA FILTER & SLICE (Infinite Scroll)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Filter dulu dari Master Data
      const filtered = masterData.filter(
        (item: User) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      // Ambil sebagian data menggunakan slice (mirip splice tapi tidak merusak array asli)
      // Kita ambil dari index 0 sampai visibleCount
      const slicedData = filtered.slice(0, visibleCount);

      setDisplayData(slicedData);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, masterData, visibleCount]);

  // Reset visibleCount saat user mengetik agar scroll mulai dari awal lagi
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm]);

  // 4. INFINITE SCROLL OBSERVER
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Jika user melihat elemen terakhir, tambah jumlah data yang ditampilkan
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-0">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Text variant="h4" className="text-2xl font-bold text-gray-900">
              Customers
            </Text>
            <Text className="text-sm text-gray-500">
              Manage and view your registered members ({masterData.length}{" "}
              total)
            </Text>
          </div>

          <div>
            <SearchInput
              placeholder="Search customer..."
              label=""
              onChangeText={(text: string) => setSearchTerm(text)}
            />
          </div>
        </div>

        {/* CUSTOMER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayData.length > 0 ? (
            displayData.map((customer, index) => {
              // Jika ini elemen terakhir di displayData, pasang Ref Observer
              if (displayData.length === index + 1) {
                return (
                  <div ref={lastElementRef} key={customer.id}>
                    <CustomerCardList
                      customer={customer}
                      onUpdateRole={() => {}}
                    />
                  </div>
                );
              }
              return (
                <CustomerCardList
                  key={customer.id}
                  customer={customer}
                  onUpdateRole={() => {}}
                />
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Text className="text-gray-400">No customers found.</Text>
            </div>
          )}
        </div>

        {/* LOADING INDICATOR (Opsional) */}
        {displayData.length <
          masterData.filter((c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ).length && (
          <div className="py-4 text-center">
            <Text className="text-gray-400 animate-pulse">
              Loading more customers...
            </Text>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Customer;
