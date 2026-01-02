// import { Geist, Geist_Mono } from "next/font/google";

import { ButtonCTA, ButtonLink, ButtonBase } from "@/components/ui/Button";
import { PaginationBase } from "@/components/ui/pagination";
import { Coffee, HeartHandshake, IdCard } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const benefits = [
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
const menus = [
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
const memberships = [
  {
    title: "Gold Member",
    desc: "Our Gold Membership is perfect for those who need a dedicated workspace to focus on their business. With access to our private meeting rooms, high-speed internet, and unlimited coffee, you'll be able to focus on growing your business without any distractions.",
    color: {
      bg: "bg-yellow-100",
      text: "text-yellow-500",
    },
    price: "Rp. 1.000.000",
  },
  {
    title: "Silver Member",
    desc: "Our Silver Membership is perfect for those who need a flexible workspace to focus on their business. With access to our shared workspace, high-speed internet, and unlimited coffee, you'll be able to focus on growing your business without any distractions.",
    color: {
      bg: "bg-gray-100",
      text: "text-gray-500",
    },
    price: "Rp. 500.000",
  },
  {
    title: "Bronze Member",
    desc: "Our Bronze Membership is perfect for those who need a flexible workspace to focus on their business. With access to our shared workspace, high-speed internet, and unlimited coffee, you'll be able to focus on growing your business without any distractions.",
    color: {
      bg: "bg-[#dcb273]",
      text: "text-[#85541d]",
    },
    price: "Rp. 250.000",
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full min-h-screenflex flex-col gap-8 pt-0 pb-0 px-0">
      <header className="w-full">
        <nav className="relative flex items-center justify-between px-4 py-4 md:px-16 lg:px-32">
          {/* Logo */}
          <div className="w-16 h-16 relative sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
            <Image
              src="/images/logo-transparent.png"
              alt="Logo"
              fill
              content="contain"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 lg:gap-16">
            <li>
              <ButtonLink href="#" title="Home" />
            </li>
            <li>
              <ButtonLink href="#" title="About" />
            </li>
            <li>
              <ButtonLink href="#" title="Menu" />
            </li>
            <li>
              <ButtonLink href="#" title="Membership" />
            </li>
            <li>
              <ButtonLink href="#" title="Contact" />
            </li>
          </ul>

          {/* CTA Desktop */}
          <div className="hidden lg:block">
            <ButtonCTA href="#" label="Reserve Room" variant="primary" />
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden z-50">
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-y border-gray-200
          ${open ? "max-h-125 opacity-100 mb-4" : "max-h-0 opacity-0"}
        `}
        >
          <div className="bg-white px-4 py-4">
            <ul className="flex flex-col gap-4">
              <li>
                <ButtonLink href="#" title="Home" />
              </li>
              <li>
                <ButtonLink href="#" title="About" />
              </li>
              <li>
                <ButtonLink href="#" title="Menu" />
              </li>
              <li>
                <ButtonLink href="#" title="Membership" />
              </li>
              <li>
                <ButtonLink href="#" title="Contact" />
              </li>
            </ul>

            <div className="mt-4">
              <ButtonCTA
                href="/dashboard"
                label="Reserve Room"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-16">
        {/* Hero Section */}
        <section
          className="
    flex flex-col-reverse lg:flex-row
    items-center justify-between
    py-8 md:py-12 lg:py-16
    px-4 md:px-8 lg:px-16
    mx-4 md:mx-8 lg:mx-16
    bg-[#ede6da] rounded-2xl
    gap-10
  "
        >
          {/* Text Content */}
          <div
            className="
      flex flex-col gap-6
      flex-1
      text-center lg:text-left
      px-0 md:px-8 lg:px-24
    "
          >
            <h1
              className="
        text-3xl sm:text-4xl md:text-5xl lg:text-7xl
        font-bold leading-tight
      "
            >
              Where Good Coffee and Great Ideas meet!
            </h1>

            <h5
              className="
        text-base sm:text-lg md:text-xl lg:text-2xl
        text-gray-700
      "
            >
              When looking for a place to get work done, visit NEAT Coffee Bar
              today, for your next great meeting or your best cup of coffee yet!
              Networking groups welcomed and accomplished!
            </h5>

            <div className="flex justify-center lg:justify-start">
              <ButtonCTA href="#" label="View Memberships" variant="primary" />
            </div>
          </div>

          {/* Image */}
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

        {/* About Section */}
        <section
          className="
    flex flex-col lg:flex-row
    items-center justify-center
    gap-8 lg:gap-16
    px-4 md:px-8 lg:px-32
    w-full
  "
        >
          {/* Left Main Image */}
          <div
            className="
      relative
      w-full lg:w-[30%]
      h-64 sm:h-80 lg:h-112
      rounded-2xl overflow-hidden
    "
          >
            <Image
              src="https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwc2hvcHxlbnwwfDF8MHx8fDI%3D"
              alt="Indo Cafe n Resto"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div
            className="
      w-full lg:w-[50%]
      flex flex-col
      gap-4 sm:gap-6
      text-center lg:text-left
    "
          >
            <p className="uppercase font-semibold text-sm tracking-wide">
              About Us
            </p>

            <h3
              className="
        text-2xl sm:text-3xl md:text-4xl
        font-bold
      "
            >
              Where We Do Business — Indo Cafe n Resto
            </h3>

            <h5
              className="
        text-base sm:text-lg
        text-gray-700
      "
            >
              Indo Cafe n Resto aims to create a flexible co-working environment
              that provides solutions to a wide variety of working
              professionals. The best place to do business with the best coffee,
              of course! Indo Cafe n Resto is located directly in historic
              downtown Depok.
            </h5>

            {/* Bottom Image Grid */}
            <div
              className="
        grid grid-cols-1 sm:grid-cols-2
        gap-4
        mt-4
      "
            >
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

        {/* Benefits Section */}
        <section className="relative w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('/images/landing-page/coffee-shop-landscape.jpg')] bg-cover bg-center" />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Content */}
          <div
            className="
      relative z-10
      flex flex-col items-center justify-center
      gap-6 md:gap-8
      px-4 sm:px-8 md:px-12 lg:px-56
      py-12 md:py-20
      text-center
    "
          >
            <p className="text-xs sm:text-sm text-white uppercase tracking-widest">
              Indo Cafe n Resto Benefits
            </p>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              The Cozy Cafe Experience
            </h3>

            {/* Benefits Grid */}
            <div
              className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-4 md:gap-6
        w-full mt-6
      "
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="
            p-6 md:p-8
            rounded-2xl
            bg-white
            flex flex-col gap-4
            items-center
            text-center
          "
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

            {/* CTA */}
            <div className="mt-6 md:mt-10">
              <ButtonCTA
                href="#"
                label="View Memberships"
                variant="secondary"
              />
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section
          className="
    flex flex-col gap-6
    px-4 sm:px-8 md:px-12 lg:px-32
    py-8
  "
        >
          {/* Section Header */}
          <div
            className="
      flex flex-col sm:flex-row
      items-start sm:items-center
      justify-between
      gap-4
    "
          >
            <div>
              <p className="text-sm text-gray-500">Our Menu</p>
              <h5 className="text-xl sm:text-2xl font-semibold">
                Indo Cafe n Resto Menu
              </h5>
            </div>

            <div className="self-center lg:self-end">
              <PaginationBase
                currentPage={1}
                totalPages={3}
                eventNext={() => {}}
                eventPrev={() => {}}
              />
            </div>
          </div>

          {/* Menu Grid */}
          <div
            className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-4
    "
          >
            {menus.map((menu, index) => (
              <div
                key={index}
                className="
          flex flex-col
          p-4
          gap-4
          rounded-2xl
          border border-gray-200
          bg-white
          h-full
        "
              >
                {/* Image */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={menu.image}
                    alt={menu.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <h6 className="text-base sm:text-lg font-bold">
                    {menu.title}
                  </h6>

                  <p className="text-sm sm:text-base text-gray-500 line-clamp-4">
                    {menu.description}
                  </p>

                  <h6 className="text-lg font-semibold mt-auto">
                    {menu.price}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Membership Section */}
        <section
          className="
    flex flex-col gap-10
    px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64
    py-24
    bg-[#ede6da]
  "
        >
          {/* Section Header */}
          <div className="flex flex-col gap-4 items-center text-center max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm uppercase tracking-widest">
              Indo Cafe n Resto Memberships
            </p>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Better way to do business with the best coffee
            </h3>

            <p className="text-sm sm:text-base text-gray-500">
              We created a space where anyone can do better business through our
              co-working space.
            </p>
          </div>

          {/* Membership List */}
          <div className="flex flex-col gap-6">
            {memberships.map((membership, index) => (
              <div
                key={index}
                className="
          flex flex-col lg:flex-row
          gap-6 lg:gap-8
          bg-white
          p-4 sm:p-6
          rounded-2xl
          items-center
        "
              >
                {/* Logo / Image */}
                <div
                  className={`
            relative
            w-full sm:w-56 lg:w-64
            h-40 sm:h-44 lg:h-52
            rounded-2xl
            shrink-0
            ${membership.color.bg}
          `}
                >
                  <Image
                    src="/images/logo-transparent.png"
                    alt="logo"
                    fill
                    className="object-contain p-6"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 lg:gap-4 flex-1 text-center lg:text-left">
                  <h5
                    className={`text-xl sm:text-2xl font-semibold ${membership.color.text}`}
                  >
                    {membership.title}
                  </h5>

                  <p className="text-sm sm:text-base text-gray-500">
                    {membership.desc}
                  </p>
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col gap-4 items-center lg:items-start">
                  <h5 className="text-xl sm:text-2xl font-bold text-center lg:text-left">
                    {membership.price}
                    <br />
                    <span className="inline-block mt-2 text-xs px-4 py-1 rounded-full bg-gray-100">
                      Per Month
                    </span>
                  </h5>

                  <ButtonBase label="Join Now" variant="primary" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer
        className="
    w-full
    flex flex-col
    gap-10
    px-4 sm:px-8 md:px-16 lg:px-32
    pt-12 pb-6
    bg-white
  "
      >
        {/* Top Footer */}
        <div
          className="
      grid grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-5
      gap-8
    "
        >
          {/* About */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <Image
                src="/images/logo-transparent.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              When looking for a place to get work done, visit Indo Cafe n Resto
              today, for your next great meeting or your best cup of coffee yet!
              Networking groups welcomed and accommodated.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h5 className="text-lg sm:text-xl font-semibold">Quick Link</h5>
            <ButtonLink isBold={false} href="#" title="About Us" />
            <ButtonLink isBold={false} href="#" title="Memberships" />
            <ButtonLink isBold={false} href="#" title="Careers" />
          </div>

          {/* Membership */}
          <div className="flex flex-col gap-3">
            <h5 className="text-lg sm:text-xl font-semibold">Membership</h5>
            <ButtonLink isBold={false} href="#" title="Gold Member" />
            <ButtonLink isBold={false} href="#" title="Silver Member" />
            <ButtonLink isBold={false} href="#" title="Bronze Member" />
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h5 className="text-lg sm:text-xl font-semibold">Get in touch</h5>
            <ButtonLink isBold={false} href="#" title="(021) 1234 5678" />
            <ButtonLink
              isBold={false}
              href="#"
              title="info@indocafenresto.com"
            />

            <div className="pt-3 mt-2  border-gray-200 lg:border-t">
              <ButtonLink
                isBold={false}
                href="#"
                title="Jl. Margonda No. 20, Depok"
              />
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className="
      flex flex-col sm:flex-row
      gap-4
      justify-between items-center
      border-t border-gray-200
      pt-4
    "
        >
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <ButtonLink href="#" title="Terms & Conditions" />
            <ButtonLink href="#" title="Privacy Policy" />
          </div>

          <p className="text-sm text-gray-500 text-center">
            Copyright © {new Date().getFullYear()} Indo Cafe n Resto
          </p>
        </div>
      </footer>
    </div>
  );
}
