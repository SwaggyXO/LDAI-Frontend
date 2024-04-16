import './home.scss'

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react"

import TextContainer from "../../containers/TextContainer/TextContainer";
import Button from "../../components/buttons/Button";
import QuizExcerpt from "../../components/QuizExcerpt/QuizExcerpt";
import { SampleQuizzes } from "./SampleQuizzes";
import Intro from "../Gameplay/Start/Intro";
import Modal from "../../components/Modal/Modal";

import { RootState } from "../../app/store";
import renderContent from "../../features/content/renderContent";
import { useCreateUserMutation } from "../../api/userApiSlice";
import { setUser } from "../../features/user/userSlice";
import { useFetchLatestQuizzesQuery, useFetchQuizByIdQuery } from "../../api/quizApiSlice";
import { updateQuizState } from "../../features/quiz/quizSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Loader from '../Loader/Loader';
import { Currency, usePurchaseBoosterMutation } from '../../api/gameApiSlice';
import { getUserCookie } from '../../features/user/userCookieHandler';

const Home = () => {

  const { user, isAuthenticated, error, isLoading } = useAuth0();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector((state: RootState) => state.user);

  const [ timedGreeting, setTimedGreeting ] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);

  
  const close = () => {
    setModalOpen(false);
  }

  const open = () => {
    setModalOpen(true);
  }

  const { data: quizzesData, isLoading: isFetchLatestLoading, error: fetchLatestError} = useFetchLatestQuizzesQuery({subject: `${currUser!.subject}`, limit: 10}, { skip: !currUser.subject });

  const [purchaseBooster] = usePurchaseBoosterMutation();

  const [createUser, { isLoading: isCreateUserLoading, error: isCreateUserError }] = useCreateUserMutation();

  useEffect(() => {
    const getGreeting = () => {
      const currTime = new Date().getHours();
      let greeting = '';

      (currTime >= 5 && currTime < 12) ? 
        greeting = 'Good Morning' : (currTime >= 12 && currTime < 18) ?
          greeting = 'Good Afternoon' : greeting = 'Good Evening';

      setTimedGreeting(greeting);
    };

    getGreeting();
  }, []);

  useEffect(() => {
    const createNewUser = async () => {
      const ciamId = user?.sub!;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      try {
        const response = await createUser({ ciamId, timeZone });
        if ('error' in response) {
          console.error("An error occured", response);
        } else {
          console.log('User added successfully:', response);
          dispatch(setUser(response.data.data.user));
          setIsUserCreated(true);

          if (response.data.data.user.isNew && response.data.data.user.grade === null) {
            console.log("Navigating to grade:", currUser)
            navigate('/grade');    
          } else if (response.data.data.user.isNew) {
            open();  
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred");
      }
    }

    createNewUser();
  }, [user])

  const quizId = "0c8357c9-0454-4c58-addd-5f713eb432e2";
  const smallQuizId = "4ef4ae1f-98a8-4329-b28c-e29d037f5203"
  const { data: quizData, error: fetchQuizError, isLoading: isFetchQuizLoading } = useFetchQuizByIdQuery(smallQuizId, { skip: !isUserCreated || !currUser.isNew });

  useEffect(() => {
    if (quizData) {
      dispatch(updateQuizState(quizData.data));
      console.log("Quiz fetched successfully", quizData);
    }
  }, [quizData]);

  const quizzes = SampleQuizzes;

  const quizIntroModalContent = quizData && <Intro quiz={quizData.data} />

  const buttonElements = (
    <p>Play &nbsp;{<FontAwesomeIcon icon={faPlay} color="black"/>}</p>
  )

  const textContainerElements = (
    <>
      <p>Welcome</p>
      <p>Participate in Quizzes, <br />earn Marbles and unlock items with experience</p>
      {currUser.grade === null ? <Button buttonText={buttonElements} className="home-play_button" to="/grade" /> : <Button buttonText={buttonElements} className="home-play_button" to="/subject" />}
    </>
  )

  const content = (
    <>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={close} classname='quiz-intro-modal'>
          {quizIntroModalContent!}
        </Modal>
      )}
      <div className="intro-half">
        <div className="intro-half_header">
          <div className="intro-half_header--text">
            <p>{timedGreeting}!</p>
            <p>{user?.name}</p>
          </div>
          <div className="intro-half_header--chest">
            {renderContent('app', 'Chest', 'closed')}
          </div>
        </div>
        <TextContainer elements={textContainerElements} className="home" />
      </div>
      <div className="new-half">
        <div className="new-half_header">
          <p>New Quizzes</p>
        </div>
        <div className="new-half_quizzes">
          {quizzesData?.data.map((quiz, idx) => (
            <QuizExcerpt key={idx} quiz={quiz} />
          ))}
        </div>
      </div>
      <div className="subject-half"></div>
    </>
  )

  return (
    <>
      {isLoading || isCreateUserLoading && <Loader />}
      {error && <p style={{height: "100vh"}}>An Error Occured</p>}
      {!isLoading && isAuthenticated && !isCreateUserLoading && !error && content}
    </>
  )
}

export default Home