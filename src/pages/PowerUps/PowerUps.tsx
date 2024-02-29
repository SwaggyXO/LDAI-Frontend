import './powerups.scss';

import { useAuth0 } from '@auth0/auth0-react';

import { Boosters } from './Boosters';
import BoosterTile from '../../components/BoosterTile/BoosterTile';

const PowerUps = () => {

  const boosters = Boosters;

  const {isAuthenticated, error, isLoading} = useAuth0();

  const content = (
    <div className="powerups">
      <div className="powerups-header">
        <p>Inventory</p>
      </div>
      <div className="powerups-container">
        {boosters.map((booster) => (
          <BoosterTile booster={booster} />
        ))}
      </div>
    </div>
  );

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

export default PowerUps

