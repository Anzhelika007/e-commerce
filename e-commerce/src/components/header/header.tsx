import { Link } from 'react-router-dom';
/* SVG */

// import { FaRegUser } from 'react-icons/fa6';
// import { GrFavorite } from 'react-icons/gr';
// import { LuShoppingCart } from 'react-icons/lu';
import Logo from '../../assets/img/icons/Logo-header.svg';
import Navigation from '../navigation/navigation';
import { useAppSelector } from '../../redux/hooks';

function Header() {
  const userLoggedEmail = useAppSelector((state) => state.userSlice.email);
  return (
    <header className="container header">
      <div className="header__top wrapper">
        <div className="header__top-item">
          10% discount with promo code “ZAMOK” on all orders until 10.09.2024
        </div>
        <a className="header__top-item" href="tel:+79665588499">
          Back call
        </a>
      </div>
      <div className="header__bottom wrapper">
        <div className="header__bottom-item">
          <Link to="/">
            <img className="header__bottom-logo" src={Logo} alt="logo" />
          </Link>
          <Navigation />
        </div>
        <div
          className="header__bottom-item"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            height: '20px',
          }}
        >
          {/* <a className="header__bottom-tel" href="tel:+79665588499">
            +7 (966) 55 88 499
          </a>
          <Link to="/">
            <GrFavorite className="icon-header" />
          </Link>
          <Link to="/basket">
            <LuShoppingCart className="icon-header" />
          </Link>
          <Link to="/login">
            <FaRegUser className="icon-header" />
          </Link> */}
          {userLoggedEmail}
        </div>
      </div>
    </header>
  );
}

export default Header;
