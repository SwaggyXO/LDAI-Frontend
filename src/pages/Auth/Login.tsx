import { useAuth0 } from "@auth0/auth0-react";
import ButtonAuth from "../../components/main/buttons/Button_Auth"

const Login = () => {

    const { loginWithRedirect } = useAuth0();

    const onLogin = () => loginWithRedirect();

    return <ButtonAuth buttonText="Login" onClick={onLogin} />
}

export default Login