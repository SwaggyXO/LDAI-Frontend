import './powerups.scss';

import { useAuth0 } from '@auth0/auth0-react';

import { Boosters } from './Boosters';
import Tile from '../../components/Tiles/Tile';
import { useEffect, useState } from 'react';

import Modal from '../../components/Modal/Modal';
import Button from '../../components/buttons/Button';

import renderContent from '../../features/content/renderContent';
import CapsuleContainer from '../../containers/Reward/CapsuleContainer';
import Capsule from '../../components/Capsule/Capsule';
import useUserData from '../../hooks/useUserData';
import { Booster, Currency, InventoryItem, useAddUserCurrencyMutation, useFetchAllBoostersQuery, useFetchUserBoostersQuery, usePurchaseBoosterMutation, useSubtractUserCurrencyMutation } from '../../api/gameApiSlice';
import { getUserCookie } from '../../features/user/userCookieHandler';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';

// type Booster = {
//   name: string;
//   quantity: number;
//   desc: string;
//   rarity: string;
// }

interface Quantity {
  values: string[];
  colors: string[];
}

const PowerUps = () => {

  // const boosters = Boosters;

  const {isAuthenticated, error, isLoading} = useAuth0();

  const user = getUserCookie();

  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooster, setSelectedBooster] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState(0);

  const quantityData = [
    {
      values: [`${selectedBooster?.quantity}`, '+'],
      colors: ["#65BE0D", "#E1B03A"],
    }
  ];

  const [boosters, setBoosters] = useState<InventoryItem[]>([]);
  // const { data: boosterData, error: boosterError, loading: boosterLoading } = useUserData("boosters");

  // const { data: boosterData, error: boosterError } = useFetchUserBoostersQuery(getUserCookie()?.userId!);
  const { data: boosterData, error: boosterError, isLoading: isFetchUserBoosterLoading } = useFetchUserBoostersQuery(user?.userId!);

  const [addUserCurrency] = useAddUserCurrencyMutation();
  const [subtractUserCurrency] = useSubtractUserCurrencyMutation();
  const [purchaseBooster] = usePurchaseBoosterMutation();

  useEffect(() => {
      if (boosterData) {
        console.log(boosterData.data);
        setBoosters(boosterData.data.inventory);
      }
    }, [boosterData]
  );

  const testingAddition = async () => {
    try {
      const response = await addUserCurrency({userId: user?.userId!, currency: [{name: 'marbles', amount: 100}]});
      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Currency added successfully:', response);
        dispatch(setUser(response.data.data));
        if (response) console.log(response);
      }
    } catch (error) {
      console.error("An unexpected error occurred");
    }
  }

  const handleCurrencySubtraction = async (amount: number) => {
    try {
      const response = await subtractUserCurrency({userId: user?.userId!, currency: [{name: 'marbles', amount: amount}]});
      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Currency subtracted successfully:', response);
        dispatch(setUser(response.data.data));
        if (response) console.log(response);
      }
    } catch (error) {
      console.error("An unexpected error occurred");
    }
  }

  const handlePurchaseBooster = async (booster: Currency) => {
    try {
      const response = await purchaseBooster({userId: user?.userId!, booster: [booster]});
      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Booster purchased successfully:', response);
        if (response) console.log(response);
      }
    } catch (error) {
      console.error("An unexpected error occurred");
    }
  }

  // useEffect(() => {
  //   testingAddition();
  // }, []);

  // useEffect(() => {
  //   if (selectedBooster) {
  //     setQuantity(selectedBooster.quantity);
  //   }
  // }, [selectedBooster]);

  const generateQuantityCapsules = (data: Quantity[]): React.ReactNode[] => {

    return data
      .map((item, setIndex) => {
        return item.values.map((text, index) => (
          <Capsule
            key={`${setIndex}-${index}-${quantity}`}
            text={index === 0 ? `${quantity}` : text}
            bgColor={item.colors[index]}
            capsulePosition={
              index === 0 ? "left" : "right"
            }
            textColor="black"
            onClick={index === 1 ? handleOnQuantityIncrease : undefined}
          />
        ));
      })
      .flat();
  };

  const handleOnQuantityIncrease = () => {
    if (selectedBooster) {
      if (selectedBooster.quantity + quantity < 2 && selectedBooster.booster.name !== "Dot") {
        setQuantity(quantity + 1);
      } else if (selectedBooster.booster.name === "Dot") {
        if (selectedBooster.quantity + quantity < 1) {
          setQuantity(quantity + 1);
        }
      }
    }
  };

  const handleBuy = () => {
    if (selectedBooster) {
      if (selectedBooster.quantity < 2 && selectedBooster.booster.name !== "Dot") {
        if (totalPrice > user?.marbles!) {
          return;
        } else {
          handlePurchaseBooster({name: selectedBooster.booster.name, amount: quantity});
          handleCurrencySubtraction(totalPrice);
        }
      } else if (selectedBooster.booster.name === "Dot") {
        if (selectedBooster.quantity < 1) {
          if (totalPrice > user?.marbles!) {
            return;
          } else {
            handlePurchaseBooster({name: selectedBooster.booster.name, amount: quantity});
            handleCurrencySubtraction(totalPrice);
          }
        }
      }
    }

    close();
  };

  const close = () => {
    setModalOpen(false);
    setSelectedBooster(null);
    setQuantity(0);
  }

  const open = (booster: InventoryItem) => {
    setSelectedBooster(booster);
    setModalOpen(true);
  }

  const price = selectedBooster?.booster.price;

  const totalPrice = price! * quantity;

  const handleButtonText = () => {
    if (selectedBooster) {
      if (selectedBooster.quantity < 2 && selectedBooster.booster.name !== "Dot") {
        if (totalPrice > user?.marbles!) {
          return 'Insufficient Funds';
        } else {
          return 'Buy';
        }
      } else if (selectedBooster.booster.name === "Dot") {
        if (selectedBooster.quantity < 1) {
          if (totalPrice > user?.marbles!) {
            return 'Insufficient Funds';
          } else { 
            return 'Buy';
          }
        }
      }
    }
    return 'Maxed';
  }

  const handleBuyButtonDisabled = () => {
    if (selectedBooster) {
      if (selectedBooster.quantity < 2 && selectedBooster.booster.name !== "Dot") {
        if (totalPrice > user?.marbles! || quantity === 0) {
          return true;
        } else {
          return false;
        }
      } else if (selectedBooster.booster.name === "Dot") {
        if (selectedBooster.quantity < 1) {
          if (totalPrice > user?.marbles! || quantity === 0) {
            return true;
          } else {
            return false;
          }
        }
      } 
    }
    return true;
  }

  const modalContent = (
    <>
      <div className="header-nontext">
        <div className="price">
          {renderContent('app', 'Marble', 'Marble')}
          <p>{totalPrice}</p>
        </div>
        <div className="booster-image">
          {renderContent('boosters', `${selectedBooster?.booster.name}`, `${selectedBooster?.booster.name}`)}
        </div>
        <div className="quantity-capsule">
          {quantityData!.map((data, index) => (
            <CapsuleContainer
              key={index}
              capsules={generateQuantityCapsules([data])}
            />
          ))}
        </div>
      </div>
      <div className="header-text">
        <div className="booster-name">
          <p>{selectedBooster?.booster.name}</p>
        </div>
        <div className="booster-rarity">
          <p className={`booster-${selectedBooster?.booster.tier}`}>{selectedBooster?.booster.tier}</p>
        </div>
      </div>
      <div className="content">
        <p>{selectedBooster?.booster.description}</p>
        <Button buttonText={handleButtonText()} className='content-buy' onClick={handleBuy} check={handleBuyButtonDisabled()}/>
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
        <Modal isOpen={modalOpen} onClose={close} classname='booster-modal'>
          {modalContent}
        </Modal>
      )}
    </div>
  );

  return (
    isAuthenticated && (
      <>
        {error && <p style={{height: "100vh"}}>Authentication Error</p>}
        {!error && isLoading || isFetchUserBoosterLoading && <Loader />}
        {!error && !isLoading && !isFetchUserBoosterLoading && content}
      </>
    )
  )
}

export default PowerUps

