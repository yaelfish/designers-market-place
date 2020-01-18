import React from 'react';
import { NavLink } from 'react-router-dom'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Search from '../cmps/Search'




export default function NavBar(props) {

    console.log(props)

    const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });

    return (
        <nav className={(props.history.location.pathname === '/') ? ((scrollTrigger) ? "main-nav absolute scrolled" : "main-nav absolute") : "main-nav"}>
            <ul className="nav-links">
                <li ><NavLink className="nav-link" to='/' activeClassName="active-link" exact>Home</NavLink></li>
                <li ><NavLink className="nav-link" to='/about' activeClassName="active-link" exact>About</NavLink></li>
                <li ><NavLink className="nav-link" to='/artwork' activeClassName="active-link" exact>Artworks</NavLink></li>
                <li ><NavLink className="nav-link" to='/artist' activeClassName="active-link" exact>Artist</NavLink></li>
            </ul>

            <Search history={props.history}></Search>
        </nav>
    )
}

//onFilter={props.onFilter}
