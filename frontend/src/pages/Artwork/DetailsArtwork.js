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
import OrderAdd from '../../cmps/Order/OrderAdd'

class DetailsArtwork extends Component {

    state = {
        isAddedToCart: false,
        isLiked: false,
        currUserId: '',
        currArtwork: null
    }

    async componentDidMount() {
        try {
            const artwork = await this.loadArtwork();

            this.setState({ currArtwork: this.props.selectedArtwork })
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
        const order = { ...selectedArtwork };



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
            <section className="details-container">
                <button className="btn back" onClick={this.goBack}></button>
                <div className="flex column image-area align-center">
                    <div className="details-image-container">
                        <Carousel artSrc={selectedArtwork.imgUrl} />
                    </div>
                </div>

                <div className="details-description flex justify-center align-center column">
                    <div className="main-details">
                        <p className="art-name">{selectedArtwork.name}</p>
                        <p className="artist-name flex align-center"> By {artist} </p>
                    </div>
                    <p className="art-description">{selectedArtwork.description}</p>
                </div>
                <Reviews onDeleteReview={this.onDeleteReview} sendMsg={this.sendMsg} reviews={this.props.reviews} loadReviews={this.props.loadReviews} selectedArtwork={this.props.match.params._id} loggedInUser={this.props.loggedInUser} ></Reviews>
                <div className="details-text-container flex justify-start">
                    <aside className="container flex justify-start column align-center">
                        <ul className="aside-fill">

                            <li>
                                {selectedArtwork.price && <p className="art-price"><span className="price">Price: </span><br></br><span className="var-price">${selectedArtwork.price.toLocaleString("USD")}</span></p>}
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
                        </ul>{this.state.currArtwork && <OrderAdd onBuy={this.addToCart} artwork={this.state.currArtwork} user={this.props.loggedInUser} />}


                        {/* === .artist._id &&  */}
                        {this.props.selectedArtwork.artist && this.props.loggedInUser._id === this.props.selectedArtwork.artist._id && <div className="action-btns flex justify-space-around">
                            <Link className="btn flex justify-center align-center" to={`/artwork/edit/${selectedArtwork._id}`}><button className="edit"></button></Link>
                            <button className="btn delete" onClick={this.onDelete}></button>
                        </div>}
                        {this.state.isAddedToCart && <div className="purchase-msg">
                            <h2>Thank you!</h2>
                            <p>Your payment was successful and your order is complete.</p>
                        </div>}
                        <div className="details-certificate flex justify-space-around">
                            <div className="flex column medal-area align-center"><div className="icon medal"></div> <div className="certificate-text">Original work delivered with a certificate of authenticity.</div></div>
                            <div className="flex column delivery-area align-center"><div className="icon delivery"></div><div className="certificate-text">Shipping usually takes up to 7 days.</div></div>
                            <div className="flex column return-area align-center"><div className="icon return"></div><div className="certificate-text">We have a 14 day withdrawal period, starting on the day you receive the work.</div></div>
                            <div className="flex column security-area align-center"><div className="icon security"></div><div className="certificate-text">You can pay safely by credit card or bank transfer.</div></div>
                            <div className="flex column warranty-area align-center"><div className="icon warranty"></div><div className="certificate-text">Reliability and traceability guaranteed. </div></div>
                        </div>
                    </aside>
                </div>


            </section>
        </React.Fragment >
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