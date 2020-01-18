import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../cmps/MainNavbar';
import coverImg from '../assets/images/coverHome.jpg'

export default class Home extends Component {
  state = {
    isHome: true
  }

  render() {
    return (
      <React.Fragment>
    
        <div className="home">
    <div className="cover flex justify-center align-center"><img src={coverImg}></img><span className="home-title">Artwork Gallery</span></div>
          <ul className="category-links clean-list">
            <li>
              <Link className="category-link" to='/artwork'>
                <img className="category-link" src="https://www.howardshollow.com/canvascolor/IMAGES/modernist/b/2a.jpg"/>
                <div className="category-tag"></div>
              </Link>
            </li>
            <li>
              <Link className="category-link" to='/artwork'>
                <img className="category-link" src="https://i.etsystatic.com/15350345/r/il/ee7c87/1641242091/il_570xN.1641242091_iqg2.jpg"/>
              </Link>
            </li>
            <li>
              <Link className="category-link" to='/artwork'>
                <img className="category-link" src="https://sw16624.smartweb-static.com/upload_dir/shop/Hilma-af-klint-plakat-poster-ur.jpg"/>
              </Link>
            </li>
            <li>
              <Link className="category-link" to='/artwork'>
                <img className="category-link" src="https://i.etsystatic.com/15350345/r/il/ee7c87/1641242091/il_570xN.1641242091_iqg2.jpg"/>
              </Link>
            </li>
            <li>
              <Link className="category-link" to='/artwork'>
                <img className="category-link" src="https://sw16624.smartweb-static.com/upload_dir/shop/Hilma-af-klint-plakat-poster-ur.jpg"/>
              </Link>
          </li>
          <li>
            <Link className="category-link" to='/artwork'>
              <img className="category-link" src="https://www.howardshollow.com/canvascolor/IMAGES/modernist/b/2a.jpg"/>
            </Link>
          </li>
          <li>
            <Link className="category-link" to='/artwork'>
              <img className="category-link" src="https://sw16624.smartweb-static.com/upload_dir/shop/Hilma-af-klint-plakat-poster-ur.jpg"/>
            </Link>
          </li>
          <li>
            <Link className="category-link" to='/artwork'>
              <img className="category-link" src="https://www.howardshollow.com/canvascolor/IMAGES/modernist/b/2a.jpg"/>
            </Link>
          </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}


