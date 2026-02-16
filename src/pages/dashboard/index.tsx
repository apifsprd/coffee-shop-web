import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Indo Cafe n Resto | Dashboard";
  }, []);

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl p-6 border border-gray-200"></div>
    </DashboardLayout>
  );
}
