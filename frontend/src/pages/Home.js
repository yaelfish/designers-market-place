import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../actions/UserActions';
import { connect } from 'react-redux';

import coverImg from '../assets/images/coverHome.jpg'
import photography from '../assets/images/tags/photography.jpg'
import nature from '../assets/images/tags/nature.jpg'
import landscape from '../assets/images/tags/landscape.jpg'
import animals from '../assets/images/tags/animals.jpg'
import popArt from '../assets/images/tags/pop-art.jpg'
import illustration from '../assets/images/tags/illustration.jpg'
import watercolor from '../assets/images/tags/watercolor.jpg'
import abstract from '../assets/images/tags/abstract.jpg'

class Home extends Component {
  state = {
    isHome: true
  }

  componentDidMount() {
    this.props.login({ email: "kerryjm2020@gmail.com", password: 1234567890 });
  }
  render() {
    return (
      <React.Fragment>

        <div className="home">
          <div className="cover flex justify-center align-center"><img alt="" src={coverImg}></img><span className="home-title">Artwork Gallery</span></div>
          <ul className="category-links clean-list">
            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=photography', filterProps: {tags: "photography"}}}>
                <img className="category-link" src={photography}/>
              </Link>
              <span className="category-tag">Photography</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=landscape', filterProps: {tags: "landscape"}}}>
                <img className="category-link" src={landscape}/>
              </Link>
              <span className="category-tag">Landscape</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=animals', filterProps: {tags: "animals"}}}>
                <img className="category-link" src={animals}/>
              </Link>
              <span className="category-tag">Animals</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork?tags=pop-art', filterProps: {tags: "Pop-art"}}}>
                <img className="category-link" src={popArt}/>
              </Link>
              <span className="category-tag">Pop-Art</span>
            </li>

            
            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=nature', filterProps: {tags: "nature"}}}>
                <img className="category-link" src={nature}/>
              </Link>
              <span className="category-tag">Nature</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=illustration', filterProps: {tags: "illustration"}}}>
                <img className="category-link" src={illustration}/>
              </Link>
              <span className="category-tag">Illustration</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=watercolor', filterProps: {tags: "watercolor"}}}>
                <img className="category-link" src={watercolor}/>
              </Link>
              <span className="category-tag">watercolor</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=abstract', filterProps: {tags: "abstract"}}}>
                <img className="category-link" src={abstract}/>
              </Link>
              <span className="category-tag">abstract</span>
            </li>

          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);




