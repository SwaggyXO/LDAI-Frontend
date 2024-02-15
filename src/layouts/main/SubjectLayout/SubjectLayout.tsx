import { Outlet } from "react-router-dom";
import Topnav from "../../../containers/main/Topnav/Topnav";
import BackButton from "../../../components/main/buttons/BackButton";

const SubjectLayout = () => {

  const content = (
    <>
        <Topnav customButton={<BackButton to='/grade'/>} text='Choose a subject'/>
        <div>
            <Outlet />
        </div>
    </>
  )

  return content;
}

export default SubjectLayout