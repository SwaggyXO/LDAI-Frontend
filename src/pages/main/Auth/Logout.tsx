import { useAuth0 } from "@auth0/auth0-react"
import ButtonAuth from "../../../components/main/buttons/Button_Auth"

const Logout = () => {

    const { logout, isAuthenticated } = useAuth0()

    const onLogout = () => logout({logoutParams: {returnTo: `${import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT_URI}`}});

    return (
        isAuthenticated && (<ButtonAuth buttonText="Logout" onClick={onLogout} />)
    )
}

export default Logout