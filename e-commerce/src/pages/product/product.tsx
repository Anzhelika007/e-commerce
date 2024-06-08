import './product.scss';
import { useEffect, useState } from 'react';
import { getProduct } from '../../services/api/getProducts';
import { IProductPage } from '../../types/Product/InterfaceProduct';
import { ProductCardProps } from '../../components/productCard/productCard';
import { formattedDataForOneProduct } from '../catalog/formattedData';
import Spinner from '../../components/spinner/Spinner';
import ProductSlider from '../../components/slider/slider';

function Product() {
  const productData: ProductCardProps = {
    imageUrl: [''],
    onSale: false,
    title: '',
    description: '',
    newPrice: '0',
    oldPrice: '0',
    currency: '',
    id: '',
    size: '',
    color: '',
    model: '',
  };

  const [productProps, setProductProps] =
    useState<ProductCardProps>(productData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const startLocation = window.location.href;
    const cutLink = startLocation.split('/');
    const idProduct: string = cutLink[cutLink.length - 1];
    const productInfo = async () => {
      try {
        const oneProduct: IProductPage = await getProduct(idProduct);
        const oneProductProps: ProductCardProps =
          formattedDataForOneProduct(oneProduct);
        setProductProps(oneProductProps);
      } catch {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    productInfo();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const productImages = productProps.imageUrl.map((src, index) => ({
    src,
    id: String(index),
  }));

  return (
    <section className="product">
      <h2 className="product free-page">Product</h2>
      <div className="product-wrapper">
        <div className="product__img-box">
          <ProductSlider images={productImages} />
        </div>
        <div className="product__info">
          <div className="product__info-title">{productProps.title}</div>
          <div className="product__info-text">
            <b>Description:</b> {productProps.description}
          </div>
          <div className="product__info-price">
            <span>
              {' '}
              <b>Price: </b>
              <b>
                <em>
                  {productProps.currency}
                  {productProps.newPrice}
                </em>
              </b>
            </span>
            {productProps.onSale && (
              <span>
                {productProps.currency}
                {productProps.oldPrice}
              </span>
            )}
          </div>
          {productProps.size && (
            <div className="label-in-stock">
              <b>Size: </b>
              {productProps.size}
            </div>
          )}
          {productProps.color && (
            <div className="label-in-stock">
              <b>Color: </b>
              {productProps.color}
            </div>
          )}
          {productProps.model && (
            <div className="label-in-stock">
              <b>Model: </b>
              {productProps.model}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Product;
