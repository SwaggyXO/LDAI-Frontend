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

  const content = (
    <div className={`bottom-navbar sticky`}>
      {Object.values(props).map((navItem, index) => (
        <NavButton key={index} className={`bnavbar-item bnavbar-item--${navItems[index]}`} vector={navItem} to={`/${navItems[index]}`}/>
      ))}
    </div>
  )


  return content;
}

export default Bottomnav