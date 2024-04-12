import { useEffect, useRef, useState } from "react"
import { Booster, InventoryItem } from "../../api/gameApiSlice"
import renderContent from "../../features/content/renderContent"
import gsap from "gsap"

type PropsType = {
    booster: InventoryItem
}

const Questionbooster = (props: PropsType) => {

    const [isActive, setIsActive] = useState(false);
    const boosterRef = useRef<HTMLDivElement>(null);
    const booster = props.booster.booster;

    useEffect(() => {
        if (isActive) {
            // Animate booster to the center
            gsap.to(boosterRef.current, { 
                y: "20vh",
                scale: 1.5,
                duration: 0.5,
                ease: "power2.inOut",
                zIndex: 11,
                onStart: () => {
                    // Display description and backdrop after the animation completes
                    gsap.to(".booster-backdrop", { opacity: 0.85, duration: 0.3, height: "90vh"});
                    // gsap.to(".booster-description", { opacity: 1, duration: 0.3 });
                }
            });
            // After 5 seconds, reverse the animation
            setTimeout(() => {
                setIsActive(false);
                gsap.to(".booster-backdrop", { opacity: 0, duration: 0.3, height: 0 });
                // gsap.to(".booster-description", { opacity: 0, duration: 0.3 });
                gsap.to(boosterRef.current, { 
                    x: 0,
                    y: 0,
                    scale: 1.2,
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }, 3000);
        }
    }, [isActive]);

    const activateBooster = () => {
        setIsActive(true);
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
            </div>
        </>
        
    )

    return content;
}

export default Questionbooster