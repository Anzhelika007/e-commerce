import spinner from '../../assets/img/gif/spinner.gif';

function Spinner() {
  return (
    <section className="spinner-wrapper">
      <img className="spinner" src={spinner} alt="loading..." />
    </section>
  );
}

export default Spinner;
