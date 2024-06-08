import './stubs.scss';
import Stub from '../../assets/img/icons/bed.svg';

function NotFound() {
  return <img className="not-found" src={Stub} alt="We work" />;
}

export default NotFound;
