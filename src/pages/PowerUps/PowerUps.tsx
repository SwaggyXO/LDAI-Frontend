import './powerups.scss';

import { useAuth0 } from '@auth0/auth0-react';

import { Boosters } from './Boosters';
import Tile from '../../components/Tiles/Tile';
import { useState } from 'react';

import Modal from '../../components/Modal/Modal';
import Button from '../../components/buttons/Button';

import renderContent from '../../features/content/renderContent';

type Booster = {
  name: string;
  quantity: number;
  desc: string;
  rarity: string;
}

const PowerUps = () => {

  const boosters = Boosters;

  const {isAuthenticated, error, isLoading} = useAuth0();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooster, setSelectedBooster] = useState<Booster | null>(null);


  const close = () => {
    setModalOpen(false);
    setSelectedBooster(null);
  }

  const open = (booster: Booster) => {
    setSelectedBooster(booster);
    setModalOpen(true);
  }

  const price = 
    selectedBooster?.rarity === 'Common' ? 5000 
      : selectedBooster?.rarity === 'Rare' ? 8000 
        : selectedBooster?.rarity === 'Epic' ? 15000 
          : 30000;


  const modalContent = (
    <>
      <div className="header-nontext">
        <div className="price">
          {renderContent('app', 'Marble', 'Marble')}
          <p>{price}</p>
        </div>
        <div className="booster-image">
          {renderContent('boosters', `${selectedBooster?.name}`, `${selectedBooster?.name}`)}
        </div>
        <div className="quantity-capsule">
          <p>Capsule</p>
        </div>
      </div>
      <div className="header-text">
        <div className="booster-name">
          <p>{selectedBooster?.name}</p>
        </div>
        <div className="booster-rarity">
          <p className={`booster-${selectedBooster?.rarity}`}>{selectedBooster?.rarity}</p>
        </div>
      </div>
      <div className="content">
        <p>{selectedBooster?.desc}</p>
        <Button buttonText={'Buy'} className='content-buy' onClick={close}/>
      </div>
    </>
  );

  const content = (
    <div className="powerups">
      <div className="powerups-header">
        <p>Inventory</p>
      </div>
      <div className="powerups-container">
        {boosters.map((booster, idx) => (
          <Tile key={idx} booster={booster} onClick={() => open(booster)}/>
        ))}
      </div>
      {modalOpen && selectedBooster && (
        <Modal isOpen={modalOpen} onClose={close}>
          {modalContent}
        </Modal>
      )}
    </div>
  );

  return (
    isAuthenticated && (
      <>
        {error && <p style={{height: "100vh"}}>Authentication Error</p>}
        {!error && isLoading && <p style={{height: "100vh"}}>Loading...</p>}
        {!error && !isLoading && content}
      </>
    )
  )
}

export default PowerUps

