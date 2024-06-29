import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getProduct } from '../../services/api/getProducts';
import { ProductCardProps } from '../../components/productCard/productCard';
import { formattedDataForOneProduct } from '../catalog/formattedData';
import { addLineToCart, removeLineFromCart } from '../../services/api/cart';
import { useAppDispatch } from '../../redux/hooks';
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
    inBasket: false,
  };

  const dispatch = useAppDispatch();
  const message = {
    addItem: 'Product added to cart',
    removeItem: 'Product removed from cart',
    error: 'Something went wrong',
  };

  const showMessage = (messageShow: string) => {
    if (messageShow === message.addItem) {
      toast.success(messageShow);
    } else if (messageShow === message.removeItem) {
      toast.success(messageShow);
    } else {
      toast.error(message.error);
    }
  };

  const navigate = useNavigate();

  const [productProps, setProductProps] =
    useState<ProductCardProps>(productData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [inBasket, setInBasket] = useState<boolean>(false);
  const [lineId, setLineId] = useState<string>('');

  useEffect(() => {
    const startLocation = window.location.href;
    const cutLink = startLocation.split('/');
    const idProduct: string = cutLink[cutLink.length - 1];
    const productInfo = async () => {
      try {
        const { oneProductData, checkInBasket, getLineId } =
          await getProduct(idProduct);
        setInBasket(checkInBasket);
        setLineId(getLineId);
        const oneProductProps: ProductCardProps = formattedDataForOneProduct(
          oneProductData,
          inBasket
        );
        setProductProps(oneProductProps);
      } catch {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    productInfo();
  }, [inBasket]);

  const handleBtnAddToCart = async (productId: string, messageShow: string) => {
    const answer = await addLineToCart(dispatch, productId);
    if (!answer.isError) {
      setInBasket(true);
      showMessage(messageShow);
    } else {
      showMessage(message.error);
    }
  };

  const handleBtnRemoveToCart = async (messageShow: string) => {
    const answer = await removeLineFromCart(dispatch, lineId);
    if (!answer.isError) {
      setInBasket(false);
      showMessage(messageShow);
    } else {
      showMessage(message.error);
    }
  };

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
      <button
        type="button"
        className="form__call-btn goBack-btn"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
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
          <div className="product-btn">
            <button
              type="button"
              className="basketAddItem-btn"
              disabled={inBasket}
              onClick={(e) => {
                e.stopPropagation();
                handleBtnAddToCart(productProps.id, message.addItem);
              }}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="basketRemoveItem-btn"
              disabled={!inBasket}
              onClick={(e) => {
                e.stopPropagation();
                handleBtnRemoveToCart(message.removeItem);
              }}
            >
              Remove in the basket
            </button>
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
