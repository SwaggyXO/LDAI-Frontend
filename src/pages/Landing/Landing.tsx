import { Features, Login, Whatlearn, Softend } from '../../containers/notmain';

import { Dotcomma } from '../../components/notmain';

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
        <div>
            {content}
        </div>
    )
}

export default Landing

