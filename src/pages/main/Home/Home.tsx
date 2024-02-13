import Logout from "../Auth/Logout"
import { useAuth0 } from "@auth0/auth0-react"
import './home.scss'
import { Button } from "../../../components/notmain"

const Home = () => {

  const { user, isAuthenticated, error, isLoading } = useAuth0();

  const content = (
    <p>Here!</p>
  )

  return (
    isAuthenticated && (
      <div className="column">
        Home
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && content}
        <Button title="Profile" color="var(--color-footer)" route="/profile" />
        <Logout />
      </div>
    )
  )
}

export default Home