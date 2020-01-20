import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Search from '../cmps/Search'
import { connect } from 'react-redux';
import { render } from 'react-dom';



class MainNavbar extends Component {

    state= {
        pathname: window.location.pathname,
        prevScrollpos: window.pageYOffset
    }


    componentDidMount() {
        this.unlisten =  this.props.history.listen((e)=>{
            this.setState( {pathname : window.location.pathname})
        })
        window.addEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate() {

    }
    
    handleScroll = () => {
        const { prevScrollpos } = this.state;
        const currentScrollPos = window.pageYOffset;
        this.setState({
          prevScrollpos: currentScrollPos,
        
        });
      };

    componentWillUnmount(){
        this.unlisten();
        window.removeEventListener("scroll", this.handleScroll);
    }



    render() {
      
    return (
        <nav className={(this.state.pathname === "/") ? (this.state.prevScrollpos !== 0 ? "main-nav absolute scrolled" : "main-nav absolute") : "main-nav"}>
            <ul className="nav-links">
                <li ><NavLink className="nav-link" to='/' activeClassName="active-link" exact>Home</NavLink></li><span className="nav-separator">|</span>
                <li ><NavLink className="nav-link" to='/about' activeClassName="active-link" exact>About</NavLink></li><span className="nav-separator">|</span>
                <li ><NavLink className="nav-link" to='/artwork' activeClassName="active-link" exact>Artworks</NavLink></li><span className="nav-separator">|</span>
                <li ><NavLink className="nav-link" to='/artist' activeClassName="active-link" exact>Artist</NavLink></li><span className="nav-separator">|</span>
                <li><NavLink className="nav-link" to='/artwork/add' activeClassName="active-link" exact>Add new Work</NavLink></li>
            </ul>

    <div>Hello, {this.props.loggedInUser.fullName}!</div>
            <Search history={this.props.history}></Search>

        </nav>
    )}
}



const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};

export default connect(mapStateToProps)(MainNavbar);