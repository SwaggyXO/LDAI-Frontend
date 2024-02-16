import { Outlet } from "react-router-dom";
import Topnav from "../../../containers/Main/Topnav/Topnav";
import NavButton from "../../../components/Main/buttons/NavButton";

const GradeLayout = () => {

  const content = (
    <>
        <Topnav customButton={<NavButton to='/home' className="back-button"/>} title='Select your grade'/>
        <div>
            <Outlet />
        </div>
    </>
  )

  return content;
}

export default GradeLayout