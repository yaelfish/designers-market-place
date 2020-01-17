import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { heartIcon } from '../../assets/images/greyheart.png';
import { loadArtworks, getArtworkById } from '../../actions/ArtworkActions'
import ArtworkService from '../../service/ArtworkService';
import Breadcrumb from '../../cmps/Breadcrumb';
import MainNavbar from '../../cmps/MainNavbar';

class DetailsArtwork extends Component {

    state = {
        isAddedToCart: false
    }

    componentDidMount() {
        this.loadArtwork();
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
        const { id } = this.props.match.params;
        const selectedArtwork = await this.props.getArtworkById(id)
        // this.setState({ selectedArtwork })
    }

    goBack = () => {
        this.props.history.push('/artwork')
    }

    // onDelete = () => {
    //     this.props.deleteToy(this.state.artwork._id)
    //     this.props.history.push('/artwork')
    // }

    render() {
        const selectedArtwork = {
            "_id": "1111111",
            "name": "name of this art",
            "artist": {
                "_id": "u1",
                "fullName": "Puki Ben David"
            },
            "likedByUsers": [
                {
                    "_id": "u3",
                    "fullName": "Ben Muk"
                }
            ],
            "tags": [
                "river",
                "nature",
                "sunset"
            ],
            "imgUrl": "https://www.howardshollow.com/canvascolor/IMAGES/modernist/b/2a.jpg",
            "price": 260,
            "createdAt": 582930400,
            "description": "Beautiful river flowing over the sunset.",
            "comments": [
                {
                    "text": "Beautiful picture, great for my living room"
                }
            ]
        }
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
                                <img src={selectedArtwork.imgUrl} ></img>
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
                            <tr><td className="art-name">{selectedArtwork.name}</td><td className="like-icon"></td></tr>
                            <tr><td className="art-description">{selectedArtwork.description}</td></tr>
                            <tr><td className="art-price">Price</td><td>{selectedArtwork.price}$</td></tr>
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
    getArtworkById,
    loadArtworks
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsArtwork)