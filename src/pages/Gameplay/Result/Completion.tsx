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

  // const { data, error: fetchUserError } = useFetchUserByIdQuery(user!.sub!.replace(/\|/g, '%7C'));

  // const dispatch = useDispatch();

  // dispatch(setUser(data?.data!));

  const currUser = useSelector((state: RootState) => state.user);
  const currQuiz = useSelector((state: RootState) => state.quiz);

  // useEffect(() => {
  //   const sse = new EventSource(`https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/user/result/stream`);

  //   sse.onmessage = (e) => {
  //     console.log(e.data);
  //   }

  //   return () => {
  //     // Cleanup: remove event listener when component unmounts
  //     sse.close();
  //   };
  // }, []);


  const timeData = [
    {
      values: ["1:37", "16:16"],
      colors: ["#65BE0D", "#E1B03A"],
    }
  ];

  const userId = currUser.userId!;
  const quizId = currQuiz.id!;

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
                <h4>XP</h4>
              </div>
              <div className="user-rewards-marbles">
                <h4>Marbles</h4>
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
          
          {timeData.map((data, index) => (
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
      {isLoading && <p style={{height: "100vh"}}>Loading...</p>}
      {error && <p style={{height: "100vh"}}>Authentication Error</p>}
      {!isLoading && isAuthenticated && content}
    </>
  );
}

export default Completion