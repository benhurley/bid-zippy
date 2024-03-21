import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./button"
import { useState } from "react";
import { toast } from "./use-toast";
import Image from "next/image";
import { PropagateLoader } from "react-spinners";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { ScrollArea } from "@/components/ui/scroll-area"
import ButtonLink from "./buttonLink";
import { EbayItemDetails } from "@/app/api/ebay/item/types";
type EbayDetailsButtonProps = {
  itemId: number,
  watchCount: number,
}

export default function EbayDetailsButton({ itemId, watchCount }: EbayDetailsButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState<EbayItemDetails | null>(null)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleDetails = async () => {
    try {
      setItemDetails(null);
      setIsLoading(true);
      const response = await fetch(`/api/ebay/item?itemId=${itemId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setIsLoading(false);
      setItemDetails(data)
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
        <Button className='transition duration-300 ease-in-out lg:hover:scale-[103%]' onClick={handleDetails}>Details</Button>
      </DialogTrigger>
      <DialogContent>
        {isLoading ?
          <div className="flex justify-center items-center h-[300px]">
            <PropagateLoader color="#000" />
          </div>
          : itemDetails ?
          <>
            <div className="inline-flex justify-start">
              <span><Image width={20} height={20} src="/heart.webp" alt='heart' /></span>
              <span className="ml-2">{watchCount}</span>
            </div>
            <ScrollArea className="mt-4 sm:max-h-[700px] max-h-[500px]">
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
                            className="object-cover rounded-lg"
                          />
                    </CarouselItem>
                    {itemDetails?.additionalImages?.map((image, index) => (
                      <CarouselItem key={`additional-item-${index}`} className="flex aspect-square items-center justify-center p-0">
                            <img
                              src={image?.imageUrl}
                              alt={`Additional Image ${index + 1}`}
                              className="object-cover rounded-lg"
                            />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="invisible sm:visible" />
                  <CarouselNext className="invisible sm:visible" />
                </Carousel>
                <DialogTitle tabIndex={0} className="font-bold md:text-lg text-sm mb-4">{itemDetails?.title}</DialogTitle>
                {itemDetails?.marketingPrice?.originalPrice?.value ?
                  <p tabIndex={0} className="mb-1 font-normal md:text-lg text-md">
                    <span className="line-through">{formatter.format(parseInt(itemDetails.marketingPrice.originalPrice.value))}</span>
                    <span className="text-red-600 ml-2">{formatter.format(parseInt(itemDetails.price.value))}</span>
                  </p>
                  :
                  <p className="mb-1 font-bold md:text-lg text-md">{formatter.format(parseInt(itemDetails.price.value))}</p>
                }
              </DialogHeader>
              <DialogDescription>
                {itemDetails?.shortDescription?.length > 20 && <p tabIndex={0} className="my-4">{itemDetails.shortDescription}</p>}
                <div className="sm:columns-2 my-5">
                  <p className="mb-1 font-bold text-md">Seller:<span className="font-normal ml-1">{itemDetails.seller.username}</span>
                    {itemDetails?.seller?.feedbackPercentage &&
                      (parseInt(itemDetails.seller.feedbackPercentage) > 90) ?
                      <span className="text-green-600 font-normal ml-1">({itemDetails.seller.feedbackPercentage}%)</span>
                      : <span className="text-red-600 font-normal ml-1">({itemDetails.seller.feedbackPercentage}%)</span>}
                  </p>
                  <p className="mb-1"><span className="font-bold">Condition:&nbsp;</span>{itemDetails.condition}</p>
                  {itemDetails.estimatedAvailabilities[0].estimatedAvailableQuantity && <p className="mb-1"><span className="font-bold">In-Stock:&nbsp;</span>{itemDetails.estimatedAvailabilities[0].estimatedAvailableQuantity}</p>}
                  {itemDetails.gender && <p className="mb-1"><span className="font-bold">Gender:&nbsp;</span>{itemDetails.gender}</p>}
                  <div className="mt-4">
                    <p className="mb-1">{itemDetails.estimatedAvailabilities[0].estimatedSoldQuantity} sold</p>
                    {itemDetails?.qualifiedPrograms?.length > 0 && <p className="mb-1">{itemDetails.qualifiedPrograms[0].toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>}
                    <p className="mb-1">Ships from {itemDetails.itemLocation.stateOrProvince || itemDetails.itemLocation.city}, {itemDetails.itemLocation.country}</p>
                    {itemDetails.returnTerms.returnsAccepted && <p className="mb-1">Seller accepts returns</p>}
                  </div>
                </div>
                <div className="pt-5 pb-8 flex justify-center items-center">
                  <ButtonLink href={itemDetails.itemWebUrl} mobileCopy="View in eBay app" desktopCopy="View on eBay.com"/>
                </div>
              </DialogDescription>
            </ScrollArea>
          </>
        : null}
      </DialogContent>
    </Dialog >
  )
}