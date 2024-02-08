import Logout from "../Auth/Logout"
import { useAuth0 } from "@auth0/auth0-react"
import './home.scss'

const Home = () => {

  const { user, isAuthenticated, error, isLoading } = useAuth0();

  return (
    isAuthenticated && (
      <div className="column">
        Home
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        <ul>
            {Object.keys(user as Object).map((objKey, i) => <li key={i}>{objKey}: {user![objKey]} </li>)}
        </ul>
        <Logout />
      </div>
    )
    
  )
}

export default Home