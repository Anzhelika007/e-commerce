import { getAccessToken } from './getCustomerToken';
import {
  IFilter,
  IProductResponseCategory,
} from '../../types/Product/InterfaceProduct';
import { ICategoriesResponse } from '../../types/Product/InterfaceCategories';
import { converterDigit } from '../../pages/catalog/formattedData';

const urlProject = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}`;
export enum SortField {
  PriceAsc = 'priceAsc',
  PriceDesc = 'priceDesc',
  CreatedAt = 'createdAtDesc',
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc',
  Default = 'createdAtAsc',
}

// Header for all request
async function requestOptions(): Promise<RequestInit> {
  const myHeaders = new Headers();
  const appToken = await getAccessToken().then((result) => result.access_token);
  myHeaders.append('Authorization', `Bearer ${appToken}`);

  const options: RequestInit = {
    method: 'GET',
    headers: myHeaders,
  };
  return options;
}

export async function getProduct(id: string) {
  const options = await requestOptions();
  const url = `${urlProject}/products/${id}`;

  const answer = await fetch(url, options);
  const result = await answer.json();

  return result;
}

export async function getCategories(): Promise<ICategoriesResponse> {
  const options = await requestOptions();
  const url = `${urlProject}/categories`;

  const answer = await fetch(url, options);
  const result = await answer.json();

  return result;
}

export async function getProductsSorted(
  categoryId: string,
  sortFieldKey: SortField = SortField.Default
): Promise<IProductResponseCategory> {
  const options = await requestOptions();

  const sortFieldOptional: Record<SortField, string> = {
    [SortField.PriceAsc]: 'price asc',
    [SortField.PriceDesc]: 'price desc',
    [SortField.CreatedAt]: 'createdAt desc',
    [SortField.NameAsc]: 'name.en asc',
    [SortField.NameDesc]: 'name.en desc',
    [SortField.Default]: 'createdAt asc',
  };
  const sortFieldGet = sortFieldOptional[sortFieldKey];

  const url = new URL(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/search?`
  );
  const filterCategory = categoryId
    ? `categories.id:"${categoryId}"`
    : `categories:exists`;
  url.searchParams.append('filter', filterCategory);
  url.searchParams.append('sort', sortFieldGet);
  url.searchParams.append('priceCurrency', 'USD');

  const answer = await fetch(url.toString(), options);

  const categoryProducts = await answer.json();
  return categoryProducts;
}

export async function searchProducts(value: string) {
  const options = await requestOptions();
  const language = 'en';
  const fuzzy = true;
  const url = `${urlProject}/product-projections/search?text.${language}=${value}&fuzzy=${fuzzy}`;

  const answer = await fetch(url, options);
  const result = await answer.json();

  return result;
}

export async function filterProductsInfo() {
  let fractionDigits = 0;
  const sortParamPriceMin = 'price asc';
  const sortParamPriceMax = 'price desc';
  const priceArr: number[] = [];
  const color: string[] = [];
  const model: string[] = [];

  const options = await requestOptions();

  const urlMinPrice = new URL(
    `${urlProject}/product-projections/search?price desc`
  );
  urlMinPrice.searchParams.append('sort', sortParamPriceMin);

  const answerMinPrice = await fetch(urlMinPrice, options);
  const resultMinPrice: IProductResponseCategory = await answerMinPrice.json();

  const urlMaxPrice = new URL(
    `${urlProject}/product-projections/search?price desc`
  );
  urlMaxPrice.searchParams.append('sort', sortParamPriceMax);

  const answerMaxPrice = await fetch(urlMaxPrice, options);
  const resultMaxPrice: IProductResponseCategory = await answerMaxPrice.json();

  const result = resultMinPrice.results.concat(resultMaxPrice.results);

  result.forEach((product) => {
    const productPrice = product.masterVariant.prices[0].value.centAmount;
    fractionDigits = product.masterVariant.prices[0].value.fractionDigits;
    const price = productPrice / converterDigit(fractionDigits);
    priceArr.push(price);

    if (product.masterVariant.attributes[1]?.value) {
      // console.log('color', product.variants)
      const productColor = product.masterVariant.attributes[1].value;
      if (!color.includes(productColor)) {
        color.push(productColor);
        color.sort();
      }
    }

    if (product.masterVariant.attributes[2]?.value) {
      const productModel = product.masterVariant.attributes[2].value;
      if (!model.includes(productModel)) {
        model.push(productModel);
        model.sort();
      }
    }
  });
  const priceMin: number = Math.min(...priceArr);
  const priceMax: number = Math.max(...priceArr);

  const filterProps: IFilter = {
    priceMax,
    priceMin,
    color,
    model,
    fractionDigits,
  };

  return filterProps;
}

export async function filterProducts(data: IFilter) {
  const options = await requestOptions();
  const url = new URL(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/search?`
  );
  if (data.color.length > 0) {
    const param = data.color.map((elem) => `"${elem}"`).join(', ');
    url.searchParams.append('filter', `variants.attributes.color: ${param}`);
  }
  if (data.model.length > 0) {
    const param = data.model.map((elem) => `"${elem}"`).join(', ');
    url.searchParams.append('filter', `variants.attributes.model:${param}`);
  }

  if (data.priceMax && data.priceMin) {
    const minPrice = data.priceMin * converterDigit(data.fractionDigits);
    const maxPrice = data.priceMax * converterDigit(data.fractionDigits);
    const filterPrice = `variants.price.centAmount:range (${minPrice} to ${maxPrice})`;
    url.searchParams.append('filter', filterPrice);
  }
  const answer = await fetch(url, options);
  const result: IProductResponseCategory = await answer.json();
  return result;
}
