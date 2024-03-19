import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import renderContent from '../../features/content/renderContent';

type NavButtonProps = {
    key?: number
  to: string
  vector?: string
  className: string
};

const NavButton = (props: NavButtonProps) => {

    const to = props.to;
    const vector = props.vector;
    const className = props.className;
    
    const navigate = useNavigate();

    const handleNav = () => {
        navigate(to);
    }

    return (
        <button className={className} onClick={handleNav}>
            {className === 'back-button' ? 
                <FontAwesomeIcon icon={faArrowLeft} size='2x' color='#fff'/> :
                renderContent('icons', 'BottomNavbar', vector!)
            }
        </button>
    );
};

export default NavButton;
