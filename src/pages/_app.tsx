import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../lib/store"; // Sesuaikan path-nya
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* Component di sini merepresentasikan halaman yang sedang aktif */}
      <Component {...pageProps} />
    </Provider>
  );
}
