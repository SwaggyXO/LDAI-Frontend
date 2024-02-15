import { Outlet } from "react-router-dom";
import Topnav from "../../../containers/main/Topnav/Topnav";
import BackButton from "../../../components/main/buttons/BackButton";

const GradeLayout = () => {

  const content = (
    <>
        <Topnav customButton={<BackButton to='/home'/>} text='Select your grade'/>
        <div>
            <Outlet />
        </div>
    </>
  )

  return content;
}

export default GradeLayout