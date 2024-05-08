import AnimalCellModel from "../../Models/AnimalCellModel";
import ThreeDComponent, {
  MemoizedThreeDComponent,
} from "../../components/ThreeDComponent/ThreeDComponent";
import Button from "../../components/buttons/Button";
import ThreeHero from "../../containers/ThreeHero/ThreeHero";
import ThreeQuestion, {
  MemoizedThreeDQuestion,
} from "../../containers/ThreeQuestion/ThreeQuestion";
import "./three.scss";

const annotations = [
  // {
  //   question: "Name this part",
  //   cameraPos: {
  //       x: 8,
  //       y: 0,
  //       z: 8
  //   },
  //   lookAt: {
  //       x: 1,
  //       y: 0.09,
  //       z: 1
  //   },
  // },
  {
    question: "What does Ascending Aorta do?",
    cameraPos: {
      x: -6,
      y: 1.100902499991096,
      z: 8,
    },
    lookAt: {
      x: -0.6385672631219208,
      y: 1.100902499991096,
      z: 1.8547378740795566,
    },
  },
];

const Three = () => {
  return (
    <div className="div-full">
      <MemoizedThreeDQuestion />
      <MemoizedThreeDComponent
        annotations={annotations}
        name={"Heart"}
        scale={0.1}
      />
      {/* <AnimalCellModel /> */}
      <div className="answer-submit">
        <Button buttonText="Submit" className="answer-submit--button" />
      </div>
    </div>
  );
};

export default Three;
