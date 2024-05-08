import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Topnav from "../../containers/Topnav/Topnav";
import "./QuizLayout.scss";
import useAuth from "../../hooks/useAuth";
import NavButton from "../../components/buttons/NavButton";
import renderContent from "../../features/content/renderContent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Loader from "../../pages/Loader/Loader";
import { getUserCookie } from "../../features/user/userCookieHandler";
import { useQuitQuizQuery } from "../../api/quizApiSlice";
import {
  resetBoosterState,
  resetQuizState,
  updateTimeLeft,
} from "../../features/quiz/quizSlice";
import { useEffect, useState } from "react";

const QuizLayout = () => {
  const { authChecked, intendedPath } = useAuth();

  const currUser = getUserCookie();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const marbles = (
    <div className="marbles-container">
      {renderContent("app", "Marble", "Marble")}
      <p>{currUser!.marbles}</p>
    </div>
  );

  const handleExit = async () => {
    const response = await fetch(
      `https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/quiz/quit/${currUser?.userId}`
    );
    dispatch(resetBoosterState());
    const data = await response.json();
    console.log(data);
    navigate("/home");
  };

  const content = (
    <>
      <Topnav
        customButton={
          <NavButton to="exit" onClick={handleExit} className="cross-button" />
        }
        marbles={marbles}
        classname="quiz-layout"
      />
      <div className="quiz-wrapper">
        <Outlet />
      </div>
    </>
  );

  if (!authChecked) {
    return <Loader />;
  }

  if (!intendedPath) {
    return content;
  }

  return <Navigate to="/" replace />;
};

export default QuizLayout;
