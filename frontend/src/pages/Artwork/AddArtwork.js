import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtworkForm from '../../cmps/Artwork/ArtworkForm'
import { addArtwork } from '../../actions/ArtworkActions';

class AddArtwork extends Component {

    onAddArtwork = async (artwork) => {
        let addedArt = this.props.addArtwork(artwork)
        this.props.history.push('/');
    }

    render() {
        return (<>
        <section className="container add-artwork-container flex column">
            <h2>Add A New Artwork</h2>
            <ArtworkForm artist={this.props.loggedInUser} onSave={this.onAddArtwork} isAdd={true}/>
        </section>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        // selectedArtwork: state.artwork.selectedArtwork,
        loggedInUser: state.user.loggedInUser
    }
}
const mapDispatchToProps = {
    addArtwork
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddArtwork);