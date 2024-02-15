import { Outlet } from "react-router-dom";
import Topnav from "../../../containers/Main/Topnav/Topnav";
import BackButton from "../../../components/Main/buttons/BackButton";

const GradeLayout = () => {

  const content = (
    <>
        <Topnav customButton={<BackButton to='/home'/>} title='Select your grade'/>
        <div>
            <Outlet />
        </div>
    </>
  )

  return content;
}

export default GradeLayout