import React from 'react';
import { NavLink } from 'react-router-dom'

export default function NavBar(props) {
    
    return (   
    <nav className={props.isHome ? "main-nav absolute" : "main-nav"}>
        <ul className="nav-links"> 
            <li ><NavLink className="nav-link" to='/' activeClassName="active-link" exact>Home</NavLink></li>
            <li ><NavLink className="nav-link" to='/about' activeClassName="active-link" exact>About</NavLink></li>
            <li ><NavLink className="nav-link" to='/artwork' activeClassName="active-link" exact>Artworks</NavLink></li>
        </ul>
    </nav>
    )
}

