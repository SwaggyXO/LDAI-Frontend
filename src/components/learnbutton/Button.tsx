import { Link } from 'react-router-dom'
import "./button.scss"

type ButtonProps = {
  title: string,
  borderRadius?: string,
  route?: string,
  onClick?: () => Promise<void>
  className?: string
}

const Button = ({ title, borderRadius, route, onClick, className }: ButtonProps) => {
  return (
    <div className='learn__button'>
        <Link to={route as string}><button type='button' style={{ borderRadius: borderRadius }} onClick={onClick} className={`${className} button btn`}>{title}</button></Link>
    </div>
  )
}

export default Button