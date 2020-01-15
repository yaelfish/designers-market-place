import React from 'react';
import { NavLink } from 'react-router-dom'

export default function NavBar(props) {
    return <nav className="main-nav">
        <ul>
            <li><NavLink to='/' activeClassName="active-link" exact>Home</NavLink></li>
            <li><NavLink to='/about' activeClassName="active-link" exact>About</NavLink></li>
            <li><NavLink to='/artwork' activeClassName="active-link" exact>Artworks</NavLink></li>
        </ul>
    </nav>
}

