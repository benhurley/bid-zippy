export type EbaySearchResultItem = {
    itemId: string;
    title: string;
    itemGroupHref: string;
    leafCategoryIds: string[]; // Assuming it's an array of strings
    categories: any[]; // Assuming an array of Category objects
    image: any; // Assuming an Image object
    price: any; // Assuming a Price object
    itemGroupType: string;
    itemHref: string;
    seller: any; // Assuming a Seller object
    marketingPrice: any; // Assuming a MarketingPrice object
    condition: string;
    conditionId: string;
    thumbnailImages: any[]; // Assuming an array of Image objects
    shippingOptions: any[]; // Assuming an array of ShippingOption objects
    buyingOptions: string[]; // Assuming an array of strings
    itemWebUrl: string;
    itemLocation: any; // Assuming an ItemLocation object
    adultOnly: boolean;
    legacyItemId: string;
    availableCoupons: boolean;
    itemCreationDate: string; // Using string to represent dates, could use Date depending on usage
    topRatedBuyingExperience: boolean;
    priorityListing: boolean;
    listingMarketplaceId: string;
  };

  type Price = {
    value: number;
    currencyId: string;
  };
  
  export type EbayMostWatchedItem = {
    buyItNowPrice: Price;
    country: string;
    globalId: string;
    imageURL: string;
    itemId: number;
    primaryCategoryId: number;
    primaryCategoryName: string;
    shippingCost: Price;
    shippingType: string;
    subtitle: string;
    timeLeft: string;
    title: string;
    viewItemURL: string;
    watchCount: number;
  };
  

  