import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

export default class Footer extends Component {

    render() {
        return (<>
            <footer className="footer-container flex justify-center align-center column">
                <NavLink to='/' exact>
                    <div className="logo flex column align-center">
                        <img className="logo-pic" src={logo} alt="logo" />
                        <span className="logo-name">Early Bird</span>
                    </div>
                </NavLink>
                <small className="container">
                    Copyright © 2020 FineArt - All Rights Reserved to Ohad, Tal & Yael</small>
            </footer>
        </>)
    }
}