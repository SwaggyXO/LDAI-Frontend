import "./feature.scss"

type FeatureProps = {
  title: string,
  text: string,
  vector: string,
  vectoralttext: string
}

const Feature = ({title, text, vector, vectoralttext }: FeatureProps) => {
  return (
    <div className='learn__features-container__feature'>
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
    </div>
  )
}

export default Feature