import "./Intro.scss";
import Capsule from "../../../components/Capsule/Capsule";
import CapsuleContainer from "../../../containers/Reward/CapsuleContainer";
import Button from "../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTimeLeft } from "../../../features/quiz/quizSlice";
import renderContent from "../../../features/content/renderContent";

type RewardData = {
  values: string[];
  colors: string[];
};

interface Question {
  id: string;
  text: string;
  imageUrl: string | null;
  options: string[];
}

type Quiz = {
  quiz: {
    quizId: string;
    questions: Question[];
    title: string;
    description: string;
    subject: string;
    quizType: string;
    timelimit: number;
    imageUrl: string;
  }
}

const Intro = (props: Quiz) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quiz = props.quiz;

  const rewardData = [
    {
      values: ["Max", "500", "1000"],
      colors: ["#00B4D8", "#65BE0D", "#E1B03A"],
    },
    {
      values: ["Avg.", "400", "750"],
      colors: ["#00B4D8", "#65BE0D", "#E1B03A"],
    },
  ];

  const generateRewardCapsules = (data: RewardData[]): React.ReactNode[] => {
    return data
      .map((reward, setIndex) => {
        return reward.values.map((text, index) => (
          <Capsule
            key={`${setIndex}-${index}`}
            text={text}
            bgColor={reward.colors[index]}
            capsulePosition={
              index === 0 ? "left" : index === 1 ? "middle" : "right"
            }
            textColor={index === 0 ? "white" : "black"}
          />
        ));
      })
      .flat();
  };

  const handleQuizStart = () => {
    navigate(`/quiz/${quiz.quizId}/question/0`);
    dispatch(updateTimeLeft(quiz.timelimit));
  }

  // Todo: add animations?
  const content = (
    <div className="quiz-body--intro">
      <section className="quiz-intro--section-starter">
        <div className="section-starter--quiz-name">
          <h1>{quiz.title}</h1>
        </div>
        <div className="section-starter--ellipse">{renderContent('app', 'Modes', `${quiz.quizType}`)}</div>
        <div className="section-starter--quiz-type">
          <h2>{quiz.quizType}</h2>
        </div>
      </section>

      <section className="quiz-intro--section-overview">
        <div className="section-overview--heading">
          <h3>Overview</h3>
        </div>
        <div className="section-overview--quiz-description">
          <p>{quiz.description}</p>
        </div>
      </section>

      <section className="quiz-intro--section-rewards">
        <div className="section-rewards--headings">
          <h3>Rewards</h3>
          <h3>XP</h3>
          <h3>Marbles</h3>
        </div>

        {rewardData.map((data, index) => (
          <CapsuleContainer
            key={index}
            capsules={generateRewardCapsules([data])}
          />
        ))}
      </section>

      <div className="quiz-intro--start-button">
        <Button
          buttonText="Start Quiz"
          className="quiz-intro--start-button"
          onClick={handleQuizStart}
        />
      </div>
    </div>
  );

  return content;
};

export default Intro;
