import { Features, Login, Whatlearn, Softend } from '../../containers';

import { Dotcomma } from '../../components';

import './landing.scss';

const Landing = () => {

    let content = (
        <>
            <Dotcomma />
            <Whatlearn />
            <Login />
            <Features />
            <Softend />
        </>
    )
    
    return (
        <div className="landing">
            {content}
        </div>
    )
}

export default Landing

