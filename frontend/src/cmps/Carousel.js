import React, { Component } from 'react';

export default function Carousel(props) {
    const artSrc = props.artSrc;
    console.log(artSrc);

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
                    2
                </div>
                <div id="slide-3">
                    3
                </div>
                <div id="slide-4">
                    4
                </div>
                <div id="slide-5">
                    5
                </div>
            </div>
        </div>
    </>)
}
