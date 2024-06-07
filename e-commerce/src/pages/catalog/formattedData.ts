import {
  IProductResponseCategory,
  Image,
  IProductPage,
} from '../../services/api/InterfaceProduct';
import { ProductCardProps } from '../../components/productCard/productCard';
import { ICategoriesResponse } from '../../services/api/InterfaceCategories';
import { CategoryProps } from '../../components/asideCatalogCategory/asideCatalogCategory';

export const converterDigit = (digit: number): number => {
  switch (digit) {
    case 1:
      return 10;
    case 2:
      return 100;
    default:
      return 1;
  }
};
export const converterPrice = (
  price: number,
  fractionDigits: number
): string => {
  const formatted = (price / converterDigit(fractionDigits)).toFixed(
    fractionDigits
  );
  return formatted;
};

export function formattedDataForCategory(
  array: ICategoriesResponse
): CategoryProps[] {
  const categories: CategoryProps[] = [];
  const categoryDefault: CategoryProps = {
    name: 'All',
    id: 'exists',
    isCurrent: true,
  };
  categories.push(categoryDefault);
  array.results.forEach((category) => {
    const name: string = category.name.en;
    const { id } = category;
    const propsCategory: CategoryProps = {
      name,
      id,
      isCurrent: false,
    };
    categories.push(propsCategory);
    categories.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  });
  return categories;
}

export function formattedDataForCardInCategory(
  array: IProductResponseCategory
) {
  const productsAllGet: ProductCardProps[] = [];
  array.results.forEach((product) => {
    const title: string = product.name.en;
    const description: string = product.description.en;
    const imageUrl: string[] = [product.masterVariant.images[0].url];
    let onSale: boolean = false;
    const { fractionDigits } = product.masterVariant.prices[0].value;
    const oldPrice = converterPrice(
      product.masterVariant.prices[0].value.centAmount,
      fractionDigits
    );
    let newPrice = oldPrice;
    if (product.masterVariant.prices[0].discounted) {
      newPrice = converterPrice(
        product.masterVariant.prices[0].discounted.value.centAmount,
        fractionDigits
      );
      onSale = true;
    }
    const { id } = product;
    const currencyName = product.masterVariant.prices[0].value.currencyCode;
    const currency = currencyName === 'USD' ? '$' : '€';

    const propsCard: ProductCardProps = {
      imageUrl,
      onSale,
      title,
      description,
      newPrice,
      oldPrice,
      currency,
      id,
    };
    productsAllGet.push(propsCard);
  });
  return productsAllGet;
}

export function formattedDataForOneProduct(data: IProductPage) {
  const imageUrl: string[] = [];
  data.masterData.staged.masterVariant.images.forEach((url: Image) => {
    imageUrl.push(url.url);
  });
  const { fractionDigits } =
    data.masterData.staged.masterVariant.prices[0].value;
  const oldPrice = converterPrice(
    data.masterData.staged.masterVariant.prices[0].value.centAmount,
    fractionDigits
  );
  const onSale = !!data.masterData.staged.masterVariant.prices[0].discounted;
  let newPrice = oldPrice;
  if (
    onSale &&
    data.masterData.staged.masterVariant.prices[0].discounted?.value.centAmount
  ) {
    newPrice = converterPrice(
      data.masterData.staged.masterVariant.prices[0].discounted.value
        .centAmount,
      fractionDigits
    );
  }
  const currencyName =
    data.masterData.staged.masterVariant.prices[0].value.currencyCode;
  const currency = currencyName === 'USD' ? '$' : '€';
  const { id } = data;
  let color = '';
  let model = '';
  let size = '';
  data.masterData.current.masterVariant.attributes.forEach((elem) => {
    if (elem.name === 'color') {
      color = elem.value;
    } else if (elem.name === 'model') {
      model = elem.value;
    } else if (elem.name === 'size') {
      size = elem.value;
    }
  });

  const propsProductProps: ProductCardProps = {
    imageUrl,
    onSale,
    title: data.masterData.current.name.en,
    description: data.masterData.current.description.en,
    newPrice,
    oldPrice,
    currency,
    id,
    size,
    color,
    model,
  };
  return propsProductProps;
}
