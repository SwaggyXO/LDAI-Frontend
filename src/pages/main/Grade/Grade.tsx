import { Button } from "../../../components/notmain";
import Logout from "../Auth/Logout"
import { useAuth0 } from "@auth0/auth0-react"
import './grade.scss'
import Topnav from "../../../containers/main/Topnav/Topnav";
import BackButton from "./BackButton";

const Grade = () => {

  const {isAuthenticated, error, isLoading } = useAuth0();

  

  const content = (
    // <>
    //   <p>Here!</p>
    //   <Button title="Profile" color="var(--color-footer)" route="/profile" />
    //   <Button title="Home" color="var(--color-footer)" route="/home" />

    //   <Logout />
    // </>
    <>
      <Topnav customButton={<BackButton to={'/home'}/>} text={'Select your grade'}/>
    </>
  )

  return (
    isAuthenticated && (
      <div>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && content}
      </div>
    )
  )
}

export default Grade