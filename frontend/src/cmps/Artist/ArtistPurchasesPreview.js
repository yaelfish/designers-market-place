import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadArtworkById, removeArtwork } from '../../actions/ArtworkActions'
// import bin from '../../assets/images/icons/bin.png';
import like from '../../assets/images/icons/like.png';
// import afterLike from '../../assets/images/icons/after-like.png';
import bin from '../../assets/images/icons/bin.png';


class ArtistPurchasesPreview extends Component {

    render() {
        let { _id, name, artist, price, likedByUsers, imgUrl, createdAt, tags } = this.props.artwork;
        let artistObj = artist;
        let likedByUsersObj = likedByUsers;
        if (artistObj) {
            artist = artistObj.fullName;
        } 
        if (likedByUsersObj) {
            likedByUsers = likedByUsersObj.length;
        }        
        // console.log(likedByUsers);
        // console.log(this.props.artwork);
   
        
        
        return ( 
            <Link to={`/artwork/${_id}`}>
                <div className="card-artwork-sold flex  align-start row">
                    <img src={imgUrl} alt={name} />
                    <div className="preview-info-sold">
                        <div className="art-preview-text-sold flex row align-start">
                            <p className="preview-artwork-name">{name}</p>
                            <p className="preview-artwork-artist">{Date(createdAt)}</p>
                            <p className="preview-artwork-artist">{tags.toString()}</p>
                            <span className="likes-counter">{likedByUsers}</span>
                            {/* <div className="preview-likes-container flex align-center">
                            <span className="likes-counter">{likedByUsers}</span>
                            <img className="preview-icon-like" src={like} />
                        </div> */}

                            <p className="preview-artwork-quantity">{this.props.timesSold}</p>
                            <div className="preview-earnings"> ${this.props.timesSold*price}</div>
                        </div>
                        

                        {/* <button className="preview-icon btn delete" src={bin} 
                                onClick={()=>this.props.removeArtwork(_id)}></button> */}
             
                        {/* <img className="preview-icon" src={afterLike}></img> */}
                    </div>
                  
                </div>
            </Link>
         
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
)(ArtistPurchasesPreview)