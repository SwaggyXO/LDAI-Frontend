import { Outlet } from "react-router-dom";
import Topnav from "../../../containers/Main/Topnav/Topnav";
import NavButton from "../../../components/Main/buttons/NavButton";

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