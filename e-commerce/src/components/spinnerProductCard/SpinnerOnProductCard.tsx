import spinner from '../../assets/img/gif/spinnerOnCart1.gif';

function SpinnerOnProductCart() {
  return (
    <div className="wrapper-spinner-cardProduct">
      <img className="spinner-cardProduct" src={spinner} alt="loading..." />;
    </div>
  );
}

export default SpinnerOnProductCart;
