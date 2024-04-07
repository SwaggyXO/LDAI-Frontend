import "./Completion.scss";
import doubleMarbles from "../../../assets/Marbles/Double Marble.svg";
import doubleXP from "../../../assets/XP/Double XP.svg";
import Capsule from "../../../components/Capsule/Capsule";
import CapsuleContainer from "../../../containers/Reward/CapsuleContainer";
import Button from "../../../components/buttons/Button";
import { useFetchUserByIdQuery, useFetchUserResultQuery } from "../../../api/userApiSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setUser } from "../../../features/user/userSlice";
import { updateQuizState } from "../../../features/quiz/quizSlice";

type ResultDataF = {
  values: string[];
  colors: string[];
};

interface Winning {
  amount: number;
  currency: string;
}

interface Response {
  questionId: string;
  text: string;
  options: string[];
  response: string[];
  score: number;
}

interface ResultData {
  resultId: string;
  userId: string;
  quizId: string;
  score: number;
  timeTaken: string;
  winnings: Winning[];
  responses: Response[];
}

interface FetchUserResultResponse {
  data: ResultData;
  event: string;
}

const Completion = () => {

  const { user, isAuthenticated, error, isLoading } = useAuth0();

  const { data: userData, error: fetchUserError } = useFetchUserByIdQuery(user!.sub!.replace(/\|/g, '%7C'));

  const dispatch = useDispatch();

  // dispatch(setUser(data?.data!));

  const currUser = useSelector((state: RootState) => state.user);
  const currQuiz = useSelector((state: RootState) => state.quiz);

  const userId = currUser.userId!;
  const quizId = currQuiz.id!;

  // console.log(currUser, currQuiz);

  const [result, setResult] = useState<ResultData | null>(null);
  const [resError, setResError] = useState("");

  // if (currQuiz.result === null) {
  //   console.log("Here");
  //   const { data: resultData, error: fetchUserResultError, isLoading: isFetchUserResultLoading, isSuccess } = useFetchUserResultQuery([userId, quizId]);

  //   if (!fetchUserResultError && !isFetchUserResultLoading) setResult(resultData!.data);
  // }

  useEffect(() => {
    const sse = new EventSource(`${import.meta.env.VITE_CORE_MS_BASE_URL}/user/result/stream`);

    sse.onerror = (err: any) => {
      console.log(err);
      setResError(err);
    }

    sse.addEventListener("HBT", (e: any) => {
      console.log(e.data);
    });

    sse.addEventListener("RESRCD", (e: any) => {
      const {type, data} = e;

      console.log(`Type: ${type}, Parsed data: ${JSON.parse(data)}`);
      const parsedData: ResultData = JSON.parse(data);

      console.log(parsedData);
      console.log(parsedData.resultId);
      console.log(parsedData.quizId);
      console.log(parsedData.userId);
      console.log(parsedData.score);
      console.log(parsedData.timeTaken);
      console.log(parsedData.winnings);
      console.log(parsedData.responses);

      dispatch(updateQuizState({
        result: parsedData
      }));

      setResult(parsedData);
    });

    sse.addEventListener("CNN", (e: any) => {
      console.log(e.data);
    })

    return () => {
      sse.close();
    }
  }, [resError, result])

  console.log(result);
  console.log(result?.resultId);

  // try {
  //   const { data: resultData, error: fetchUserResultError, isLoading: isFetchUserResultLoading, isSuccess } = useFetchUserResultQuery([userId, quizId]);
  //   if (isSuccess) {
  //     console.log(resultData);
  //   } else if (resultData!.error) {
  //     console.log("There was an error: ", resultData?.error);
  //   }
  // } catch (err) {
  //   console.log("Unexpected Error")
  // }

  let timeData: { values: string[]; colors: string[]; }[] = [];
  if (result) {

    const numTimeTaken = parseInt(result!.timeTaken);

    const timeTakenMins = Math.floor(numTimeTaken / 60);
    const timeTakenSecs = numTimeTaken % 60;

    const timePerQuestion = Math.round(parseInt(result!.timeTaken) / result!.responses.length);
    const timePerQuestionMins = Math.floor(timePerQuestion / 60);
    const timePerQuestionSecs = timePerQuestion % 60;

    timeData = [
      {
        values: [`${timePerQuestionMins}:${timePerQuestionSecs < 10 ? '0' + timePerQuestionSecs : timePerQuestionSecs}`, `${timeTakenMins}:${timeTakenSecs < 10 ? '0' + timeTakenSecs : timeTakenSecs}`],
        colors: ["#65BE0D", "#E1B03A"],
      }
    ];
  }

  const generateResultCapsules = (data: ResultDataF[]): React.ReactNode[] => {
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
            <div className="reward--ellipse"></div>
            <div className="reward--ellipse"></div>
            <div className="reward--ellipse"></div>
          </div>

          <div className="user-rewards-values">
              <div className="user-rewards-xp">
                <h3>{result?.winnings[0].amount}</h3>
              </div>
              <div className="user-rewards-marbles">
                <h3>{result?.winnings[1].amount}</h3>
              </div>
              <div className="user-rewards-score">
                <h3>{result?.score! * 100}</h3>
              </div>
          </div>
          <div className="user-rewards-headings">
              <div className="user-rewards-xp">
                <h4>Marbles</h4>
              </div>
              <div className="user-rewards-marbles">
                <h4>XP</h4>
              </div>
              <div className="user-rewards-score">
                <h4>Accuracy</h4>
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
            <h4>Boosters Used</h4>
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
          
          {timeData!.map((data, index) => (
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

  return (
    <>
      {isLoading || !result && <p style={{height: "100vh"}}>Loading...</p>}
      {error && resError && <p style={{height: "100vh"}}>Unexpected Error Occured</p>}
      {!isLoading && isAuthenticated && result && content}
    </>
  );
}

export default Completion