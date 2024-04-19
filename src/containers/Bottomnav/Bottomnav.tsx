import { useLocation } from 'react-router-dom';
import NavButton from '../../components/buttons/NavButton';
import './bottomnav.scss';

type PropsType = {
  home: string 
  challenges: string
  drs: string
  powerups: string 
  profile: string 
}

const Bottomnav = (props: PropsType) => {
  
  const navItems = Object.keys(props);

  const location = useLocation();


  const content = (
    <div className={`bottom-navbar sticky`}>
      {Object.values(props).map((navItem, index) => (
        <NavButton key={index} className={`bnavbar-item bnavbar-item--${navItems[index]} ${ location.pathname.includes(navItem.toLowerCase()) ? 'active' : '' }`} vector={navItem} to={`/${navItems[index]}`}/>
      ))}
    </div>
  )


  return content;
}

export default Bottomnav