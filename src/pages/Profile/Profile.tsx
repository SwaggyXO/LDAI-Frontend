import { useAuth0 } from '@auth0/auth0-react';
import Logout from '../Auth/Logout';

import './profile.scss';
import { Badge1, Badge2, Badge3, Badge4 } from '../../assets/Badges/import';
import Tile from '../../components/Tiles/Tile';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import useUserData from '../../hooks/useUserData';

type Stat = {
    name: string;
    val: number;
};

type Achievement = {
    name: string;
    description: string;
    level: number;
}

const Profile = () => {

    // const [achievements, setAchievements] = useState<Achievement[]>([]);
    // const [userStats, setUserStats] = useState<UserStats[]>([]);

    // useEffect(() => {
    //     fetch("http://localhost:3500/achievements")
    //       .then((response) => response.json())
    //       .then((data) => setAchievements(data))
    //       .catch((error) => console.error("Error fetching achievements: ", error));
    //     fetch("http://localhost:3500/stats")
    //       .then((response) => response.json())
    //       .then((data) => setUserStats(data))
    //       .catch((error) => console.error("Error fetching achievements: ", error));
    //   }, []);


    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [userStats, setUserStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { data: achievementsData, error: achievementsError, loading: achievementsLoading } = useUserData("achievements");
    const { data: statsData, error: statsError, loading: statsLoading } = useUserData("stats");

    useEffect(() => {
    if (achievementsData) {
        setAchievements(achievementsData);
    }
    if (statsData) {
        setUserStats(statsData);
    }
    }, [achievementsData, statsData]);

    useEffect(() => {
        if (achievementsError) {
            setError(achievementsError);
        }
        if (statsError) {
            setError(statsError);
        }
      }, [achievementsError, statsError]);

    useEffect(() => {
    if (!achievementsLoading && !statsLoading) {
        setLoading(false);
    }
    }, [achievementsLoading, statsLoading]);


    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/grade');
    }

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
        <div className="profile">
            <div className="profile-header">
                <div className="profile-header_banner"></div>
                <div className="profile-header_info">
                    <div className="profile-header_info--first">
                        <div className="profile-header_info--first__avatar">
                            {user?.picture && <img src={user.picture} alt={user.name} />}
                        </div>
                        
                    </div>
                    <div className="profile-header_info--second">
                        <div className="profile-header_info--second__username">
                            {shortener(user?.name!)}
                        </div>
                        <div className="profile-header_info--second__info">
                            <div className="profile-header_info--xplevel">XPL 20</div>
                            <div className="profile-header_info--grade">
                                XII&nbsp;
                                <button onClick={handleNavigate}><FontAwesomeIcon icon={faEdit} /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-header_info--badges">
                    <img src={Badge1} alt="badge 1" />
                    <img src={Badge2} alt="badge 2" />
                    <img src={Badge3} alt="badge 3" />
                    <img src={Badge4} alt="badge 4" />
                </div>
                <div className="profile-stats">
                    <div className="profile-stats_header">
                        Statistics
                    </div>
                    <div className="profile-stats_container">
                        {userStats.map((stat, idx) => (
                            <Tile key={idx} name={`${stat.name}:`} number={stat.val} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="profile-achievements">
                <h1 className="profile-achievements_header">Achievements</h1>
                <div className='profile-achievements_container'>
                    {achievements.map((achievement, index) => (
                        <div key={index} className='parent'>
                            <div className="level">
                                <p>{achievement.level}</p>
                            </div>
                            <div className="info">
                                <p>{achievement.name}</p>
                                <p>{achievement.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="logout">
                <Logout />
            </div>
        </div>
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
    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && content}
        </>
    )
    
}

export default Profile