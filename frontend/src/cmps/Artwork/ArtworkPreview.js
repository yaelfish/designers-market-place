import React from 'react'
import { Link } from 'react-router-dom';

export default function ArtworkPreview(props) {
    const { _id, name, price, type } = props.artwork;
    return (
        <Link to={`/artwork/${_id}`}>
            <div className="card-artwork flex justify-center align-center column">
                <p>{name}</p>
                <p>price: {price}</p>
                <p>type: {type}</p>
            </div>
        </Link>
    )
}

