import { useEffect, useRef, useState } from "react"
import { Booster, InventoryItem } from "../../api/gameApiSlice"
import renderContent from "../../features/content/renderContent"
import gsap from "gsap"
import { useDispatch } from "react-redux"
import { updateActivatedBoosters } from "../../features/quiz/quizSlice"

type PropsType = {
    booster: InventoryItem
}

const Questionbooster = (props: PropsType) => {

    const [isActive, setIsActive] = useState(false);
    const boosterRef = useRef<HTMLDivElement>(null);
    const booster = props.booster.booster;

    const dispatch = useDispatch();

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
                    gsap.to(".booster-backdrop", { opacity: 0.85, duration: 0.3, height: "90vh"});
                    gsap.to(".booster-quantity", { opacity: 0, duration: 0.3 });
                    gsap.to(".booster-description.active", 
                        { 
                            opacity: 1, 
                            duration: 0.3, 
                            fontSize: "0.75rem", 
                            width: "20vh",
                            textAlign: "center",
                            paddingTop: "2vh",
                            color: "white",
                    });
                }
            });
            // After 5 seconds, reverse the animation
            setTimeout(() => {
                setIsActive(false);
                gsap.to(".booster-backdrop", { opacity: 0, duration: 0.3, height: 0 });
                gsap.to(".booster-quantity", { opacity: 1, duration: 0.3 });
                gsap.to(".booster-description", 
                    { 
                        opacity: 0, 
                        duration: 0.3, 
                        height: 0,
                        width: 0,
                        fontSize: "0rem",
                        padding: "none"
                });

                // gsap.to(".booster-description", { opacity: 0, duration: 0.3 });
                gsap.to(boosterRef.current, { 
                    x: 0,
                    y: 0,
                    scale: 1.2,
                    duration: 0.5,
                    ease: "power2.inOut",
                    zIndex: 1
                });
            }, 2000);
        }
    }, [isActive]);

    const activateBooster = () => {
        if (props.booster.quantity > 0) {
            setIsActive(true);
            dispatch(updateActivatedBoosters(booster.name));
        }
    };

    const content = (
        <>
            <div 
                ref={boosterRef}
                className={`question--booster_item ${isActive ? 'active' : ''}`} 
                onClick={activateBooster}
            >
                <div className="booster-quantity">{props.booster.quantity}</div>
                <div className="booster-ellipse">{renderContent('boosters', `${booster.name}`, `${booster.name}`)}</div>
                <div className={`booster-description ${isActive ? 'active' : ''}`} style={{opacity: 0, height: 0, fontSize: "0rem", width: 0, padding: "none"}}>{props.booster.booster.description}</div>
            </div>
        </>
        
    )

    return content;
}

export default Questionbooster