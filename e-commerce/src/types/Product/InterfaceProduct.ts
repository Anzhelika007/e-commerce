interface Price {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  discounted?: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: {
      typeId: string;
      id: string;
    };
  };
}

export interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface Attribute {
  name: string;
  value: string;
}

interface Variant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: string; // []
}
interface Categories {
  categories: {
    typeId: string;
    id: string;
  }[];
}

interface Current {
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  categories: Categories;
  categoryOrderHints: string; // object
  slug: {
    en: string;
  };
  metaTitle: {
    en: string;
  };
  metaDescription: {
    en: string;
  };
  masterVariant: Variant;
  variants: Variant[];
  searchKeywords: string;
}

interface MasterData {
  current: Current;
  staged: Current;
  published: boolean;
  hasStagedChanges: boolean;
}
interface CreatedBy {
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
}
interface ProductType {
  productType: {
    typeId: string;
    id: string;
  };
}
interface TaxCategory {
  taxCategory: {
    typeId: string;
    id: string;
  };
}
export interface IProduct {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
  };
  createdBy: CreatedBy;
  productType: ProductType;
  masterData: MasterData;
  taxCategory: TaxCategory;
  lastVariantId: number;
}

export interface IProductResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: IProduct[];
}
// Category Interface
interface ProductCategoryProducts {
  id: string;
  version: number;
  productType: ProductType;
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  categories: Categories;
  categoryOrderHints: string;
  slug: {
    en: string;
  };
  metaTitle: {
    en: string;
  };
  metaDescription: {
    en: string;
  };
  variants: Variant[];
  masterVariant: Variant;
  searchKeywords: string;
  hasStagedChanges: boolean;
  published: boolean;
  taxCategory: TaxCategory;
  createdAt: string;
  lastModifiedAt: string;
}

export interface IProductResponseCategory {
  count: number;
  facets: object;
  limit: number;
  offset: number;
  total: number;
  results: ProductCategoryProducts[];
}

/* Page product */
export interface IProductPage {
  createdAt: CreatedBy;
  createdBy: CreatedBy;
  id: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
  };
  lastVariantId: number;
  masterData: MasterData;
  productType: ProductType;
  taxCategory: TaxCategory;
  version: number;
  versionModifiedAt: string;
}

export interface IFilter {
  priceMin: number;
  priceMax: number;
  model: string[];
  color: string[];
  fractionDigits: number;
}
