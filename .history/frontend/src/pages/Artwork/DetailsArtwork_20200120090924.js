import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadArtworkById, removeArtwork, editArtwork } from '../../actions/ArtworkActions';
import { loading, doneLoading } from '../../actions/SystemActions'
import { loadReviews,addReview } from '../../actions/ReviewActions'
import Reviews from '../../cmps/Artwork/Reviews'
// import Carousel from '../../cmps/Carousel';
import Breadcrumb from '../../cmps/Breadcrumb';
import MainNavbar from '../../cmps/MainNavbar';
import ByArtist from '../../cmps/Artist/ByArtist';
import Spinner from '../../cmps/Spinner';
import like from '../../assets/images/icons/like.png';
import Likes from '../../cmps/Artwork/Likes';

class DetailsArtwork extends Component {

    // TODO: order redux (cart)
    state = {
        isAddedToCart: false,
        isLiked: false
    }

    componentDidMount() {
        this.loadArtwork();
        this.loadReviews();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            this.loadArtwork();
        }
    }


    addToCart = () => {
        this.setState({ isAddedToCart: true })
    }

    onToggleLike = async () => {
        await this.setState(prevState => ({ isLiked: !prevState.isLiked }));
        this.updateLiked(); 
    }

    updateLiked = async () => {
        let { currUser, selectedArtwork } = this.props;
        let artwork = { ...selectedArtwork };
        let usersLikes = artwork.likedByUsers;
        this.state.isLiked ? usersLikes.push(currUser) : usersLikes.filter(user => user._id === currUser._id);
        artwork = { ...artwork, usersLikes };
        console.log(artwork);
        
        this.setState({artwork})
        await this.props.editArtwork(artwork);
    } 

    loadArtwork = async() => {
        const { _id } = this.props.match.params;
        await this.props.loadArtworkById(_id);
    }

    loadReviews = async () => {
        const { _id } = this.props.match.params;
        await this.props.loadReviews({ aboutArtworkId: _id })
    };

    goBack = () => {
        this.props.history.push('/artwork')
    }

    onDelete = async () => {
        const { _id } = this.props.match.params;
        await this.props.removeArtwork(_id);
        this.props.history.push('/artwork')
    }

      addMsg = async newMsg => {
        await this.props.addReview(newMsg, this.props.selectedArtwork._id)
        this.loadReviews();
    };

    render() {
        
        if (!this.props.selectedArtwork) return this.props.loading() && <Spinner />
        // <div className="loading">Loading...</div>
        else this.props.doneLoading()

        if (!this.props.selectedArtwork) return (
            <Spinner/>
        )
        const { selectedArtwork } = this.props;
        let artistObj = selectedArtwork.artist;
        let artist;
        if (artistObj) {
            artist = artistObj.fullName;
        }     
        let likedByUsersObj = selectedArtwork.likedByUsers;
        let likedByUsers;
        if (likedByUsersObj) {
            likedByUsers = likedByUsersObj.length;
        }
        console.log(likedByUsers);   
        
        // let likes = selectedArtwork.likedByUsers.length;
        // console.log(likes);
        
        return <React.Fragment>
            <Breadcrumb />
            <section className="details-container flex">
                <div className="container details-image-container">
                    <div className="slider">

                        <a href="#slide-1">1</a>
                        <a href="#slide-2">2</a>
                        <a href="#slide-3">3</a>
                        <a href="#slide-4">4</a>
                        <a href="#slide-5">5</a>

                        <div className="slides">
                            <div id="slide-1">
                                <img src={this.props.selectedArtwork.imgUrl} ></img>
                            </div>
                            <div id="slide-2">
                                2
    </div>
                            <div id="slide-3">
                                3
    </div>
                            <div id="slide-4">
                                4
    </div>
                            <div id="slide-5">
                                5
    </div>
                        </div>
                    </div>

                    {/* <Carousel artSrc={selectedArtwork.imgUrl}/> */}
                </div>

                <div className="details-text-container">
                    <aside className="container details-container">
                        <ul className="aside-fill">
                            <li>
                                <p className="art-name">{selectedArtwork.name}</p>
                                <p className="artist-name">{artist}</p>
                                {/* <ByArtist/> */}
                                <div className="like-display" onClick={this.onToggleLike}>
                                    <div className="preview-likes-container flex align-center">
                                        <label htmlFor="like-toggle">
                                            <img className="preview-icon-like" src={like} />
                                        </label>
                                        <input type="checkbox" id="like-toggle"/>
                                        <span className="likes-counter">{likedByUsers}</span>
                                        
                                    </div>
                                </div>
                                {/* <button className="like-display" onClick={this.onToggleLike}>
                                    <span className={(this.state.isLiked ? 'liked-icon': 'like-icon')}></span>
                                    <span className="likes-num">13</span>
                                </button> */}
                            </li>
                            <li>
                                <p className="art-description">{selectedArtwork.description}</p>
                            </li>
                            <li>
                                <p className="art-price">Price: {selectedArtwork.price}$</p>
                            </li>
                        </ul>
                        <button className="add-to-cart submit" onClick={this.addToCart}>Add To Cart</button>
                        <div className="action-btns flex justify-center">
                            
                            {this.state.isAddedToCart && <div className="purchased-modal">Purchased</div>}
                            <button className="btn back" onClick={this.goBack}>Back</button>
                            <Link className="btn edit-btn flex justify-center align-center" to={`/artwork/edit/${selectedArtwork._id}`}>Edit</Link>
                            <button className="btn delete" onClick={this.onDelete}></button> 
                        </div>
                    </aside>
                </div>

                <Reviews addMsg={this.addMsg} reviews={this.props.reviews} ></Reviews>
            </section>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.system.isLoading,
        artworks: state.artwork.artworks,
        selectedArtwork: state.artwork.selectedArtwork,
        reviews: state.review.reviews,
        user: state.user,
        loggedInUser: state.user.loggedInUser

    }
}
const mapDispatchToProps = {
    loading,
    doneLoading,
    loadArtworkById,
    removeArtwork,
    editArtwork,
    addReview,
    loadReviews
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsArtwork)