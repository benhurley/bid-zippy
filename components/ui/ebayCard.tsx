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
        <Card className="m-2 transition ease-in-out lg:hover:-translate-y-1 shadow-lg duration-300">
            <CardHeader>
                <div className="inline-flex justify-end">
                    <span><Image width={20} height={20} src="/heart.webp" alt='heart' /></span>
                    <span className="ml-2">{item.watchCount}</span>
                </div>
                <div className="h-[150px] w-auto relative flex items-start">
                    <Image
                        className="object-contain h-full pb-2 mb-4"
                        layout="fill"
                        objectPosition="left"
                        src={item.imageURL}
                        alt={item.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <CardTitle className="pt-5 text-left text-md">{item.title}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <p className="text-left text-md font-bold">Price: <span className="ml-1 font-normal">{formatter.format(item.buyItNowPrice.value)}</span></p>
                <EbayDetailsButton itemId={item.itemId} watchCount={item.watchCount} />
            </CardFooter>
        </Card>
    )
}