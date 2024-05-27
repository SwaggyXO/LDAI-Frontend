import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";
import { updateTimeLeft } from "../../../features/quiz/quizSlice";

interface LoadingBarProps {
  progressWidth: string;
  minutes: number;
  seconds: number;

  isFrozen: boolean;
  isSubmitClicked: boolean;
  onTimeLeftChange: (newTimeLeft: number) => void;
  dotNavsLeft: number;
  ocrLoading: boolean;
}

const LoadingBar = ({
  progressWidth,
  minutes,
  seconds,
  isFrozen,
  isSubmitClicked,
  onTimeLeftChange,
  dotNavsLeft,
  ocrLoading,
}: LoadingBarProps) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const quizTimeLimit = useSelector((state: RootState) => state.quiz.timelimit);
  const quizTimeLeft = useSelector((state: RootState) => state.quiz.timeLeft);

  const [timeLeft, setTimeLeft] = useState<number>(quizTimeLimit * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (!isFrozen && prevTimeLeft > 0 && !ocrLoading) {
          return prevTimeLeft - 1;
        } else if (prevTimeLeft <= 0) {
          clearInterval(interval);
          navigate(`/result`);
          return 0;
        }
        return prevTimeLeft;
      });
    }, 1000);
    if (isSubmitClicked || dotNavsLeft > 0) {
      // console.log(
      //   "Is frozen: ",
      //   isFrozen,
      //   "Is submit clicked: ",
      //   isSubmitClicked
      // );

      // console.log("Time Left Before:", timeLeft, quizTimeLeft);
      dispatch(updateTimeLeft(timeLeft));
      onTimeLeftChange(timeLeft);
    }
    // console.log("Time Left After:", timeLeft, quizTimeLeft);
    return () => clearInterval(interval);
  }, [isFrozen, isSubmitClicked, dotNavsLeft, ocrLoading]);

  minutes = Math.floor(timeLeft / 60);
  seconds = timeLeft % 60;

  progressWidth = (timeLeft / (quizTimeLimit * 60)) * 100 + "%";

  return (
    <div className="loading-bar">
      <div className="loading-bar-inner" style={{ width: progressWidth }}></div>
      <div className="time-left">
        {minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </div>
    </div>
  );
};

export const MemoizedLoadingBar = React.memo(LoadingBar);

export default LoadingBar;
