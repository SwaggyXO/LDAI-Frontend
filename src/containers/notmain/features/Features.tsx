import { Feature } from '../../../components/notmain'
import { camera, learningvector, groupchat, chattingvector } from './imports'

// All the remarkable features of the application

const Features = () => {
  return (
    <div className='learn__features'>
      <Feature title="Improvised Learning." text="Studying with Learn is a dive into the future! We harness the power of upcoming techs such as Artificial Intelligence and Augmented Reality to develop a much more engaging and interactive learning experience for our learners." vector={chattingvector} vectoralttext="ChattingVector"/>
      <br /><br />
      <Feature title="Profile Management." text="We help our clients form a learning path suitable for them, fixate daily/weekly goals and analyze their daily schedule to help them achieve the same." vector={learningvector} vectoralttext="LearningVector"/>
      <br /><br />
      <Feature title="Powered by  GenAI." text="Witness the power of generative AI in your hands, hop in conversations with our Mascots, Dot & Comma as they take you lesson by lesson through the learning path. " vector={groupchat} vectoralttext="GroupChat"/>
      <br /><br />
      <Feature title="The Reality." text="Have an experience worth remembering, with the help of AR our learners will be able to recall and have a really fun time with the digital assets we provide. Hope into the “Real” world now! " vector={camera} vectoralttext="Camera"/>
      <br /><br />
    </div>
  )
}

export default Features