export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Generate a receipt for your
        </h1>
        <h1 className="text-4xl sm:text-5xl font-bold text-clip bg-gradient-to-r from-slate-800 to-stone-600 text-transparent bg-clip-text">
          CAT-TAX 🐾
        </h1>
        <div className=" flex max-w-screen-sm items-center justify-center ">
          <div className=" w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
            <button
              type="button"
              className=" bg-gray-800 back text-2xl p-2 rounded font-black text-white "
            >
              <a href="/generator">Have a TRY👉🏻</a>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
