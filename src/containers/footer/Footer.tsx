
import "./footer.scss"
import staticdotcomma from '../../assets/VectorSVGs/static.svg'
import { Button } from '../../components'
import { useAuth0 } from "@auth0/auth0-react";
// Awesome Footer

const Footer = () => {

  const { loginWithRedirect } = useAuth0();

  const onLogin = () => loginWithRedirect();
  
  return (
    <div className="learn__footer section__padding">
      <div className="learn__footer-btn">
        <Button title="Start Learning Now!" borderRadius="0.05" onClick={onLogin} className="guest"/>
      </div>

      <div className="learn__footer-links">
        <div className="learn__footer-links_logo">
          <img src={staticdotcomma} alt="learn_logo" />
          <p>The NorthCap University, Gurugram<br /> All Rights Reserved</p>
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
          <p>The NorthCap University, Gurugram</p>
          <p>111-222-3333</p>
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