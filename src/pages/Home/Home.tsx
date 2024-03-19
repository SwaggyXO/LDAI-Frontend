import { useAuth0 } from "@auth0/auth0-react"
import { useState, useEffect } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import './home.scss'
import TextContainer from "../../containers/TextContainer/TextContainer";
import Button from "../../components/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseChest } from "../../assets/Chest/import";
import QuizExcerpt from "../../components/QuizExcerpt/QuizExcerpt";
import { SampleQuizzes } from "./SampleQuizzes";

import renderContent from "../../features/content/renderContent";

const Home = () => {

  const quizzes = SampleQuizzes;

  const { user, isAuthenticated, error, isLoading } = useAuth0();

  const [ timedGreeting, setTimedGreeting ] = useState<string>('');

  useEffect(() => {
    const getGreeting = () => {
      const currTime = new Date().getHours();
      let greeting = '';

      (currTime >= 5 && currTime < 12) ? 
        greeting = 'Good Morning' : (currTime >= 12 && currTime < 18) ?
          greeting = 'Good Afternoon' : greeting = 'Good Evening';

      setTimedGreeting(greeting);
    };

    getGreeting();
  }, []);

  const buttonElements = (
    <p>Play &nbsp;{<FontAwesomeIcon icon={faPlay} color="black"/>}</p>
  )

  const textContainerElements = (
    <>
      <p>Welcome</p>
      <p>Participate in Quizzes, <br />earn Marbles and unlock items with experience</p>
      <Button buttonText={buttonElements} className="home-play_button" to="/grade" />
    </>
  )

  const content = (
    <>
      <div className="intro-half">
        <div className="intro-half_header">
          <div className="intro-half_header--text">
            <p>{timedGreeting}!</p>
            <p>{user?.name}</p>
          </div>
          <div className="intro-half_header--chest">
            {renderContent('app', 'Chest', 'closed')}
          </div>
        </div>
        <TextContainer elements={textContainerElements} className="home" />
      </div>
      <div className="new-half">
        <div className="new-half_header">
          <p>New Quizzes</p>
        </div>
        <div className="new-half_quizzes">
          {quizzes.map((quiz) => (
            <QuizExcerpt key={quiz.name} quiz={quiz} />
          ))}
        </div>
      </div>
    </>
  )

  return (
    isAuthenticated && (
      <>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && content}
      </>
    )
  )
}

export default Home