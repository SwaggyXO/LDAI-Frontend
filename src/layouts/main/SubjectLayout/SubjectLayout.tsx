import { Outlet } from "react-router-dom";
import Topnav from "../../../containers/Main/Topnav/Topnav";
import BackButton from "../../../components/Main/buttons/BackButton";

const SubjectLayout = () => {

  const content = (
    <>
        <Topnav customButton={<BackButton to='/grade'/>} title='Choose a subject'/>
        <div>
            <Outlet />
        </div>
    </>
  )

  return content;
}

export default SubjectLayout