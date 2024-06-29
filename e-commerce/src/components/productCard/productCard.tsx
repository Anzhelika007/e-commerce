import { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { addLineToCart } from '../../services/api/cart';
import { AppMessage } from '../../services/api/getAppToken';
import { useAppDispatch } from '../../redux/hooks';
import { Cart } from '../../redux/store/cartSlice';
import SpinnerOnProductCart from '../spinnerProductCard/SpinnerOnProductCard';

export type ProductCardProps = {
  imageUrl: string[];
  inStock?: boolean;
  onSale: boolean;
  hasGift?: boolean;
  title: string;
  description: string;
  newPrice: string;
  oldPrice: string;
  currency: string;
  id: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  size?: string;
  color?: string;
  model?: string;
  inBasket?: boolean;
  toasted?: (result: AppMessage<Cart>) => void;
};

export function ProductCard({
  imageUrl,
  inStock = false,
  onSale,
  hasGift = false,
  title,
  description,
  newPrice,
  oldPrice,
  currency,
  onClick,
  id,
  size,
  color,
  model,
  inBasket = false,
  toasted,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  const [productInBasket, setProductInBasket] = useState(inBasket);
  const [isLoading, setIsLoading] = useState(false);

  const handleToBasketClick = async (productId: string) => {
    setIsLoading(true);
    setProductInBasket(true);
    const answer = await addLineToCart(dispatch, productId);
    if (toasted) toasted(answer);
    if (answer.isError) setProductInBasket(false);
    setIsLoading(false);
  };

  return (
    <div className="card" data-id={id} onClick={onClick} aria-hidden="true">
      <div
        className="card__img"
        style={{ backgroundImage: `url(${imageUrl[0]})` }}
      >
        {inStock && <div className="label-in-stock">In stock</div>}
        {onSale && <div className="label-sale">SALE</div>}
        {hasGift && <div className="label-gift">Present</div>}
      </div>
      <div className="card__info">
        <div className="card__info-title">{title}</div>
        <div className="card__info-description">
          {description}/{model}/{size}/{color}
        </div>
        <span className="price-new">
          {currency}
          {newPrice}
        </span>
        {onSale && (
          <span className="price-old">
            {currency}
            {oldPrice}
          </span>
        )}
      </div>

      {!productInBasket && !isLoading ? (
        <button
          type="button"
          className="basketAdd-btn"
          onClick={(e) => {
            e.stopPropagation();
            // addLineToCart(dispatch, id);
            handleToBasketClick(id);
          }}
        >
          Add to Cart
        </button>
      ) : (
        <button type="submit" className="basketIn-btn" disabled>
          {isLoading && <SpinnerOnProductCart />}
          In the basket
        </button>
      )}
    </div>
  );
}
