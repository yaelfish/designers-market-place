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
        menuShown: true
    }


    componentDidMount() {
        this.unlisten = this.props.history.listen((e) => {
            this.setState({ pathname: window.location.pathname })
        })
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener('resize', this.setToFlexOnExpand);
        window.addEventListener('click', this.closeMobileMenu);
        if (window.innerWidth <= 960) this.setState({ menuShown: false });
    }

    closeMobileMenu = () => {
        if (window.innerWidth <= 960) this.setState({ menuShown: false });
    }

    setToFlexOnExpand = () => {
        if (window.innerWidth > 960) this.setState({ menuShown: true });
        if (window.innerWidth <= 960) this.setState({ menuShown: false });
    }

    onToggleMenu = (ev) => {
        this.setState((prevState) => ({ menuShown: !prevState.menuShown }))
        ev.stopPropagation();
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
        return (
            <nav className={(this.state.pathname === "/") ? (this.state.prevScrollpos !== 0 ? "main-nav absolute scrolled" : "main-nav main-nav-home absolute") : "main-nav"}>
                <div className="main-nav-container flex justify-space-between align-center">
                    {!this.state.menuShown && <button className="menu-btn-mobile" onClick={this.onToggleMenu}>☰</button>}
                    <ul className={this.state.menuShown ? "nav-links flex align-center" : "nav-links none"}>
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
                        <li onClick={this.loadArtworks}>
                            <NavLink className="nav-link" to='/artwork' activeClassName="active-link" exact>Artworks</NavLink>
                        </li>

                        <span className="nav-separator">|</span>
                        {this.props.loggedInUser && this.props.loggedInUser.isArtist && < li >
                            <NavLink className="nav-link" to='/artwork/add' activeClassName="active-link" exact>Add new Work</NavLink>
                        </li>}
                    </ul>

                    <Search history={this.props.history} isHome={(this.state.pathname === "/") ? true : false}></Search>
                    {/* <div>Hello, {this.props.loggedInUser.fullName}!</div> */}

                    <NavLink className="nav-link" to='/artist' exact>
                        <img className="profile-pic"
                            src={this.props.loggedInUser.imgUrl}
                            alt={this.props.loggedInUser.userName} />
                    </NavLink>
                </div>
            </nav >
        )
    }
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