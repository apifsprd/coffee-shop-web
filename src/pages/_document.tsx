import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en" style={{ scrollBehavior: "smooth" }}>
      <Head>
        <Link
          rel="apple-touch-icon"
          href="/images/favivon/apple-touch-icon.png"
        />
        <Link
          rel="icon"
          type="image/png"
          href="/images/favivon/favicon-32x32.png"
        />
        <Link
          rel="icon"
          type="image/png"
          href="/images/favivon/favicon-16x16.png"
        />
        <Link rel="manifest" href="/images/favivon/site.webmanifest" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
