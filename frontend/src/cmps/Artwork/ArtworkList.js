import React from 'react';
import ArtworkPreview from './ArtworkPreview';


export default function ArtworkList(props) {

    return (
        <div className="list-cards">
            {props.user ?  
            props.artworks.filter(artwork => {
                return <ArtworkPreview
                    key={artwork._id}
                    artwork={artwork}>
                </ArtworkPreview>
            })
            
            : props.artworks.map(artwork => {
                return <ArtworkPreview
                    key={artwork._id}
                    artwork={artwork}>
                </ArtworkPreview>
            })}
        </div>
    )
}
