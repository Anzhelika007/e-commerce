import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/* Components */
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
/* Pages */
import * as Pages from '../pages/pages';
/* Style */
import './app.scss';
import { useAppDispatch } from '../redux/hooks';
import { setAppToken, setAppAccessToken } from '../redux/store/appSlice';
import { logout, setUserLogged } from '../redux/store/userSlice';
import { createAccessToken } from '../services/api/getAppToken';
import { getCustomerInfo } from '../services/api/getCustomerInfo';
import store from '../redux/store/store';

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
  const getInitialDate = async () => {
    const appTokenStore = store.getState().appSlice.authToken;
    const currenDateValue = new Date().getTime() / 1000;
    if (
      appTokenStore.expires_in < currenDateValue &&
      appTokenStore.access_token === ''
    ) {
      dispatch(setAppAccessToken('fetching'));
      const appToken = await createAccessToken();
      dispatch(setAppToken(appToken));
    }
    const userInfo = await getCustomerInfo();
    if (!userInfo) dispatch(logout());
    else dispatch(setUserLogged(userInfo));
    if (navigateTo) {
      navigate(`/${navigateTo}`);
    }
  };
  useEffect(() => {
    getInitialDate();
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
      <Footer />
    </>
  );
}

export default App;
