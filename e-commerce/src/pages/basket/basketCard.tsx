import {
  addLineToCart,
  substLineFromCart,
  removeLineFromCart,
} from '../../services/api/cart';
import { useAppDispatch } from '../../redux/hooks';

export type BasketCardProps = {
  lineId: string;
  id: string;
  imageUrl: string[];
  inStock?: boolean;
  onSale: boolean;
  discounted: boolean;
  hasGift?: boolean;
  title: string;
  newPrice: string;
  oldPrice: string;
  salePrice: string;
  currency: string;
  quantity: number;
  fullPrice: string;
  size?: string;
  color?: string;
  model?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export function BasketCard({
  lineId,
  id,
  imageUrl,
  inStock = false,
  onSale,
  discounted,
  hasGift = false,
  title,
  newPrice,
  oldPrice,
  salePrice,
  currency,
  quantity,
  fullPrice,
  size,
  color,
  model,
  onClick,
}: BasketCardProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="basket-card">
      <div className="basket-card__header">
        <button
          type="button"
          className="basket-card-btn basket-card-btn-remove basket-catalog-button"
          onClick={(e) => {
            e.stopPropagation();
            removeLineFromCart(dispatch, lineId);
          }}
        >
          x
        </button>
        {inStock && <div className="label-in-stock">In stock</div>}
        {onSale && <div className="label-sale">SALE</div>}
        {hasGift && <div className="label-gift">Present</div>}
      </div>
      <div
        className="basket-card__img basket-catalog-button"
        style={{ backgroundImage: `url(${imageUrl[0]})` }}
        data-id={id}
        onClick={onClick}
        aria-hidden="true"
      />
      <div className="basket-card__info">
        <div className="basket-card__info-title">
          <div className="basket-card__info-title-name">{title}</div>
          <div className="basket-card__info-description">
            {model} / {color}
          </div>
        </div>
        {size && <div className="basket-card__info-description">{size}</div>}
        <div className="basket-price-new">
          {currency} {newPrice}
          {onSale && (
            <div className="basket-price-old">
              {currency} {oldPrice}
            </div>
          )}
        </div>
        <div className="basket-card__info-quantity">
          Quantity: {quantity}
          <div className="basket-card_buttons">
            <button
              type="button"
              className="basket-card-btn basket-catalog-button"
              disabled={quantity < 2}
              onClick={(e) => {
                e.stopPropagation();
                substLineFromCart(dispatch, lineId);
              }}
            >
              -
            </button>
            <button
              type="button"
              className="basket-card-btn basket-catalog-button"
              onClick={(e) => {
                e.stopPropagation();
                addLineToCart(dispatch, id);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="basket-price-sum">
          Full price: {fullPrice}
          {(onSale || discounted) && (
            <div className="basket-price-full-old">
              {currency}{' '}
              {(parseFloat(salePrice) * quantity).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
