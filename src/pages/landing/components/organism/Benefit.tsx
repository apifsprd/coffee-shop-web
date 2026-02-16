import { ButtonCTA } from "@/components/ui/Button";
import { Coffee, HeartHandshake, IdCard } from "lucide-react";
import React from "react";

const BENEFITS = [
  {
    title: "Exceptional Coffee",
    description:
      "Better productivity and businees starts and ends with better coffee. If you love great coffee you're going to love Indo Cafe n Resto.",
    icon: <Coffee className="w-16 h-16" />,
  },
  {
    title: "Flexible Co-Working",
    description:
      "Our co-working space offers a variety of options for both members and non-members alike. We created a space where anyone can do better business.",
    icon: <HeartHandshake className="w-16 h-16" />,
  },
  {
    title: "Affordable Membership",
    description:
      "We offer a wide range of membership options to suit every budget. Whether you're a student, a professional, or a business, we have a membership plan that meets your needs.",
    icon: <IdCard className="w-16 h-16" />,
  },
];

export default function Benefit() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/landing-page/coffee-shop-landscape.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 md:gap-8 px-4 sm:px-8 md:px-12 lg:px-56 py-12 md:py-20 text-center">
        <p className="text-xs sm:text-sm text-white uppercase tracking-widest">
          Indo Cafe n Resto Benefits
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          The Cozy Cafe Experience
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full mt-6">
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="p-6 md:p-8 rounded-2xl bg-white flex flex-col gap-4 items-center text-center"
            >
              {benefit.icon}
              <div className="min-h-16 flex items-center">
                <h5 className="text-lg md:text-xl font-semibold">
                  {benefit.title}
                </h5>
              </div>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
