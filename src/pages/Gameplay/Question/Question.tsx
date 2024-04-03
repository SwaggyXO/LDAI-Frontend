import { useParams } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import "./Question.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ChangeEvent, useEffect, useState } from "react";

const Question = () => {
  const { quizId, questionIndex } = useParams();
  const questions = useSelector((state: RootState) => state.quiz.questions);

  const currQuizId = useSelector((state: RootState) => state.quiz.id);

  const numQuestionIndex = parseInt(questionIndex!);
  const question = questions[numQuestionIndex];

  let index: number = question.text.indexOf('?');
  let slicedQuestion: string;

  if (index !== -1) {
    slicedQuestion = question.text.substring(0, index + 1);
  } else {
    slicedQuestion = question.text;
  }

  const [answer, setAnswer] = useState<string>('');

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const isAnswerEmpty: boolean = answer.trim() === '';
  console.log(isAnswerEmpty);

  const content = (
    <div className="quiz-body--question">
      <section className="question--boosters">
        <div className="question--ellipse" />
        <div className="question--ellipse" />
        <div className="question--ellipse" />
      </section>

      <section className="question--start">
        <div className="question-count">
          <p>
            Question <span> {numQuestionIndex + 1} </span> out of {questions.length}
          </p>
        </div>

        <div className="question-text">
          <p>
            {slicedQuestion.length ? slicedQuestion : question.text}
          </p>
        </div>

        <div className="answer-box">
          <textarea value={answer} onChange={handleTextAreaChange} />
        </div>

        <div className="answer-submit">
          {numQuestionIndex + 1 === questions.length ? (
            <Button
              buttonText="Finish Quiz"
              className="answer-submit--button"
              to={`/result`}
              check={isAnswerEmpty}
            /> 
          ) : (
            <Button
              buttonText="Submit"
              className="answer-submit--button"
              to={`/quiz/${currQuizId}/question/${(numQuestionIndex + 1).toString()}`}
              check={isAnswerEmpty}
            />
          )}
        </div>
      </section>
    </div>
  );

  return content;
};

export default Question;
