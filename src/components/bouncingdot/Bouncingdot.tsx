import { motion } from 'framer-motion'

import dotvector from "../../assets/bouncingdot.svg"


const bounceTransition = {
    y: {
        duration: 2,
        yoyo: Infinity,
        ease: "easeOut",
        repeat: Infinity,
        bounce: 0.5
    }
}

const Bouncingdot = () => {
  return (
    <div className='learn__bouncingdot'>
        <motion.img
            src={dotvector}
            transition={bounceTransition}
            animate={{
                y: ["2rem", "12rem", "2rem"],
                width: ["4rem", "4rem", "4rem"]
            }}
        />
    </div>
  )
}

export default Bouncingdot