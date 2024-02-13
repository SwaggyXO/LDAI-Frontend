import { useAuth0 } from '@auth0/auth0-react';
import Logout from '../Auth/Logout';

const Profile = () => {

    const { user } = useAuth0();

    return (
        <div className="column">
            {user?.picture && <img src={user.picture} alt={user?.name} />}
            <h2>{user?.name}</h2>
            <ul>
                {Object.keys(user as Object).map((objKey, i) => <li key={i}>{objKey}: {user![objKey]} </li>)}
            </ul>
            <Logout />
        </div>
    )
}

export default Profile