import React from 'react';
import wall3 from '../../../assets/images/template-imgs/wall3.jpg';

export default function ArtTemplate2(props) {

 
        return (<>
            <div className="art-template-container flex justify-center align-center picture-ratio">
                {/* <img className={`artwork-small2 square-ratio ${fitImage(this)}`} */}
                <img className="artwork-small2 square-ratio"
                    src={props.selectedArtwork} alt="artwork display on a wall"/>
                <img className="wall-bg" src={wall3} alt="artwork display on a wall"/>
           </div>
        </>)
}
