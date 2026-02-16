import { ButtonCTA, ButtonLink } from "@/components/ui/Button";
import { ArrowUpIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hero from "./landing/components/organism/Hero";
import About from "./landing/components/organism/About";
import Benefit from "./landing/components/organism/Benefit";
import Menu from "./landing/components/organism/Menu";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [showToTopButton, setShowToTopButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Home";
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      // Tombol muncul jika user scroll lebih dari 300px
      if (window.scrollY > 600) {
        setShowToTopButton(true);
      } else {
        setShowToTopButton(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Bersihkan listener saat komponen tidak digunakan
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col gap-0 pt-0 pb-0 px-0">
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
              <ButtonLink href="#hero" title="Home" />
            </li>
            <li>
              <ButtonLink href="#about" title="About" />
            </li>
            <li>
              <ButtonLink href="#menu" title="Menu" />
            </li>
            <li>
              <ButtonLink href="#membership" title="Membership" />
            </li>
            <li>
              <ButtonLink href="#contact" title="Contact" />
            </li>
          </ul>

          {/* CTA Desktop */}
          <div className="hidden lg:block">
            <ButtonCTA href="/dashboard" label="Order Now" variant="primary" />
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
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-y border-gray-200 ${
            open ? "max-h-125 opacity-100 mb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white px-4 py-4">
            <ul className="flex flex-col gap-4">
              <li>
                <ButtonLink href="#hero" title="Home" />
              </li>
              <li>
                <ButtonLink href="#about" title="About" />
              </li>
              <li>
                <ButtonLink href="#menu" title="Menu" />
              </li>
              <li>
                <ButtonLink href="#membership" title="Membership" />
              </li>
              <li>
                <ButtonLink href="#contact" title="Contact" />
              </li>
            </ul>
            <div className="mt-4">
              <ButtonCTA
                href="/dashboard"
                label="Order Now"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-16 relative">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Benefits Section */}
        <Benefit />

        {/* Menu Section */}
        <Menu />

        {/* Membership Section */}
        {/* <section
          id="membership"
          className="flex flex-col gap-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-24 bg-[#ede6da] scroll-mt-24"
        >
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
          <div className="flex flex-col gap-6">
            {memberships.map((membership, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-6 lg:gap-8 bg-white p-4 sm:p-6 rounded-2xl items-center"
              >
                <div
                  className={`relative w-full sm:w-56 lg:w-64 h-40 sm:h-44 lg:h-52 rounded-2xl shrink-0 ${membership.color.bg}`}
                >
                  <Image
                    src="/images/logo-transparent.png"
                    alt="logo"
                    fill
                    className="object-contain p-6"
                  />
                </div>
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
        </section> */}

        {showToTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 flex justify-center items-center w-12 h-12 bg-white rounded-full border border-gray-200 shadow-2xl cursor-pointer hover:bg-gray-100 trasition duration-300 ease-in-out md:w-16 md:h-16 md:right-16 md:bottom-16"
          >
            <ArrowUpIcon className="w-8 h-8" stroke="black" />
          </button>
        )}
      </main>

      <footer
        id="contact"
        className="w-full flex flex-col gap-10 px-4 sm:px-8 md:px-16 lg:px-32 pt-12 pb-6 bg-white scroll-mt-24 border border-t-gray-200 border-r-white border-l-white border-b-white mt-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
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
          <div className="flex flex-col gap-3">
            <h5 className="text-lg sm:text-xl font-semibold">Quick Link</h5>
            <ButtonLink isBold={false} href="#" title="About Us" />
            <ButtonLink isBold={false} href="#" title="Memberships" />
            <ButtonLink isBold={false} href="#" title="Careers" />
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-lg sm:text-xl font-semibold">Membership</h5>
            <ButtonLink isBold={false} href="#" title="Gold Member" />
            <ButtonLink isBold={false} href="#" title="Silver Member" />
            <ButtonLink isBold={false} href="#" title="Bronze Member" />
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-lg sm:text-xl font-semibold">Get in touch</h5>
            <ButtonLink isBold={false} href="#" title="(021) 1234 5678" />
            <ButtonLink
              isBold={false}
              href="#"
              title="info@indocafenresto.com"
            />
            <div className="pt-3 mt-2 border-gray-200 lg:border-t">
              <ButtonLink
                isBold={false}
                href="#"
                title="Jl. Margonda No. 20, Depok"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-gray-200 pt-4">
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
