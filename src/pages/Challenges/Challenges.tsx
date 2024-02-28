import { useAuth0 } from '@auth0/auth0-react';

import './challenges.scss';
import { SampleChallenges } from './SampleChallenges';
import ChallengeExcerpt from '../../components/ChallengeExcerpt/ChallengeExcerpt';

const Challenges = () => {

  const { isAuthenticated, isLoading, error } = useAuth0();

  const completed = 0;

  const challenges = SampleChallenges;

  const content = (
    <div className="challenges">
      <div className="challenges-header">
        <p>Challenges</p>
        <p>COMPLETED <span>{completed}</span> OF 3</p>
      </div>
      <div className="challenges-excerpts">
        {challenges.map((challenge) => (
          <ChallengeExcerpt key={challenge.name} challenge={challenge} />
        ))}
      </div>
      <div className="challenges-reward">

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