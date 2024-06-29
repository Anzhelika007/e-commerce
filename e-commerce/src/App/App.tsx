import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

/* Components */
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
/* Pages */
import * as Pages from '../pages/pages';
/* Style */
import './app.scss';
// Redux
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/store/userSlice';
// import { setAppToken } from '../redux/store/appSlice';
// Services
import { getAppToken } from '../services/api/getAppToken';
import { getDiscountsCodes } from '../services/api/discounts';
import { getAnonymousToken } from '../services/api/getAnonymousToken';
import { getCustomerInfo } from '../services/api/getCustomerInfo';
import { getCart } from '../services/api/cart';

function App() {
  const navigate = useNavigate();
  const startLocation = window.location.href;
  let navigateTo = '';
  if (startLocation.includes('#')) {
    const startLocationParts = startLocation.split('#');
    if (startLocationParts.length === 2) {
      navigateTo = `/${startLocationParts[1]}`;
    }
  }
  const dispatch = useAppDispatch();
  const getInitialData = async () => {
    await getAppToken(dispatch);
    await getDiscountsCodes(dispatch);

    const userInfo = await getCustomerInfo(dispatch);
    if (userInfo.isError) {
      dispatch(logout());
      const anonymousToken = await getAnonymousToken(dispatch, true);
      if (!anonymousToken.isError) {
        getCart(dispatch);
      }
    } else {
      getCart(dispatch);
    }
    if (navigateTo) {
      navigate(`/${navigateTo}`);
    }
  };
  useEffect(() => {
    getInitialData();
  });

  return (
    <>
      <Header />
      <main className="main container">
        <Routes>
          <Route path="/">
            <Route index element={<Pages.Home />} />
            <Route path="/index" element={<Pages.Home />} />
            <Route path="/index.html" element={<Pages.Home />} />
            <Route path="/login" element={<Pages.Login />} />
            <Route path="/registration" element={<Pages.Registration />} />
            <Route path="/about" element={<Pages.About />} />
            <Route path="/catalog" element={<Pages.Catalog />} />
            <Route path="/product/:id" element={<Pages.Product />} />
            <Route path="/profile" element={<Pages.Profile />} />
            <Route path="/basket" element={<Pages.Basket />} />
            <Route path="/*" element={<Pages.Unknown />} />
          </Route>
        </Routes>
      </main>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: '',
          duration: 2000,
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: 'white',
            backgroundColor: 'green',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'green',
          },

          // Default options for specific types
          error: {
            duration: 3000,
            style: {
              color: 'red',
              backgroundColor: 'pink',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'red',
            },
          },
        }}
      />
      <Footer />
    </>
  );
}

export default App;
