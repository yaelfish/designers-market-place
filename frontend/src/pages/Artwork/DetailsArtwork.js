import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadArtworkById, removeArtwork, editArtwork, toggleLike } from '../../actions/ArtworkActions';
import { loading, doneLoading } from '../../actions/SystemActions'
import { loadReviews,addReview } from '../../actions/ReviewActions'
import Reviews from '../../cmps/Artwork/Reviews'
import Carousel from '../../cmps/Carousel';
// import ArtTemplate from '../../cmps/Artwork/TemplatesArt/ArtTemplate';
// import FramedArtwork from '../../Artwork/TemplatesArt/FramedArtwork';
import Breadcrumb from '../../cmps/Breadcrumb';
import like from '../../assets/images/icons/like.png';
import liked from '../../assets/images/icons/liked.png';

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
           this.setIsLiked(user._id);
           const reviews = await this.loadReviews();
         } catch (err) {
             console.log('err:' , err);
         }
    }

    setIsLiked = (currUserId) => {
       const likesArr = this.props.selectedArtwork.likedByUsers;
       const found = likesArr.find(user=>user._id === currUserId);
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
        // debugger
        let { loggedInUser, selectedArtwork } = this.props;
        let likes = [...selectedArtwork.likedByUsers];
        console.log(likes);
        
        if (this.state.isLiked) likes = likes.filter(user => user._id !== loggedInUser._id)
        else likes.push(loggedInUser)
       
        selectedArtwork.likedByUsers = likes;
        this.updateNewArtInStore({ ...selectedArtwork });
    } 

    updateNewArtInStore = async (selectedArtwork)=> {
        // debugger
        await this.props.editArtwork(selectedArtwork);
    }

    loadArtwork = async() => {
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

      addMsg = async newMsg => {
        await this.props.addReview(newMsg, this.props.selectedArtwork._id)
        this.loadReviews();
    };

    render() {
        console.log('render', this.state.isLiked);
        
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
            
            <section className="details-container flex column">
                <div className="details-product-container flex">
                <div className="container details-image-container">
                    <Carousel artSrc={selectedArtwork.imgUrl}/>
                        {/* <FramedArtwork artSrc={selectedArtwork.imgUrl} /> */}
                </div>

                <div className="details-text-container flex justify-space-between ">
                    <aside className="container details-container flex justify-space-between column">
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
                        {this.state.isAddedToCart && <div className="purchased-modal">Purchased</div>}
                        <div className="action-btns flex justify-center">
                        
                            <button className="btn back" onClick={this.goBack}>Back</button>
                            <Link className="btn edit-btn flex justify-center align-center" to={`/artwork/edit/${selectedArtwork._id}`}><button>Edit</button></Link>
                            <button className="btn delete" onClick={this.onDelete}></button> 
                        </div>
                    </aside>
                </div>
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
    toggleLike,
    addReview,
    loadReviews
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsArtwork)