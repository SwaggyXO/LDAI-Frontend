import { Navigate, Outlet } from "react-router-dom"
import Topnav from "../../containers/Topnav/Topnav"
import "./QuizLayout.scss"
import useAuth from "../../hooks/useAuth";

const QuizLayout = () => {

  const { authChecked, intendedPath } = useAuth();

  const content = (
    <>
      <Topnav streak={"14"} marbles={"10K"} />
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