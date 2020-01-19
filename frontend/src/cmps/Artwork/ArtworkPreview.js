import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadArtworkById, removeArtwork } from '../../actions/ArtworkActions'
// import bin from '../../assets/images/icons/bin.png';
import beforeLike from '../../assets/images/icons/before-like.png';
// import afterLike from '../../assets/images/icons/after-like.png';
import bin from '../../assets/images/icons/bin.png';


class ArtworkPreview extends Component {

    render() {
        let { _id, name, artist, price, type, imgUrl } = this.props.artwork;
        artist = artist.fullName;
        return ( <>
            <Link to={`/artwork/${_id}`}>
                <div className="card-artwork flex justify-center align-center column">
                    <img src={imgUrl} alt={name} />
                    <div className="preview-info flex align-center justify-space-between">
                        <div className="art-preview-text flex column align-start">
                            <p className="preview-artwork-name">{name}</p>
                            <p className="preview-artwork-artist">{artist}</p>
                        </div>
                        {/* <button className="preview-icon btn delete" src={bin} 
                                onClick={()=>this.props.removeArtwork(_id)}></button> */}
                        <img className="preview-icon" src={beforeLike}></img>
                        {/* <img className="preview-icon" src={afterLike}></img> */}
                    </div>
                    <div className="preview-price none">price: {price}$</div>
                </div>
            </Link>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        artworks: state.artwork.artworks,
        selectedArtwork: state.artwork.selectedArtwork,
        user: state.user
    }
}

const mapDispatchToProps = {
    loadArtworkById,
    removeArtwork
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtworkPreview)