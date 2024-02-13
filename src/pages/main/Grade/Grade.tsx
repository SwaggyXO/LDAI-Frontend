import Logout from "../Auth/Logout"
import { useAuth0 } from "@auth0/auth0-react"

const Grade = () => {

    const { isAuthenticated } = useAuth0(); 

    return (
        isAuthenticated && (
            <div>
                Grade
                <Logout />
            </div>
        )
    )
}

export default Grade