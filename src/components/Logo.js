import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <FontAwesomeIcon icon={faTwitter} />
    </div>
  );
};

export default Logo;
