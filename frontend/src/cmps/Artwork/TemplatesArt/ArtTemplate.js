import React from 'react';
import wall2 from '../../../assets/images/template-imgs/wall2.jpg';

export default function ArtTemplate(props) {

        return (<>
            <div className="art-template-container flex justify-center align-center">
                <img className="artwork-small square-ratio"
                    src={props.selectedArtwork} alt="artwork display on a wall"/>
                <img className="wall-bg" src={wall2} alt="artwork display on a wall"/>
           </div>
        </>)
}
