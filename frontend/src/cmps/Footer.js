import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Footer extends Component {

    render() {
        return (<>
            <footer className="footer-container flex justify-center align-center">
                <small className="container">
                    Copyright © 2020 FineArt - All Rights Reserved to Ohad, Tal & Yael</small>
            </footer>
        </>)
    }
}