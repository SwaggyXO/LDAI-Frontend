import './topnav.scss';

type PropsType = {
    customButton?: JSX.Element
    title?: string
    combo?: string | JSX.Element
    marbles?: string | JSX.Element
    xp?: string | JSX.Element
    subject?: string | JSX.Element
    streak?: string | JSX.Element
    classname?: string
}

const Topnav = (props: PropsType) => {

    const navItemLength = Object.values(props).filter(prop => prop !== undefined).length;
    const navItems = Object.keys(props).filter(prop => prop !== undefined);
    
    let navbarClass: string;
    switch (navItemLength) {
        case 1: 
            navbarClass = 'top-navbar-1';
            break;
        case 2:
            navbarClass = 'top-navbar-2';
            break;
        case 3:
            navbarClass = 'top-navbar-3';
            break;
        case 4:
            navbarClass = 'top-navbar-4';
            break;
        default:
            navbarClass = 'top-navbar-default';
    }

    return (
        <div className={`top-navbar ${navbarClass} sticky ${props.classname}`}>
            {props.classname ? 
                Object.values(props).slice(0, -1).map((navItem, index) => (
                    <div key={index} className={`navbar-item navbar-item--${navItems[index]}`}>
                        {navItem}
                    </div>
                )) : 
                Object.values(props).map((navItem, index) => (
                <div key={index} className={`navbar-item navbar-item--${navItems[index]}`}>
                    {navItem}
                </div>
                ))
            }
        </div>
    )
}

export default Topnav