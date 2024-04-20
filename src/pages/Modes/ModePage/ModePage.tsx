import './modepage.scss';
import { useParams } from 'react-router-dom';
import { modes } from '../modes';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../../Loader/Loader';
import renderContent from '../../../features/content/renderContent';
import QuizExcerpt from '../../../components/QuizExcerpt/QuizExcerpt';
import { SampleQuizzes } from '../../Home/SampleQuizzes';
import { useFetchLatestQuizzesQuery } from '../../../api/quizApiSlice';
import { getUserCookie } from '../../../features/user/userCookieHandler';
import { useEffect } from 'react';

import { isThisWeek, isThisMonth } from 'date-fns';


const ModePage = () => {

    const { user, isAuthenticated, error, isLoading } = useAuth0();

    const currUser = getUserCookie();

    const allModes = modes;

    const { modeName } = useParams();
    const mode = allModes.find(mode => mode.imgText.toLowerCase() === modeName);

    const { data: quizData, isLoading: isFetchLatestLoading, error: fetchLatestError} = useFetchLatestQuizzesQuery({subject: `${currUser!.subject}`, limit: 10, quizType: `${mode?.imgText}`});

    useEffect(() => {
        if (quizData) {
            console.log(quizData);
        }
    }, [quizData]);


    const now = new Date();

    const thisWeekQuizzes = quizData?.data.filter((quiz) => isThisWeek(new Date(quiz.createdAt)));
    const thisMonthQuizzes = quizData?.data.filter((quiz) => isThisMonth(new Date(quiz.createdAt)) && !isThisWeek(new Date(quiz.createdAt)));
    const earlierQuizzes = quizData?.data.filter((quiz) => now > new Date(quiz.createdAt) && !isThisMonth(new Date(quiz.createdAt)));

    const content =  (
        <div className='mode-main'>
            <div className="mode-intro">
                <div className="mode-intro_top">
                    {renderContent('app', 'Modes', `${mode?.imgText}`)}
                    <h1>{mode?.title}</h1>
                    <p>{mode?.description}</p>
                </div>
                <div className="mode-intro_bottom">
                    <p>{mode?.questions} Questions</p>
                    <p>{mode?.time} Minutes</p>
                </div>
            </div>
            <div className="mode-quizzes">
                <p className='mode-quizzes_header'>Released Quiz Sets</p>
                <div className="mode-quizzes_week">
                    <p className='week-header'>This Week</p>
                    <div className="week-excerpts">
                        {thisWeekQuizzes?.map((quiz, idx) => <QuizExcerpt key={idx} quiz={quiz} />)}
                    </div>
                </div>
                <div className="mode-quizzes_month">
                    <p className='month-header'>This Month</p>
                    <div className="month-excerpts">
                        {thisMonthQuizzes?.map((quiz, idx) => <QuizExcerpt key={idx} quiz={quiz} />)}
                    </div>
                </div>
                <div className="mode-quizzes_earlier">
                    <p className='earlier-header'>Earlier</p>
                    <div className="earlier-excerpts">
                        {earlierQuizzes?.map((quiz, idx) => <QuizExcerpt key={idx} quiz={quiz} />)}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
          {isLoading || isFetchLatestLoading && <Loader />}
          {error || fetchLatestError && <p style={{height: "100vh"}}>An Error Occured</p>}
          {!isLoading && isAuthenticated && !isFetchLatestLoading && !error && content}
        </>
    )
}

export default ModePage