import { Feature } from '../../../components/notmain'
import { camera, learningvector, groupchat, chattingvector } from './imports'

// All the remarkable features of the application

const Features = () => {
  return (
    <div className='learn__features'>
      <Feature title="Gamified Learning." text="Studying with Learn is a dive into the future! We harness the power of upcoming techs such as Artificial Intelligence and Augmented Reality to develop a much more engaging and interactive learning experience for our learners." vector={chattingvector} vectoralttext="ChattingVector"/>
      <br /><br />
      <Feature title="Profile Management." text="We help our clients form a learning path suitable for them, fixate daily/weekly goals and analyze their daily schedule to help them achieve the same." vector={learningvector} vectoralttext="LearningVector"/>
      <br /><br />
      <Feature title="Powered by  GenAI." text="Witness the power of generative AI in your hands, hop in conversations with our Mascots, Dot & Comma as they take you lesson by lesson through the learning path." vector={groupchat} vectoralttext="GroupChat"/>
      <br /><br />
    </div>
  )
}

export default Features