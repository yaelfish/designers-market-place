
import React, { Component } from 'react';

export default class LoginModal extends Component {
    render() {
        return <div className="login-modal flex justify-space-around"> You need to be logged in to perform that action 
        <div className="close-login-modal" onClick={this.props.closeLoginModal}>X</div>
        </div>
    }
}