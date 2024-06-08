import CategoryImg from '../../assets/img/category/фото.png';

function Category() {
  return (
    <div className="category__card">
      <img className="category__card-bg" src={CategoryImg} alt="category" />
      <div className="category__card__wrapper">
        <h5 className="category__card-title">For hotels</h5>
        <button className="category__card-btn" type="submit">
          Go to category
        </button>
      </div>
    </div>
  );
}

export default Category;
