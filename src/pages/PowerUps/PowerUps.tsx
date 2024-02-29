import './powerups.scss';

import { useAuth0 } from '@auth0/auth0-react';

import { Boosters } from './Boosters';
import Tile from '../../components/Tiles/Tile';
import { useState } from 'react';

import Modal from '../../components/Modal/Modal';


const PowerUps = () => {

  const boosters = Boosters;

  const {isAuthenticated, error, isLoading} = useAuth0();

  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const content = (
    <div className="powerups">
      <div className="powerups-header">
        <p>Inventory</p>
      </div>
      <div className="powerups-container">
        {boosters.map((booster) => (
          <Tile booster={booster} onClick={() => (modalOpen ? close() : open())}/>
        ))}
      </div>
      {modalOpen && (<Modal isOpen={modalOpen} onClose={close}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal</p>
        <button onClick={close}>Close</button>
      </Modal>)}
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

