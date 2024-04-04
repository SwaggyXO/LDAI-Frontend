import { useAuth0 } from '@auth0/auth0-react';
import { DRSMascot } from '../../assets/Mascot/imports';
import { AccuracyVec } from '../../assets/imports';
import TextContainer from '../../containers/TextContainer/TextContainer';
import './drs.scss';
import renderContent from '../../features/content/renderContent';
import { useRef, useState } from 'react';

import * as THREE from "three";
import ModelView from './ModelView';

const DRS = () => {

  const { isAuthenticated, isLoading, error } = useAuth0();

  const drsText = "Dot was really impressed by your performance that last quiz. Here are some key findings it wanted us to share with you!";

  const accuracy = 90;

  const textContainerElements = (
    <p>{drsText}</p>
  );

  const small = useRef(new THREE.Group());
  const cameraControlSmall = useRef();
  const [smallRotation, setSmallRotation] = useState(0);

  const content = (
    <>
      <div className="drs-header">
        <p>Dot's Review System</p>
      </div>
      <div className="drs-mascot">
        {renderContent('app', 'Mascot', 'DRS')}   
      </div>
      <TextContainer elements={textContainerElements} className='drs' />
      <div className="drs-accuracy">
        <div className="vec-container">
          <img src={AccuracyVec} alt="accuracy vector" />
        </div>
        <p>{accuracy}%</p>
        <p>Accuracy</p>
      </div>
      <h2 className="comparison-header">
        A Comparison
      </h2>
      <div style={{"display":"flex","marginTop":"1.25rem","flexDirection":"column","alignItems":"center"}}>
        <div style={{"overflow":"hidden","position":"relative","width":"100%","height":"75vh"}}>
          <ModelView 
            groupRef={small}
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
          /> 
        </div>
      </div>
       
    </>
    
  );

  return (
    <>
      {isLoading && <p style={{height: "100vh"}}>Loading...</p>}
      {error && <p style={{height: "100vh"}}>Authentication Error</p>}
      {!isLoading && isAuthenticated && content}
    </>
  )
}

export default DRS