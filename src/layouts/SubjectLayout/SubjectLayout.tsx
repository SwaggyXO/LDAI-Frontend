import { Outlet } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import NavButton from "../../components/buttons/NavButton";

const SubjectLayout = () => {

  const content = (
    <>
        <Topnav customButton={<NavButton to='/grade' className="back-button"/>} title='Choose a subject'/>
        <div>
            <Outlet />
        </div>
    </>
  )

  return content;
}

export default SubjectLayout