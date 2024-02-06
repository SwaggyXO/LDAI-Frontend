import { Link } from 'react-router-dom'
import "./button.scss"

type ButtonProps = {
  title: string,
  color: string,
  borderRadius?: string,
  route?: string
}

const Button = ({ title, color, borderRadius, route }: ButtonProps) => {
  return (
    <div className='learn__button'>
        <Link to={route as string}><button type='button' style={{ background: color, borderRadius: borderRadius }}>{title}</button></Link>
    </div>
  )
}

export default Button