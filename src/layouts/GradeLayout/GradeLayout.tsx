import { Outlet } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import NavButton from "../../components/buttons/NavButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const GradeLayout = () => {

  const currUser = useSelector((state: RootState) => state.user);

  const content = (
    <>
      {currUser.isNew ? <Topnav title='Select your grade'/> : <Topnav customButton={<NavButton to='/home' className="back-button"/>} title='Select your grade'/>}
      <div>
        <Outlet />
      </div>
    </>
  )

  return content;
}

export default GradeLayout