import { ButtonCTA } from "@/components/ui/Button";
import { PaginationBase } from "@/components/ui/pagination";
import Image from "next/image";
import React from "react";

const DUMMY_MENU = [
  {
    title: "Iced Coffee Latte",
    description:
      "Our iced coffee latte is made with high-quality coffee beans and fresh milk. It's a perfect drink to start your day or to pick you up in the afternoon.",
    price: "Rp. 20.000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_qq_aUgY1uWxEkujugXcWr8y5CX04-U0SYy1SD9DddICp1blcHwpDow64mEH0",
  },
  {
    title: "Strawberry Matcha Latte",
    description:
      "A refreshing and sweet drink made with high-quality matcha powder and fresh milk. Perfect for those who love the taste of green tea.",
    price: "Rp. 20.000",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR1psz38cm3S3mS34bHyHBhGCExmQTR7_08Qoh3dr2vjL79ASopbsAViEELrK0y",
  },
  {
    title: "Cappuccino",
    description:
      "Our cappuccino is made with high-quality espresso and steamed milk. It's a perfect drink for those who love the rich and creamy taste of coffee.",
    price: "Rp. 20.000",
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT1qzPq4tt_qSFart1QkD5WVRlldNcDv9mJfdRr52EyeodoKVMo6i9vzCHoJWZx",
  },
  {
    title: "Lotus Biscoff Frappe",
    description:
      "A refreshing and sweet drink made with high-quality lotus biscotti and fresh milk. Perfect for those who love the taste of cookies and cream.",
    price: "Rp. 20.000",
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSdkFPKdMDzPjQvluDCC6MZ_4gQBg0DmrMyMhklyh1bg2VLhrs-iDMAWGZr5GA-",
  },
  {
    title: "Cold Brewed Coffee",
    description:
      "Our cold brewed coffee is made with high-quality Arabica coffee beans and fresh water. It's a smooth and refreshing drink perfect for hot days.",
    price: "Rp. 20.000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmsFcuBuKN_TgR_tesBDc14tjxCk7FaulwU_48ymCEj47WHV-RgXN2l8ge7zfR",
  },
];

export default function Menu() {
  return (
    <section
      id="menu"
      className="flex flex-col gap-8 px-4 sm:px-8 md:px-12 lg:px-32 py-8 scroll-mt-24"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Our Menu</p>
          <h5 className="text-xl sm:text-2xl font-semibold">
            Indo Cafe n Resto Menu
          </h5>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {DUMMY_MENU.map((menu, index) => (
          <div
            key={index}
            className="flex flex-col p-4 gap-4 rounded-2xl border border-gray-200 bg-white h-full"
          >
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden">
              <Image
                src={menu.image}
                alt={menu.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <h6 className="text-base sm:text-lg font-bold">{menu.title}</h6>
              <p className="text-sm sm:text-base text-gray-500 line-clamp-4">
                {menu.description}
              </p>
              <h6 className="text-lg font-semibold mt-auto">{menu.price}</h6>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <ButtonCTA href="/menu" label="See All Menu" variant="primary" />
      </div>
    </section>
  );
}
