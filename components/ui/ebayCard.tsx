import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EbayMostWatchedItem } from "@/app/api/ebay/types";
import Image from "next/image";
import EbayDetailsButton from "./ebayDetailsButton";

type EbayCardProps = {
    item: EbayMostWatchedItem,
}

export default function EbayCard({ item }: EbayCardProps) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
        <Card className="m-2 shadow-lg max-w-[275px]">
            <CardHeader>
                <div className="inline-flex justify-end">
                    <span><Image width={20} height={20} src="/heart.webp" alt='heart' /></span>
                    <span className="ml-2">{item.watchCount}</span>
                </div>
                <div className="h-[125px] w-auto relative flex items-start">
                    <img
                        className="object-contain h-full md:ml-6 ml-2 mb-4 rounded-md"
                        src={item.imageURL}
                        alt={item.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <CardTitle className="pt-5 text-left text-md">{item.title}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <p className="text-left text-md mr-1"><span className="font-bold mr-2">{formatter.format(item.buyItNowPrice.value)}</span></p>
                <EbayDetailsButton itemId={item.itemId} watchCount={item.watchCount} />
            </CardFooter>
        </Card>
    )
}