import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Topnav from "../../containers/Topnav/Topnav"
import "./QuizLayout.scss"
import useAuth from "../../hooks/useAuth";
import NavButton from "../../components/buttons/NavButton";
import renderContent from "../../features/content/renderContent";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Loader from "../../pages/Loader/Loader";
import { getUserCookie } from "../../features/user/userCookieHandler";

const QuizLayout = () => {

  const { authChecked, intendedPath } = useAuth();

  const currUser = getUserCookie();

  const marbles = (
    <div className="marbles-container">
      {renderContent('app', 'Marble', 'Marble')}
      <p>{currUser!.marbles}</p>
    </div>
  )

  const content = (
    <>
      <Topnav customButton={<NavButton to="exit" className="cross-button"/>} marbles={marbles} classname="quiz-layout" />
      
      <div className="quiz-wrapper">
        <Outlet />
      </div>
    </>
  )

  if (!authChecked) {
    return <Loader />;
  }

  if (!intendedPath) {
      return content;
  }

  return <Navigate to="/" replace />;
}

export default QuizLayout