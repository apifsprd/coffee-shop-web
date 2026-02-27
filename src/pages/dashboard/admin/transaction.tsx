import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import { getAllTransaction } from "@/lib/api-list/transaction";
import { toast } from "next-toast";
import React, { useEffect, useState, useRef, useCallback } from "react";
import OrderList from "../components/order/molecules/OrderList";
import { SearchInput } from "@/components/ui/input";
import { order } from "@/lib/types/order";

function Transaction() {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]); // Data yang ditampilkan
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loader = useRef(null);
  const itemsPerPage = 10;

  // Fetch Data (Satu kali di awal)
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllTransaction();
      if (response.code === "200") {
        const sorted = response.data.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setData(sorted);
        // Load batch pertama
        setDisplayData(sorted.slice(0, itemsPerPage));
        if (sorted.length <= itemsPerPage) setHasMore(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memuat data berikutnya saat scroll
  const loadMoreItems = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Ambil dataset yang benar (apakah sedang mencari atau tidak)
    const currentDataset = searchTerm
      ? data.filter((item: order) =>
          item.invoiceId?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : data;

    setTimeout(() => {
      const nextBatch = currentDataset.slice(0, (page + 1) * itemsPerPage);
      setDisplayData(nextBatch);
      setPage((prev) => prev + 1);

      if (nextBatch.length >= currentDataset.length) {
        setHasMore(false);
      }
      setLoading(false);
    }, 500);
  }, [data, page, loading, hasMore, searchTerm]);

  // Observer untuk mendeteksi element di paling bawah
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];
      if (target.isIntersecting && hasMore) {
        loadMoreItems();
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loadMoreItems, hasMore]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // 1. Filter data berdasarkan invoice (atau field lain seperti nama jika ada)
      const filtered = data.filter((item: order) =>
        item.invoiceId?.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      // 2. Reset Page dan DisplayData untuk hasil pencarian
      setPage(1);
      const initialBatch = filtered.slice(0, itemsPerPage);
      setDisplayData(initialBatch);

      // 3. Update status hasMore berdasarkan hasil filter
      setHasMore(initialBatch.length < filtered.length);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, data]);

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Transaction";
    getData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
        {/* Header Responsif */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <Text
              variant="h4"
              className="text-xl md:text-2xl font-bold text-gray-900"
            >
              Transaction
            </Text>
            <p className="text-sm text-gray-500 ">
              {data.length} Total Transaction(s)
            </p>
          </div>
          <div>
            <SearchInput
              placeholder="Search Invoice..."
              onChangeText={(text) => setSearchTerm(text)}
              label=""
            />
          </div>
        </div>

        {/* List Transaksi */}
        <div className="grid grid-cols-1 gap-4">
          {displayData.map((item, index) => (
            <OrderList
              item={item}
              key={item.id || index}
              role="admin"
              onRefetch={getData}
            />
          ))}
        </div>

        {/* Loader Element: Muncul saat discroll ke bawah */}
        <div ref={loader} className="py-10 flex justify-center items-center">
          {loading && hasMore && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <Text className="text-sm text-gray-500 italic">
                Memuat lebih banyak...
              </Text>
            </div>
          )}
          {!hasMore && data.length > 0 && (
            <Text className="text-gray-400 text-sm italic">
              Semua transaksi telah dimuat.
            </Text>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Transaction;
