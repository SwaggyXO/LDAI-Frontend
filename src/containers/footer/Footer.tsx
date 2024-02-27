
import "./footer.scss"
import staticdotcomma from '../../assets/VectorSVGs/static.svg'
import { Button } from '../../components'
// Awesome Footer

const Footer = () => {
  return (
    <div className="learn__footer section__padding">
      <div className="learn__footer-btn">
        <Button title="Start Learning Now!" color="#92B600" borderRadius="0.05" route="/register"/>
      </div>

      <div className="learn__footer-links">
        <div className="learn__footer-links_logo">
          <img src={staticdotcomma} alt="learn_logo" />
          <p>21 Lane, 99 Colony, Cole Buildings<br /> All Rights Reserved</p>
        </div>
        <div className="learn__footer-links_div">
          <h4>Links</h4>
          <p>Valithos</p>
          <p>Social Media</p>
          <p>Counters</p>
          <p>Contact</p>
        </div>
        <div className="learn__footer-links_div">
          <h4>Company</h4>
          <p>Terms & Conditions </p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className="learn__footer-links_div">
          <h4>Get in touch</h4>
          <p>21 Lane, 99 Colony, Cole Buildings</p>
          <p>999-666-9996</p>
          <p>valithos@gmail.com</p>
        </div>
      </div>

      <div className="learn__footer-copyright">
        <p>@2023 Learn.AI All rights reserved.</p>
      </div>
    </div>
    
  )
}

export default Footer