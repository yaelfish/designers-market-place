import React, { Component } from 'react';
import pop1 from '../assets/images/artworks/1484629537_large-image_hilma-af-klint-they-tens-mainstay-iv-1907-lg.jpg'
import pop2 from '../assets/images/artworks/hilmaasklint.jpg'
import pop3 from '../assets/images/artworks/Adulthood.jpg'
import pop4 from '../assets/images/artworks/furure.jpg'

export default class Carousel extends Component {


    render() {
        const artSrc = this.props.artSrc;
        return (<>
            <div className="home-carousel-container">
                <div className="slides">
                    <div id="slide-1">
                        <img className="carousel-img" src={pop1} ></img>
                    </div>
                    <div id="slide-2">
                        <img className="carousel-img" src={pop2} ></img>
                    </div>
                    <div id="slide-3">
                        <img className="carousel-img" src={pop3} ></img>
                    </div>
                    <div id="slide-4">
                        <img className="carousel-img" src={pop4} ></img>
                    </div>
                    <div id="slide-5">
                        <img className="carousel-img" src={pop1} ></img>
                    </div>
                </div>
            </div>
        </>)
    }
}
