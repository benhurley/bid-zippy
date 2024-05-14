import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react";
import { toast } from "./use-toast";
import Image from "next/image";
import { SyncLoader } from "react-spinners";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { ScrollArea } from "@/components/ui/scroll-area"
import ButtonLink from "./buttonLink";
import { EbayItemDetails } from "@/app/api/ebay/item/types";
import { timeRemaining } from "../helpers/timeConversions";

type EbayDetailsWrapperProps = {
    children: ReactNode,
    itemId: number,
    watchCount?: number,
}

export default function EbayHasBidsDetailsWrapper({ children, itemId, watchCount }: EbayDetailsWrapperProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [itemDetails, setItemDetails] = useState<EbayItemDetails | null>(null)

    const handleDetails = async () => {
        try {
            setItemDetails(null);
            setIsLoading(true);
            const legacyItemResponse = await fetch(`/api/ebay/item?itemId=${itemId}`);
            const legacyItemData = await legacyItemResponse.json();

            if (!legacyItemResponse.ok) {
                if (legacyItemData.error.includes('The legacy Id is invalid')) {
                    // Data for this product may have been moved behind item group endpoint
                    const itemGroupResponse = await fetch(`/api/ebay/itemGroup?itemGroupId=${itemId}`);
                    const itemGroupData = await itemGroupResponse.json();

                    if (!itemGroupResponse.ok) {
                        throw new Error(itemGroupData.error);
                    } else {
                        toast({
                            title: `No match found for product #${itemId}.`,
                            description: 'Item may have been removed. Showing results for the most similar item.',
                            variant: "destructive"
                        });
                        const filteredItemGroupData = itemGroupData.items.filter((item: EbayItemDetails) => item?.estimatedAvailabilities?.length > 0 && item.estimatedAvailabilities[0]?.estimatedAvailableQuantity !== 0)
                        setItemDetails(filteredItemGroupData[0]);
                        setIsLoading(false);
                    }

                } else {
                    throw new Error(legacyItemData.error);
                }
            } else {
                setItemDetails(legacyItemData)
                setIsLoading(false);
            }
        } catch (error: unknown) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setIsLoading(false);
            setOpen(false);
            toast({
                title: `Error: ${errorMessage}`,
                description: 'Check the browser console for more info.',
                variant: "destructive"
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="cursor-pointer" onClick={handleDetails}>
                    {children}
                </div>
            </DialogTrigger>
            <DialogContent>
                {isLoading ?
                    <div className="flex justify-center items-center h-[300px]">
                        <SyncLoader color="#000" speedMultiplier={0.6} />
                    </div>
                    : itemDetails ?
                        <>
                            <div className="inline-flex justify-start">
                                <span><Image width={20} height={20} src={watchCount && watchCount > 50 ? "/heart-fire.webp" : "/heart.webp"} alt='heart' /></span>
                                <span className="ml-2">{watchCount}</span>
                            </div>
                            <ScrollArea className="sm:max-h-[600px] max-h-[550px] px-2">
                                <DialogHeader className="text-left">
                                    <Carousel
                                        opts={{
                                            align: "center",
                                        }}
                                        className="pt-2 pb-5 flex items-center m-auto sm:max-w-[410px] max-w-[250px]"
                                    >
                                        <CarouselContent>
                                            <CarouselItem key='primary-item' className="flex item-center justify-center">
                                                <img
                                                    src={itemDetails?.image?.imageUrl}
                                                    alt={'Primary Carousel Image'}
                                                    className="object-cover sm:max-h-[400px] max-h-[300px]"
                                                />
                                            </CarouselItem>
                                            {itemDetails?.additionalImages?.map((image, index) => (
                                                <CarouselItem key={`additional-item-${index}`} className="flex aspect-square items-center justify-center p-0">
                                                    <img
                                                        src={image?.imageUrl}
                                                        alt={`Additional Image ${index + 1}`}
                                                        className="object-cover sm:max-h-[400px] max-h-[300px]"
                                                    />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="invisible sm:visible" />
                                        <CarouselNext className="invisible sm:visible" />
                                    </Carousel>
                                    <DialogTitle tabIndex={0} className="font-bold md:text-xl sm:text-md text-sm pb-2">{itemDetails?.title}</DialogTitle>
                                    <p className="mb-1 font-bold md:text-lg text-md">${itemDetails?.currentBidPrice?.value} ({itemDetails?.bidCount} {itemDetails?.bidCount && itemDetails?.bidCount > 1 ? 'bids' : 'bid'})</p>
                                    <p className="mb-1 md:text-lg text-md">{timeRemaining(itemDetails.itemEndDate || '')} remaining</p>
                                </DialogHeader>
                                <DialogDescription>
                                    <div className="my-5">
                                        {/* Short Description */}
                                        {itemDetails?.shortDescription?.length > 20 && (
                                            <div className="flex my-2 items-start">
                                                <p className="font-bold text-md sm:w-32 w-24">Description</p>
                                                <p className="flex-1">{itemDetails.shortDescription}</p>
                                            </div>
                                        )}

                                        {/* Seller Information */}
                                        <div className="flex my-1 items-center">
                                            <p className="font-bold text-md sm:w-32 w-24">Seller</p>
                                            <div className="flex-1">
                                                <span>{itemDetails.seller.username}</span>
                                                {itemDetails?.seller?.feedbackPercentage && (
                                                    <span className={`ml-1 ${parseInt(itemDetails.seller.feedbackPercentage) > 90 ? 'text-green-600' : 'text-red-600'}`}>
                                                        ({itemDetails.seller.feedbackPercentage}%)
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Item Condition */}
                                        <div className="flex my-1 items-center">
                                            <p className="font-bold sm:w-32 w-24">Condition</p>
                                            <p className="flex-1">{itemDetails.condition}</p>
                                        </div>

                                        {/* Quantity Available */}
                                        {itemDetails.estimatedAvailabilities[0].estimatedAvailableQuantity > 0 && (
                                            <div className="flex my-1 items-center">
                                                <p className="font-bold sm:w-32 w-24">Quantity</p>
                                                <p className="flex-1">{itemDetails.estimatedAvailabilities[0].estimatedAvailableQuantity} Available</p>
                                            </div>
                                        )}

                                        {/* Gender */}
                                        {itemDetails?.gender && (
                                            <div className="flex my-1 items-center">
                                                <p className="font-bold sm:w-32 w-24">Gender</p>
                                                <p className="flex-1">{itemDetails.gender}</p>
                                            </div>
                                        )}

                                        {/* Material */}
                                        {itemDetails?.material && (
                                            <div className="flex my-1 items-center">
                                                <p className="font-bold sm:w-32 w-24">Material</p>
                                                <p className="flex-1">{itemDetails.material}</p>
                                            </div>
                                        )}

                                        {/* Pattern */}
                                        {itemDetails?.pattern && (
                                            <div className="flex my-1 items-center">
                                                <p className="font-bold sm:w-32 w-24">Pattern</p>
                                                <p className="flex-1">{itemDetails.pattern}</p>
                                            </div>
                                        )}

                                        {/* Additional Information as needed */}
                                        {itemDetails.estimatedAvailabilities[0].estimatedSoldQuantity > 0 && (
                                            <div className="flex my-1 items-center">
                                                <p className="font-bold sm:w-32 w-24">Sold</p>
                                                <p className="flex-1">{itemDetails.estimatedAvailabilities[0].estimatedSoldQuantity} (to date)</p>
                                            </div>
                                        )}

                                        {itemDetails?.qualifiedPrograms?.length > 0 && (
                                            <div className="flex my-1 items-center">
                                                <p className="font-bold sm:w-32 w-24">Program</p>
                                                <p className="flex-1">
                                                    {itemDetails.qualifiedPrograms[0]
                                                        .toLowerCase()
                                                        .split('_')
                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ')}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex my-1 items-center">
                                            <p className="font-bold sm:w-32 w-24">Location</p>
                                            <p className="flex-1">
                                                {itemDetails.itemLocation.city}, {itemDetails.itemLocation.stateOrProvince} ({itemDetails.itemLocation.country})
                                            </p>
                                        </div>

                                        {itemDetails.returnTerms.returnsAccepted && (
                                            <div className="flex my-1 items-center">
                                                <p className="font-bold sm:w-32 w-24">Returns</p>
                                                <p className="flex-1">Seller accepts returns</p>
                                            </div>
                                        )}

                                        {/* Bidders */}
                                        {itemDetails?.uniqueBidderCount && (
                                            <div className="flex my-1 items-center">
                                                <p className="font-bold sm:w-32 w-24">Bidders</p>
                                                <p className="flex-1">{itemDetails.uniqueBidderCount}</p>
                                            </div>
                                        )}

                                    </div>

                                    <div className="pt-5 pb-8 flex justify-center items-center">
                                        <ButtonLink href={itemDetails.itemAffiliateWebUrl} mobileCopy="View in the eBay app" desktopCopy="View on eBay.com" />
                                    </div>
                                </DialogDescription>
                            </ScrollArea>
                        </>
                        : null}
            </DialogContent>
        </Dialog >
    )
}