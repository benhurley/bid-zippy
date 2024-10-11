import Image from "next/image";

export default function Header() {
  return (
    <div className="z-20 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex sm:mb-10 min-w-[290px] lg:mb-40 mb-24">
      <div className="px-4 relative left-0 sm:top-0 w-full bg-gradient-to-r from-red-100 via-blue-100 via-40% to-green-100 to-70% via-blue-100 to-100% pb-2 sm:pb-6 pt-4 sm:pt-8 lg:static lg:w-auto lg:rounded-xl lg:border bg-gray-100 lg:py-4 lg:px-10">
        <div className="flex justify-center align-center">
          <code className="font-mono font-bold md:text-3xl text-2xl mr-2">BidZippy™</code>
        </div>
        <div className="md:mt-3 mt-2 lg:mb-0 md:mb-4 flex justify-center md:text-lg text-sm font-bold">
          Uncover Top Listings on&nbsp;
          <div className="inline-block w-auto align-middle md:mt-1 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[1.2em] w-auto" viewBox="0 0 122 48.592" id="gh-logo" aria-labelledby="ebayLogoTitle">
              <title id="ebayLogoTitle">eBay Home</title>
              <g>
                <path fill="#F02D2D" d="M24.355 22.759c-.269-5.738-4.412-7.838-8.826-7.813-4.756.026-8.544 2.459-9.183 7.915zM6.234 26.93c.364 5.553 4.208 8.814 9.476 8.785 3.648-.021 6.885-1.524 7.952-4.763l6.306-.035c-1.187 6.568-8.151 8.834-14.145 8.866C4.911 39.844.043 33.865-.002 25.759c-.05-8.927 4.917-14.822 15.765-14.884 8.628-.048 14.978 4.433 15.033 14.291l.01 1.625z"></path>
                <path fill="#0968F6" d="M46.544 35.429c5.688-.032 9.543-4.148 9.508-10.32s-3.947-10.246-9.622-10.214-9.543 4.148-9.509 10.32 3.974 10.245 9.623 10.214zM30.652.029l6.116-.034.085 15.369c2.978-3.588 7.1-4.65 11.167-4.674 6.817-.037 14.412 4.518 14.468 14.454.045 8.29-5.941 14.407-14.422 14.454-4.463.026-8.624-1.545-11.218-4.681a33.237 33.237 0 01-.19 3.731l-5.994.034c.09-1.915.185-4.364.174-6.322z"></path>
                <path fill="#FFBD14" d="M77.282 25.724c-5.548.216-8.985 1.229-8.965 4.883.013 2.365 1.94 4.919 6.7 4.891 6.415-.035 9.826-3.556 9.794-9.289v-.637c-2.252.02-5.039.054-7.529.152zm13.683 7.506c.01 1.778.071 3.538.232 5.1l-5.688.032a33.381 33.381 0 01-.225-3.825c-3.052 3.8-6.708 4.909-11.783 4.938-7.532.042-11.585-3.915-11.611-8.518-.037-6.665 5.434-9.049 14.954-9.318 2.6-.072 5.529-.1 7.945-.116v-.637c-.026-4.463-2.9-6.285-7.854-6.257-3.68.021-6.368 1.561-6.653 4.2l-6.434.035c.645-6.566 7.53-8.269 13.595-8.3 7.263-.04 13.406 2.508 13.448 10.192z"></path>
                <path fill="#92C821" d="M91.939 19.852l-4.5-8.362 7.154-.04 10.589 20.922 10.328-21.02 6.486-.048-18.707 37.251-6.85.039 5.382-10.348-9.887-18.393"></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="lg:mt-2 mt-1 lg:mb-0 mb-0 flex justify-center md:text-[10px] text-[8px]">
          2024, All Rights Reserved. Version 8.0.2
        </div>
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