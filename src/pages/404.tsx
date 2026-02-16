import Link from "next/link";
import Head from "next/head";
import { Text } from "@/components/ui/Text"; // Gunakan komponen Text kita sebelumnya

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Halaman Tidak Ditemukan | Indo Cafe</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        {/* Visual Element */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] font-black text-gray-100 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
        </div>

        {/* Messaging */}
        <div className="max-w-md">
          <Text variant="h2" className="text-3xl font-bold text-gray-900 mb-4">
            Aduh! Meja ini Kosong.
          </Text>
          <Text variant="p" className="text-gray-600 mb-8">
            Halaman yang kamu cari mungkin sudah dihapus, berganti nama, atau
            sedang tidak tersedia di menu kami.
          </Text>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-orange-600 hover:shadow-orange-200 transition-all active:scale-95"
          >
            Kembali ke Dashboard
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-16 border-t pt-8 w-full max-w-xs border-gray-100">
          <Text
            variant="span"
            className="text-gray-400 text-xs tracking-widest uppercase"
          >
            Indo Cafe n Resto
          </Text>
        </div>
      </main>
    </>
  );
}
