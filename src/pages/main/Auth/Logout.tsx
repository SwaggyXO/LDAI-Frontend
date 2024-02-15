import { useAuth0 } from "@auth0/auth0-react"
import Button from "../../../components/main/buttons/Button"

const Logout = () => {

    const { logout, isAuthenticated } = useAuth0()

    const onLogout = () => logout({logoutParams: {returnTo: `${import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT_URI}`}});

    return (
        isAuthenticated && (<Button buttonText="Logout" onClick={onLogout} className="button-logout"/>)
    )
}

export default Logout