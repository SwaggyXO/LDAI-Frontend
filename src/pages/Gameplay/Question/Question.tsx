import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import "./Question.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ChangeEvent, useEffect, useState } from "react";
import { CreateUserResponseRequest, useCreateUserResponseMutation } from "../../../api/userApiSlice";
import { updateTimeLeft } from "../../../features/quiz/quizSlice";
import { Booster, InventoryItem, useBoosterUsedMutation, useFetchAllBoostersQuery, useFetchUserBoostersQuery } from "../../../api/gameApiSlice";
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

  let index: number = question.paraphrased.indexOf('?');
  let slicedQuestion: string;

  if (index !== -1) {
    slicedQuestion = question.paraphrased.substring(0, index + 1);
  } else {
    slicedQuestion = question.paraphrased;
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

  const activatedBoosters = useSelector((state: RootState) => state.quiz.activatedBoosters);

  const [timeLeft, setTimeLeft] = useState<number>(quizTimeLimit * 60);

  const [isFrozen, setIsFrozen] = useState<boolean>(false);

  const [keywords, setKeywords] = useState<string[]>([]);

  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);

  const [dotNavsLeft, setDotNavsLeft] = useState<number>(0);

  useEffect(() => {
    if (dotNavsLeft > 0) {
      setDotNavsLeft(dotNavsLeft - 1);
      handleDotResponse();
    }
  }, [dotNavsLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (!isFrozen && prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else if (prevTimeLeft <= 0){
          clearInterval(interval);
          navigate(`/result`);
          return 0;
        }
        return prevTimeLeft;
      });
    }, 1000);
    if (isSubmitClicked || quizTimeLeft < 50) {
      console.log("Time Left Before:", timeLeft, quizTimeLeft);
      dispatch(updateTimeLeft(timeLeft));
    } 
    console.log("Time Left After:", timeLeft, quizTimeLeft);
    return () => clearInterval(interval);
  }, [quizTimeLeft, navigate, isFrozen]);

  const [timeFreezeLeft, setTimeFreezeLeft] = useState<number>(0);

  const [useBoosterUsed] = useBoosterUsedMutation();

  const handleTimeFreeze = async () => {
    try {
      const response = await useBoosterUsed({ userId: currUserId!, quizId: currQuizId!, questionId: question.id, boosterName: 'Time Freeze'});
      console.log(currUserId, currQuizId, question.id, 'Time Freeze');

      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Time Freeze activated successfully:', response);
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
    
    setIsFrozen(true);
    setTimeFreezeLeft(60);
    const interval = setInterval(() => {
      setTimeFreezeLeft(prevTimeFreezeLeft => {
        if (prevTimeFreezeLeft > 0) {
          return prevTimeFreezeLeft - 1;
        } else {
          clearInterval(interval);
          setIsFrozen(false);
          return 0;
        }
      });
    }, 1000);
  };

  const handleDoubleXP = async () => {
    try {
      const response = await useBoosterUsed({ userId: currUserId!, quizId: currQuizId!, questionId: question.id, boosterName: 'Double XP'});

      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Double XP activated successfully:', response.data.data);
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  }

  const handleDoubleMarbles = async () => {
    try {
      const response = await useBoosterUsed({ userId: currUserId!, quizId: currQuizId!, questionId: question.id, boosterName: 'Double Marbles'});

      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Double Marbles activated successfully:', response.data.data);
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  }

  const handleFactHint = async () => {
    try {
      const response = await useBoosterUsed({ userId: currUserId!, quizId: currQuizId!, questionId: question.id, boosterName: 'Fact Hint'});
      console.log(currUserId, currQuizId, question.id, 'Fact Hint');

      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Fact Hint activated successfully:', response.data.data);
        setKeywords((response.data.data.boosterInfo as string[]).slice(0, 3));
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  }

  const handleDot = async () => {
    try {
      const response = await useBoosterUsed({ userId: currUserId!, quizId: currQuizId!, questionId: question.id, boosterName: 'Dot'});

      if ('error' in response) {
        console.error("An error occured", response);
      } else {
        console.log('Dot activated successfully:', response.data.data);
        setDotNavsLeft(2);
        console.log('Skipped 2 questions');
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  }

  const handleDotResponse = async () => {
    setIsFrozen(false);
    setKeywords([]);
    setTimeFreezeLeft(0);
    setIsSubmitClicked(true);
    
    if (numQuestionIndex !== questions.length - 1) navigate(`/quiz/${currQuizId}/question/${(numQuestionIndex + 1).toString()}`);

    const timeTaken = (quizTimeLeft - timeLeft);

    dispatch(updateTimeLeft(timeLeft));

    const requestBody: CreateUserResponseRequest = {
      userId: currUserId!,
      quizId: currQuizId!,
      questionId: question.id,
      response: [answer],
      timeTaken: timeTaken,
      score: 1,
    };

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

  useEffect(() => {
    if (activatedBoosters.length <= 2) {
      const booster = activatedBoosters[activatedBoosters.length - 1];
      switch (booster) {
        case 'Double XP':
          handleDoubleXP();
          break;
        case 'Double Marbles':
          handleDoubleMarbles();
          break;
        case 'Time Freeze':
          handleTimeFreeze();
          break;
        case 'Fact Hint':
          handleFactHint();
          break;
        case 'Dot':
          handleDot();
          break;
        default:
          break;
      }
    }
  }, [activatedBoosters]);


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progressWidth = (timeLeft / (quizTimeLimit * 60)) * 100 + '%';

  const handleUserResponse = async () => {

    setIsFrozen(false);
    setKeywords([]);
    setTimeFreezeLeft(0);
    setIsSubmitClicked(true);
    
    if (numQuestionIndex !== questions.length - 1) navigate(`/quiz/${currQuizId}/question/${(numQuestionIndex + 1).toString()}`);

    const timeTaken = (quizTimeLeft - timeLeft);

    console.log("Time left user res: ", timeLeft, quizTimeLeft);
    dispatch(updateTimeLeft(timeLeft));

    const requestBody: CreateUserResponseRequest = {
      userId: currUserId!,
      quizId: currQuizId!,
      questionId: question.id,
      response: [answer],
      timeTaken: timeTaken,
      score: 0,
    };

    try {
      const response = await createUserResponse(requestBody);
      console.log(requestBody, quizTimeLeft, timeLeft);
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

    setIsSubmitClicked(false);
  } 

  const tutorialBoosters = [
    {booster: {id: '1', name: 'Double XP', description: 'Doubles the amount of XP Gained from a quiz set.', price: 5000, tier: 'Common'}, quantity: 0},
    {booster: {id: '2', name: 'Double Marbles', description: 'Doubles the amount of Marbles Gained from a quiz set.', price: 5000, tier: 'Common'}, quantity: 0},
    {booster: {id: '3', name: 'Time Freeze', description: 'Freezes the timer for the current question for a while.', price: 8000, tier: 'Rare'}, quantity: 1},
    {booster: {id: '4', name: 'Fact Hint', description: 'Reveals some facts required for the answer, reduces the time by a little.', price: 15000, tier: 'Epic'}, quantity: 1},
    {booster: {id: '5', name: 'Dot', description: 'Automatically answers 2 questions in the set', price: 30000, tier: 'Legendary'}, quantity: 0}
  ]

  // const { data: boosterData, error: boosterError } = useFetchAllBoostersQuery();

  const { data: boosterData, error: boosterError, isLoading: isFetchUserBoosterLoading } = useFetchUserBoostersQuery(currUserId!);

  const [boosters, setBoosters] = useState<InventoryItem[]>([]);

  useEffect(() => {
      if (boosterData) {
        if (quiz.quizId !== '4402ae3a-7e22-409e-83c8-f0b868c034ca') {
          console.log("Non tutorial Quiz", boosterData.data);
          setBoosters(boosterData.data.inventory);
        } else {
          console.log("Tutorial Quiz");
          setBoosters(tutorialBoosters);
        }
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
      <div className="booster-backdrop"></div>
      <div className="booster-description"></div>
      <div className="quiz-body--question">
        {timeFreezeLeft !== 0 ? <p style={{width: "100%", textAlign: "center"}}>Time Freeze remaining: {timeFreezeLeft}</p> : null}
        <div className="question--boosters_heading">
          {activatedBoosters.length < 2 ? <p>Available Boosters</p> : <p>Exhausted Booster Usage</p>}
        </div>
        {activatedBoosters.length < 2 ? (
          <section className="question--boosters">
            <div className="question--boosters_container">
              {boosterItem}
            </div>
          </section>
        ) : null}
        {keywords.length ? <p className="keyword-header">Facts</p> : null}
        <div className="question--keywords_container">
          {keywords.length ? keywords.map((keyword, idx) => (
            <div className="question--keyword" key={idx}>
              {keyword}
            </div>
          )) : null
          }
        </div>
        <section className="question--start">
          <div className="question-count">
            <p>
              Question <span> {numQuestionIndex + 1} </span> out of {questions.length}
            </p>
          </div>

          <div className="question-text">
            <p>
              {slicedQuestion.length ? slicedQuestion : question.paraphrased}
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
