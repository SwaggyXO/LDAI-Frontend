import { useAuth0 } from '@auth0/auth0-react';
import Logout from '../Auth/Logout';

import './profile.scss';
import { Badge1, Badge2, Badge3, Badge4 } from '../../assets/Badges/import';

const Profile = () => {

    const { user } = useAuth0();

    const shortener = (fullName: string) => {
        let words = fullName.split(' ');
      
        if (fullName.length < 15) {
            return fullName;
        }
        
        let initials = words.slice(0, -1).map(word => word[0]).join('');
        
        initials += '. ' + words[words.length - 1];
        
        return initials;
    }

    const content = (
        <>
            <div className="profile">
                <div className="profile-header">
                    <div className="profile-header_banner"></div>
                    <div className="profile-header_info">
                        <div className="profile-header_info--first">
                            <div className="profile-header_info--first__avatar">
                                {user?.picture && <img src={user.picture} alt={user?.name} />}
                            </div>
                            
                        </div>
                        <div className="profile-header_info--second">
                            <div className="profile-header_info--second__username">
                                {shortener(user?.name!)}
                            </div>
                            <div className="profile-header_info--second__info">
                                <div className="profile-header_info--xplevel">20</div>
                                <div className="profile-header_info--grade">XII</div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-header_info--badges">
                        <img src={Badge1} alt="badge 1" />
                        <img src={Badge2} alt="badge 2" />
                        <img src={Badge3} alt="badge 3" />
                        <img src={Badge4} alt="badge 4" />
                    </div>
                </div>
                <div className="profile-stats">
                    <div className="profile-stats_header">
                        Statistics
                    </div>
                    <div className="profile-stats_container">
                        
                    </div>
                </div>
            </div>
            
            <Logout />
        </>
    )

    // return (
    //     <div className="column">
    //         {user?.picture && <img src={user.picture} alt={user?.name} />}
    //         <h2>{user?.name}</h2>
    //         <p>{user?.sub}</p>
    //         <p>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
    //         <ul>
    //             {/* {Object.keys(user as Object).map((objKey, i) => <li key={i}>{objKey}: {user![objKey]} </li>)} */}
    //         </ul>
    //         <Logout />
    //     </div>
    // )
    return content;
}

export default Profile