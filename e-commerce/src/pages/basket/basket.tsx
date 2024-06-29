import './basket.scss';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { BasketCard } from './basketCard';
import { getProductCards } from '../../services/api/cart';
import { findDiscountCodes } from '../../services/api/discounts';
import BasketHeader from './basketHeader';
import AddingDiscountCode from './addDiscount';
import Discounts from './discounts';

function Basket() {
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cartSlice.cart);
  const productCards = getProductCards(cart);
  const cartDiscountCodes = findDiscountCodes(cart.discountCodes);

  return (
    <section className="basket-catalog">
      <h2 className="basket-catalog-title">Basket</h2>
      <div className="basket-catalog-wrapper">
        {productCards.length ? (
          <>
            <BasketHeader />

            <AddingDiscountCode />

            {cartDiscountCodes.length > 0 && <Discounts />}
            <div className="catalog-products">
              <div className="catalog-product" id="catalog-product">
                {productCards.map((product) => (
                  <BasketCard
                    {...product}
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="basket-catalog-empty">
            <div className="basket-catalog-empty-text">Basket is empty</div>
            <div>
              {' '}
              Looks like you haven&apos;t added anything to your cart yet. Start
              shopping to fill it up!
            </div>
            <NavLink className="basket-catalog-empty-link" to="/catalog">
              <span className="basket-catalog-clear-button basket-catalog-button basket-catalog-empty-link-text">
                Go to Catalog
              </span>
            </NavLink>
          </div>
        )}
      </div>
    </section>
  );
}

export default Basket;
