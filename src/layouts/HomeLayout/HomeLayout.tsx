import { Outlet } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import Bottomnav from "../../containers/Bottomnav/Bottomnav";

import { Challenges, DRS, Home, PowerUps, Profile } from "../../containers/Bottomnav/imports";
import './homelayout.scss';

import renderContent from "../../features/content/renderContent";

const HomeLayout = () => {

    const xpBadge = (
        <div className="xp-container">
            {renderContent('badges', 'Level', '1')}
            <p>2</p> 
        </div>
    )

    const subject = (
        <div className="mascot-container">
            {renderContent('app', 'Mascot', 'wave')}
        </div>
    )

    const streak = (
        <div className="streak-container">
            {renderContent('badges', 'Streak', 'Calendar')}
            <p>7</p>
        </div>
    )

    const marbles = (
        <div className="marbles-container">
            {renderContent('app', 'Marble', 'Marble')}
            <p>7000</p>
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

    return content;
}

export default HomeLayout