import { useAuth0 } from '@auth0/auth0-react';
import './leaderboard.scss';
import React from 'react'
import Loader from '../Loader/Loader';
import renderContent from '../../features/content/renderContent';
import { useFetchLeaderboardQuery } from '../../api/quizApiSlice';

const Leaderboard = () => {

    const { isAuthenticated, isLoading, error } = useAuth0();

    const { data: leaderboards, isLoading: isFetchLeaderboardLoading } = useFetchLeaderboardQuery();

    if (!isFetchLeaderboardLoading) console.log(leaderboards);

    const leaderboardData = leaderboards?.data.leaderboard;

    // const leaderboardData = Array.from({ length: 15 }, (_, i) => ({
    //     id: i,
    //     name: `User ${i + 1}`,
    //     score: Math.floor(Math.random() * 100),
    // }));

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

    const sortedLeaderboardData = leaderboardData && [...leaderboardData].sort((a, b) => {
        if (b.score === a.score) {
          return a.timeTaken - b.timeTaken;
        }
        return b.score - a.score;
      });

    const topLeadersContent = (
        <div className="topLeadersList">
            {sortedLeaderboardData && sortedLeaderboardData.slice(0, 3).map((leader, index) => (
                <div className="leader" key={leader.userId}>
                    {index + 1 <= 3 && (
                        <div className="containerImage">
                            <img className="image" src={leader.picture} alt={leader.name} />
                            <div className="leaderName">{shortener(leader.name)}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const leaderboardDataEmpty = [];

    const content = (
        <>
          <div className="leaderboard-header">
            {renderContent("app", "Vectors", 'Trophy')}
            <p>Leaderboard</p>
          </div>
          {leaderboardData && leaderboardData.length <= 0 ? <p style={{height: '62vh', textAlign: 'center'}}>No data</p> : 
            <div className="leaderboard-week">
            <p>Leaders of this Week</p>
            <div className="learn__features-container__line">
                <section />
            </div>
            {topLeadersContent}
            <div className="leaderboard">
                <div className="leaderboard-list">
                    {sortedLeaderboardData && sortedLeaderboardData.map((user) => (
                        <div key={user.userId} className="leaderboard-item">
                            <div className="leaderboard-item-img">
                                <img className="img" src={user.picture} alt={user.name} />
                            </div>
                            <div className="leaderboard-item-name">{shortener(user.name)}</div>
                            <div className="leaderboard-item-score">{user.score * 100}%</div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
          }
        </>
    );

    return (
        <>
          {isLoading || isFetchLeaderboardLoading && <Loader />}
          {error && <p style={{ height: "100vh" }}>Authentication Error</p>}
          {!isLoading && isAuthenticated && content}
        </>
    );
}

export default Leaderboard