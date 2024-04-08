import { Navigate, Outlet } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import Bottomnav from "../../containers/Bottomnav/Bottomnav";

import { Challenges, DRS, Home, PowerUps, Profile } from "../../containers/Bottomnav/imports";
import './homelayout.scss';

import renderContent from "../../features/content/renderContent";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Loader from "../../pages/Loader/Loader";

const HomeLayout = () => {

    const { authChecked, intendedPath } = useAuth();

    const currUser = useSelector((state: RootState) => state.user);

    const xpBadge = (
        <div className="xp-container">
            {renderContent('badges', 'Level', '1')}
            <p>1</p> 
        </div>
    )

    const subject = (
        <div className="mascot-container">
            {renderContent('app', 'Mascot', 'Wave')}
        </div>
    )

    const streak = (
        <div className="streak-container">
            {renderContent('badges', 'Streak', 'Calendar')}
            <p>{currUser.streak}</p>
        </div>
    )

    const marbles = (
        <div className="marbles-container">
            {renderContent('app', 'Marble', 'Marble')}
            <p>{currUser.marbles}</p>
        </div>
    )
    
    const content = (
        <>
            <Topnav xp={xpBadge} subject={subject} streak={streak} marbles={marbles} />
            <div className="Layout">
                <Outlet />
            </div>
            <Bottomnav home='Home' drs='Drs' challenges='Challenges' powerups='PowerUps' profile='Profile' />
        </>
    );

    if (!authChecked) {
        return <Loader />;
    }
    
    if (!intendedPath) {
        return content;
    }

    return <Navigate to="/" replace />;
    
}

export default HomeLayout