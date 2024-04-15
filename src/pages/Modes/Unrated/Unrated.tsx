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

const Modes = () => {

    const { user, isAuthenticated, error, isLoading } = useAuth0();

    const quizzes = SampleQuizzes;

    const allModes = [
        {
            imgText: 'ONETAP',
            title: 'One Tap',
            description: ['Answer with a single tap.', <br />, 'No going back!']
        },
        {
            imgText: 'STANDARD',
            title: 'Standard',
            description: ['The classic and short way.', <br />, 'Answer and move on.']
        },
        {
            imgText: 'ENDURANCE',
            title: 'Endurance',
            description: ['Long Answers. Long Quiz.', <br />, 'Long Fun.']
        }
    ]

    const textContainerElements = (
        <>
          <p>Welcome to Unrated</p>
          <p>This is where you practice with challenges and quiz sets without worrying about your rank. Go crazy!</p>
        </>
    )

    const playButton = (
        <Button buttonText={<FontAwesomeIcon icon={faPlay} color='white' />} className="quiz-play_button" />
    )

    const content = (
        <div className="modes">
            <TextContainer elements={textContainerElements} className='modes' />
            <div className="weekset">
                <p className='weekset-header'>Set of the Week</p>
                <div className="weekset-quiz">
                    <QuizExcerpt quiz={quizzes[0]} />
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
                    {allModes.map((mode, index) => (
                        <div key={index} className='parent'>
                            <div className="mode-image">
                                {renderContent('app', 'Modes', `${mode.imgText}`)}
                            </div>
                            <div className="mode-info">
                                <p>{mode.title}</p>
                                <p>{mode.description}</p>
                            </div>
                            <div className="play-button">{playButton}</div>
                        </div>
                    ))}
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

export default Modes