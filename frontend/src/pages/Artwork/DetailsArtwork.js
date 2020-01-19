import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { heartIcon } from '../../assets/images/greyheart.png';
import { getArtworkById } from '../../actions/ArtworkActions'
import { loadReviews } from '../../actions/ReviewActions'
import ArtworkService from '../../service/ArtworkService';
import Breadcrumb from '../../cmps/Breadcrumb';
import MainNavbar from '../../cmps/MainNavbar';
import Reviews from '../../cmps/Artwork/Reviews'
import { addReview } from '../../actions/ReviewActions'

class DetailsArtwork extends Component {

    state = {
        isAddedToCart: false,
    }

    componentDidMount() {
        this.loadArtwork();
        this.loadReviews();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadArtwork();
        }
    }


    addToCart = () => {
        this.setState({ isAddedToCart: true })
    }

    async loadArtwork() {
        const { _id } = this.props.match.params;
        await this.props.getArtworkById(_id)
    }

    loadReviews = async () => {
        const { _id } = this.props.match.params;
        await this.props.loadReviews({ aboutArtworkId: _id })
    };

    goBack = () => {
        this.props.history.push('/artwork')
    }

    addMsg = async newMsg => {
        await this.props.addReview(newMsg, this.props.selectedArtwork._id)
        this.loadReviews();
    };

    // onDelete = () => {
    //     this.props.deleteToy(this.state.artwork._id)
    //     this.props.history.push('/artwork')
    // }

    render() {
        console.log(this.props.reviews);
        // if (!this.props.selectedArtwork) return <div className="loading">Loading...</div>
        // const { selectedArtwork } = this.props;
        return <React.Fragment>
            <MainNavbar />
            <Breadcrumb />
            <section className="details-container flex column">
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

                </div>

                <div className="details-text-container">
                    <table className="container details-container">
                        <tbody className="table-fill">
                            <tr><td className="art-name">{this.props.selectedArtwork.name}</td><td className="like-icon"></td></tr>
                            <tr><td className="art-description">{this.props.selectedArtwork.description}</td></tr>
                            <tr><td className="art-price">Price</td><td>{this.props.selectedArtwork.price}$</td></tr>
                            <button className="add-to-cart" onClick={this.addToCart}>Add To Cart</button>
                            {this.state.isAddedToCart && <div className="purchased-modal">Purchased</div>}
                        </tbody>
                    </table>

                    <div className="action-btns flex justify-center">
                        <button className="btn" onClick={this.goBack}>Back</button>
                        {/* {(this.props.user.userName === "admin") && <Link className="btn" to={`/artwork/${artwork._id}/edit`}>Edit</Link>} */}
                        {/* {(this.props.user.userName === "admin") && <button className="btn warning" onClick={this.onDelete}>Delete</button>} */}
                    </div>
                </div>

                <Reviews addMsg={this.addMsg} reviews={this.props.reviews} ></Reviews>
            </section>
        </React.Fragment>
    }
}
const mapStateToProps = (state) => {
    return {
        selectedArtwork: state.artwork.selectedArtwork,
        reviews: state.review.reviews,
        user: state.user,
        loggedInUser: state.user.loggedInUser

    }
}
const mapDispatchToProps = {
    getArtworkById,
    loadReviews,
    addReview
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsArtwork)