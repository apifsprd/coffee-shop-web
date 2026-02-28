import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import React, { useEffect, useState, useRef, useCallback } from "react";
import CustomerCardList from "./components/customer/molecules/CustomerCardList";
import { SearchInput } from "@/components/ui/input";
import { getAllUser } from "@/lib/api-list/user";
import { User } from "@/lib/types/auth";
import { ButtonBase } from "@/components/ui/Button";

const ITEMS_PER_PAGE = 8;

function Customer() {
  const [masterData, setMasterData] = useState<User[]>([]);
  const [displayData, setDisplayData] = useState<User[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [triggerRefresh, setTriggerRefresh] = useState("");

  const observer = useRef<IntersectionObserver | null>(null);

  const handleRefreshData = () => {
    setTriggerRefresh(Math.random().toString());
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Customers";
    const getCustomers = async (category?: string) => {
      try {
        const response = await getAllUser();
        if (response.code === "200") {
          const sorted = response.data.sort((a: User, b: User) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA.localeCompare(nameB);
          });
          const customer = sorted.filter((item: User) => item.role === "user");
          const admin = sorted.filter((item: User) => item.role === "admin");

          if (category === "customer") {
            setMasterData(customer);
          } else if (category === "admin") {
            setMasterData(admin);
          } else {
            setMasterData(sorted);
          }
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    getCustomers(category);
  }, [category, triggerRefresh]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = masterData.filter(
        (item: User) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      const slicedData = filtered.slice(0, visibleCount);
      setDisplayData(slicedData);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, masterData, visibleCount]);

  useEffect(() => {
    const slicedData = () => {
      setVisibleCount(ITEMS_PER_PAGE);
    };
    slicedData();
  }, [searchTerm]);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
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

          <div className="flex flex-row gapp-4">
            <SearchInput
              placeholder="Search customer..."
              label=""
              onChangeText={(text: string) => setSearchTerm(text)}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <ButtonBase
            label="All"
            shape="pill"
            size="md"
            type="button"
            variant={category === "all" ? "primary" : "secondary"}
            eventClick={() => {
              setCategory("all");
            }}
          />
          <ButtonBase
            label="Customer"
            shape="pill"
            size="md"
            type="button"
            variant={category === "customer" ? "primary" : "secondary"}
            eventClick={() => {
              setCategory("customer");
            }}
          />
          <ButtonBase
            label="Admin"
            shape="pill"
            size="md"
            type="button"
            variant={category === "admin" ? "primary" : "secondary"}
            eventClick={() => {
              setCategory("admin");
            }}
          />
        </div>

        {/* CUSTOMER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayData.length > 0 ? (
            displayData.map((customer, index) => {
              if (displayData.length === index + 1) {
                return (
                  <div ref={lastElementRef} key={index}>
                    <CustomerCardList
                      customer={customer}
                      onRefetch={handleRefreshData}
                    />
                  </div>
                );
              }
              return (
                <CustomerCardList
                  key={index}
                  customer={customer}
                  onRefetch={handleRefreshData}
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
