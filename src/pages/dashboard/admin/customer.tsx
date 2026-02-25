import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Text } from "@/components/ui/Text";
import React, { useEffect, useState } from "react";
import { Mail, Phone, User, ShieldCheck, Search } from "lucide-react";
import Image from "next/image";

// Mock data berdasarkan struktur yang kamu berikan
const MOCK_CUSTOMERS = [
  {
    id: "0408ed79-5220-4eda-8bf7-25e49464f452",
    name: "avenger",
    email: "avenger@gmail.com",
    role: "admin",
    profilePictureUrl: null,
    phoneNumber: "23454463",
  },
  // Kamu bisa tambah data lain di sini
];

function Customer() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Customers";
  }, []);

  // Logika pencarian sederhana
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Text variant="h4" className="text-2xl font-bold text-gray-900">
              Customers
            </Text>
            <Text className="text-sm text-gray-500">
              Manage and view your registered members
            </Text>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* CUSTOMER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Text className="text-gray-400">No customers found.</Text>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

{
  /* SUB-COMPONENT: CUSTOMER CARD */
}
function CustomerCard({ customer, onUpdateRole }) {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-2xl hover:shadow-md transition-all group">
      <div className="flex flex-col items-center text-center gap-3">
        {/* AVATAR SECTION */}
        <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-gray-50">
          {customer.profilePictureUrl ? (
            <Image
              src={customer.profilePictureUrl}
              alt={customer.name}
              fill
              className="object-cover"
            />
          ) : (
            <User size={32} className="text-primary" />
          )}
        </div>

        {/* INFO SECTION */}
        <div className="flex flex-col gap-1 w-full">
          <Text className="font-bold text-gray-900 capitalize truncate">
            {customer.name}
          </Text>
          <Text className="text-xs text-gray-500 truncate mb-2">
            {customer.email}
          </Text>

          {/* ROLE SELECTOR / TOGGLE */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">
              Current Role
            </span>
            <button
              onClick={() =>
                onUpdateRole(
                  customer.id,
                  customer.role === "admin" ? "user" : "admin",
                )
              }
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                customer.role === "admin"
                  ? "bg-orange-500 text-white shadow-md shadow-orange-100"
                  : "bg-blue-500 text-white shadow-md shadow-blue-100"
              }`}
            >
              {customer.role === "admin" ? (
                <ShieldCheck size={14} />
              ) : (
                <User size={14} />
              )}
              <span className="capitalize">{customer.role}</span>
            </button>
            <p className="text-[9px] text-gray-400 italic">
              Click to switch role
            </p>
          </div>
        </div>

        <div className="w-full pt-4 border-t border-gray-50 mt-2 flex gap-2">
          <button className="flex-1 py-2 text-xs font-semibold text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default Customer;
