// import { Geist, Geist_Mono } from "next/font/google";

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
    <div
      className={`flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 bg-slate-100 dark:bg-black sm:items-start">
        <section className="flex flex-1 flex-col items-center justify-center w-full">
          <h1 className="text-2xl font-bold text-center">
            Something fresh will be here!
          </h1>
        </section>
      </main>
    </div>
  );
}
