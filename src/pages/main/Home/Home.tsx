import { useAuth0 } from "@auth0/auth0-react"
import { useState, useEffect } from "react";

import './home.scss'
import { Button } from "../../../components/notmain"
import TextContainer from "../../../containers/Main/TextContainer/TextContainer";

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

  const textContainerElements = (
    <>
      <p>Welcome</p>
      <p>Participate in Quizzes, earn Marbles and unlock items with experience</p>
    </>
    
  )

  const content = (
    <>
      <div className="intro-half">
        <div className="header">
          <p>{timedGreeting}!</p>
          <p>{user?.name}</p>
        </div>
        <TextContainer elements={textContainerElements} className="home" />
        <Button title="Grade" color="var(--color-footer)" route="/grade" />
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