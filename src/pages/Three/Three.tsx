import AnimalCellModel from '../../Models/AnimalCellModel';
import ThreeDComponent from '../../components/ThreeDComponent';
import Button from '../../components/buttons/Button';
import ThreeHero from '../../containers/ThreeHero/ThreeHero';
import ThreeQuestion from '../../containers/ThreeQuestion/ThreeQuestion';
import './three.scss';

const Three = () => {
  return (
    <div className='div-full'>
        <ThreeQuestion />
        <ThreeDComponent />
        {/* <AnimalCellModel /> */}
        <div className="answer-submit">
            <Button
                buttonText="Submit"
                className="answer-submit--button"
            /> 
        </div>
    </div>
  )
}

export default Three