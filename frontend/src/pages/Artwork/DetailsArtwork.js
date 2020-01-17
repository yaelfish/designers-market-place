import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadArtworkById } from '../../actions/ArtworkActions'
import Carousel from '../../cmps/Carousel';
import Breadcrumb from '../../cmps/Breadcrumb';
import MainNavbar from '../../cmps/MainNavbar';

class DetailsArtwork extends Component {

    // TODO: order redux (cart)
    state = {
        isAddedToCart: false,
        isLiked: false
    }

    componentDidMount() {
        this.loadArtwork();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            this.loadArtwork();
        }
    }

    addToCart = () => {
        this.setState({ isAddedToCart: true })
    }

    onToggleLike = () => {
        this.setState(prevState => ({ isLiked: !prevState.isLiked }));
    }

    loadArtwork = async() => {
        const { _id } = this.props.match.params;
        const selected = await this.props.loadArtworkById(_id);
    }

    goBack = () => {
        this.props.history.push('/artwork')
    }

    onDelete = () => {
        this.props.deleteToy(this.state.artwork._id)
        this.props.history.push('/artwork')
    }

    render() {
      
        if (!this.props.selectedArtwork) return <div className="loading">Loading...</div>
        const { selectedArtwork } = this.props;
        console.log(selectedArtwork);
        // let likes = selectedArtwork.likedByUsers.length;
        // console.log(likes);
        
        return <React.Fragment>
            <MainNavbar />
            <Breadcrumb />
            <section className="details-container flex">
                <div className="container details-image-container">
                    {/* <Carousel artSrc={selectedArtwork.imgUrl}/> */}
                    <img src={selectedArtwork.imgUrl} ></img>
                </div>
                <div className="details-text-container">
                    <aside className="container details-container">
                        <ul className="aside-fill">
                            <li>
                                <p className="art-name">{selectedArtwork.name}</p>
                                <button className="like-display" onClick={this.onToggleLike}>
                                    <span className={(this.state.isLiked ? 'liked-icon': 'like-icon')}></span>
                                    <span className="likes-num">13</span>
                                </button>
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
                            {/* {(this.props.user.userName === "admin") && <Link className="btn" to={`/artwork/${artwork._id}/edit`}>Edit</Link>} */}
                            {/* {(this.props.user.userName === "admin") && <button className="btn warning" onClick={this.onDelete}>Delete</button>} */}
                        </div>
                    </aside>
                </div>


            </section>
        </React.Fragment>
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
    loadArtworkById
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsArtwork)