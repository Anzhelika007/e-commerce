import './basket.scss';
import { toast } from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { clearDiscountCode } from '../../services/api/cart';
import { AppMessage } from '../../services/api/getAppToken';
import { findDiscountCodes } from '../../services/api/discounts';
import { Cart } from '../../redux/store/cartSlice';

function Discounts() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cartSlice.cart);
  const cartDiscountCodes = findDiscountCodes(cart.discountCodes);

  function showToast(result: AppMessage<Cart>) {
    if (result.isError) {
      toast.error(result.message!);
    } else {
      toast.success(result.message!);
    }
  }

  async function clickDelDiscountCode() {
    const result = await clearDiscountCode(dispatch);
    showToast(result);
  }

  return (
    <div className="basket-discount-codes">
      {cartDiscountCodes.map((code) => (
        <div className="basket-discount-codes-code" key={code.code}>
          {code.code}
        </div>
      ))}
      <button
        type="button"
        className="discount-code-clear-btn"
        onClick={(e) => {
          e.stopPropagation();
          clickDelDiscountCode();
        }}
      >
        Clear
      </button>
    </div>
  );
}

export default Discounts;
