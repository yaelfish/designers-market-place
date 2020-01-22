import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadArtworkById, removeArtwork, editArtwork, toggleLike } from '../../actions/ArtworkActions';
import { loading, doneLoading } from '../../actions/SystemActions'
import { loadReviews, addReview } from '../../actions/ReviewActions'
import Reviews from '../../cmps/Artwork/Reviews'
import Carousel from '../../cmps/Carousel';
// import ArtTemplate from '../../cmps/Artwork/TemplatesArt/ArtTemplate';
import FramedArtwork from '../../cmps/Artwork/TemplatesArt/FramedArtwork';
import Breadcrumb from '../../cmps/Breadcrumb';
import like from '../../assets/images/icons/like.png';
import liked from '../../assets/images/icons/liked.png';
import { removeReview } from '../../actions/ReviewActions'

class DetailsArtwork extends Component {

    state = {
        isAddedToCart: false,
        isLiked: false,
        currUserId: ''
    }

    async componentDidMount() {
        try {
            const artwork = await this.loadArtwork();
            const user = await this.props.loggedInUser;
            const reviews = await this.loadReviews();
            this.setIsLiked(user._id);
        } catch (err) {
            console.log('err:', err);
        }
    }

    setIsLiked = (currUserId) => {
        const likesArr = this.props.selectedArtwork.likedByUsers;
        const found = likesArr.find(user => user._id === currUserId);
        (found) ? this.setState({ isLiked: true }) : this.setState({ isLiked: false })
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
        await this.setState(prevState => ({ isLiked: !prevState.isLiked }))
        await this.updateLiked();
        console.log(this.state.isLiked);
    }

    updateLiked = async () => {
        let { loggedInUser, selectedArtwork } = this.props;
        let likes = [...selectedArtwork.likedByUsers];
        console.log(likes);

        if (!this.state.isLiked) likes = likes.filter(user => user._id !== loggedInUser._id)
        else likes.push(loggedInUser)

        selectedArtwork.likedByUsers = likes;
        this.updateNewArtInStore({ ...selectedArtwork });
    }

    updateNewArtInStore = async (selectedArtwork) => {
        await this.props.editArtwork(selectedArtwork);
    }

    loadArtwork = async () => {
        const { _id } = this.props.match.params;
        const currArtwork = await this.props.loadArtworkById(_id);
        // debugger
        console.log(currArtwork);
        return currArtwork;
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

    sendMsg = async newMsg => {
        const msg = await this.props.addReview(newMsg, this.props.selectedArtwork._id)
        return msg;
    };

    onDeleteReview = async (reviewId) => {
        await this.props.removeReview(reviewId);
    }

    render() {
        // console.log('render', this.state.isLiked);

        const { isLiked } = this.state
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

        return <React.Fragment>
            {/* <Breadcrumb /> */}

            <section className="details-container flex column">
                <div className="details-product-container flex justify-space-between">
                    <div className="flex column">
                        <div className="container details-image-container">
                            <Carousel artSrc={selectedArtwork.imgUrl} />

                        </div>
                        <div>
                            <p className="art-name">{selectedArtwork.name}</p>
                            <p className="artist-name">By {artist}</p>
                            <img className="profile-picture-details" src={this.props.loggedInUser.imgUrl}></img>
                        </div>
                    </div>

                    <div className="details-text-container flex justify-space-between ">
                        <aside className="container flex justify-space-between column">
                            <ul className="aside-fill">

                                <li>
                                    <p className="art-price">Price: {selectedArtwork.price}$</p>
                                </li>
                                <li>
                                    <p className="art-description">{selectedArtwork.description}</p>
                                </li>
                                <li>
                                    <div className="like-display">
                                        <div className="preview-likes-container flex align-center">
                                            <label htmlFor="like-toggle">
                                                <img alt="" onClick={this.onToggleLike}
                                                    className="preview-icon-like"
                                                    src={isLiked ? liked : like}
                                                />
                                                {/* <div onClick={this.onToggleLike} className={isLiked ? 'heart is-active' : 'heart'}></div> */}
                                            </label>

                                            <input type="checkbox" id="like-toggle" />
                                            <span className="likes-counter">{likedByUsers}</span>
                                        </div>
                                    </div>
                                </li>


                            </ul>
                            <button className="add-to-cart submit flex align-center justify-center" onClick={this.addToCart}> Add To Cart</button>
                            {this.state.isAddedToCart && <div className="purchased-modal">Purchased</div>}
                            <div className="action-btns flex justify-space-around">

                                <button className="btn back" onClick={this.goBack}></button>
                                <Link className="btn flex justify-center align-center" to={`/artwork/edit/${selectedArtwork._id}`}><button className="edit"></button></Link>
                                <button className="btn delete" onClick={this.onDelete}></button>
                            </div>
                            <div className="details-certificate flex justify-space-around">
                                <div className="flex column"><div className="icon medal"></div> <div className="certificate-text">Original work delivered with a certificate of authenticity.</div></div>
                                <div className="flex column"><div className="icon delivery"></div><div className="certificate-text">Shipping usually takes up to 7 days.</div></div>

                            </div>
                        </aside>
                    </div>
                </div>

                <Reviews onDeleteReview={this.onDeleteReview} sendMsg={this.sendMsg} reviews={this.props.reviews} loadReviews={this.props.loadReviews} selectedArtwork={this.props.match.params._id} loggedInUser={this.props.loggedInUser} ></Reviews>
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
    toggleLike,
    addReview,
    loadReviews,
    removeReview
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsArtwork)