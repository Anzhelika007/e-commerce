import './basket.scss';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../../redux/hooks';
import { addDiscountCode } from '../../services/api/cart';
import { AppMessage } from '../../services/api/getAppToken';
import { Cart } from '../../redux/store/cartSlice';

function AddingDiscountCode() {
  const dispatch = useAppDispatch();

  function showToast(result: AppMessage<Cart>) {
    if (result.isError) {
      toast.error(result.message!);
    } else {
      toast.success(result.message!);
    }
  }

  const [discountCode, setDiscountCode] = useState('');

  async function handleAddDiscountCode() {
    const result = await addDiscountCode(dispatch, discountCode);
    if (!result.isError) setDiscountCode('');
    showToast(result);
  }

  return (
    <div className="basket-discount-code">
      <div className="basket-discount-code-header">Discount</div>
      <label htmlFor="discount-code" className="search-label">
        <input
          type="input"
          id="discount-code"
          name="search"
          placeholder="Discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="discount-code-input"
        />
        <button
          className="clear-btn"
          type="button"
          onClick={() => setDiscountCode('')}
          disabled={!discountCode}
        >
          x
        </button>
        <button
          className="search-btn"
          type="button"
          onClick={handleAddDiscountCode}
          disabled={!discountCode}
        >
          Add
        </button>
      </label>
    </div>
  );
}

export default AddingDiscountCode;
