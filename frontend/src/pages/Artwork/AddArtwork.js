import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtworkForm from '../../cmps/Artwork/ArtworkForm'
import MainNavbar from '../../cmps/MainNavbar';
import { addArtwork } from '../../actions/ArtworkActions';

class AddArtwork extends Component {

    onAddArtwork = (artwork) => {
        this.props.addArtwork(artwork)
        console.log(artwork);
    }

    render() {
        return (<>
        <MainNavbar/>
        <section className="container add-artwork-container flex column">
            <h2>Add A New Artwork</h2>
            <ArtworkForm onSave={this.onAddArtwork} isAdd={true}/>
        </section>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        selectedArtwork: state.artwork.selectedArtwork
    }
}
const mapDispatchToProps = {
    addArtwork
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddArtwork);