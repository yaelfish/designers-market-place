import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../actions/UserActions';
import { connect } from 'react-redux';
import Search from '../cmps/Search';
import HomeCarousel from '../cmps/HomeCarousel'
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

  // componentDidMount() {
  //   this.props.login({ email: "kerryjm2020@gmail.com", password: 1234567890 });
  // }
  render() {
    return (
      <React.Fragment>

        <div className="home">
          <div className="cover flex justify-center align-center">
            <img alt="" src={coverImg}/>
            <div className="cover-header flex column">
              <span className="home-title">Discover The Creative Universe Of Our Artists</span>
              <Link className="btn discover" to={{ pathname: '/artwork' }}>
                <button className="btn discover header">Discover</button>
              </Link>
            </div>
          </div>
          
          <section className="container intro-home-container">
            <h1>Buy Original Art Online on our Art Gallery</h1>
            <h2>Our current favorites</h2>

            <ul className="popular-artworks flex clean-list">
              {/* <HomeCarousel/> */}
              <li className="category-li">
                <Link className="category-link" to={{ pathname: '/artwork', search: '?tags=photography' }}>
                  <img className="popular-link" src={photography} />
                </Link>
              </li>

              <li className="category-li">
                <Link className="category-link" to={{ pathname: '/artwork', search: '?tags=landscape' }}>
                  <img className="popular-link" src={landscape} />
                </Link>
              </li>

              <li className="category-li">
                <Link className="category-link" to={{ pathname: '/artwork', search: '?tags=animals' }}>
                  <img className="popular-link" src={animals} />
                </Link>
              </li>
              </ul>
          </section>
         
          {/* <Search history={this.props.history}></Search> */}
          <section className="container discover-container flex">
            <aside className="discover-container-left flex column">
              <h2>Discover the world through original paintings for sale</h2>
              <Link className="btn discover" to={{ pathname: '/artwork' }}>
                <button className="btn discover inner-discover">Discover</button>
              </Link>
              {/* <button className="btn discover">Discover</button> */}
            </aside>
         
          <ul className="category-links clean-list">
            {/* <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=photography'}}>
                <figure>
                  <img className="category-link" src={photography}/>
                  <figcaption className="category-tag">
                      <h3>Photography</h3>
                      <div className="arrow-icon-link"></div>
                  </figcaption>
                </figure>
              </Link>
            </li> */}

            <li className="category-li picture-mixin "> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=landscape'}}>
                <img className="category-link" src={landscape}/>
              </Link>
              <span className="category-tag">Landscape</span>
            </li>

              <li className="category-li picture-mixin"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=animals'}}>
                <img className="category-link" src={animals}/>
              </Link>
              <span className="category-tag">Animals</span>
            </li>

            <li className="category-li picture-mixin "> 
              <Link className="category-link" to={{pathname:'/artwork?tags=pop-art'}}>
                <img className="category-link" src={popArt}/>
              </Link>
              <span className="category-tag">Pop-Art</span>
            </li>

            
            {/* <li className="category-l picture-mixin i"> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=nature'}}>
                <img className="category-link" src={nature}/>
              </Link>
              <span className="category-tag">Nature</span>
            </li> */}

            <li className="category-li picture-mixin "> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=illustration'}}>
                <img className="category-link" src={illustration}/>
              </Link>
              <span className="category-tag">Illustration</span>
            </li>

            <li className="category-li picture-mixin "> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=watercolor'}}>
                <img className="category-link" src={watercolor}/>
              </Link>
              <span className="category-tag">watercolor</span>
            </li>

            <li className="category-li picture-mixin "> 
              <Link className="category-link" to={{pathname:'/artwork' , search:'?tags=abstract'}}>
                <img className="category-link" src={abstract}/>
              </Link>
              <span className="category-tag">abstract</span>
            </li>

          </ul>
        </section>
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




