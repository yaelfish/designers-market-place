import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { heartIcon } from '../../assets/images/greyheart.png';
import { loadArtworks, loadArtworkById } from '../../actions/ArtworkActions'
import ArtworkService from '../../service/ArtworkService';
import Breadcrumb from '../../cmps/Breadcrumb';
import MainNavbar from '../../cmps/MainNavbar';

class DetailsArtwork extends Component {

    // TODO: order redux (cart)
    state = {
        isAddedToCart: false
    }

    componentDidMount() {
        this.loadArtwork();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            this.loadArtwork();
        }
    }

    addToCart=()=> {
        this.setState({ isAddedToCart: true })
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
        return <React.Fragment>
            <MainNavbar /> 
            <Breadcrumb/>
            <section className="details-container flex">
                <div className="container details-image-container">
                    <img src={selectedArtwork.imgUrl} ></img>
                </div>
                <div className="details-text-container">
                    <table className="container details-container">
                        <tbody className="table-fill">
                            <tr><td className="art-name">{selectedArtwork.name}</td><td className="like-icon"></td></tr>
                            <tr><td className="art-description">{selectedArtwork.description}</td></tr>
                            <tr><td className="art-price">Price: {selectedArtwork.price}$</td></tr>
                            
                        </tbody>
                    </table>

                    <div className="action-btns flex justify-center">
                        <button className="add-to-cart" onClick={this.addToCart}>Add To Cart</button>
                        {this.state.isAddedToCart && <div className="purchased-modal">Purchased</div>}
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
    loadArtworkById,
    loadArtworks
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsArtwork)