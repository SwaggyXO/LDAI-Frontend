import { Outlet } from "react-router-dom"
import Topnav from "../../../../containers/Main/Topnav/Topnav"
import "./QuizLayout.scss"

const QuizLayout = () => {
  return (
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
}

export default QuizLayout