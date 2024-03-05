import Image from "next/image";

export default function Header() {
    return(
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex sm:mb-10 mb-4">
        <p className="px-4 fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border bg-gray-100 lg:p-4 dark:bg-zinc-800/30">
          <code className="font-mono font-bold text-xl mr-2">mostwatched.justben.fyi</code><span><Image width={20} height={20} src="/heart.webp" alt='heart' /></span>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div
            className="flex place-items-center gap-2 p-8 lg:p-0"
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