import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Search from '../cmps/Search'
import { connect } from 'react-redux';
import { loadArtworks } from '../actions/ArtworkActions'
import { render } from 'react-dom';
import logo from '../assets/images/logo.png'

class MainNavbar extends Component {

    state = {
        pathname: window.location.pathname,
        prevScrollpos: window.pageYOffset,
    }


    componentDidMount() {
        this.unlisten = this.props.history.listen((e) => {
            this.setState({ pathname: window.location.pathname })
        })
        window.addEventListener("scroll", this.handleScroll);
 
        
    }



    loadArtworks = () => {
        this.props.loadArtworks()
    }

    handleScroll = () => {
        const { prevScrollpos } = this.state;
        const currentScrollPos = window.pageYOffset;
        this.setState({
            prevScrollpos: currentScrollPos,

        });
    };

    componentWillUnmount() {
        this.unlisten();
        window.removeEventListener("scroll", this.handleScroll);
    }



    render() {
<<<<<<< HEAD

        return (
            <nav className={(this.state.pathname === "/") ? (this.state.prevScrollpos !== 0 ? "main-nav absolute scrolled" : "main-nav main-nav-home absolute") : "main-nav"}>
                <div className="main-nav-container flex justify-space-between align-center">
                    <ul className="nav-links flex align-center">
                        <li>
                            <NavLink to='/' exact>
                                <div className="logo flex column align-center">
                                    <img className="logo-pic" src={logo} alt="logo" />
                                    <span className="logo-name">Early Bird</span>
                                </div>

                            </NavLink>
                        </li>
                        <span className="nav-separator">|</span>
                        <li>
                            <NavLink className="nav-link" to='/' activeClassName="active-link" exact>Home</NavLink>
                        </li>
                        <span className="nav-separator">|</span>
                        <li>
                            <NavLink className="nav-link" to='/about' activeClassName="active-link" exact>About</NavLink>
                        </li>

                        <span className="nav-separator">|</span>
                        <li   onClick={this.loadArtworks} >
                            <NavLink className="nav-link" to='/artwork' activeClassName="active-link" exact>Artworks</NavLink>
                        </li>

                        {this.props.loggedInUser && this.props.loggedInUser.isArtist &&
                            <li>
                                <span className="nav-separator">|</span>
                                <NavLink className="nav-link" to='/artwork/add' activeClassName="active-link" exact>Add new Work</NavLink>
                            </li>}
                    </ul>

                    {/* <div>Hello, {this.props.loggedInUser.fullName}!</div> */}
                    {!(this.state.pathname === "/") &&
                        <Search history={this.props.history}></Search>}
                    <NavLink className="nav-link" to='/artist' exact>
                        <img className="profile-pic"
                            src={this.props.loggedInUser.imgUrl}
                            alt={this.props.loggedInUser.userName} />
                    </NavLink>
                </div>
            </nav>
        )
    }
=======
    return (
        <nav className={(this.state.pathname === "/") ? (this.state.prevScrollpos !== 0 ? "main-nav absolute scrolled" : "main-nav main-nav-home absolute") : "main-nav"}>
            <div className="main-nav-container flex justify-space-between align-center">
            <ul className="nav-links flex align-center">
                <li>
           
      
                    <NavLink to='/' exact>
                        <div className="logo flex column align-center">
                            <img className="logo-pic" src={logo} alt="logo"/>
                            <span className="logo-name">Early Bird</span>
                        </div>
                        
                    </NavLink>
                </li>
                <span className="nav-separator">|</span>
                <li>
                    <NavLink className="nav-link" to='/' activeClassName="active-link" exact>Home</NavLink>
                </li>
                <span className="nav-separator">|</span>
                <li>
                    <NavLink className="nav-link" to='/about' activeClassName="active-link" exact>About</NavLink>
                </li>
                
                <span className="nav-separator">|</span>
                <li onClick={this.loadArtworks}>
                    <NavLink className="nav-link" to='/artwork' activeClassName="active-link" exact>Artworks</NavLink>
                </li>
                
                <span className="nav-separator">|</span>
                <li>
                    <NavLink className="nav-link" to='/artwork/add' activeClassName="active-link" exact>Add new Work</NavLink>
                </li>
            </ul>
         
            <Search history={this.props.history} isHome={(this.state.pathname === "/") ? true : false}></Search>
            {/* <div>Hello, {this.props.loggedInUser.fullName}!</div> */}

            <NavLink className="nav-link" to='/artist' exact>
                <img className="profile-pic"
                    src={this.props.loggedInUser.imgUrl}
                    alt={this.props.loggedInUser.userName} />
            </NavLink>
            </div>
        </nav>
    )}
>>>>>>> Tal
}



const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser,
        artworks: state.artwork.artworks
    };
};


const mapDispatchToProps = {
    loadArtworks,
};


export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);