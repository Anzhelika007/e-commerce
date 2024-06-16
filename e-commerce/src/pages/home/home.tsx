// import Slider from '../../components/slider/slider';
import Category from '../../components/category/category';
// import SliderProduct from '../../components/sliderProducts/sliderProducts';
import CallForm from '../../components/forms/callForm/callForm';
/* SVG */
import Reason from '../../assets/img/icons/product-return.svg';
import Reason1 from '../../assets/img/icons/evaluate.svg';

function Home() {
  return (
    <>
      <h1>Home</h1>
      <div>asinc5discount asinc7lucky</div>
      <main className="main container">
        {/* <section className="slider__section">
        <div className="wrapper">
          <Slider />
        </div>
      </section> */}
        <section className="number">
          <div className="wrapper number__box">
            <div className="number__box__item">
              <h3 className="number__box-number">5,567</h3>
              <div className="number__box-text">Happy clients</div>
            </div>
            <div className="number__box__item">
              <h3 className="number__box-number">1245</h3>
              <div className="number__box-text">Products to choose from</div>
            </div>
            <div className="number__box__item">
              <h3 className="number__box-number">372</h3>
              <div className="number__box-text">Sales per day</div>
            </div>
            <div className="number__box__item">
              <h3 className="number__box-number">20</h3>
              <div className="number__box-text">Years on the market</div>
            </div>
          </div>
        </section>
        <section className="we">
          <div className="wrapper we__box">
            <h2 className="we-title">Why GoldenService? </h2>
            <div className="we__reason">
              <div className="we__reason-item">
                <img className="we__reason-img" src={Reason} alt="img" />
                <div className="we__reason-text">
                  Refund of double the cost of each lock in case of defect
                </div>
              </div>
              <div className="we__reason-item">
                <img className="we__reason-img" src={Reason1} alt="img" />
                <div className="we__reason-text">
                  We put your company logo on our product
                </div>
              </div>
              <div className="we__reason-item">
                <img className="we__reason-img" src={Reason} alt="img" />
                <div className="we__reason-text">
                  Refund of double the cost of each lock in case of defect{' '}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="categoryes">
          <div className="wrapper categoryes__box">
            <h2 className="categoryes-title">Categories</h2>
            <div className="categoryes__gallery">
              <Category />
              <Category />
              <Category />
              <Category />
            </div>
            <button className="categoryes-btn" type="submit">
              All categories
            </button>
          </div>
        </section>
        {/* <section className="popular-products ">
        <div className="wrapper popular-products-box">
          <h2 className="popular-products-title">Our popular products</h2>
          <SliderProduct />
        </div>
      </section> */}
        <CallForm />
      </main>
    </>
  );
}

export default Home;
