
import React, { Component } from 'react';

export default class LoginModal extends Component {
    render() {
        return <div className="login-modal flex column justify-space-between align-end"> <button className="close-login-modal delete" onClick={this.props.closeLoginModal}></button>
            <p>You need to be logged in to perform that action</p>
        </div>
    }
}