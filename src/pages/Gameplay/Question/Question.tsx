import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import "./Question.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useCreateUserResponseMutation } from "../../../api/userApiSlice";
import { updateTimeLeft } from "../../../features/quiz/quizSlice";
import { Booster, useFetchAllBoostersQuery } from "../../../api/gameApiSlice";
import renderContent from "../../../features/content/renderContent";
import Questionbooster from "../../../components/QuestionBooster/Questionbooster";

const Question = () => {
  const { quizId, questionIndex } = useParams();
  const questions = useSelector((state: RootState) => state.quiz.questions);

  const currQuizId = useSelector((state: RootState) => state.quiz.quizId);

  const quiz = useSelector((state: RootState) => state.quiz);

  const currUserId = useSelector((state: RootState) => state.user.userId);

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

  // if (numQuestionIndex === 8) {
  //   const {data: streamData, isLoading, error} = useFetchUserResultStreamQuery([]);
  //   console.log(streamData);
  // }

  const [createUserResponse, { isLoading: isCreateUserResponseLoading, error: isCreateUserResponseError }] = useCreateUserResponseMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const quizTimeLimit = useSelector((state: RootState) => state.quiz.timelimit);
  const quizTimeLeft = useSelector((state: RootState) => state.quiz.timeLeft);

  const [timeLeft, setTimeLeft] = useState<number>(quizTimeLimit * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(interval);
          navigate(`/result`);
          return 0;
        }
      });
    }, 1000);
    dispatch(updateTimeLeft(timeLeft));
    return () => clearInterval(interval);
  }, [quizTimeLeft, navigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progressWidth = (timeLeft / (quizTimeLimit * 60)) * 100 + '%';

  const handleUserResponse = async () => {
    
    if (numQuestionIndex !== questions.length - 1) navigate(`/quiz/${currQuizId}/question/${(numQuestionIndex + 1).toString()}`);

    const timeTaken = (quizTimeLeft - timeLeft);

    dispatch(updateTimeLeft(timeLeft));

    const requestBody = {
      userId: currUserId!,
      quizId: currQuizId!,
      questionId: question.id,
      response: [answer],
      timeTaken: timeTaken,
    }

    try {
      const response = await createUserResponse(requestBody);
      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Response sent successfully:', response);
        setAnswer('');
        if (numQuestionIndex === questions.length - 1) {
          navigate('/result');
        }
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  } 

  const { data: boosterData, error: boosterError } = useFetchAllBoostersQuery();

  const [boosters, setBoosters] = useState<Booster[]>([]);

  useEffect(() => {
      if (boosterData) {
        console.log(boosterData.data);
        setBoosters(boosterData.data);
      }
    }, [boosterData]);

  const boosterItem = (
    boosters.map((booster, idx) => (
      <Questionbooster booster={booster} key={idx}/>
    ))
  )

  const content = (
    <>
      <div className="loading-bar">
        <div className="loading-bar-inner" style={{ width: progressWidth }}></div>
        <div className="time-left">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
      </div> 
      <div className="quiz-body--question">
        <section className="question--boosters">
          <div className="question--boosters_heading">
            <p>Active Boosters</p>
          </div>
          <div className="question--boosters_container">
            {boosterItem}
          </div>
          
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
                onClick={handleUserResponse}
                check={isAnswerEmpty}
              /> 
            ) : (
              <Button
                buttonText="Submit"
                className="answer-submit--button"
                onClick={handleUserResponse}
                check={isAnswerEmpty}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );

  return content;
};

export default Question;
