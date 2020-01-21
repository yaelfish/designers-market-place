import React, { Component } from 'react';
// import ArtTemplate from './Artwork/TemplatesArt/ArtTemplate';
// import FramedArtwork from './Artwork/TemplatesArt/FramedArtwork';
export default class Carousel extends Component {


    render() {
        const artSrc = this.props.artSrc;
        return (<>
            <div className="slider">

                <a href="#slide-1">1</a>
                <a href="#slide-2">2</a>
                <a href="#slide-3">3</a>
                <a href="#slide-4">4</a>
                <a href="#slide-5">5</a>

                <div className="slides">
                    <div id="slide-1">
                        <img className="carousel-img" src={artSrc} ></img>
                    </div>
                    <div id="slide-2">
                        {/* <ArtTemplate artwork={artSrc} /> */}
                </div>
                    <div id="slide-3">
                        {/* <FramedArtwork artwork={artSrc} /> */}
                </div>
                    <div id="slide-4">
                        {/* <ArtTemplate artwork={artSrc} /> */}
                </div>
                    <div id="slide-5">
                        {/* <ArtTemplate artwork={artSrc} /> */}
                </div>
                </div>
            </div>
        </>)
    }
}
