import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../cmps/MainNavbar';

export default class Home extends Component {
  state = {
    isHome: true
  }

  render() {
    return (
      <React.Fragment>
      <MainNavbar isHome={this.state.isHome} />
      <div className="home">
        <div className="coverImg flex justify-center align-center">Artwork Gallery</div>
     </div>
     </React.Fragment>
    );
  }
}


