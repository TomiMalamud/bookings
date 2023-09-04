import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="py-4 w-full mx-auto px-6 border border-gray-200 max-w-[1960px] p-7 sm:px-20">
        <ul>
          <li>
            <Link
              href="/alojamientos/rivadavia"
              className="text-slate-900 mb-8 hover:text-slate-600 underline underline-offset-4"
            >
              Rivadavia
            </Link>
          </li>
          <li>
            <Link
              href="/alojamientos/donizetti"
              className="text-slate-900 hover:text-slate-600 underline underline-offset-4"
            >
              Donizetti
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
