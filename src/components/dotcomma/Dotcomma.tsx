import { motion } from "framer-motion";
import cube from "../../assets/js_files/Cube_animation_purple.json";
import Lottie from "lottie-react";
import "./dotcomma.scss";

// The dotcomma animation

const svgVariants = {
  initial: { rotate: -360 },
  visible: {
    rotate: 0,
    transition: {
      duration: 3,
      repeat: Infinity,
      stiffness: 0,
      ease: [0, 0, 0, 0],
    },
  },
};

const dotcomma = () => {
  return (
    // <div className="learn__dotcomma section__padding">
    <Lottie
      style={{ display: "flex", justifyContent: "center", margin: "auto"}}
      loop={true}
      animationData={cube}
    />
    // </div>
  );
};

export default dotcomma;
