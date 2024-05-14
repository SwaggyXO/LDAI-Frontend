import { useAuth0 } from "@auth0/auth0-react";
import Logout from "../Auth/Logout";

import "./profile.scss";
import { Badge1, Badge2, Badge3, Badge4 } from "../../assets/Badges/import";
import Tile from "../../components/Tiles/Tile";

import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { useFetchUserByIdQuery } from "../../api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Loader from "../Loader/Loader";
import { getUserCookie } from "../../features/user/userCookieHandler";
import { setUser } from "../../features/user/userSlice";
import calculateXPLevel from "../../features/user/calculateXPLevel";
import {
  Achievement,
  AllAchievement,
  useFetchRewardsByIdQuery,
} from "../../api/rewardApiSlice";

type Stat = {
  name: string;
  val: number;
};

// type Achievement = {
//     name: string;
//     description: string;
//     level: number;
// }

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  // const currUser = useSelector((state: RootState) => state.user);
  const currUser = getUserCookie();

  const {
    data,
    error: fetchUserError,
    isLoading,
  } = useFetchUserByIdQuery(currUser!.ciamId!.replace(/\|/g, "%7C"));

  useEffect(() => {
    if (data) {
      //   dispatch(setUser(data.data));
      console.log("User fetched successfully", data);
    }
  }, [data]);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [allAchievements, setAllAchievements] = useState<AllAchievement[]>([]);
  const [userStats, setUserStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: rewardsData, isLoading: isRewardsLoading } =
    useFetchRewardsByIdQuery(currUser?.userId!);

  // console.log("User Achievements: ", rewardsData?.data.achievements);

  const handleExit = async () => {
    const response = await fetch(
      `https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/reward/all`
    );
    const data = await response.json();
    setAllAchievements(data.data);
    console.log("All Achievements: ", data.data);
  };

  useEffect(() => {
    handleExit();
  }, []);

  const handleAchievementTier = (tier: string) => {
    switch (tier) {
      case "Novice":
        return 1;
      case "Intermediate":
        return 2;
      case "Professional":
        return 3;
      case "Final Boss":
        return 4;
      default:
        return 0;
    }
  };

  const handleAchievementDescription = (name: string) => {
    
    let achievement = allAchievements.find(
      (achievement) => achievement.name === name
    );
    return achievement ? achievement.description : "Complete warmup challenges to unlock ";
  };

  useEffect(() => {
    if (rewardsData) {
      setAchievements(rewardsData.data.achievements);
    }
  }, [rewardsData]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/grade");
  };

  const shortener = (fullName: string) => {
    let words = fullName.split(" ");

    if (fullName.length < 15) {
      return fullName;
    }

    let initials = words
      .slice(0, -1)
      .map((word) => word[0])
      .join("");

    initials += ". " + words[words.length - 1];

    return initials;
  };

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
              <div className="profile-header_info--xplevel">
                XPL {calculateXPLevel(data?.data.xp!)}
              </div>
              <div className="profile-header_info--grade">
                {data?.data.grade}&nbsp;
                <button onClick={handleNavigate}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
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
          <div className="profile-stats_header">Statistics</div>
          <div className="profile-stats_container">
            {userStats.map((stat, idx) => (
              <Tile key={idx} name={`${stat.name}:`} number={stat.val} />
            ))}
          </div>
        </div>
      </div>

      <div className="profile-achievements">
        <h1 className="profile-achievements_header">Achievements</h1>
        <div className="profile-achievements_container">
          {achievements.map((achievement, index) => (
            <div key={index} className="parent">
              <div className="level">
                <p>{handleAchievementTier(achievement.currentTier.tier)}</p>
              </div>
              <div className="info">
                <p>{achievement.currentTier.tier === "" ? "Newbie" : achievement.currentTier.tier}</p>
                <p>{handleAchievementDescription(achievement.rewardName)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="logout">
        <Logout />
      </div>
    </div>
  );

  return (
    <>
      {isLoading || isRewardsLoading && <Loader />}
      {error && (<p style={{ height: "100vh" }}>Error: {error}</p>)}
      {!isLoading && !isRewardsLoading && isAuthenticated && content}
    </>
  );
};

export default Profile;
