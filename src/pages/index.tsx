// import { Geist, Geist_Mono } from "next/font/google";

import { ButtonCTA, ButtonLink } from "@/components/ui/Button";
import Image from "next/image";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pt-4 pb-16 px-16 min-h-screen w-full">
      <header>
        <nav className="flex flex-row items-center justify-start relative px-16">
          <div className="w-20 h-20 object-contain rounded-lg ">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          </div>
          <ul className="flex flex-row items-center gap-8 mx-auto">
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
          <div className="absolute right-16">
            <ButtonCTA href="#" label="Reserve Room" variant="primary" />
          </div>
        </nav>
      </header>
      <main className="flex flex-col gap-16">
        <section className="flex flex-row items-center justify-between py-8 px-16  bg-gray-100 rounded-2xl">
          <div className="flex flex-col gap-8 flex-1 px-44">
            <h1 className="text-7xl font-bold">
              Where Good Coffee and Great Ideas meet!
            </h1>
            <h5 className="text-2xl">
              When looking for a place to get work done, visit NEAT Coffee Bar
              today, for you next great meeting or your best cup of coffee yet!
              Networking groups welcomed and accomplished!
            </h5>
            <ButtonCTA href="#" label="View Memberships" variant="primary" />
          </div>
          <div className="flex flex-1 justify-start items-center ">
            <Image
              src="/images/landing-page/coffee-cup-hero.png"
              alt="hero"
              width={600}
              height={600}
            />
          </div>
        </section>
        <section className="flex flex-row items-center justify-center gap-16 px-32 w-full">
          <div className="w-[30%] h-150 flex justify-start items-center relative">
            <Image
              src="/images/landing-page/coffee-shop.jpg"
              alt="hero"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="w-[50%] h-150 flex flex-col justify-start items-start gap-4">
            <p className="uppercase font-semibold">About Us</p>
            <h3 className="text-4xl font-bold">
              Where We Do Business — Indo Cafe n Resto
            </h3>
            <h5 className="text-2xl">
              Indo Cafe n Resto aims to create a flexible co-working environment
              that provides solutions to a wide variety of working
              professionals, The best place to do bussines with the best coffee
              of course! Indo Cafe n Resto is located directly in historic
              downtown Depok
            </h5>
            <div className="flex flex-1 justify-center items-ceter gap-8 w-full h-44">
              <div className="relative w-[50%] h-full">
                <Image
                  src="/images/landing-page/coffee-shop.jpg"
                  alt="hero"
                  fill
                  content="cover"
                  className="rounded-2xl"
                />
              </div>
              <div className="relative w-[50%] h-full">
                <Image
                  src="/images/landing-page/coffee-shop.jpg"
                  alt="hero"
                  fill
                  content="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
