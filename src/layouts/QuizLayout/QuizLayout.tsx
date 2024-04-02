import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Topnav from "../../containers/Topnav/Topnav"
import "./QuizLayout.scss"
import useAuth from "../../hooks/useAuth";
import NavButton from "../../components/buttons/NavButton";
import renderContent from "../../features/content/renderContent";
import {  useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { endQuiz, updateTimeLeft } from "../../features/quiz/quizSlice";

const QuizLayout = () => {

  const { authChecked, intendedPath } = useAuth();

  const navigate = useNavigate();

  const currUser = useSelector((state: RootState) => state.user);

  const marbles = (
    <div className="marbles-container">
      {renderContent('app', 'Marble', 'Marble')}
      <p>{currUser.marbles}</p>
    </div>
  )

  const quizTimeLimit = useSelector((state: RootState) => state.quiz.timeLeft);

  const [timeLeft, setTimeLeft] = useState<number>(quizTimeLimit * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          // If time runs out, navigate to the results page
          clearInterval(interval);
          navigate(`/result`);
          return 0;
        }
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [quizTimeLimit, navigate]);

  // Calculate minutes and seconds from timeLeft
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Calculate progress width
  const progressWidth = (timeLeft / (quizTimeLimit * 60)) * 100 + '%';
  
  const content = (
    <>
      <Topnav customButton={<NavButton to="exit" className="cross-button"/>} marbles={marbles} classname="quiz-layout" />
      <div className="loading-bar">
        <div className="loading-bar-inner" style={{ width: progressWidth }}></div>
        <div className="time-left">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
      </div> 
      <div className="quiz-wrapper">
        <Outlet />
      </div>
    </>
  )

  if (!authChecked) {
    return <div>Loading...</div>
  }

  if (!intendedPath) {
      return content;
  }

  return <Navigate to="/" replace />;
}

export default QuizLayout