import { useAuth0 } from '@auth0/auth0-react';

import './challenges.scss';
import { SampleChallenges } from './SampleChallenges';
import ChallengeExcerpt from '../../components/ChallengeExcerpt/ChallengeExcerpt';
import Button from '../../components/buttons/Button';
import { Marble } from '../../containers/Topnav/imports';

const Challenges = () => {

  const { isAuthenticated, isLoading, error } = useAuth0();

  const completed = 0;

  const challenges = SampleChallenges;

  const rewardButtonContent = (
    <>
      <p>Good Job!</p>
      <div className="rewards">
        <img src={Marble} alt="Marbles" />
        <p>5000</p>
      </div>
    </>
  ) 

  const content = (
    <div className="challenges">
      <div className="challenges-header">
        <p>Dailies</p>
        <p>COMPLETED <span>{completed}</span> OF 3</p>
      </div>
      <div className="challenges-excerpts">
        {challenges.map((challenge) => (
          <ChallengeExcerpt key={challenge.name} challenge={challenge} />
        ))}
      </div>
      <div className="challenges-reward">
          <Button buttonText={rewardButtonContent} className='challenges-reward_button' />
      </div>
    </div>
    
  )

  return (
    isAuthenticated && (
      <>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && content}
      </>
    )
  )
}

export default Challenges