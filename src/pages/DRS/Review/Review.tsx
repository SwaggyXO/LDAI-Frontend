import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  BarElement,
} from "chart.js";
import "./review.scss";
import renderContent from "../../../features/content/renderContent.tsx";
import { getQuizCookie } from "../../../features/quiz/quizCookieHandler.ts";
import TextContainer from "../../../containers/TextContainer/TextContainer.tsx";
import { useAuth0 } from "@auth0/auth0-react";

import { accuracyOptions, timeOptions, responseOptions } from "./ChartsInfo.ts";
import { useFetchQuizByIdQuery } from "../../../api/quizApiSlice.ts";
import Button from "../../../components/buttons/Button.tsx";
import Loader from "../../Loader/Loader.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Tooltip,
  Title
);

const Review = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  const quiz = getQuizCookie();

  const {
    data: quizData,
    error: fetchQuizError,
    isLoading: isFetchQuizLoading,
  } = useFetchQuizByIdQuery(quiz?.result?.quizId!, { skip: !quiz });

  const accuracy = quiz!.result?.score! * 100;
  const timeTaken = Number(quiz!.result?.timeTaken!);

  const responses = quiz!.result?.responses!;
  const questionIndexList = responses.map((response, idx) => `Q${idx + 1}`);

  const AccuracyData = {
    labels: questionIndexList,
    datasets: [
      {
        label: "Accuracy",
        data: responses.map((response) => response.score * 100),
        fill: false,
        backgroundColor: "#1F4E79",
        borderColor: "rgba(31, 78, 121, 0.4)",
        tension: 0.1,
      },
    ],
  };

  const TimeData = {
    labels: questionIndexList,
    datasets: [
      {
        label: "Time Taken",
        data: responses.map((response) => Number(response.timeTaken)),
        fill: false,
        backgroundColor: "#1F4E79",
        borderColor: "rgba(31, 78, 121, 0.4)",
        tension: 0.1,
      },
    ],
  };

  const ResponseData = {
    labels: ["Unanswered", "Bad", "Okay", "Good", "Great"],
    datasets: [
      {
        label: "Responses",
        data: responses.reduce(
          (acc, response) => {
            if (response.response.length === 0) {
              acc[0]++;
            } else {
              const score = response.score * 100;
              if (score < 50) {
                acc[1]++;
              } else if (score < 75) {
                acc[2]++;
              } else if (score < 85) {
                acc[3]++;
              } else {
                acc[4]++;
              }
            }
            return acc;
          },
          [0, 0, 0, 0, 0]
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const AccuracyLineChart = (
    <Line options={accuracyOptions} data={AccuracyData} />
  );

  const TimeLineChart = <Line options={timeOptions} data={TimeData} />;

  const ResponseBarGraph = (
    <Bar options={responseOptions} data={ResponseData} />
  );

  const handleAccuracyChartText = (accuracy: number) => {
    if (accuracy < 50) {
      return `You were struggling with accuracy. Try to focus on answering questions correctly.`;
    } else if (accuracy < 75) {
      return `You were doing okay with accuracy. See if you can improve.`;
    } else if (accuracy < 85) {
      return `Not bad! You were doing well with accuracy. Let's try to improve further.`;
    } else {
      return `The accuracy was great. Keep up the good work!`;
    }
  };

  const handleTimeChartText = (time: number) => {
    if (quizData?.data.quizType === "STANDARD") {
      if (time < 200) {
        return `You were answering questions quickly. It's good to be fast! But answer carefully.`;
      } else if (time < 400) {
        return `You were answering questions at a moderate pace. That's good!`;
      } else if (time < 800) {
        return `You were taking your time to answer questions. Good job!`;
      } else {
        return `You were taking a long time to answer questions. Try to speed up a bit.`;
      }
    } else if (quizData?.data.quizType === "ONETAP") {
      if (time < 60) {
        return `You were answering questions quickly. It's good to be fast! But answer carefully.`;
      } else if (time < 120) {
        return `You were answering questions at a moderate pace. That's good!`;
      } else if (time < 220) {
        return `You were taking your time to answer questions. Good job!`;
      } else {
        return `You were taking a long time to answer questions. Try to speed up a bit.`;
      }
    } else {
      if (time < 300) {
        return `You were answering questions quickly. It's good to be fast! But answer carefully.`;
      } else if (time < 600) {
        return `You were answering questions at a moderate pace. That's good!`;
      } else if (time < 1000) {
        return `You were taking your time to answer questions. Good job!`;
      } else {
        return `You were taking a long time to answer questions. Try to speed up a bit.`;
      }
    }
  };

  const handleResponseChartText = (responses: number[]) => {
    if (
      responses[0] === responses.reduce((acc, response) => acc + response, 0)
    ) {
      return `You didn't answer any questions. Try to answer all questions.`;
    } else if (
      responses[1] > responses[2] &&
      responses[1] > responses[3] &&
      responses[1] > responses[4]
    ) {
      return `You were struggling with answering questions correctly. Try to focus on answering questions correctly.`;
    } else if (
      responses[2] > responses[1] &&
      responses[2] > responses[3] &&
      responses[2] > responses[4]
    ) {
      return `You were doing okay with answering questions correctly. See if you can improve.`;
    } else if (
      responses[3] > responses[1] &&
      responses[3] > responses[2] &&
      responses[3] > responses[4]
    ) {
      return `Not bad! You were doing well with answering questions correctly. Let's try to improve further.`;
    } else {
      return `You kept it balanced. Were you on a mission? 🫥`;
    }
  };

  const convertTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleDRSText = (accuracy: number) => {
    if (Number.isNaN(accuracy)) {
      return `You haven't played a quiz recently. Play a quiz to see your accuracy!`;
    }
    if (accuracy < 50) {
      return `Dot has gathered some statistics to help you improve.`;
    } else if (accuracy < 75) {
      return `Below are some statistics Dot has gathered to help you improve.`;
    } else if (accuracy < 85) {
      return `Dot has gathered some statistics to help you improve further.`;
    } else {
      return `Dot has gathered some statistics to help you improve further.`;
    }
  };

  const handleDRSHeader = (accuracy: number) => {
    if (Number.isNaN(accuracy)) {
      return `You haven't played a quiz recently. Play a quiz to see your accuracy!`;
    }
    if (accuracy < 50) {
      return `You didn't do so well.`;
    } else if (accuracy < 75) {
      return `You did okay.`;
    } else if (accuracy < 85) {
      return `You did well.`;
    } else {
      return `You did great!`;
    }
  };

  const handleDRSHeaderColor = (accuracy: number) => {
    if (Number.isNaN(accuracy)) {
      return `#000000`;
    }
    if (accuracy < 50) {
      return `#FF0000`;
    } else if (accuracy < 75) {
      return `#FFA500`;
    } else if (accuracy < 85) {
      return `#FFFF00`;
    } else {
      return `#00FF00`;
    }
  };

  const textContainerElements = (
    <>
      <p
        style={{
          fontWeight: 700,
          fontSize: "1.1rem",
          color: handleDRSHeaderColor(accuracy),
        }}
      >
        {handleDRSHeader(accuracy)}
      </p>
      <br />
      <p style={{ textAlign: "center" }}>{handleDRSText(accuracy)}</p>
    </>
  );

  const content = (
    <>
      <div className="drs-header">
        <p>Review with Dot</p>
      </div>
      <div className="drs-mascot">{renderContent("app", "Mascot", "DRS")}</div>
      <TextContainer elements={textContainerElements} className="drs" />
      <div className="top-stats">
        <p className="stats-header">Top Stats</p>
        <div className="stats-container">
          <div className="stat">
            <div className="stat-container">
              <p>{accuracy.toFixed(2)}%</p>
            </div>
            <div className="stat-header">
              <p>Accuracy</p>
            </div>
          </div>
          <div className="stat">
            <div className="stat-container">
              <p>{convertTime(timeTaken)}</p>
            </div>
            <div className="stat-header">
              <p>Time Taken</p>
            </div>
          </div>
        </div>
      </div>
      <div className="analyze-better">
        <p className="stats-header">Analyze Better</p>
        <div className="charts-container">
          <div className="chart-container">
            <div className="chart">{AccuracyLineChart}</div>
            <div className="chart-details">
              <p>{handleAccuracyChartText(accuracy)}</p>
            </div>
          </div>
          <div className="learn__features-container__line">
            <section />
          </div>
          <div className="chart-container">
            <div className="chart">{TimeLineChart}</div>
            <div className="chart-details">
              <p>{handleTimeChartText(timeTaken)}</p>
            </div>
          </div>
          <div className="learn__features-container__line">
            <section />
          </div>
          <div className="chart-container">
            <div className="chart">{ResponseBarGraph}</div>
            <div className="chart-details">
              <p>{handleResponseChartText(ResponseData.datasets[0].data)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="goback">
        <Button buttonText={"Go Back"} className="drs-go_button" to="/drs" />
      </div>
    </>
  );

  return (
    <>
      {isLoading && isFetchQuizLoading && <Loader />}
      {error && <p style={{ height: "100vh" }}>Authentication Error</p>}
      {!isLoading && isAuthenticated && content}
    </>
  );
};

export default Review;
