import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import NavButton from "../../components/buttons/NavButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getUserCookie } from "../../features/user/userCookieHandler";
import useAuth from "../../hooks/useAuth";
import Loader from "../../pages/Loader/Loader";

const GradeLayout = () => {

  const { authChecked, intendedPath } = useAuth();

  const currUser = getUserCookie();

  const content = (
    <>
      { currUser && currUser!.isNew ? 
        <Topnav title='Select your grade'/> : 
        <Topnav customButton={<NavButton to='/home' className="back-button"/>} title='Select your grade'/>
      }
      <div>
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

export default GradeLayout