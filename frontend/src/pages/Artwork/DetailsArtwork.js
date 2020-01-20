import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadArtworkById, removeArtwork, editArtwork } from '../../actions/ArtworkActions';
import { loading, doneLoading } from '../../actions/SystemActions'
import { loadReviews,addReview } from '../../actions/ReviewActions'
import Reviews from '../../cmps/Artwork/Reviews'
// import Carousel from '../../cmps/Carousel';
import Breadcrumb from '../../cmps/Breadcrumb';
import like from '../../assets/images/icons/like.png';
import liked from '../../assets/images/icons/liked.png';

class DetailsArtwork extends Component {

    state = {
        isAddedToCart: false,
        isLiked: false
    }

    async componentDidMount() {
         try {
           const artwork = await (this.loadArtwork(), this.setIsLiked);
           const reviews = await this.loadReviews();
           console.log(this.state.isLiked);
           
         } catch (err) {
             console.log('err:' , err);
             
         }
    }

    setIsLiked = (artwork) => {
        artwork.likedByUsers.includes(this.props.loggedInUser) ? 
            this.setState({ isLiked: true }) : this.setState({ isLiked: false }) 
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
        await this.setState(prevState => ({ isLiked: !prevState.isLiked }), this.updateLiked); 
    }

    updateLiked = async () => {
        let { loggedInUser, selectedArtwork } = this.props;
        let artwork = { ...selectedArtwork };
        let usersLikes = artwork.likedByUsers;
        let arrLikes = this.state.isLiked ? 
                        usersLikes.push(loggedInUser) : 
                        usersLikes.filter(user => { 
                            return user._id !== loggedInUser._id 
                        });
        console.log(arrLikes, 'arrLikes');
        
        artwork = { ...artwork, arrLikes };
        this.setState({artwork})
        console.log(artwork);
        
        await this.props.editArtwork(artwork);
    } 

    loadArtwork = async() => {
        const { _id } = this.props.match.params;
        const currArtwork = await this.props.loadArtworkById(_id);
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

      addMsg = async newMsg => {
        await this.props.addReview(newMsg, this.props.selectedArtwork._id)
        this.loadReviews();
    };

    render() {
        const {isLiked} = this.state
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
                                <img alt="" src={this.props.selectedArtwork.imgUrl} ></img>
                            </div>
                            <div id="slide-2">2</div>
                            <div id="slide-3">3</div>
                            <div id="slide-4">4</div>
                            <div id="slide-5">5</div>
                        </div>
                    </div>

                    {/* <Carousel artSrc={selectedArtwork.imgUrl}/> */}
                    <img alt="" src={selectedArtwork.imgUrl} ></img>
                </div>

                <div className="details-text-container">
                    <aside className="container details-container">
                        <ul className="aside-fill">
                            <li>
                                <p className="art-name">{selectedArtwork.name}</p>
                                <p className="artist-name">{artist}</p>
                                <div className="like-display">
                                    <div className="preview-likes-container flex align-center">
                                        <label htmlFor="like-toggle">
                                        <img alt="" onClick={this.onToggleLike} 
                                             className="preview-icon-like" 
                                             src={isLiked ? liked : like} 
                                        />
                                            {/* <div onClick={this.onToggleLike} className={isLiked ? 'heart is-active' : 'heart'}></div> */}
                                        </label>
                                        
                                        <input type="checkbox" id="like-toggle"/>
                                        <span className="likes-counter">{likedByUsers}</span>
                                    </div>
                                </div>
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