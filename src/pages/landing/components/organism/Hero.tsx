import { ButtonCTA } from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col-reverse lg:flex-row items-center justify-between py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-16 mx-4 md:mx-8 lg:mx-16 bg-[#ede6da] rounded-2xl gap-10 scroll-mt-24"
    >
      <div className="flex flex-col gap-6 flex-1 text-center lg:text-left px-0 md:px-8 lg:px-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
          Where Good Coffee and Great Ideas meet!
        </h1>
        <h5 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700">
          When looking for a place to get work done, visit INDO Coffee n Resto
          today, for your next great meeting or your best cup of coffee yet!
          Networking groups welcomed and accomplished!
        </h5>
        <div className="flex justify-center mt-8 lg:justify-start">
          <ButtonCTA href="#" label="Order Now" variant="primary" />
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <Image
          src="/images/landing-page/artwork.png"
          alt="hero"
          width={600}
          height={600}
          className="w-60 sm:w-72 md:w-96 lg:w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
