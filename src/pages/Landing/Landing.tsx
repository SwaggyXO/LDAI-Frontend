import './landing.scss';

import { Features, Login, Whatlearn, Softend } from '../../containers';
import { Dotcomma } from '../../components';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../features/user/userSlice';
import { resetQuizState } from '../../features/quiz/quizSlice';

const Landing = () => {

    const dispatch = useDispatch();
    dispatch(clearUser());
    dispatch(resetQuizState());

    const content = (
        <>
            <Dotcomma />
            <Whatlearn />
            <Login />
            <Features />
            <Softend />
        </>
    )
    
    return (
        <div className="landing">
            {content}
        </div>
    )
}

export default Landing

