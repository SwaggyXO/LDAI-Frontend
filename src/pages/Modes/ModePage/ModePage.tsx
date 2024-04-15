import './modepage.scss';
import { useParams } from 'react-router-dom';
import { modes } from '../modes';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../../Loader/Loader';
import renderContent from '../../../features/content/renderContent';
import QuizExcerpt from '../../../components/QuizExcerpt/QuizExcerpt';
import { SampleQuizzes } from '../../Home/SampleQuizzes';

const ModePage = () => {

    const { user, isAuthenticated, error, isLoading } = useAuth0();

    const allModes = modes;

    const { modeName } = useParams();
    const mode = allModes.find(mode => mode.imgText.toLowerCase() === modeName);

    const content =  (
        <div className='mode-main'>
            <div className="mode-intro">
                <div className="mode-intro_top">
                    {renderContent('app', 'Modes', `${mode?.imgText}`)}
                    <h1>{mode?.title}</h1>
                    <p>{mode?.description[0]}</p>
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
                        <QuizExcerpt quiz={SampleQuizzes[0]} />
                    </div>
                </div>
                <div className="mode-quizzes_month">
                    <p>This Month</p>
                    <div className="month-excerpts">
                        <QuizExcerpt quiz={SampleQuizzes[1]} />
                    </div>
                </div>
                <div className="mode-quizzes_earlier">
                    <p>Earlier</p>
                    <div className="earlier-excerpts">
                        <QuizExcerpt quiz={SampleQuizzes[2]} />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
          {isLoading && <Loader />}
          {error && <p style={{height: "100vh"}}>An Error Occured</p>}
          {!isLoading && isAuthenticated && !error && content}
        </>
    )
}

export default ModePage