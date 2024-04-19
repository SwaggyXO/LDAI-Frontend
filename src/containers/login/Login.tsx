import "./login.scss"
import { Button } from '../../components'
import { useAuth0 } from "@auth0/auth0-react";

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
      <Button title="START LEARNING" onClick={handleLogin} className="start"/>
      <br /><br />
      {/* <Button title="LEARN AS A GUEST" className="guest"/> */}
    </div>
  )
}

export default Login