// import { Geist, Geist_Mono } from "next/font/google";

import { ButtonCTA, ButtonLink } from "@/components/ui/Button";
import { Coffee, HeartHandshake, IdCard } from "lucide-react";
import Image from "next/image";

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
    description: "Better productivity and businees starts and ends with better coffee. If you love great coffee you're going to love Indo Cafe n Resto.",
    icon: <Coffee className="w-16 h-16" />,
  },
  {
    title: "Flexible Co-Working",
    description: "Our co-working space offers a variety of options for both members and non-members alike. We created a space where anyone can do better business.",
    icon: <HeartHandshake className="w-16 h-16" />,
  },
  {
    title: "Affordable Membership",
    description: "We offer a wide range of membership options to suit every budget. Whether you're a student, a professional, or a business, we have a membership plan that meets your needs.",
    icon: <IdCard className="w-16 h-16" />,
  }
]

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pt-4 pb-16 px-0 min-h-screen w-full">
      <header>
        <nav className="flex flex-row items-center justify-start relative px-32">
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
        <section className="flex flex-row items-center justify-between py-8 px-16 mx-16  bg-gray-100 rounded-2xl">
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
            <h5 className="text-lg">
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
        <section className="w-full h-auto p-4 relative overflow-hidden"> 
       <div 
    className="absolute inset-0 bg-[url('/images/landing-page/coffee-shop-landscape.jpg')] bg-cover bg-center">
  </div>

  <div className="absolute inset-0 bg-black/80"></div>

  <div className="relative z-10 flex flex-col h-full items-center justify-center gap-4 m-16">
    <p className="text-base text-white uppercase">Indo Cafe n Resto Benefits</p>
   <h3 className="text-4xl font-bold text-white"> The Cozy Cafe Experience</h3>

   <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 w-full mt-4">
   {benefits.map((benefit, index) => (
      <div key={index} className="p-8 rounded-2xl bg-white col-span-1 flex flex-col gap-4 justify-startz items-center">
      {benefit.icon}
      <div className="h-16 flex flex-col justify-center items-center">
        <h5 className="text-2xl text-center">{benefit.title}</h5>
      </div>
      <p className="text-base text-center text-gray-500 leading-5">{benefit.description}</p>
    </div>
   ))}
    
   </div>
  </div>
        </section>
      </main>
    </div>
  );
}
