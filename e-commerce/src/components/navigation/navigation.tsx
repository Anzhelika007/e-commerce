import { NavLink, Link } from 'react-router-dom';
/* Redux */
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/store/userSlice';

function Navigation() {
  const isUserLogged =
    useAppSelector((state) => state.userSlice.authToken.access_token).length >
    0;
  const dispatch = useAppDispatch();
  const userLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/catalog">Catalog</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/basket">Basket</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/profile" className={!isUserLogged ? 'none' : 'red'}>
            Profile
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/registration" className={isUserLogged ? 'none' : 'red'}>
            Registration
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/login" className={isUserLogged ? 'none' : 'red'}>
            Login
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <Link
            to="/"
            className={!isUserLogged ? 'none' : 'red'}
            onClick={userLogout}
          >
            LogOut
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
