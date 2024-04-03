import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import renderContent from '../../features/content/renderContent';
import { useDispatch } from 'react-redux';
import { resetQuizState } from '../../features/quiz/quizSlice';

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
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const handleNav = () => {
        if (to === "exit") {
            dispatch(resetQuizState());
            navigate('/home');
        } else {
            navigate(to);
        }
    }

    return (
        <button className={className} onClick={handleNav}>
            {className === 'back-button' ? 
                <FontAwesomeIcon icon={faArrowLeft} size='2x' color='#fff'/> :
                className === 'cross-button' ?
                <FontAwesomeIcon icon={faTimes} size='2x' color='#fff' /> :
                renderContent('icons', 'BottomNavbar', vector!)
            }
        </button>
    );
};

export default NavButton;
