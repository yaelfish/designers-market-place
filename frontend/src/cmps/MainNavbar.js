import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Search from '../cmps/Search'
import { render } from 'react-dom';
import ScrollTrigger from './ScrollTrigger'


export default class MainNavbar extends Component {

    state= {
        pathname: window.location.pathname,
    }


    componentDidMount() {
        this.unlisten =  this.props.history.listen((e)=>{
            this.setState( {pathName : window.location.pathname})
        })
    }


    

    componentWillUnmount(){
        this.unlisten();
    }



    render() {
      console.log(<ScrollTrigger />)
    return (
        <nav className={(this.state.pathname === "/") ? ((<ScrollTrigger />) ? "main-nav absolute scrolled" : "main-nav absolute") : "main-nav"}>
            <ul className="nav-links">
                <li ><NavLink className="nav-link" to='/' activeClassName="active-link" exact>Home</NavLink></li><span className="nav-separator">|</span>
                <li ><NavLink className="nav-link" to='/about' activeClassName="active-link" exact>About</NavLink></li><span className="nav-separator">|</span>
                <li ><NavLink className="nav-link" to='/artwork' activeClassName="active-link" exact>Artworks</NavLink></li><span className="nav-separator">|</span>
                <li ><NavLink className="nav-link" to='/artist' activeClassName="active-link" exact>Artist</NavLink></li><span className="nav-separator">|</span>
                <li><NavLink className="nav-link" to='/artwork/add' activeClassName="active-link" exact>Add new Work</NavLink></li>
            </ul>


            <Search history={this.props.history}></Search>

        </nav>
    )}
}


//onFilter={props.onFilter}
