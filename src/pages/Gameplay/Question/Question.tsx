import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import "./Question.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  CreateUserResponseRequest,
  useCreateUserResponseMutation,
  useOcrUploadMutation,
} from "../../../api/userApiSlice";
import { updateTimeLeft } from "../../../features/quiz/quizSlice";
import {
  Booster,
  InventoryItem,
  useBoosterUsedMutation,
  useFetchAllBoostersQuery,
  useFetchUserBoostersQuery,
} from "../../../api/gameApiSlice";
import renderContent from "../../../features/content/renderContent";
import Questionbooster from "../../../components/QuestionBooster/Questionbooster";
import ThreeQuestion from "../../../containers/ThreeQuestion/ThreeQuestion";
import ThreeDComponent, {
  MemoizedThreeDComponent,
} from "../../../components/ThreeDComponent/ThreeDComponent";
import React from "react";
import LoadingBar, { MemoizedLoadingBar } from "./LoadingBar";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faCamera, faVideoSlash, faVideo, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import ocr from '../../../../public/assets/Icons/ocr.png';
import typing from '../../../../public/assets/Icons/typing.png';
import Tile from "../../../components/Tiles/Tile";

const Question = () => {
  const { quizId, questionIndex } = useParams();
  const questions = useSelector((state: RootState) => state.quiz.questions);

  const currQuizId = useSelector((state: RootState) => state.quiz.quizId);

  const quiz = useSelector((state: RootState) => state.quiz);

  const currUserId = useSelector((state: RootState) => state.user.userId);

  const numQuestionIndex = parseInt(questionIndex!);

  const question = questions[numQuestionIndex];

  const model = question.model;

  const quizType = quiz.quizType;

  let index: number = question.paraphrased.indexOf("?");
  let slicedQuestion: string;

  if (index !== -1) {
    slicedQuestion = question.paraphrased.substring(0, index + 1);
  } else {
    slicedQuestion = question.paraphrased;
  }

  const answerRef = useRef<HTMLTextAreaElement>(null);
  const [answer, setAnswer] = useState<string>("");
  const [isTextAreaEmpty, setIsTextAreaEmpty] = useState(true);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = answerRef.current?.value.trim();
    setIsTextAreaEmpty(!text);
  };

  const handleThreeDTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = answerRef.current?.value.trim();
    setIsTextAreaEmpty(!text);
  };

  const isAnswerEmpty: boolean = isTextAreaEmpty;

  // if (numQuestionIndex === 8) {
  //   const {data: streamData, isLoading, error} = useFetchUserResultStreamQuery([]);
  //   console.log(streamData);
  // }

  const [
    createUserResponse,
    {
      isLoading: isCreateUserResponseLoading,
      error: isCreateUserResponseError,
    },
  ] = useCreateUserResponseMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const quizTimeLimit = useSelector((state: RootState) => state.quiz.timelimit);
  const quizTimeLeft = useSelector((state: RootState) => state.quiz.timeLeft);

  const activatedBoosters = useSelector(
    (state: RootState) => state.quiz.activatedBoosters
  );

  const [usedBoosters, setUsedBoosters] = useState<string[]>([]);

  const [timeLeft, setTimeLeft] = useState<number>(quizTimeLimit * 60);

  const [timeTaken, setTimeTaken] = useState<number>(0);

  const [isFrozen, setIsFrozen] = useState<boolean>(false);

  const [keywords, setKeywords] = useState<string[]>([]);

  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);

  const [dotNavsLeft, setDotNavsLeft] = useState<number>(0);

  const [mode, setMode] = useState<'normal' | 'ocr'>('normal');

  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  useEffect(() => {
    if (dotNavsLeft > 0) {
      setDotNavsLeft(dotNavsLeft - 1);
    }
  }, [dotNavsLeft]);

  // Timer

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       if (!isFrozen && prevTimeLeft > 0) {
  //         return prevTimeLeft - 1;
  //       } else if (prevTimeLeft <= 0) {
  //         clearInterval(interval);
  //         navigate(`/result`);
  //         return 0;
  //       }
  //       return prevTimeLeft;
  //     });
  //   }, 1000);
  //   if (isSubmitClicked || quizTimeLeft < 50) {
  //     console.log("Time Left Before:", timeLeft, quizTimeLeft);
  //     dispatch(updateTimeLeft(timeLeft));
  //   }
  //   console.log("Time Left After:", timeLeft, quizTimeLeft);
  //   return () => clearInterval(interval);
  // }, [quizTimeLeft, navigate, isFrozen]);

  const [timeFreezeLeft, setTimeFreezeLeft] = useState<number>(0);

  const [useBoosterUsed] = useBoosterUsedMutation();

  const handleTimeFreeze = async () => {
    try {
      const response = await useBoosterUsed({
        userId: currUserId!,
        quizId: currQuizId!,
        questionId: question.id,
        boosterName: "Time Freeze",
      });
      console.log(currUserId, currQuizId, question.id, "Time Freeze");

      if ("error" in response) {
        console.error("An error occured", response);
      } else {
        console.log("Time Freeze activated successfully:", response);
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }

    setIsFrozen(true);
    setTimeFreezeLeft(60);
    const interval = setInterval(() => {
      setTimeFreezeLeft((prevTimeFreezeLeft) => {
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
      const response = await useBoosterUsed({
        userId: currUserId!,
        quizId: currQuizId!,
        questionId: question.id,
        boosterName: "Double XP",
      });

      if ("error" in response) {
        console.error("An error occured", response);
      } else {
        console.log("Double XP activated successfully:", response.data.data);
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  };

  const handleDoubleMarbles = async () => {
    try {
      const response = await useBoosterUsed({
        userId: currUserId!,
        quizId: currQuizId!,
        questionId: question.id,
        boosterName: "Double Marbles",
      });

      if ("error" in response) {
        console.error("An error occured", response);
      } else {
        console.log(
          "Double Marbles activated successfully:",
          response.data.data
        );
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  };

  const handleFactHint = async () => {
    try {
      const response = await useBoosterUsed({
        userId: currUserId!,
        quizId: currQuizId!,
        questionId: question.id,
        boosterName: "Fact Hint",
      });
      console.log(currUserId, currQuizId, question.id, "Fact Hint");

      if ("error" in response) {
        console.error("An error occured", response);
      } else {
        console.log("Fact Hint activated successfully:", response.data.data);
        setKeywords((response.data.data.boosterInfo as string[]).slice(0, 3));
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  };

  const handleDot = async () => {
    try {
      const response = await useBoosterUsed({
        userId: currUserId!,
        quizId: currQuizId!,
        questionId: question.id,
        boosterName: "Dot",
      });

      if ("error" in response) {
        console.error("An error occured", response);
      } else {
        console.log("Dot activated successfully:", response.data.data);
        setDotNavsLeft(2);
        console.log("Skipped 2 questions");
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  };

  const handleDotResponse = async (timeTaken: number) => {
    setIsFrozen(false);
    setKeywords([]);
    setTimeFreezeLeft(0);

    if (numQuestionIndex !== questions.length - 1)
      navigate(
        `/quiz/${currQuizId}/question/${(numQuestionIndex + 1).toString()}`
      );

    // const timeTaken = quizTimeLeft - timeLeft;

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
      if ("error" in response) {
        console.error("An error occured", response);
      } else {
        console.log("Response sent successfully:", response);
        setAnswer("");
        if (numQuestionIndex === questions.length - 1) {
          navigate("/result");
        }
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (activatedBoosters.length <= 2) {
      const booster = activatedBoosters[activatedBoosters.length - 1];
      if (!usedBoosters.includes(booster)) {
        switch (booster) {
          case "Double XP":
            handleDoubleXP();
            break;
          case "Double Marbles":
            handleDoubleMarbles();
            break;
          case "Time Freeze":
            handleTimeFreeze();
            break;
          case "Fact Hint":
            handleFactHint();
            break;
          case "Dot":
            handleDot();
            break;
          default:
            break;
        }
        setUsedBoosters((prevBoosters) => [...prevBoosters, booster])
      }
    }
  }, [activatedBoosters, usedBoosters]);

  const handleTimeLeftChange = async (newTimeLeft: number) => {
    setTimeTaken(timeLeft - newTimeLeft);
    setTimeLeft(newTimeLeft);

    // console.log("Time Left Change:", newTimeLeft, quizTimeLeft);
    if (isSubmitClicked) await handleUserResponse(timeLeft - newTimeLeft);
    if (dotNavsLeft > 0) await handleDotResponse(timeLeft - newTimeLeft);
    setIsFrozen(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progressWidth = (timeLeft / (quizTimeLimit * 60)) * 100 + "%";

  const onSubmitClick = async () => {
    if (quizType === 'ONE TAP' && selectedTile) {
      setAnswer(selectedTile);
      setSelectedTile(null);
      setSelected(true);
    } else {
      const text = answerRef.current?.value.trim();
      if (text) {
        setAnswer(text);
        if (answerRef.current) {
          answerRef.current.value = "";
        }
        setIsTextAreaEmpty(true);
      }
    }
    setIsSubmitClicked(true);
  };

  const handleUserResponse = async (timeTaken: number) => {
    setKeywords([]);
    setTimeFreezeLeft(0);
    setIsSubmitClicked(false);

    if (numQuestionIndex !== questions.length - 1)
      navigate(
        `/quiz/${currQuizId}/question/${(numQuestionIndex + 1).toString()}`
      );

    // const timeTaken = quizTimeLeft - timeLeft;

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
      if ("error" in response) {
        console.error("An error occured", response);
      } else {
        console.log("Response sent successfully:", response);
        setAnswer("");
        if (numQuestionIndex === questions.length - 1) {
          navigate("/result");
        }
      }
    } catch (err) {
      console.error("An unexpected error occurred");
    }
  };

  const tutorialBoosters = [
    {
      booster: {
        id: "1",
        name: "Double XP",
        description: "Doubles the amount of XP Gained from a quiz set.",
        price: 5000,
        tier: "Common",
      },
      quantity: 0,
    },
    {
      booster: {
        id: "2",
        name: "Double Marbles",
        description: "Doubles the amount of Marbles Gained from a quiz set.",
        price: 5000,
        tier: "Common",
      },
      quantity: 0,
    },
    {
      booster: {
        id: "3",
        name: "Time Freeze",
        description: "Freezes the timer for the current question for a while.",
        price: 8000,
        tier: "Rare",
      },
      quantity: 1,
    },
    {
      booster: {
        id: "4",
        name: "Fact Hint",
        description:
          "Reveals some facts required for the answer, reduces the time by a little.",
        price: 15000,
        tier: "Epic",
      },
      quantity: 1,
    },
    {
      booster: {
        id: "5",
        name: "Dot",
        description: "Automatically answers 2 questions in the set",
        price: 30000,
        tier: "Legendary",
      },
      quantity: 0,
    },
  ];

  // const { data: boosterData, error: boosterError } = useFetchAllBoostersQuery();

  const {
    data: boosterData,
    error: boosterError,
    isLoading: isFetchUserBoosterLoading,
    refetch: refetchUserBoosters,
  } = useFetchUserBoostersQuery(currUserId!);

  const [boosters, setBoosters] = useState<InventoryItem[]>([]);

  useEffect(() => {
    if (boosterData) {
      if (quiz.quizId !== "248bdd7c-b1b6-4aae-a9eb-c644694d30ee") {
        console.log("Non tutorial Quiz", boosterData.data);
        setBoosters(boosterData.data.inventory);
      } else {
        console.log("Tutorial Quiz");
        setBoosters(tutorialBoosters);
      }
    }
  }, [boosterData]);

  const updateBoosterQuantity = (boosterName: string, newQuantity: number) => {
    setBoosters((prevBoosters) =>
      prevBoosters.map((booster) =>
        booster.booster.name === boosterName ? { ...booster, quantity: newQuantity } : booster
      )
    );
  };

  const [showExhaustedMessage, setShowExhaustedMessage] = useState(false);

  useEffect(() => {
    if (activatedBoosters.length >= 2) {
      setTimeout(() => {
        setShowExhaustedMessage(true);
      }, 2500);
    }
  }, [activatedBoosters]);

  const boosterItem = boosters
    .filter(booster => quizType !== 'ONE TAP' || (booster.booster.name !== 'Fact Hint'))  
    .map((booster, idx) => (
      <Questionbooster booster={booster} key={idx} updateQuantity={updateBoosterQuantity} />
  ));

  const [ocrUpload, { isLoading: isOcrUploadLoading, error: isOcrUploadError }] = useOcrUploadMutation();

  const [ocrText, setOcrText] = useState<string>("");

  const capture = () => {
    if (isWebcamOpen) {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            // sendImageToServer(imageSrc);
            setCapturedImage(imageSrc);
            setIsWebcamOpen(!isWebcamOpen);
        }
    } else {
        setIsWebcamOpen(!isWebcamOpen);
    }
  };

  const reset = () => {
      setCapturedImage(null);
      setIsWebcamOpen(true);
  };

  const toggleFacingMode = () => {
      setFacingMode((prevFacingMode) => (prevFacingMode === 'user' ? 'environment' : 'user'));
  };

  const sendForOCR = async (imageSrc: string) => {
    const [header, imageData] = imageSrc.split(',');
    const mimeType = imageSrc.split(';')[0].split(':')[1];
    // console.log(imageSrc, mimeType);
    try {
      const response = await ocrUpload({
        image: imageData,
        type: mimeType,
      });
      if ('error' in response) {
        console.log("An error occured");
      } else {
        console.log('Image sent successfully:', response);
        setMode('normal');
        setOcrText(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.value = ocrText;
    }
  }, [ocrText]);

  const answerContent = mode === 'normal' ? (
    <>
      <div className="answer-box">
        <textarea
          ref={answerRef}
          onChange={handleTextAreaChange}
          placeholder="Type your answer..."
        />
      </div>
      {/* <div className="answer-box">
        <textarea value={answer} onChange={handleTextAreaChange} placeholder="Type your answer..."/>
      </div> */}

      <div className="answer-submit">
        {numQuestionIndex + 1 === questions.length ? (
          <Button
            buttonText="Finish Quiz"
            className="answer-submit--button"
            onClick={onSubmitClick}
            check={isAnswerEmpty}
          />
        ) : (
          <Button
            buttonText="Submit"
            className="answer-submit--button"
            onClick={onSubmitClick}
            check={isAnswerEmpty}
          />
        )}
        <button onClick={() => setMode('ocr')} className="square-button">
          <img src={ocr} alt="ocr" />
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="webcam-container">
        {isWebcamOpen && !capturedImage && (
          <div className="webcam-wrapper">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode }}
                className={`webcam ${facingMode === 'user' ? 'mirrored' : ''}`}
            />
            <div className="overlay">
                <p>PLEASE KEEP <b>YOUR ANSWER IN FOCUS</b>.</p>
            </div>
            <div className="overlay-b">
                <button onClick={toggleFacingMode} className="overlay-button">
                    <FontAwesomeIcon icon={faSync} />
                </button>
                <p>Flip Cam</p>
            </div>
          </div>
        )}
        {capturedImage && (
          <>
            <img src={capturedImage} alt="Captured" className="webcam" />
            <p>Don't worry, you will get a chance to edit your answer if there are any errors in the result.</p>
          </>
        )}
      </div>
      {/* <div className="answer-box">
        <textarea value={answer} onChange={handleTextAreaChange} placeholder="Type your answer..."/>
      </div> */}

      <div className="answer-submit">
        <button onClick={reset} className="square-button" disabled={capturedImage === null}>
          <FontAwesomeIcon icon={faSyncAlt} color='white' />
        </button>
        {capturedImage ? (
          <Button
            buttonText="Send for OCR"
            className="answer-submit--button"
            onClick={() => sendForOCR(capturedImage)}
          />
        ) : (
          <Button
            buttonText="Capture"
            className="answer-submit--button"
            onClick={capture}
          />
        )}
        <button onClick={() => setMode('normal')} className="square-button">
          <img src={typing} alt="typing" />
        </button>
      </div>
    </>
  );

  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [selected, setSelected] = useState<boolean>(true);
  const [option, setOption] = useState<string | null>(null);

  const handleTileClick = (option: string) => {
    setSelectedTile(option); 
    setSelected(false);
    setOption(option);
  }

  const mcqContent = (
    <>
      <div className="mcq-section">
        <div className="mcq-options">
          {question.options.map((option, idx) => (
            <Tile key={idx} option={option} onClick={() => handleTileClick(option)} selected={selectedTile === option} />
          ))}
        </div>
      </div>

      <div className="answer-submit">
        {numQuestionIndex + 1 === questions.length ? (
          <Button
            buttonText="Finish Quiz"
            className="answer-submit--button"
            onClick={onSubmitClick}
            check={selected}
          />
        ) : (
          <Button
            buttonText="Submit"
            className="answer-submit--button"
            onClick={onSubmitClick}
            check={selected}
          />
        )}
      </div>
    </>
  )

  const questionContent = useMemo(
    () => (
      <div className="question-header">
        <div className="info-box">
          <div className="info-box--inside">
            <p className="info-box--q">Answer according to the annotations.</p>
            <div className="info-box--text">
              <textarea
                ref={answerRef}
                onChange={handleThreeDTextAreaChange}
                // style={{ height: height }}
                placeholder="Type your answer..."
              />
              {/* <textarea
                value={answer}
                onChange={handleThreeDTextAreaChange}
                style={{ height: height }}
                maxLength={wordLimit}
              /> */}
            </div>
          </div>
        </div>
      </div>
    ),
    [answer, handleThreeDTextAreaChange]
  );

  const oneTapContent = (
    <>
      <div className="booster-backdrop"></div>
      <div className="booster-description"></div>
      <div className="quiz-body--question">
        {timeFreezeLeft !== 0 ? (
          <p style={{ width: "100%", textAlign: "center" }}>
            Time Freeze remaining: {timeFreezeLeft}
          </p>
        ) : null}
        <div className="question--boosters_heading">
          {activatedBoosters.length < 2 ? (
            <p>Available Boosters</p>
          ) : (
            <p>Exhausted Booster Usage</p>
          )}
        </div>
        {activatedBoosters.length < 2 || !showExhaustedMessage ? (
          <section className="question--boosters">
            <div className="question--boosters_container">{boosterItem}</div>
          </section>
        ) : null}
        {keywords.length ? <p className="keyword-header">Facts</p> : null}
        <div className="question--keywords_container">
          {keywords.length
            ? keywords.map((keyword, idx) => (
                <div className="question--keyword" key={idx}>
                  {keyword}
                </div>
              ))
            : null}
        </div>
        <section className="question--start">
          <div className="question-count">
            <p>
              Question <span> {numQuestionIndex + 1} </span> out of{" "}
              {questions.length}
            </p>
          </div>

          <div className="question-text">
            <p>
              {slicedQuestion.length ? slicedQuestion : question.paraphrased}
            </p>
          </div>

          {mcqContent}
        </section>
      </div>
    </>
  )

  const standardContent = (
    <>
      {/* {loadingBar} */}
      <div className="booster-backdrop"></div>
      <div className="booster-description"></div>
      <div className="quiz-body--question">
        {timeFreezeLeft !== 0 ? (
          <p style={{ width: "100%", textAlign: "center" }}>
            Time Freeze remaining: {timeFreezeLeft}
          </p>
        ) : null}
        <div className="question--boosters_heading">
          {activatedBoosters.length < 2 ? (
            <p>Available Boosters</p>
          ) : (
            <p>Exhausted Booster Usage</p>
          )}
        </div>
        {activatedBoosters.length < 2 || !showExhaustedMessage ? (
          <section className="question--boosters">
            <div className="question--boosters_container">{boosterItem}</div>
          </section>
        ) : null}
        {keywords.length ? <p className="keyword-header">Facts</p> : null}
        <div className="question--keywords_container">
          {keywords.length
            ? keywords.map((keyword, idx) => (
                <div className="question--keyword" key={idx}>
                  {keyword}
                </div>
              ))
            : null}
        </div>
        <section className="question--start">
          <div className="question-count">
            <p>
              Question <span> {numQuestionIndex + 1} </span> out of{" "}
              {questions.length}
            </p>
          </div>

          <div className="question-text">
            <p>
              {slicedQuestion.length ? slicedQuestion : question.paraphrased}
            </p>
          </div>

          {answerContent}
        </section>
      </div>
    </>
  );

  const threeDStandardContent = (
    <>
      <div className="booster-backdrop"></div>
      <div className="booster-description"></div>
      <div className="div-full">
        {/* {loadingBar} */}
        {timeFreezeLeft !== 0 ? (
          <p style={{ width: "100%", textAlign: "center" }}>
            Time Freeze remaining: {timeFreezeLeft}
          </p>
        ) : null}
        <div className="question--boosters_heading">
          {activatedBoosters.length < 2 ? (
            <p>Available Boosters</p>
          ) : (
            <p>Exhausted Booster Usage</p>
          )}
        </div>
        {activatedBoosters.length < 2 || !showExhaustedMessage ? (
          <section className="question--boosters">
            <div className="question--boosters_container">{boosterItem}</div>
          </section>
        ) : null}
        {keywords.length ? <p className="keyword-header">Facts</p> : null}
        <div className="question--keywords_container">
          {keywords.length
            ? keywords.map((keyword, idx) => (
                <div className="question--keyword" key={idx}>
                  {keyword}
                </div>
              ))
            : null}
        </div>
        {questionContent}
        {question.annotations && (
          <MemoizedThreeDComponent
            annotations={[
              {
                question: question.paraphrased,
                lookAt: question.annotations[0].lookAt,
                cameraPos: question.annotations[0].cameraPos,
              },
            ]}
            name={question.model!}
            scale={question.scale!}
          />
        )}
        <div className="threed-answer-submit">
          {numQuestionIndex + 1 === questions.length ? (
            <Button
              buttonText="Finish Quiz"
              className="threedanswer-submit--button"
              onClick={onSubmitClick}
              check={isAnswerEmpty}
            />
          ) : (
            <Button
              buttonText="Submit"
              className="threedanswer-submit--button"
              onClick={onSubmitClick}
              check={isAnswerEmpty}
            />
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* <Timer
        isFrozen={isFrozen}
        navigate={navigate}
        quizTimeLeft={quizTimeLeft}
        updateTimeLeft={updateTimeLeft}
        quizTimeLimit={quizTimeLimit}
        isSubmitClicked={isSubmitClicked}
        timeLeft={timeLeft}
        onTimeLeftChange={handleTimeLeftChange}
      /> */}
      <MemoizedLoadingBar
        progressWidth={progressWidth}
        minutes={minutes}
        seconds={seconds}
        isFrozen={isFrozen}
        isSubmitClicked={isSubmitClicked}
        onTimeLeftChange={handleTimeLeftChange}
        dotNavsLeft={dotNavsLeft}
        ocrLoading={isOcrUploadLoading}
      />
      {quizType === 'STANDARD' 
        ? model 
          ? threeDStandardContent : standardContent
        : oneTapContent
      }
    </>
  );
};

export default Question;
