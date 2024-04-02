import { Navigate, Outlet } from "react-router-dom"
import Topnav from "../../containers/Topnav/Topnav"
import "./QuizLayout.scss"
import useAuth from "../../hooks/useAuth";
import NavButton from "../../components/buttons/NavButton";
import renderContent from "../../features/content/renderContent";

const QuizLayout = () => {

  const { authChecked, intendedPath } = useAuth();

  const marbles = (
    <div className="marbles-container">
      {renderContent('app', 'Marble', 'Marble')}
      <p>7000</p>
    </div>
  )

  const content = (
    <>
      <Topnav customButton={<NavButton to="exit" className="cross-button"/>} marbles={marbles} classname="quiz-layout" />
      <div className="loading-bar">
        <div className="loading-box left"></div>
        <div className="loading-box right"></div>
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