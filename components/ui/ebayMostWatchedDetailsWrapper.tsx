import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { toast } from "./use-toast";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import ButtonLink from "./buttonLink";
import { EbayItemDetails } from "@/app/api/ebay/item/types";
import SkeletonDetailsPlaceholder from "./skeletonDetailsPlaceholder";
import ImageZoomComponent from "./imageZoomComponent";

type EbayDetailsWrapperProps = {
  children: ReactNode;
  itemId: number;
  watchCount?: number;
};

export default function EbayHasBidsDetailsWrapper({ children, itemId, watchCount }: EbayDetailsWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState<EbayItemDetails | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleDetails = async () => {
    try {
      setItemDetails(null);
      setIsLoading(true);
      const legacyItemResponse = await fetch(`/api/ebay/item?legacyId=${itemId}`);
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
            const filteredItemGroupData = itemGroupData.items.filter(
              (item: EbayItemDetails) =>
                item?.estimatedAvailabilities?.length > 0 &&
                item.estimatedAvailabilities[0]?.estimatedAvailableQuantity !== 0
            );
            setItemDetails(filteredItemGroupData[0]);
            setIsLoading(false);
          }
        } else {
          throw new Error(legacyItemData.error);
        }
      } else {
        setItemDetails(legacyItemData);
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
        {isLoading ? (
          <SkeletonDetailsPlaceholder />
        ) : itemDetails ? (
          <>
            <div className="animate-fadeInLeftToRight inline-flex justify-start">
              <span>
                <Image
                  width={20}
                  height={20}
                  src={watchCount && watchCount > 50 ? "/heart-fire.webp" : "/heart.webp"}
                  alt="heart"
                />
              </span>
              <span className="font-bold animate-fadeInLeftToRight ml-2">{`${watchCount} watchers`}</span>
            </div>
            <ScrollArea className="sm:h-[700px] h-[550px] px-2">
              <DialogHeader className="text-left">
                <Carousel
                  opts={{
                    align: "center",
                  }}
                  className="pt-2 pb-5 flex items-center m-auto sm:max-w-[410px] max-w-[250px]"
                >
                  <CarouselContent className='min-h-[200px]'>
                    <CarouselItem
                      key="primary-item"
                      className="flex item-center justify-center cursor-pointer"
                    >
                      <div className="relative">
                        {imageLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                        <img
                          src={itemDetails?.image?.imageUrl}
                          alt={'Primary Carousel Image'}
                          className={`object-cover sm:max-h-[400px] max-h-[300px] transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                          onLoad={() => setImageLoading(false)}
                          onClick={() => openZoomedImage(itemDetails.image.imageUrl)}
                        />
                      </div>
                    </CarouselItem>
                    {itemDetails?.additionalImages?.map((image, index) => (
                      <CarouselItem
                        key={`additional-item-${index}`}
                        className="flex aspect-square items-center justify-center p-0 cursor-pointer"
                      >
                        <img
                          src={image?.imageUrl}
                          alt={`Additional Image ${index + 1}`}
                          className="object-cover sm:max-h-[400px] max-h-[300px]"
                          onClick={() => openZoomedImage(image.imageUrl)}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="invisible sm:visible" />
                  <CarouselNext className="invisible sm:visible" />
                </Carousel>
                <DialogTitle
                  tabIndex={0}
                  className="font-bold md:text-xl sm:text-md text-sm pb-2"
                >
                  {itemDetails?.title}
                </DialogTitle>
                {itemDetails?.marketingPrice?.originalPrice?.value ? (
                  <p tabIndex={0} className="mb-1 font-normal md:text-lg text-md">
                    <span className="font-bold mr-2">Buy It Now:</span>
                    <span className="line-through">
                      {formatter.format(parseInt(itemDetails.marketingPrice.originalPrice.value))}
                    </span>
                    <span className="text-red-600 ml-2">
                      {formatter.format(parseInt(itemDetails.price.value))}
                    </span>
                  </p>
                ) : (
                  <p className="mb-1 font-bold md:text-lg text-md">
                    {formatter.format(parseInt(itemDetails.price.value))}
                  </p>
                )}
              </DialogHeader>
              <DialogDescription>
                <div className="my-5">
                  {itemDetails?.shortDescription?.length > 20 && (
                    <div className="flex my-2 items-start">
                      <p className="font-bold text-md sm:w-32 w-24">Description</p>
                      <p className="flex-1">{itemDetails.shortDescription}</p>
                    </div>
                  )}
                  <div className="flex my-1 items-center">
                    <p className="font-bold text-md sm:w-32 w-24">Seller</p>
                    <div className="flex-1">
                      <span>{itemDetails.seller.username}</span>
                      {itemDetails?.seller?.feedbackPercentage && (
                        <span
                          className={`ml-1 ${parseInt(itemDetails.seller.feedbackPercentage) > 90
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          ({itemDetails.seller.feedbackPercentage}%)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex my-1 items-center">
                    <p className="font-bold sm:w-32 w-24">Condition</p>
                    <p className="flex-1">{itemDetails.condition}</p>
                  </div>
                  {itemDetails.estimatedAvailabilities[0].estimatedAvailableQuantity > 0 && (
                    <div className="flex my-1 items-center">
                      <p className="font-bold sm:w-32 w-24">Quantity</p>
                      <p className="flex-1">
                        {itemDetails.estimatedAvailabilities[0].estimatedAvailableQuantity} Available
                      </p>
                    </div>
                  )}
                  {itemDetails?.gender && (
                    <div className="flex my-1 items-center">
                      <p className="font-bold sm:w-32 w-24">Gender</p>
                      <p className="flex-1">{itemDetails.gender}</p>
                    </div>
                  )}
                  {itemDetails?.material && (
                    <div className="flex my-1 items-center">
                      <p className="font-bold sm:w-32 w-24">Material</p>
                      <p className="flex-1">{itemDetails.material}</p>
                    </div>
                  )}
                  {itemDetails?.pattern && (
                    <div className="flex my-1 items-center">
                      <p className="font-bold sm:w-32 w-24">Pattern</p>
                      <p className="flex-1">{itemDetails.pattern}</p>
                    </div>
                  )}
                  {itemDetails.estimatedAvailabilities[0].estimatedSoldQuantity > 0 && (
                    <div className="flex my-1 items-center">
                      <p className="font-bold sm:w-32 w-24">Sold</p>
                      <p className="flex-1">
                        {itemDetails.estimatedAvailabilities[0].estimatedSoldQuantity} (to date)
                      </p>
                    </div>
                  )}
                  {itemDetails?.qualifiedPrograms?.length > 0 && (
                    <div className="flex my-1 items-center">
                      <p className="font-bold sm:w-32 w-24">Program</p>
                      <p className="flex-1">
                        {itemDetails.qualifiedPrograms[0]
                          .toLowerCase()
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </p>
                    </div>
                  )}
                  <div className="flex my-1 items-center">
                    <p className="font-bold sm:w-32 w-24">Location</p>
                    <p className="flex-1">
                      {itemDetails.itemLocation.stateOrProvince || itemDetails.itemLocation.city},{" "}
                      {itemDetails.itemLocation.country}
                    </p>
                  </div>
                  {itemDetails.returnTerms.returnsAccepted && (
                    <div className="flex my-1 items-center">
                      <p className="font-bold sm:w-32 w-24">Returns</p>
                      <p className="flex-1">Seller accepts returns</p>
                    </div>
                  )}
                </div>
                <div className="pt-5 pb-8 flex justify-center items-center">
                  <ButtonLink
                    href={itemDetails.itemAffiliateWebUrl}
                    mobileCopy="View in the eBay app"
                    desktopCopy="View on eBay.com"
                  />
                </div>
              </DialogDescription>
            </ScrollArea>
          </>
        ) : null}
        {zoomedImage && (
          <ImageZoomComponent zoomedImage={zoomedImage} closeZoomedImage={closeZoomedImage} />
        )}
      </DialogContent>
    </Dialog>
  );
}
