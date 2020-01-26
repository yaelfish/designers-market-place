import React, { Component } from 'react';
// import ArtTemplate from './Artwork/TemplatesArt/ArtTemplate';
// import FramedArtwork from './Artwork/TemplatesArt/FramedArtwork';
import  wall1 from '../assets/images/template-imgs/wall2.jpg';
import  wall2  from '../assets/images/template-imgs/wall3.jpg';
import ArtTemplate from './Artwork/TemplatesArt/ArtTemplate';
import ArtTemplate2 from './Artwork/TemplatesArt/ArtTemplate2';

export default class Carousel extends Component {


    render() {
        const artSrc = this.props.artSrc;
        return (<>

            <section className="carousel-container flex no-wrap">
                {/* <div className="main-carousel-artwork flex">
                    <img className="main-carousel-img" src={artSrc} alt="" />
                </div>
                <aside className="secondary-carousel-images flex column">
                    <div className="demo-image1-container">
                        <img className="carousel-img-template" src={wall2} alt="" />
                        <img className="carousel-img" src={artSrc} alt="" />
                    </div>
                    <div className="demo-image2-container">
                        <img className="carousel-img-template" src={wall1} alt="" />
                        <img className="carousel-img" src={artSrc} alt="" />
                    </div>
                </aside> */}

                <div className="slider">
                    <div className="slides">
                        <div id="slide-1">
                            <img className="carousel-img" src={artSrc} alt="" />
                        </div>
                        <div id="slide-2">
                            <ArtTemplate selectedArtwork={artSrc} />
                        </div>
                        <div id="slide-3">
                            <ArtTemplate2 selectedArtwork={artSrc} />
                        </div>
                        {/* <div id="slide-4">
                        </div>
                        <div id="slide-5"></div> */}
                    </div>
                </div>
                
            </section>
            <div className="carousel-desc">
                <p>Slide right to see more</p>
            </div>
        </>)
    }
}
