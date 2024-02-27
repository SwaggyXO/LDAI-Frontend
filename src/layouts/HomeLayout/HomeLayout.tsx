import { Outlet } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import Bottomnav from "../../containers/Bottomnav/Bottomnav";
import { Calendar, Marble, XpBadgeOne } from "../../containers/Topnav/imports";
import { History } from "../../pages/Subject/imports";
import { Challenges, DRS, Home, PowerUps, Profile } from "../../containers/Bottomnav/imports";
import './homelayout.scss';
import { TopNavMascot } from "../../assets/Mascot/imports";

const HomeLayout = () => {

    const xpBadge = (
        <div className="xp-container">
            <img src={XpBadgeOne} alt='xpBadgeOne' />
            <p>2</p> 
        </div>
    )

    const subject = (
        <div className="subject-container">
            <img src={TopNavMascot} alt="History" />
        </div>
    )

    const streak = (
        <div className="streak-container">
            <img src={Calendar} alt="streak" />
            <p>7</p>
        </div>
    )

    const marbles = (
        <div className="marbles-container">
            <img src={Marble} alt="Marbles" />
            <p>7000</p>
        </div>
    )
    const content = (
        <>
            <Topnav xp={xpBadge} subject={subject} streak={streak} marbles={marbles} />
            <div className="Layout">
                <Outlet />
            </div>
            <Bottomnav home={Home} drs={DRS} challenges={Challenges} powerups={PowerUps} profile={Profile} />
        </>
    );

    return content;
}

export default HomeLayout