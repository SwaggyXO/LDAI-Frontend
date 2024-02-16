import { Outlet } from "react-router-dom";
import Topnav from "../../../containers/Main/Topnav/Topnav";
import Bottomnav from "../../../containers/Main/Bottomnav/Bottomnav";
import { Calendar, Marble, XpBadgeOne } from "../../../containers/Main/Topnav/imports";
import { History } from "../../../pages/Main/Subject/imports";


const HomeLayout = () => {

    const xpBadge = (
        <div className="xp-container">
            <img src={XpBadgeOne} alt='xpBadgeOne'/>
            <p>2</p> 
        </div>
    )

    const subject = (
        <div className="subject-container">
            <img src={History} alt="History" />
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
            <div>
                <Outlet />
            </div>
            <Bottomnav />
        </>
    );

    return content;
}

export default HomeLayout