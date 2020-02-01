import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadArtworkById, removeArtwork } from '../../actions/ArtworkActions'
import like from '../../assets/images/icons/like.png';

class ArtworkPreview extends Component {

    render() {
        let { _id, name, artist, price, likedByUsers, imgUrl } = this.props.artwork;
        let artistObj = artist;
        let likedByUsersObj = likedByUsers;
        if (artistObj) {
            artist = artistObj.fullName;
        } 
        if (likedByUsersObj) {
            likedByUsers = likedByUsersObj.length;
        }        
  
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
                        <div className="preview-likes-container flex align-center">
                            <span className="likes-counter">{likedByUsers}</span>
                            <img className="preview-icon-like" src={like} alt="like"/>
                        </div>
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