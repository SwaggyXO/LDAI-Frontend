import "./login.scss"
import { Button } from '../../components'
import { useAuth0 } from "@auth0/auth0-react";
import addUser from "../../features/user/addUser";

// Buttons for registration or guest session launch

const Login = () => {

  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='learn__login section__padding'>
      <Button title="START LEARNING" color="var(--color-footer)" onClick={handleLogin}/>
      <br /><br />
      <Button title="HAVE AN ACCOUNT?" color="#92B600"/>
    </div>
  )
}

export default Login