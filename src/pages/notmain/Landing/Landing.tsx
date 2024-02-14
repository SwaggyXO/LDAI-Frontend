import { Features, Login, Whatlearn, Softend } from '../../../containers/notmain';

import { Dotcomma } from '../../../components/notmain';

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

