import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EbayMostWatchedItem } from "@/lib/types";
import Image from "next/image";

type EbayCardProps = {
    item: EbayMostWatchedItem,
}

export default function EbayCard({ item }: EbayCardProps) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      
    return (
        <a
            key='index'
            href={item.viewItemURL}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Card className="m-2 transition ease-in-out lg:hover:-translate-y-1 hover:scale-103 hover:shadow-xl shadow-md duration-300 cursor-pointer">
                <CardHeader>
                    <div className="inline-flex justify-end">
                        <span><Image width={20} height={20} src="/heart.webp" alt='heart' /></span>
                        <span className="ml-2">{item.watchCount}</span>
                    </div>
                    <div className="h-[125px] w-auto relative flex items-start">
                        <Image
                            className="object-contain h-full pb-2 mb-4"
                            layout="fill"
                            objectPosition="left"
                            src={item.imageURL}
                            alt={item.title}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <CardTitle className="text-left text-md">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-left text-md font-bold">Buy it Now: <span className="ml-1 font-normal">{formatter.format(item.buyItNowPrice.value)}</span></p>
                </CardContent>
            </Card>
        </a>
    )
}