import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import bin from '../../assets/images/icons/bin.png';
import { removeArtwork } from '../../actions/ArtworkActions';


export default class ArtworkPreview extends Component {


    render() {
        const { _id, name, artist, price, type, imgUrl } = this.props.artwork;
        return (
            <Link to={`/artwork/${_id}`}>
                <div className="card-artwork flex justify-center align-center column">
                    <img src={imgUrl} alt={name} />
                    <div className="preview-info">
                        <p className="preview-artist">{artist.fullName}</p>
                        <p className="preview-price">price: {price}$</p>
                        {/* <div><img src={bin} onClick={}></img></div> */}
                    </div>
                </div>
            </Link>
        )
    }
}

