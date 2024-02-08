import "./login.scss"
import { Button } from '../../../components/notmain'
import { useAuth0 } from "@auth0/auth0-react";

// Buttons for registration or guest session launch

const Login = () => {

  const { loginWithRedirect } = useAuth0();

  const onLogin = () => loginWithRedirect();

  return (
    <div className='learn__login section__padding'>
      <Button title="START LEARNING" color="var(--color-footer)" onClick={onLogin}/>
      <br /><br />
      <Button title="HAVE AN ACCOUNT?" color="#92B600"/>
    </div>
  )
}

export default Login