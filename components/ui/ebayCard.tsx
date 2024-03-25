import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EbayMostWatchedItem } from "@/app/api/ebay/types";
import Image from "next/image";
import EbayDetailsWrapper from "./ebayDetailsWrapper";

type EbayCardProps = {
    item: EbayMostWatchedItem,
}

export default function EbayCard({ item }: EbayCardProps) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
        <EbayDetailsWrapper itemId={item.itemId} watchCount={item.watchCount}>
            <Card className="m-2 shadow-lg flex flex-col sm:min-h-[400px] min-h-[250px] max-w-[325px] min-w-[250px]">
                <CardHeader className="flex-grow">
                        <div className="inline-flex justify-start">
                            <span><Image width={20} height={20} src="/heart.webp" alt='heart' /></span>
                            <span className="ml-2">{item.watchCount}</span>
                        </div>
                    <div className="w-auto relative flex items-center justify-around sm:min-h-[175px]">
                        <img
                            className="object-contain h-full rounded-md mt-4"
                            src={item.imageURL}
                            alt={item.title}
                        />
                    </div>
                    <p className="font-bold text-center text-md pt-4 mb-2">Buy It Now: {formatter.format(item.buyItNowPrice.value)}</p>
                </CardHeader>
                <CardFooter className="self-end">
                    <CardTitle className="text-left md:text-md text-sm font-normal">{item.title}</CardTitle>
                </CardFooter>
            </Card>
        </EbayDetailsWrapper>
    )
}