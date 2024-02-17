import { useAuth0 } from "@auth0/auth0-react"
import './home.scss'
import { Button } from "../../../components/notmain"
import Logout from "../Auth/Logout"

const Home = () => {

  const { isAuthenticated, error, isLoading } = useAuth0();

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
        <Button title="Grade" color="var(--color-footer)" route="/grade" />
        <Logout />
      </div>
    )
  )
}

export default Home