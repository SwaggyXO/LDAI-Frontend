import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type BackButtonProps = {
  to: string
};

const BackButton = (props: BackButtonProps) => {

    const to = props.to;
    
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(to);
    }

    return (
        <button className="back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} size='2x' color='#fff'/>
        </button>
    );
};

export default BackButton;
