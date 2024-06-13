import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EbayMostWatchedItem } from "@/app/api/ebay/types";
import Image from "next/image";
import EbayMostWatchedDetailsWrapper from "./ebayMostWatchedDetailsWrapper";

type EbayCardProps = {
    item: EbayMostWatchedItem,
}

export default function EbayMostWatchedCard({ item }: EbayCardProps) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
        <EbayMostWatchedDetailsWrapper itemId={item.itemId} watchCount={item.watchCount}>
            <Card className="m-2 shadow-lg flex flex-col sm:h-[350px] min-h-[250px] max-w-[325px] min-w-[150px]">
                <CardHeader className="flex-grow">
                        <div className="inline-flex justify-start">
                            <span><Image width={20} height={20} src={item.watchCount > 50 ? "/heart-fire.webp" : "/heart.webp"} alt='heart' /></span>
                            <span className="ml-2">{item.watchCount}</span>
                        </div>
                    <div className="w-auto relative flex items-center justify-around sm:min-h-[150px]">
                        <img
                            className="object-contain h-full rounded-md md:mt-0 mt-4"
                            src={item.imageURL}
                            alt={item.title}
                        />
                    </div>
                    <p className="font-bold text-center text-lg pt-4">{formatter.format(item.buyItNowPrice.value)}&nbsp;{item.buyItNowPrice.currencyId}</p>
                </CardHeader>
                <CardFooter className="self-end">
                    <CardTitle className="text-left md:text-md text-sm font-normal">{item.title.slice(0,250)}</CardTitle>
                </CardFooter>
            </Card>
        </EbayMostWatchedDetailsWrapper>
    )
}