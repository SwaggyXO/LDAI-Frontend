import "./Completion.scss";
import doubleMarbles from "../../../../../assets/Marbles/Double Marble.svg";
import doubleXP from "../../../../../assets/XP/Double XP.svg";
import Capsule from "../../../../../components/Main/Capsule/Capsule";
import CapsuleContainer from "../../../../../containers/Main/Reward/CapsuleContainer";
import Button from "../../../../../components/Main/buttons/Button";

type ResultData = {
  values: string[];
  colors: string[];
};

const Completion = () => {

  const resultData = [
    {
      values: ["1:37", "16:16"],
      colors: ["#65BE0D", "#E1B03A"],
    }
  ];

  const generateResultCapsules = (data: ResultData[]): React.ReactNode[] => {
    return data
      .map((reward, setIndex) => {
        return reward.values.map((text, index) => (
          <Capsule
            key={`${setIndex}-${index}`}
            text={text}
            bgColor={reward.colors[index]}
            capsulePosition={
              index === 0 ? "left" : "right"
            }
            textColor="black"
          />
        ));
      })
      .flat();
  };


  const content = (
    <div className="quiz-body--result">
      <section className="result--hero">
        <div className="hero-text">
          <h3> Quiz Completed </h3>
        </div>

        <div className="result--ellipse" />
      </section>

      <section className="result--body">
        <div className="user-rewards">
          
          <div className="user-rewards-icons">
            <div className="reward--ellipse" />
            <div className="reward--ellipse" />
            <div className="reward--ellipse" />
          </div>

          <div className="user-rewards-values">
              <div className="user-rewards-xp">
                <h3>445</h3>
              </div>
              <div className="user-rewards-marbles">
                <h3>789</h3>
              </div>
              <div className="user-rewards-score">
                <h3>90%</h3>
              </div>
          </div>
          <div className="user-rewards-headings">
              <div className="user-rewards-xp">
                <h3>XP</h3>
              </div>
              <div className="user-rewards-marbles">
                <h3>Marbles</h3>
              </div>
              <div className="user-rewards-score">
                <h3>Accuracy</h3>
              </div>
          </div>

          <div className="boosters-used">
            <div className="boosters-info">
              <div className="booster">
                <img src={doubleXP} alt="2xXP" />
              </div>
              <div className="booster">
                <img src={doubleMarbles} alt="2xMarbles" />
              </div>
            </div>
            <h3>Boosters Used</h3>
          </div>
        </div>

        <div className="user--stats">

          <div className="user-stats--headings">
            <div className="per-question-heading">
              <h5>Time Per Question</h5>
            </div>

            <div className="total-time-heading">
              <h5>Total Time Taken</h5>
            </div>
          </div>
          
          {resultData.map((data, index) => (
            <CapsuleContainer
              key={index}
              capsules={generateResultCapsules([data])}
            />
          ))}
        </div>
      </section>

      <section className="result-buttons">
        <Button buttonText={"DRS"} className="result-button--drs" to="/drs" />
        <Button buttonText={"Done"} className="result-button--done" to="/home" />
      </section>
    </div>
  )

  return content;
}

export default Completion