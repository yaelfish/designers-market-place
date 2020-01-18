import React from 'react';
import { NavLink } from 'react-router-dom'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export default function NavBar(props) {

    const scrollTrigger = useScrollTrigger();

    return (   
    <nav className={props.isHome ?  (scrollTrigger ? "main-nav absolute scrolled" : "main-nav absolute" ) : "main-nav"}>
        <ul className="nav-links"> 
            <li><NavLink className="nav-link" to='/' activeClassName="active-link" exact>Home</NavLink></li><span className="nav-separator">|</span>
            <li><NavLink className="nav-link" to='/about' activeClassName="active-link" exact>About</NavLink></li><span className="nav-separator">|</span>
            <li><NavLink className="nav-link" to='/artwork' activeClassName="active-link" exact>Artworks</NavLink></li><span className="nav-separator">|</span>
            <li><NavLink className="nav-link" to='/artist' activeClassName="active-link" exact>Artist</NavLink></li><span className="nav-separator">|</span>
            <li><NavLink className="nav-link" to='/artwork/add' activeClassName="active-link" exact>Add new Work</NavLink></li>
        </ul>
    </nav>
    )
}

