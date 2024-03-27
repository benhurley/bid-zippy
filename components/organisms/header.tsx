import Image from "next/image";

export default function Header() {
  return (
    <div className="z-20 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex sm:mb-10 min-w-[290px] lg:mb-40 mb-24">
      <div className="px-4 relative left-0 sm:top-0 w-full bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% pb-2 sm:pb-6 pt-4 sm:pt-8 lg:static lg:w-auto lg:rounded-xl lg:border bg-gray-100 lg:p-4">
        <div className="flex justify-center align-center"><code className="font-mono font-bold text-xl mr-2">Most-Watched</code><span><Image width={20} height={20} src="/heart.webp" alt='heart' /></span></div>
        <div className="mt-2 lg:mb-0 mb-4 flex justify-center md:text-lg text-xs">Discover the most-popular items on Ebay. </div>
        <div className="lg:mt-3 mt-1 lg:mb-0 mb-0 flex justify-center text-[10px]">2024, All Rights Reserved. Version 3.5. </div>
      </div>
      <div className="fixed bottom-0 left-0 flex h-30 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <div
          className="flex place-items-center gap-2 p-4 lg:p-0"
        >
          By
          <a
            className="hover:underline mr-1"
            href='https://justben.fyi'
            target="_blank"
            rel="noopener noreferrer"
          >
            justben.fyi
          </a>
          <Image
            src="/me.webp"
            alt="justben.fyi logo"
            width={75}
            height={24}
            priority
          />
          <div>

          </div>
          <a
            className="underline"
            href='https://pay.justben.fyi'
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  )
}