interface Category {
  ancestors: string;
  assets: string;
  createdAt: string;
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  externalId: string;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: false;
  };
  name: { en: string };
  orderHint: string;
  slug: { en: string };
  version: number;
  versionModifiedAt: string;
}

export interface ICategoriesResponse {
  count: number;
  limit: number;
  offset: number;
  results: Category[];
  total: number;
}
