import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../actions/UserActions';
import { loadArtworks } from '../actions/ArtworkActions';
import { connect } from 'react-redux';
import Search from '../cmps/Search';
import HomeCarousel from '../cmps/HomeCarousel'
import coverImg from '../assets/images/coverHome.jpg'
import photography from '../assets/images/tags/photography.jpg'
import landscape from '../assets/images/9858-Hockney-Pacific-Coast-Highway-and-Santa-Monica.jpg'
import portrait from '../assets/images/tags/portrait.jpg'
import popArt from '../assets/images/tags/pop-art.jpg'
import illustration from '../assets/images/tags/beetroot.png'
import watercolor from '../assets/images/tags/watercolor.jpg'
import abstract from '../assets/images/tags/abstract.jpg'

import pop1 from '../assets/images/artworks/1484629537_large-image_hilma-af-klint-they-tens-mainstay-iv-1907-lg.jpg'
import pop2 from '../assets/images/artworks/hilmaasklint.jpg'
import pop3 from '../assets/images/artworks/Adulthood.jpg'
import pop4 from '../assets/images/artworks/furure.jpg'

import logo from '../assets/images/logo.png'

class Home extends Component {
  state = {
    isHome: true
  }


loadArtworks = (ev) => {
  ev.persist();
  this.props.loadArtworks();
}


  render() {
    return (
      <React.Fragment>

        <div className="home">
          <div className="cover flex justify-center align-center">
            {/* <img alt="" src={coverImg} /> */}
            <div className="cover-header flex column">
              {/* <div className="home-top-title">INSPIRATION</div>
              <img className="home-logo" src={logo} alt="early bird logo"/> */}
              {/* <span className="home-title">Welcome to Early Bird</span> */}
              <span className="home-title">Discover The Creative Universe Of Our Artists</span>
              <Link className="btn discover" to={{ pathname: '/artwork' }}>
                <button className="btn discover header" onClick={this.loadArtworks}>start browsing</button>
              </Link>
            </div>
          </div>
          <main>
            <section className="intro-home-container">             
              <h1>Buy and Sell Original Art Online on our Art Gallery</h1>
              <h2>Our current favorites</h2>

              <ul className="popular-artworks flex clean-list">
                {/* <HomeCarousel/> */}
                <li className="category-li">
                  <Link className="category-link" to={{ pathname: '/artwork' }}>
                    <img className="popular-link" src={pop1}  onClick={this.loadArtworks} />
                  </Link>
                </li>

                <li className="category-li">
                  <Link className="category-link" to={{ pathname: '/artwork' }}>
                    <img className="popular-link" src={pop2}  onClick={this.loadArtworks} />
                  </Link>
                </li>

                <li className="category-li">
                  <Link className="category-link" to={{ pathname: '/artwork' }}>
                    <img className="popular-link" src={pop3}  onClick={this.loadArtworks} />
                  </Link>
                </li>

                <li className="category-li">
                  <Link className="category-link" to={{ pathname: '/artwork' }}>
                    <img id="main-popular-link" className="popular-link" src={pop4}  onClick={this.loadArtworks} />
                  </Link>
                </li>
              </ul>
            </section>

            {/* <Search history={this.props.history}></Search> */}
            <section className="discover-container flex">
              <aside className="discover-container-left flex column">
                <h2>Discover the world through original paintings for sale</h2>
                <Link className="btn discover" to={{ pathname: '/artwork'}}>
                  <button className="btn discover inner-discover" onClick={this.loadArtworks}>Discover</button>
                </Link>
              </aside>

              <ul className="category-links clean-list">
                <li className="category-li picture-mixin ">
                  <Link className="category-link" to={{ pathname: '/artwork', search: '?tags=landscape' }}>
                    <img className="category-link" src={landscape} />
                  </Link>
                  <span className="category-tag">Landscape</span>
                </li>

                <li className="category-li picture-mixin ">
                  <Link className="category-link" to={{ pathname: '/artwork', search: '?tags=abstract' }}>
                    <img className="category-link" src={abstract} />
                  </Link>
                  <span className="category-tag">abstract</span>
                </li>

                <li className="category-li picture-mixin">
                  <Link className="category-link" to={{ pathname: '/artwork', search: '?tags=portrait' }}>
                    <img className="category-link" src={portrait} />
                  </Link>
                  <span className="category-tag">portrait</span>
                </li>

                <li className="category-li picture-mixin ">
                  <Link className="category-link" to={{ pathname: '/artwork', search: '?tags=illustration' }}>
                    <img className="category-link" src={illustration} />
                  </Link>
                  <span className="category-tag">Illustration</span>
                </li>

                <li className="category-li picture-mixin ">
                  <Link className="category-link" to={{ pathname: '/artwork', search:'?tags=popart' }}>
                    <img className="category-link" src={popArt} />
                  </Link>
                  <span className="category-tag">Pop-Art</span>
                </li>

                <li className="category-li picture-mixin ">
                  <Link className="category-link" to={{ pathname: '/artwork', search: '?tags=watercolor' }}>
                    <img className="category-link" src={watercolor} />
                  </Link>
                  <span className="category-tag">watercolor</span>
                </li>
              </ul>

            </section>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    artworks: state.artwork.artworks
  };
};
const mapDispatchToProps = {
  login,
  loadArtworks
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);




