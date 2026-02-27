import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getFoods } from "@/lib/api-list/food";
import { food } from "@/lib/types/food";
import { toast } from "next-toast";
import React, { useEffect, useState } from "react";
import ProductList from "../components/index/molecules/ProductList";

function Menu() {
  const [menus, setMenu] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getFoods();
      if (response.code === "200") {
        setMenu(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Menu";
    const fetchData = async () => {
      try {
        const response = await getFoods();
        if (response.code === "200") {
          setMenu(response.data);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <DashboardLayout>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {menus.map((item: food, index: number) => (
            <div
              key={item.id || index}
              className="transition-transform duration-300 hover:scale-[1.02]"
            >
              <ProductList item={item} onRefetch={() => {}} variant="admin" />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Menu;
