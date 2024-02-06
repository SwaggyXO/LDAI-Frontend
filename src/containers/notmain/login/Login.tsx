import "./login.scss"
import { Button } from '../../../components/notmain'
// Buttons for registration or guest session launch

const Login = () => {
  return (
    <div className='learn__login section__padding'>
      <Button title="START LEARNING" color="var(--color-footer)" route="/register"/>
      <br /><br />
      <Button title="HAVE AN ACCOUNT?" color="#92B600"/>
    </div>
  )
}

export default Login