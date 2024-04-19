import { motion } from "framer-motion";
import "./feature.scss"

type FeatureProps = {
  title: string,
  text: string,
  vector: string,
  vectoralttext: string
}

const Feature = ({title, text, vector, vectoralttext }: FeatureProps) => {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  };

  return (
    <motion.div 
      className='learn__features-container__feature'
      variants={variants}
      initial='hidden'
      whileInView='show'
      viewport={{once: true}}
    >
      <div className='learn__features-container__line'>
        <section />
      </div>
      <div className='learn__features-container__feature-title'>  
        <h1>{title}</h1>
      </div>
      <div className='learn__features-container__feature-text'>
        <p>{text}</p>
      </div>
      <div className='learn__features-container__feature-vector'>
        <img src={vector} alt={vectoralttext} />
      </div>
    </motion.div>
  )
}

export default Feature