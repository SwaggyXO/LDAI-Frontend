import { Navigate, Outlet } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import NavButton from "../../components/buttons/NavButton";
import useAuth from "../../hooks/useAuth";
import Loader from "../../pages/Loader/Loader";
import { getUserCookie } from "../../features/user/userCookieHandler";

const SubjectLayout = () => {

  const { authChecked, intendedPath } = useAuth();

  const currUser = getUserCookie();

  const content = (
    <>
        { currUser && currUser!.isNew ? 
          <Topnav customButton={<NavButton to='/grade' className="back-button"/>} title='Choose a subject'/> : 
          <Topnav customButton={<NavButton to='/home' className="back-button"/>} title='Choose a subject'/>
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

export default SubjectLayout