import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 md:px-8 lg:px-32 w-full scroll-mt-24"
    >
      <div className="relative w-full lg:w-[30%] h-64 sm:h-80 lg:h-112 rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwc2hvcHxlbnwwfDF8MHx8fDI%3D"
          alt="Indo Cafe n Resto"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
        <p className="uppercase font-semibold text-sm tracking-wide">
          About Us
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Where We Do Business — Indo Cafe n Resto
        </h3>
        <h5 className="text-base sm:text-lg text-gray-700">
          Indo Cafe n Resto aims to create a flexible co-working environment
          that provides solutions to a wide variety of working professionals.
          The best place to do business with the best coffee, of course! Indo
          Cafe n Resto is located directly in historic downtown Depok.
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="relative h-56 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlJTIwc2hvcHxlbnwwfDB8MHx8fDI%3D"
              alt="Cafe view"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-56 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvZmZlZSUyMHNob3B8ZW58MHwwfDB8fHwy"
              alt="Cafe view"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
