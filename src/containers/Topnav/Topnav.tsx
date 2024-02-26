import './topnav.scss';

type PropsType = {
    customButton?: JSX.Element
    title?: string
    combo?: string | JSX.Element
    marbles?: string | JSX.Element
    xp?: string | JSX.Element
    subject?: string | JSX.Element
    streak?: string | JSX.Element
}

const Topnav = (props: PropsType) => {

    const navItemLength = Object.values(props).filter(prop => prop !== undefined).length;
    const navItems = Object.keys(props).filter(prop => prop !== undefined);
    
    let navbarClass: string;
    switch (navItemLength) {
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
        <div className={`top-navbar ${navbarClass} sticky`}>
            {Object.values(props).map((navItem, index) => (
                <div key={index} className={`navbar-item navbar-item--${navItems[index]}`}>
                    {navItem}
                </div>
            ))}
        </div>
    )
}

export default Topnav