import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../actions/UserActions';
import { connect } from 'react-redux';
import coverImg from '../assets/images/coverHome.jpg'
import photography from '../assets/images/tags/photography.jpg'

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
              <Link className="category-link" to={{pathname:'/artwork', filterProps: {tags: "photography"}}}>
                <img className="category-link" src={photography}/>
              </Link>
              <span className="category-tag">Photography</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork', filterProps: {tags: "reflection"}}}>
                <img className="category-link" src="https://i.etsystatic.com/15350345/r/il/ee7c87/1641242091/il_570xN.1641242091_iqg2.jpg"/>
              </Link>
              <span className="category-tag">Reflection</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork', filterProps: {tags: "sunset"}}}>
                <img className="category-link" src="https://sw16624.smartweb-static.com/upload_dir/shop/Hilma-af-klint-plakat-poster-ur.jpg"/>
              </Link>
              <span className="category-tag">Sunset</span>
            </li>

            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork', filterProps: {tags: "lake"}}}>
                <img className="category-link" src="https://i.etsystatic.com/15350345/r/il/ee7c87/1641242091/il_570xN.1641242091_iqg2.jpg"/>
              </Link>
              <span className="category-tag">Lake</span>
            </li>

            
            <li className="category-li"> 
              <Link className="category-link" to={{pathname:'/artwork', filterProps: {tags: "nature"}}}>
                <img className="category-link" src="https://sw16624.smartweb-static.com/upload_dir/shop/Hilma-af-klint-plakat-poster-ur.jpg"/>
              </Link>
              <span className="category-tag">Nature</span>
            </li>

            <li>
              <Link className="category-link" to='/artwork'>
                <img alt="" className="category-link" src="https://www.howardshollow.com/canvascolor/IMAGES/modernist/b/2a.jpg" />
              </Link>
            </li>
            <li>
              <Link className="category-link" to='/artwork'>
                <img alt="" className="category-link" src="https://sw16624.smartweb-static.com/upload_dir/shop/Hilma-af-klint-plakat-poster-ur.jpg" />
              </Link>
            </li>
            <li>
              <Link className="category-link" to='/artwork'>
                <img alt="" className="category-link" src="https://www.howardshollow.com/canvascolor/IMAGES/modernist/b/2a.jpg" />
              </Link>
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




