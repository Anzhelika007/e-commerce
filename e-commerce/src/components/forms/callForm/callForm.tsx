function CallForm() {
  return (
    <section className="call">
      <div className="wrapper call-box">
        <h2 className="call-title">We will call you back</h2>
        <div className="call-text">
          If you have any questions or concerns, please fill out <br /> form and
          we will call you back.
        </div>
        <form className="form__call">
          <input
            className="form__call-name input-text"
            placeholder="Ваше имя"
            type="text"
            name="name"
            id="#name"
            autoComplete="off"
          />
          <input
            className="form__call-email input-email"
            placeholder="Ваш Email"
            type="email"
            name="email"
            id="#email"
            autoComplete="off"
          />
          <button className="form__call-btn btn-submit" type="submit">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default CallForm;
