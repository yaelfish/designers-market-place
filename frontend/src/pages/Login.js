import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../actions/UserActions';

class Login extends Component {
  state = {
    msg: '',
    loginCred: {
      email: '',
      password: ''
    },
    signupCred: {
      email: '',
      password: '',
      username: ''
    }
  };

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  // signupHandleChange = ev => {
  //   const { name, value } = ev.target;
  //   this.setState(prevState => ({
  //     signupCred: {
  //       ...prevState.signupCred,
  //       [name]: value
  //     }
  //   }));
  // };

  doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.loginCred;
    if (!email || !password) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { email, password };
    this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
    this.props.history.push('/artwork')
  };

  // doSignup = async ev => {
  //   ev.preventDefault();
  //   const { email, password, username } = this.state.signupCred;
  //   if (!email || !password || !username) {
  //     return this.setState({ msg: 'All inputs are required!' });
  //   }
  //   const signupCreds = { email, password, username };
  //   this.props.signup(signupCreds);
  //   this.setState({ signupCred: { email: '', password: '', username: '' } });
  // };

  // removeUser = userId => {
  //   this.props.removeUser(userId);
  // };
  render() {
    return (
      <div className="login-container flex column align-center justify-center">
        <h2>Login</h2>
        <form onSubmit={this.doLogin}>
          <input
            type="text"
            name="email"
            value={this.state.loginCred.email}
            onChange={this.loginHandleChange}
            placeholder="Email" className="input-login"
          />
          <br />
          <input
            type="password"
            name="password"
            value={this.state.loginCred.password}
            onChange={this.loginHandleChange}
            placeholder="Password" className="input-login"
          />
          <br />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.user.loggedInUser,
    isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  signup,
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Login));
