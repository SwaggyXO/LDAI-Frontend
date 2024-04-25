import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./quizexcerpt.scss";
import { Quiz } from "../../api/quizApiSlice";
import Intro from "../../pages/Gameplay/Start/Intro";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { updateQuizState } from "../../features/quiz/quizSlice";

type QuizProps = {
  quiz: Quiz;
};

type HistoryQuizProps = {
  quiz: {
    quizId: string;
    subject: string;
    title: string;
    description: string;
    quizType: string;
    attemptedAt: string;
    imageUrl: string;
    score: number;
  };
};

const QuizExcerpt = (props: QuizProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const close = () => {
    setModalOpen(false);
  };

  const open = () => {
    setModalOpen(true);
  };

  const quiz = props.quiz;

  const name = quiz.title;
  const mode = quiz.quizType.charAt(0) + quiz.quizType.slice(1).toLowerCase();
  const subject = quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1);

  const quizIntroModalContent = <Intro quiz={quiz} />;

  const handleOnClick = () => {
    open();
    dispatch(updateQuizState(quiz));
  };

  const playButton = (
    <Button
      buttonText={<FontAwesomeIcon icon={faPlay} color="white" />}
      className="quiz-play_button"
    />
  );

  const content = (
    <>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={close} classname="quiz-intro-modal">
          {quizIntroModalContent!}
        </Modal>
      )}
      <div className="quiz-excerpt" onClick={handleOnClick}>
        <p>{name}</p>
        <p>{mode}</p>
        <p>{subject}</p>
        {playButton}
      </div>
    </>
  );

  return content;
};

export const HistoryQuizExcerpt = (props: HistoryQuizProps) => {
  const quiz = props.quiz;

  const name = quiz.title;
  const mode = quiz.quizType.charAt(0) + quiz.quizType.slice(1).toLowerCase();
  const subject = quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1);
  const accuracy = quiz.score;

  const content = (
    <>
      <div className="quiz-excerpt">
        <p>{name}</p>
        <p>{mode}</p>
        <p>{subject}</p>
        <p style={{ fontWeight: "bolder" }}>{(accuracy * 100).toFixed(2)}%</p>
      </div>
    </>
  );

  return content;
};

export default QuizExcerpt;
