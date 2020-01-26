import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { loadArtworkById, removeArtwork } from '../../../actions/ArtworkActions'
// import  wall from '../../../assets/images/template-imgs/wall1.png'


export default class FramedArtwork extends Component {
    render() {
        const artSrc = this.props.artSrc;
    
        return (<>
          
                {/* <div className="art-template-container card-artwork">
                <div className="art-container" style={{ backgroundImage:`url(${artSrc})`}}></div> */}
                <div className="frame">
                    <img src={artSrc} alt="" />
                </div>
                   
                {/* </div> */}
            
        </>
        )
    }
}


