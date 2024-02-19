import Button from "../../../../../components/Main/buttons/Button";
import "./Question.scss";

const Question = () => {
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
            Question <span> X </span> out of Y
          </p>
        </div>

        <div className="question-text">
          <p>
            How was the history of nationalism in Britain unlike the rest of
            Europe?
          </p>
        </div>

        <div className="answer-box">
          <textarea />
        </div>

        <div className="answer-submit">
          <Button
            buttonText="Submit"
            className="answer-submit--button"
            to="/quiz/result"
          />
        </div>
      </section>
    </div>
  );

  return content;
};

export default Question;
