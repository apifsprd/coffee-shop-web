import { ButtonCTA } from "@/components/ui/Button";
import { PaginationBase } from "@/components/ui/pagination";
import Image from "next/image";
import React from "react";

const DUMMY_MENU = [
  {
    title: "Coffee",
    description:
      "It's a perfect drink to start your day or to pick you up in the afternoon.",
    price: "Rp. 20.000-Rp.50.000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_qq_aUgY1uWxEkujugXcWr8y5CX04-U0SYy1SD9DddICp1blcHwpDow64mEH0",
  },
  {
    title: "Tea",
    description:
      "Refreshing green tea drink made with high-quality matcha powder and fresh milk.",
    price: "Rp. 20.000-Rp.50.000",
    image:
      "https://images.unsplash.com/photo-1502303122794-aba2d55cc873?q=80&w=931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Pastry",
    description:
      "Freshly baked pastries made with high-quality ingredients, perfect for snacking or as a sweet treat to accompany your favorite drink.",
    price: "Rp. 20.000-Rp.120.000",
    image:
      "https://images.unsplash.com/photo-1645453014906-7f2874408d8d?q=80&w=926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Main Course & Snack",
    description:
      "Main Course is a variety of dishes that will satisfy your hunger and cravings. From classic comfort food to modern twists, our menu is designed to provide something for everyone.",
    price: "Rp.30.000-Rp.200.000",
    image:
      "https://images.unsplash.com/photo-1562607635-4608ff48a859?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          <p className="text-sm text-gray-500">INDO Cafe n Resto</p>
          <h5 className="text-xl sm:text-2xl font-semibold">
            Explore Our Categories
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
              <h6 className="text-base sm:text-lg font-semibold">
                {menu.title}
              </h6>
              <p className="text-sm sm:text-base text-gray-900 line-clamp-4 leading-relaxed">
                {menu.description}
              </p>
              <p className="text-sm sm:text-base text-gray-900 line-clamp-4 leading-relaxed">
                Price range : {menu.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
