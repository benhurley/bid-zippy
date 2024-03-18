interface Price {
    value: string;
    currency: string;
  }
  
  interface Image {
    imageUrl: string;
    width: number;
    height: number;
  }
  
  interface MarketingPrice {
    originalPrice: Price;
    discountPercentage: string;
    discountAmount: Price;
    priceTreatment: string;
  }
  
  interface SellerLegalInfo {
    // This seems to be an empty object in the provided JSON, but you can extend it as needed.
  }
  
  interface Seller {
    username: string;
    feedbackPercentage: string;
    feedbackScore: number;
    sellerLegalInfo: SellerLegalInfo;
  }
  
  interface EstimatedAvailability {
    deliveryOptions: string[];
    estimatedAvailabilityStatus: string;
    estimatedAvailableQuantity: number;
    estimatedSoldQuantity: number;
  }
  
  interface ShippingCost {
    value: string;
    currency: string;
  }
  
  interface ShippingOption {
    shippingServiceCode: string;
    trademarkSymbol: string;
    shippingCarrierCode: string;
    type: string;
    shippingCost: ShippingCost;
    quantityUsedForEstimate: number;
    minEstimatedDeliveryDate: string;
    maxEstimatedDeliveryDate: string;
    additionalShippingCostPerUnit: ShippingCost;
    shippingCostType: string;
  }
  
  interface Region {
    city: string,
    country: string,
    postalCode: string,
    stateOrProvince: string,
  }
  
  interface ShipToLocations {
    regionIncluded: Region[];
    regionExcluded: Region[];
  }
  
  interface ReturnPeriod {
    value: number;
    unit: string;
  }
  
  interface ReturnTerms {
    returnsAccepted: boolean;
    refundMethod: string;
    returnMethod: string;
    returnShippingCostPayer: string;
    returnPeriod: ReturnPeriod;
  }
  
  interface TaxJurisdiction {
    region: Region;
    taxJurisdictionId: string;
  }
  
  interface Tax {
    taxJurisdiction: TaxJurisdiction;
    taxType: string;
    shippingAndHandlingTaxed: boolean;
    includedInPrice: boolean;
    ebayCollectAndRemitTax: boolean;
  }
  
  interface LocalizedAspect {
    type: string;
    name: string;
    value: string;
  }
  
  interface PaymentMethodBrand {
    paymentMethodBrandType: string;
  }
  
  interface PaymentMethod {
    paymentMethodType: string;
    paymentMethodBrands?: PaymentMethodBrand[];
  }
  
  interface EbayItemDetails {
    itemId: string;
    sellerItemRevision: string;
    title: string;
    shortDescription: string;
    price: Price;
    categoryPath: string;
    categoryIdPath: string;
    condition: string;
    conditionId: string;
    itemLocation: Region;
    image: Image;
    additionalImages: Image[];
    marketingPrice: MarketingPrice;
    ageGroup: string;
    gender: string;
    brand: string;
    itemCreationDate: string;
    seller: Seller;
    gtin: string;
    estimatedAvailabilities: EstimatedAvailability[];
    shippingOptions: ShippingOption[];
    shipToLocations: ShipToLocations;
    returnTerms: ReturnTerms;
    taxes: Tax[];
    localizedAspects: LocalizedAspect[];
    itemWebUrl: string;
    description: string;
    paymentMethods: PaymentMethod[];
    enabledForGuestCheckout: boolean;
    eligibleForInlineCheckout: boolean;
    lotSize: number;
    legacyItemId: string;
    priorityListing: boolean;
    qualifiedPrograms: string[]; // Assuming an array of strings
    adultOnly: boolean;
    categoryId: string;
    listingMarketplaceId: string;
  }
  