import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import bin from '../../assets/images/icons/bin.png';
import beforeLike from '../../assets/images/icons/before-like.png';
// import afterLike from '../../assets/images/icons/after-like.png';
// import bin from '../../assets/images/icons/bin.png';
// import { removeArtwork } from '../../actions/ArtworkActions';


export default class ArtworkPreview extends Component {


    render() {
        const { _id, name, artist, price, type, imgUrl } = this.props.artwork;
        return (
            <Link to={`/artwork/${_id}`}>
                <div className="card-artwork flex justify-center align-center column">
                    <img src={imgUrl} alt={name} />
                    <div className="preview-info flex align-center justify-space-between">
                            <p className="preview-artwork">{name}</p>
                            {/* <img className="preview-icon" src={bin} onClick={}></img>*/}
                            <img className="preview-icon" src={beforeLike}></img>
                            {/* <img className="preview-icon" src={afterLike}></img> */}
                    </div>
                    <div className="preview-price none">price: {price}$</div>
                </div>
            </Link>
        )
    }
}

