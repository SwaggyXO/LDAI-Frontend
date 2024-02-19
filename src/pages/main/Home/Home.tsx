import { useAuth0 } from "@auth0/auth0-react"
import { useState, useEffect } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import './home.scss'
import TextContainer from "../../../containers/Main/TextContainer/TextContainer";
import Button from "../../../components/Main/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {

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
    <p>Play {<FontAwesomeIcon icon={faPlay} color="#fff"/>}</p>
  )

  const textContainerElements = (
    <>
      <p>Welcome</p>
      <p>Participate in Quizzes, earn Marbles and unlock items with experience</p>
      <Button buttonText={buttonElements} className="home-play_button" to="/grade" />
    </>
    
  )

  const content = (
    <>
      <div className="intro-half">
        <div className="intro-half_header">
          <p className="intro-half_header--greeting">{timedGreeting}!</p>
          <p className="intro-half_header--username">{user?.name}</p>
        </div>
        <TextContainer elements={textContainerElements} className="home" />
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