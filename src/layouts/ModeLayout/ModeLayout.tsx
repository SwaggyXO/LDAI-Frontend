import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import Bottomnav from "../../containers/Bottomnav/Bottomnav";

import { Challenges, DRS, Home, PowerUps, Profile } from "../../containers/Bottomnav/imports";
import './modeLayout.scss';

import renderContent from "../../features/content/renderContent";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Loader from "../../pages/Loader/Loader";
import { getUserCookie } from "../../features/user/userCookieHandler";
import { useEffect, useState } from "react";
import { UserState } from "../../features/user/userSlice";
import calculateXPLevel from "../../features/user/calculateXPLevel";

const ModeLayout = () => {

    const { authChecked, intendedPath } = useAuth();

    const [currUser, setCurrUser] = useState<Partial<UserState>>({} as UserState);
    const stateUser = useSelector((state: RootState) => state.user);

    const location = useLocation();
    
    useEffect(() => {
        setCurrUser(getUserCookie()!);
    }, [stateUser]);

    const xpBadge = (
        <div className="xp-container">
            {renderContent('badges', 'Level', '1')}
            <p>{currUser && calculateXPLevel(currUser!.xp!)}</p> 
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
            <p>{currUser && currUser!.streak}</p>
        </div>
    )

    const marbles = (
        <div className="marbles-container">
            {renderContent('app', 'Marble', 'Marble')}
            <p>{currUser && currUser!.marbles}</p>
        </div>
    )
    
    const content = (
        <>
            <Topnav xp={xpBadge} subject={subject} streak={streak} marbles={marbles} />
            <div className="button-container">
                <Link to="/unrated">
                    <button className={`unrated ${ location.pathname.includes('/unrated') ? 'active' : '' }`}>
                    Unrated
                    </button>
                </Link>
                <Link to="/rated">
                    <button className={`rated ${ location.pathname.includes('/rated') ? 'active' : '' }`}>
                    Rated 🔒
                    </button>
                </Link>
            </div>
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

export default ModeLayout