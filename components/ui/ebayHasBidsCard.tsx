import React, { useState } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EbayHasBidsItem } from "@/app/api/ebay/types";
import Image from "next/image";
import EbayHasBidsDetailsWrapper from "./ebayHasBidsDetailsWrapper";
import { getTimeLeft } from "../helpers/timeConversions";

type EbayCardProps = {
    item: EbayHasBidsItem,
}

export default function EbayHasBidsCard({ item }: EbayCardProps) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const timeLeft = getTimeLeft(item.itemEndDate);
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <EbayHasBidsDetailsWrapper itemId={item.itemId} watchCount={0}>
            <Card className="m-2 shadow-lg flex flex-col sm:min-h-[440px] min-h-[250px] max-w-[325px] min-w-[150px]">
                <CardHeader className="flex-grow">
                    <div title={`${item.bidCount} bids`} className="animate-fadeInLeftToRight inline-flex justify-start -ml-2 -mt-2 mb-2">
                        <span>
                            <Image width={20} height={20} src={'/bidder.webp'} alt='bidder' />
                        </span>
                        <span className="ml-3 font-bold animate-fadeInLeftToRight">{`${item.bidCount} bid${item.bidCount && item.bidCount > 1 ? 's' : ''}`}</span>
                    </div>
                    <div className="w-auto relative flex items-center justify-around sm:min-h-[150px] sm:max-h-[225px]">
                        <img
                            className={`object-contain h-full rounded-md md:mt-0 mt-2 transition-all duration-500 ${imageLoading ? 'blur-lg' : 'blur-none'}`} // Apply blur class
                            src={item.image?.imageUrl}
                            alt={item.title}
                            onLoad={() => setImageLoading(false)} // Set loading state to false on load
                        />
                    </div>
                    <p className="font-bold text-center text-lg pt-4">{`Current Bid: ${formatter.format(parseInt(item.currentBidPrice.value))}`}</p>
                    <p className="font-bold text-center md:text-md text-sm"><span className={timeLeft.isEndingSoon ? 'text-red-600' : ''}>{timeLeft.readableString}</span></p>
                </CardHeader>
                <CardFooter className="self-end">
                    <CardTitle className="text-left md:text-lg text-sm font-normal">{item.title.slice(0, 250)}</CardTitle>
                </CardFooter>
            </Card>
        </EbayHasBidsDetailsWrapper>
    )
}
