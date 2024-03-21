import { Navigate, Outlet } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import NavButton from "../../components/buttons/NavButton";
import useAuth from "../../hooks/useAuth";

const SubjectLayout = () => {

  const { authChecked, intendedPath } = useAuth();


  const content = (
    <>
        <Topnav customButton={<NavButton to='/grade' className="back-button"/>} title='Choose a subject'/>
        <div>
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

export default SubjectLayout