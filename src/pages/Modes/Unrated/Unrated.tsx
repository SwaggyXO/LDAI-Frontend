import { useAuth0 } from '@auth0/auth0-react';
import './unrated.scss';
import Loader from '../../Loader/Loader';
import TextContainer from '../../../containers/TextContainer/TextContainer';
import { SampleQuizzes } from '../../Home/SampleQuizzes';
import QuizExcerpt from '../../../components/QuizExcerpt/QuizExcerpt';
import renderContent from '../../../features/content/renderContent';
import Button from '../../../components/buttons/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { modes } from '../modes';
import { Link, useNavigate } from 'react-router-dom';
import ModeExcerpt from '../../../components/ModeExcerpt/ModeExcerpt';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { getUserCookie } from '../../../features/user/userCookieHandler';
import { useEffect } from 'react';
import { useFetchLatestQuizzesQuery } from '../../../api/quizApiSlice';

const Modes = () => {

    const { user, isAuthenticated, error, isLoading } = useAuth0();

    const currUser = getUserCookie();

    useEffect(() => {
        if (currUser?.isNew && currUser.grade) {
            navigate('/home');
        } else if (currUser?.isNew && !currUser.grade) {
            navigate('/grade');
        }
    }, []);

    const { data: quizData, isLoading: isFetchLatestLoading, error: fetchLatestError} = useFetchLatestQuizzesQuery({subject: `${currUser!.subject}`, limit: 10});

    useEffect(() => {
        if (quizData) {
            console.log(quizData);
        }
    }, [quizData]);

    const quizzes = SampleQuizzes;

    const allModes = modes;

    const navigate = useNavigate();

    const textContainerElements = (
        <>
          <p>Welcome to Unrated</p>
          <p>This is where you practice with challenges and quiz sets without worrying about your rank. Go crazy!</p>
        </>
    )

    const content = (
        <div className="modes">
            <TextContainer elements={textContainerElements} className='modes' />
            <div className="weekset">
                <p className='weekset-header'>Set of the Week</p>
                <div className="weekset-quiz">
                    {quizData && <QuizExcerpt quiz={quizData.data[0]} />}
                </div>
            </div>
            <div className="modes-container">
                <div className="header">
                    <div className="line-container">
                        <div className="line"></div>
                    </div>
                    <h2>Modes</h2>
                    <div className="line-container">
                        <div className="line"></div>
                    </div>
                </div>
                <div className="modes-container_excerpts">
                    {allModes.map((mode, idx) => (
                        <ModeExcerpt key={idx} mode={mode} />
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <>
            {isLoading || isFetchLatestLoading && <Loader />}
            {error && fetchLatestError && <p style={{height: "100vh"}}>An Error Occured</p>}
            {!isLoading && isAuthenticated && !error && !isFetchLatestLoading && content}
        </>
    )
}

export default Modes