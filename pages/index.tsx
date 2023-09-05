import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
          <Head>
        <title>Perla Serrana</title>
        <meta
          property="og:image"
          content="https://www.perlaserrana.com.ar/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://www.perlaserrana.com.ar/og-image.png"
        />
      </Head>
      <main className="py-8 w-full mx-auto px-6 border border-gray-200 max-w-[1960px] p-7 sm:px-20">
        <ul>
          <li className="mb-4">
            <Link
              href="/alojamientos/rivadavia"
              className="text-slate-900 text-xl hover:text-slate-600 underline underline-offset-4"
            >
              Rivadavia
            </Link>
          </li>
          <li>
            <Link
              href="/alojamientos/donizetti"
              className="text-slate-900 text-xl hover:text-slate-600 underline underline-offset-4"
            >
              Donizetti
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
