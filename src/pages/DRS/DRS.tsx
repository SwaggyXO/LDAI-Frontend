import { useAuth0 } from '@auth0/auth0-react';
import { DRSMascot } from '../../assets/Mascot/imports';
import { AccuracyVec } from '../../assets/imports';
import TextContainer from '../../containers/TextContainer/TextContainer';
import './drs.scss';
import renderContent from '../../features/content/renderContent';

const DRS = () => {

  const { isAuthenticated, isLoading, error } = useAuth0();

  const drsText = "Dot was really impressed by your performance that last quiz. Here are some key findings it wanted us to share with you!";

  const accuracy = 90;

  const textContainerElements = (
    <p>{drsText}</p>
  );

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