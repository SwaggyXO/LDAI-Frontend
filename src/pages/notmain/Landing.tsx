import { Features, Login, Whatlearn, Softend } from '../../containers/notmain';

import { Dotcomma } from '../../components/notmain';

const Landing = () => {

    let content = (
        <div>
            <Dotcomma />
            <Whatlearn />
            <Login />
            <Features />
            <Softend />
        </div>
    )
    
    return (
        <div>
            {content}
        </div>
    )
}

export default Landing

