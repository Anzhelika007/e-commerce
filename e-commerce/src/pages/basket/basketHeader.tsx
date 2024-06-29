import './basket.scss';
import { toast } from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  clearCart,
  clearDiscountCode,
  toFixedFormat,
} from '../../services/api/cart';
import { AppMessage } from '../../services/api/getAppToken';
import { Cart } from '../../redux/store/cartSlice';

function BasketHeader() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cartSlice.cart);

  function showToast(result: AppMessage<Cart>) {
    if (result.isError) {
      toast.error(result.message!);
    } else {
      toast.success(result.message!);
    }
  }

  async function handlerClearCart() {
    let result = await clearDiscountCode(dispatch);
    result = await clearCart(dispatch);
    showToast(result);
  }

  return (
    <>
      <button
        type="button"
        className="basket-catalog-clear-button basket-catalog-buttons"
        onClick={(e) => {
          e.stopPropagation();
          handlerClearCart();
        }}
      >
        Clear basket
      </button>
      <div className="basket-catalog-total-price">
        <div className="basket-catalog-total-price-current">
          Total: {cart.totalPrice.currencyCode}{' '}
          {toFixedFormat(cart.totalPrice.centAmount / 100, 2)}
        </div>
        {!!cart.discountOnTotalPrice && (
          <div className="basket-price-total-old">
            {cart.totalPrice.currencyCode}{' '}
            {toFixedFormat(
              (cart.totalPrice.centAmount +
                cart.discountOnTotalPrice.discountedAmount.centAmount) /
                100,
              2
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default BasketHeader;
