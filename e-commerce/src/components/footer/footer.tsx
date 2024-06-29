/* SVG */
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';
import Logo from '../../assets/img/icons/Logo-footer.svg';

function Footer() {
  return (
    <footer className="footer container">
      <div className="footer__box wrapper">
        <div className="footer__top">
          <div className="footer__top-item">
            <img className="footer-icon" src={Logo} alt="logoFooter" />
            <SlSocialVkontakte className="footer-icon" />
            <FaXTwitter className="footer-icon" />
            <FaFacebookF className="footer-icon" />
          </div>
          <div className="footer__top-item footer__contact">
            <div className="footer__contact-title">Our phones</div>
            <a className="footer__contact-tell" href="tel:+79885650038">
              +7 (988) 565 00 38
            </a>
            <a className="footer__contact-tell" href="tel:+375336628256">
              +375 33 662 82 56
            </a>
          </div>
          <div className="footer__top-item">
            <div className="footer__contact-title">Our email</div>
            <a
              className="footer__contact-email"
              href="mailto:vladpertcev@mail.ru"
            >
              vladpertcev@mail.ru
            </a>
            <a
              className="footer__contact-email"
              href="mailto:korobko416@gmail.com"
            >
              korobko416@gmail.com
            </a>
          </div>
          <div className="footer__top-item">
            <div className="footer__contact-title">Our address</div>
            <div className="footer__contact-address">
              Russia, Rostov-on-Don
              <br /> st. Bogacheva, 16
            </div>
          </div>
        </div>
        <a
          className="footer__bottom"
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
        >
          © 2024 The Rolling Scopes School
        </a>
      </div>
    </footer>
  );
}

export default Footer;
