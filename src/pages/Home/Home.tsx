import "./home.scss";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

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
import {
  useFetchLatestQuizzesQuery,
  useFetchQuizByIdQuery,
} from "../../api/quizApiSlice";
import { resetQuizState, updateQuizState } from "../../features/quiz/quizSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";
import {
  Currency,
  useAddUserCurrencyMutation,
  useFetchUserBoostersQuery,
  usePurchaseBoosterMutation,
} from "../../api/gameApiSlice";
import { getUserCookie } from "../../features/user/userCookieHandler";

import Reward from "../../../public/assets/js_files/Reward.json";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import {
  getChestCookie,
  setChestCookie,
} from "../../features/content/chestCookieHandler";

const Home = () => {
  const { user, isAuthenticated, error, isLoading } = useAuth0();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector((state: RootState) => state.user);

  const cookieUser = getUserCookie();

  const [timedGreeting, setTimedGreeting] = useState<string>("");
  const [reward, setReward] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [isChestClicked, setIsChestClicked] = useState(false);

  const chestReward = getChestCookie();
  const chestRef = useRef(null);

  useLayoutEffect(() => {
    let ctx: gsap.Context;
    if (chestRef.current) {
      if (chestReward) {
        ctx = gsap.context(() => {
          gsap.to(chestRef.current, {
            y: "-10px",
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
            duration: 0.5,
          });
        });
      } else {
        ctx = gsap.context(() => {
          gsap.to(chestRef.current, {
            rotation: 10,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
            duration: 0.2,
          });
        });
      }
    }
    return () => ctx.revert();
  }, [chestReward]);

  if (!chestReward && !isChestClicked) {
    const ctx = gsap.context(() => {
      gsap.to(chestRef.current, {
        rotation: 10,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        duration: 0.2,
      });
    });
  }

  const rewardClose = () => {
    setRewardModalOpen(false);
  };

  const rewardOpen = () => {
    setRewardModalOpen(true);
  };

  const close = () => {
    setModalOpen(false);
  };

  const open = () => {
    setModalOpen(true);
  };

  const {
    data: boosterData,
    error: boosterError,
    isLoading: isFetchUserBoosterLoading,
  } = useFetchUserBoostersQuery(
    (currUser && currUser.userId!) || (cookieUser! && cookieUser.userId!),
    { skip: !currUser.userId && !cookieUser }
  );

  const [addUserCurrency, { isLoading: isAddUserCurrencyLoading }] =
    useAddUserCurrencyMutation();
  const [purchaseBooster, { isLoading: isPurchaseLoading }] =
    usePurchaseBoosterMutation();

  const {
    data: quizzesData,
    isLoading: isFetchLatestLoading,
    error: fetchLatestError,
  } = useFetchLatestQuizzesQuery(
    { subject: `${currUser!.subject}`, limit: 10 },
    { skip: !currUser.subject }
  );

  const [
    createUser,
    { isLoading: isCreateUserLoading, error: isCreateUserError },
  ] = useCreateUserMutation();

  useEffect(() => {
    const getGreeting = () => {
      const currTime = new Date().getHours();
      let greeting = "";

      currTime >= 5 && currTime < 12
        ? (greeting = "Good Morning")
        : currTime >= 12 && currTime < 18
        ? (greeting = "Good Afternoon")
        : (greeting = "Good Evening");

      setTimedGreeting(greeting);
    };

    getGreeting();
    dispatch(resetQuizState());
  }, []);

  useEffect(() => {
    const createNewUser = async () => {
      const ciamId = user?.sub!;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      try {
        const response = await createUser({ ciamId, timeZone });
        if ("error" in response) {
          console.error("An error occured", response);
        } else {
          console.log("User added successfully:", response);
          dispatch(setUser(response.data.data.user));
          setIsUserCreated(true);

          if (
            response.data.data.user.isNew &&
            response.data.data.user.grade === null
          ) {
            console.log("Navigating to grade:", currUser);
            navigate("/grade");
          } else if (response.data.data.user.isNew) {
            open();
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred");
      }
    };

    createNewUser();
  }, [user]);

  const quizId = "	9735d635-cf6e-47b4-884c-8a3254524360";
  const smallQuizId = "4402ae3a-7e22-409e-83c8-f0b868c034ca";
  const {
    data: quizData,
    error: fetchQuizError,
    isLoading: isFetchQuizLoading,
  } = useFetchQuizByIdQuery(smallQuizId, {
    skip: !isUserCreated || !currUser.isNew,
  });

  useEffect(() => {
    if (quizData) {
      dispatch(resetQuizState());
      dispatch(updateQuizState(quizData.data));
      console.log("Quiz fetched successfully", quizData);
    }
  }, [quizData]);

  const randomizePrize = () => {
    const commonPrizes = ["Double Marbles", "Double XP", "2K Marbles"];
    const rarePrizes = ["Time Freeze"];
    const epicPrizes = ["Fact Hint"];

    const randomNumber = Math.random();

    let prizeType;
    if (randomNumber < 0.1) {
      prizeType = "epic";
    } else if (randomNumber < 0.3) {
      prizeType = "rare";
    } else {
      prizeType = "common";
    }

    let prizePool: string[];
    switch (prizeType) {
      case "common":
        prizePool = commonPrizes;
        break;
      case "rare":
        prizePool = rarePrizes;
        break;
      case "epic":
        prizePool = epicPrizes;
        break;
    }

    const prize = prizePool![Math.floor(Math.random() * prizePool!.length)];

    return prize;
  };

  const handleChestClick = async () => {
    setIsChestClicked(true);
    const prize = randomizePrize();
    gsap.killTweensOf(chestRef.current);
    gsap.to(chestRef.current, {
      rotation: 20,
      repeat: 3,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.2,
      onComplete: rewardOpen,
    });
    setChestCookie(prize);
    setReward(prize as any);

    if (prize === "2K Marbles") {
      try {
        const response = await addUserCurrency({
          userId: currUser.userId!,
          currency: [{ name: "marbles", amount: 2000 }],
        });
        if ("error" in response) {
          console.error("An error occured", response);
        } else {
          console.log("Currency added successfully:", response);
          dispatch(setUser(response.data.data));
          if (response) console.log(response);
        }
      } catch (error) {
        console.error("An unexpected error occurred");
      }
    } else {
      try {
        const booster = boosterData?.data.inventory.filter(
          (booster) => booster.booster.name === prize
        );
        const quantity = booster && booster[0]?.quantity;
        if (quantity === 0 || (quantity && quantity < 2)) {
          const response = await purchaseBooster({
            userId: currUser.userId!,
            booster: [{ name: prize, amount: 1 }],
          });
          if ("error" in response) {
            console.error("An error occured", response);
          } else {
            console.log("Booster purchased successfully:", response);
            if (response) console.log(response);
          }
        } else {
          console.log(quantity);
          console.log("Maxed out inventory");
        }
      } catch (error) {
        console.error("An unexpected error occurred");
      }
    }
  };

  const quizzes = SampleQuizzes;

  const quizIntroModalContent = quizData && <Intro quiz={quizData.data} />;

  const rewardModalContent = (
    <div className="reward">
      <div className="reward-header">
        <p>Congratulations on your reward!</p>
      </div>
      <div className="reward-content">
        <p>{reward}</p>
        {reward !== "2K Marbles"
          ? renderContent("boosters", `${reward}`, `${reward}`)
          : renderContent("app", "Marble", "Marble")}
        <p className="warning">
          Above items won't be added in case of <span>MAX</span> inventory
        </p>
      </div>
    </div>
  );

  const buttonElements = (
    <p>Play &nbsp;{<FontAwesomeIcon icon={faPlay} color="black" />}</p>
  );

  const textContainerElements = (
    <>
      <p>Welcome</p>
      <p>
        Participate in Quizzes, <br />
        earn Marbles and unlock items with experience
      </p>
      {currUser.grade === null ? (
        <Button
          buttonText={buttonElements}
          className="home-play_button"
          to="/grade"
        />
      ) : (
        <Button
          buttonText={buttonElements}
          className="home-play_button"
          to="/subject"
        />
      )}
    </>
  );

  const content = (
    <>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={close} classname="quiz-intro-modal">
          {quizIntroModalContent!}
        </Modal>
      )}
      {rewardModalOpen && (
        <Modal
          isOpen={rewardModalOpen}
          onClose={rewardClose}
          classname="reward-modal"
        >
          {rewardModalContent}
        </Modal>
      )}
      <div className="intro-half">
        <div className="intro-half_header">
          <div className="intro-half_header--text">
            <p>{timedGreeting}!</p>
            <p>{user?.name}</p>
          </div>
          <div
            className="intro-half_header--chest"
            ref={chestRef}
            onClick={chestReward ? undefined : handleChestClick}
          >
            {chestReward
              ? renderContent("app", "Chest", "blank")
              : renderContent("app", "Chest", "closed")}
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
  );

  return (
    <>
      {isLoading || (isCreateUserLoading && <Loader />)}
      {error && <p style={{ height: "100vh" }}>An Error Occured</p>}
      {!isLoading &&
        isAuthenticated &&
        !isCreateUserLoading &&
        !error &&
        content}
    </>
  );
};

export default Home;
