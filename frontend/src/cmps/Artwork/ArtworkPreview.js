import React from 'react'
import { Link } from 'react-router-dom';

export default function ArtworkPreview(props) {
    const { _id, name, artist, price, type, imgUrl } = props.artwork;
    return (
        <Link to={`/artwork/${_id}`}>
            <div className="card-artwork flex justify-center align-center column">
                <img src={imgUrl} alt={name}/>
                <div className="preview-info">
                    <p className="preview-artist">{artist.fullName}</p>
                    <p className="preview-price">price: {price}$</p>
                </div>
            </div>
        </Link>
    )
}

