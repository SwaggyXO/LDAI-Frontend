import { Button } from "../../../components/notmain";
import Logout from "../Auth/Logout"
import { useAuth0 } from "@auth0/auth0-react"
import './grade.scss'

const Grade = () => {

    const { isAuthenticated, error, isLoading } = useAuth0();

  const content = (
    <p>Here!</p>
  )

  return (
    isAuthenticated && (
      <div className="column">
        Grade
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && content}
        <Button title="Profile" color="var(--color-footer)" route="/profile" />
        <Button title="Home" color="var(--color-footer)" route="/home" />

        <Logout />
      </div>
    )
  )
}

export default Grade