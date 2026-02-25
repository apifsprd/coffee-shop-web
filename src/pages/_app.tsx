import type { AppProps } from "next/dashboard";
import { Provider } from "react-redux";
import { store } from "../lib/store"; // Sesuaikan path-nya
import "@/styles/globals.css";
import { NextToast } from "next-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <NextToast closeButton={true} position="top-center" richColors={true} />
    </Provider>
  );
}
