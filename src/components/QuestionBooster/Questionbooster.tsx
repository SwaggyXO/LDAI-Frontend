import { useEffect, useRef, useState } from "react";
import {
  Booster,
  Currency,
  InventoryItem,
  useSubtractBoosterMutation,
} from "../../api/gameApiSlice";
import renderContent from "../../features/content/renderContent";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { updateActivatedBoosters } from "../../features/quiz/quizSlice";
import { getUserCookie } from "../../features/user/userCookieHandler";
import { RootState } from "../../app/store";

type PropsType = {
  booster: InventoryItem;
};

const Questionbooster = (props: PropsType) => {
  const [isActive, setIsActive] = useState(false);
  const boosterRef = useRef<HTMLDivElement>(null);
  const booster = props.booster.booster;

  const quiz = useSelector((state: RootState) => state.quiz);

  const dispatch = useDispatch();

  const [subtractBooster] = useSubtractBoosterMutation();

  const user = getUserCookie();

  useEffect(() => {
    if (isActive && boosterRef.current) {
      const rect = boosterRef.current.getBoundingClientRect();

      // Calculate the distance to the center of the screen
      const x = window.innerWidth / 2 - rect.left - rect.width / 2;
      const y = window.innerHeight / 2 - rect.top - rect.height / 2;
      // Animate booster to the center
      gsap.to(boosterRef.current, {
        x: x,
        y: y,
        scale: 1.5,
        duration: 0.5,
        ease: "power2.inOut",
        zIndex: 11,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1vh",
        onStart: () => {
          // Display description and backdrop after the animation completes
          gsap.to(".booster-backdrop", {
            opacity: 0.85,
            duration: 0.3,
            height: "90vh",
          });
          gsap.to(".booster-quantity", { opacity: 0, duration: 0.3 });
          gsap.to(".booster-description.active", {
            opacity: 1,
            duration: 0.3,
            fontSize: "0.75rem",
            width: "20vh",
            textAlign: "center",
            paddingTop: "2vh",
            color: "white",
          });
        },
      });
      // After 5 seconds, reverse the animation
      setTimeout(() => {
        gsap.to(".booster-backdrop", { opacity: 0, duration: 0.3, height: 0 });
        gsap.to(".booster-quantity", { opacity: 1, duration: 0.3 });
        gsap.to(".booster-description", {
          opacity: 0,
          duration: 0.3,
          height: 0,
          width: 0,
          fontSize: "0rem",
          paddingTop: 0,
        });

        // gsap.to(".booster-description", { opacity: 0, duration: 0.3 });
        gsap.to(boosterRef.current, {
          x: 0,
          y: 0,
          scale: 1.1,
          duration: 0.5,
          ease: "power2.inOut",
          zIndex: 1,
          onComplete: () => {
            setIsActive(false);
          },
        });
      }, 2000);
    }
  }, [isActive, boosterRef.current]);

  const handleSubtractBooster = async (booster: Currency) => {
    try {
      const response = await subtractBooster({
        userId: user?.userId!,
        booster: [booster],
      });
      console.log(user?.userId!, booster);
      if ("error" in response) {
        console.error("An error occured", response);
      } else {
        console.log("Booster subtracted successfully:", response);
        if (response) console.log(response);
      }
    } catch (error) {
      console.error("An unexpected error occurred");
    }
  };

  const activateBooster = async () => {
    if (props.booster.quantity > 0) {
      handleSubtractBooster({ name: booster.name, amount: 1 });
      setIsActive(true);
      dispatch(updateActivatedBoosters(booster.name));
    }
  };

  const content = (
    <>
      <div
        ref={boosterRef}
        className={`question--booster_item ${isActive ? "active" : ""}`}
        onClick={activateBooster}
      >
        <div className="booster-quantity">{props.booster.quantity}</div>
        <div className="booster-ellipse">
          {renderContent("boosters", `${booster.name}`, `${booster.name}`)}
        </div>
        <div
          className={`booster-description ${isActive ? "active" : ""}`}
          style={{
            opacity: 0,
            height: 0,
            fontSize: "0rem",
            width: 0,
            paddingTop: "none",
          }}
        >
          {props.booster.booster.description}
        </div>
      </div>
    </>
  );

  return content;
};

export default Questionbooster;
