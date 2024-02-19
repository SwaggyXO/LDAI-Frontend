import { DRSMascot } from '../../../assets/Mascot/imports';
import { AccuracyVec } from '../../../assets/imports';
import TextContainer from '../../../containers/Main/TextContainer/TextContainer';
import './drs.scss';

const DRS = () => {

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
        <img src={DRSMascot} alt="Mascot" />
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

  return content;
}

export default DRS