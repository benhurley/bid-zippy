import React from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EbayHasBidsItem } from "@/app/api/ebay/types";
import Image from "next/image";
import EbayHasBidsDetailsWrapper from "./ebayHasBidsDetailsWrapper";
import { isLessThanTenMinutes, parseISODuration } from "../helpers/timeConversions";

type EbayCardProps = {
    item: EbayHasBidsItem,
}

export default function EbayHasBidsCard({ item }: EbayCardProps) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const timeLeft = parseISODuration(item.sellingStatus.timeLeft);
    const isLessThan10Minutes = isLessThanTenMinutes(item.sellingStatus.timeLeft);

    return (
        <EbayHasBidsDetailsWrapper itemId={item.itemId} watchCount={item.listingInfo.watchCount}>
            <Card className="m-2 shadow-lg flex flex-col sm:h-[420px] min-h-[250px] max-w-[325px] min-w-[150px]">
                <CardHeader className="flex-grow">
                    <div className="inline-flex justify-start">
                        <span><Image width={20} height={20} src={item.listingInfo.watchCount > 50 ? "/heart-fire.webp" : "/heart.webp"} alt='heart' /></span>
                        <span className="ml-2">{item.listingInfo.watchCount || 0}</span>
                    </div>
                    <div className="w-auto relative flex items-center justify-around sm:min-h-[150px]">
                        <img
                            className="object-contain h-full rounded-md md:mt-0 mt-2"
                            src={item.galleryURL}
                            alt={item.title}
                        />
                    </div>
                    <p className="font-bold text-center text-lg pt-4">{formatter.format(item.sellingStatus.convertedCurrentPrice.value)} ({item.sellingStatus.bidCount} {item.sellingStatus.bidCount > 1 ? 'bids' : 'bid'})</p>
                    <p className="text-center md:text-md text-sm"><span className={isLessThan10Minutes ? 'text-red-600' : ''}>{timeLeft} left</span></p>
                </CardHeader>
                <CardFooter className="self-end">
                    <CardTitle className="text-left md:text-lg text-sm font-normal">{item.title.slice(0, 250)}</CardTitle>
                </CardFooter>
            </Card>
        </EbayHasBidsDetailsWrapper>
    )
}
