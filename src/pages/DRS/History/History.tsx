import { useAuth0 } from "@auth0/auth0-react";
import { DRSMascot } from "../../../assets/Mascot/imports";
import { AccuracyVec } from "../../../assets/imports";
import TextContainer from "../../../containers/TextContainer/TextContainer";
import "./history.scss";
import renderContent from "../../../features/content/renderContent";
import Button from "../../../components/buttons/Button";
import { getQuizCookie } from "../../../features/quiz/quizCookieHandler";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useFetchUserQuizzesQuery } from "../../../api/userApiSlice";
import { useFetchUserResultQuery } from "../../../api/userApiSlice.ts";
import QuizExcerpt, {
  HistoryQuizExcerpt,
} from "../../../components/QuizExcerpt/QuizExcerpt";
import { getUserCookie } from "../../../features/user/userCookieHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Loader/Loader.tsx";

const History = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  // const quiz = getQuizCookie();
  const user = getUserCookie();

  const { data: quizzesData, isLoading: isFetchUserQuizzesLoading, error: isFetchUserQuizzesError } = useFetchUserQuizzesQuery({
    userId: user?.userId!,
    limit: 3,
  });

  const { data: quiz, isLoading: isFetchUserResultLoading, error: isFetchUserResultError } = useFetchUserResultQuery([
    user?.userId!,
    quizzesData?.data.quizzes[quizzesData?.data.quizzes.length - 1].quizId!
  ], {
    skip: !quizzesData
  });

  if (!isFetchUserQuizzesLoading) {
    console.log(quizzesData, user?.userId!);
  }

  let accuracy = 0;

  if (!isFetchUserResultLoading) {
    accuracy = quiz?.data.score! * 100;
  }

  const handleDRSText = (accuracy: number) => {
    if (Number.isNaN(accuracy)) {
      return `You haven't played a quiz recently. Play a quiz to see your accuracy!`;
    }
    if (accuracy < 50) {
      return `Dot was not impressed with your performance. You might want to consider revising the quiz material.`;
    } else if (accuracy < 75) {
      return `Dot was somewhat impressed with your performance. You might want to consider revising the quiz material.`;
    } else if (accuracy < 85) {
      return `Dot was impressed with your performance. You're on the right track!`;
    } else {
      return `Dot was very impressed with your performance. Keep up the good work!`;
    }
  };

  const buttonElements = <p>Review Now!</p>;

  const gemmaButtonElements = (
    <p>
      Jump straight to the Doubt Clearing Session! &nbsp;
      {<FontAwesomeIcon icon={faPlay} color="black" />}
    </p>
  );

  const textContainerElements = (
    <>
      {Number.isNaN(accuracy) ? null : (
        <p>Your accuracy was {accuracy.toFixed(2)}%.</p>
      )}
      <p>{handleDRSText(accuracy)}</p>
      {Number.isNaN(accuracy) ? null : (
        <Button
          buttonText={buttonElements}
          className="drs-go_button"
          to="/drs/review"
        />
      )}
    </>
  );

  const renderMascotMood = (score: number): string => {
    if (score < 50) return "Angry";
    else if (score < 75) return "Unimpressed";
    else if (score < 85) return "Good";
    else return "Happy";
    // result?.score! * 100
  };

  const content = (
    <>
      <div className="drs-header">
        <p>Dot's Review System</p>
      </div>
      <div className="drs-mascot-mood">
        {renderContent("app", "Mascot", renderMascotMood(accuracy))}
      </div>
      <TextContainer elements={textContainerElements} className="drs" />
      <div className="gemma-button">
        <Button
          buttonText={gemmaButtonElements}
          className="gemma-play_button"
          to="/drs/chat"
        />
      </div>
      <div className="quiz-half">
        <div className="quiz-half_header">
          <p>Your History</p>
        </div>
        <div className="quiz-half_quizzes">
          {quizzesData?.data === undefined ? (
            <p>
              You haven't played any quizzes previously. Play a quiz to unlock
              this content.
            </p>
          ) : (
            quizzesData.data.quizzes.map((quiz, idx) => (
              <HistoryQuizExcerpt key={idx} quiz={quiz} />
            ))
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {isLoading && isFetchUserResultLoading || !quiz && <Loader />}
      {error && <p style={{ height: "100vh" }}>Authentication Error</p>}
      {!isLoading && isAuthenticated && !isFetchUserResultLoading && quiz && content}
    </>
  );
};

export default History;
