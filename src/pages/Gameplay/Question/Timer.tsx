import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";

interface TimerProps {
  isFrozen: boolean;
  navigate: Function; // replace with the actual type of navigate
  quizTimeLeft: number;
  updateTimeLeft: Function;
  quizTimeLimit: number;
  isSubmitClicked: boolean;
  timeLeft: number;
  onTimeLeftChange: (newTimeLeft: number) => void;
}

const Timer = (props: TimerProps) => {
  const {
    isFrozen,
    navigate,
    quizTimeLeft,
    updateTimeLeft,
    quizTimeLimit,
    isSubmitClicked,
    timeLeft,
    onTimeLeftChange,
  } = props;

  const dispatch = useDispatch();

  let [newTimeLeft, setTimeLeft] = useState<number>(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        newTimeLeft = prevTimeLeft;
        if (!isFrozen && prevTimeLeft > 0) {
          newTimeLeft = prevTimeLeft - 1;
          return newTimeLeft;
        } else if (prevTimeLeft <= 0) {
          clearInterval(interval);
          navigate(`/result`);
          newTimeLeft = 0;
          return newTimeLeft;
        }
        return newTimeLeft;
      });
    }, 1000);
    console.log("Is Submitted", isSubmitClicked);
    if (isSubmitClicked || quizTimeLeft < 50) {
      console.log("Time Left Before:", newTimeLeft, quizTimeLeft);
      dispatch(updateTimeLeft(newTimeLeft));
      onTimeLeftChange(newTimeLeft);
    }
    console.log("Time Left After:", newTimeLeft, quizTimeLeft);
    return () => clearInterval(interval);
  }, [
    quizTimeLeft,
    timeLeft,
    navigate,
    isFrozen,
    onTimeLeftChange,
    isSubmitClicked,
  ]);

  const minutes = Math.floor(newTimeLeft / 60);
  const seconds = newTimeLeft % 60;

  const progressWidth = (newTimeLeft / (quizTimeLimit * 60)) * 100 + "%";

  const content = (
    <div className="loading-bar">
      <div className="loading-bar-inner" style={{ width: progressWidth }}></div>
      <div className="time-left">
        {minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </div>
    </div>
  );

  return content;
};

export default Timer;
