import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadArtworkById } from '../../actions/ArtworkActions'
import ArtworkForm from '../../cmps/Artwork/ArtworkForm'
import MainNavbar from '../../cmps/MainNavbar';

class EditArtwork extends Component {

    componentDidMount() {
        this.loadArtwork();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            this.loadArtwork();
        }
    }

    loadArtwork = async () => {
        const { _id } = this.props.match.params;
        const selected = await this.props.loadArtworkById(_id);
    }

    goBack = () => {
        this.props.history.push('/artwork')
    }

    onEditArtwork = (editedArtwork) => {
        console.log(editedArtwork);
        
    }

    render() {
        if (!this.props.selectedArtwork) return <div className="loading">Loading...</div>
        const { selectedArtwork } = this.props;
        
        return (<>
            <MainNavbar />
            <section className="container add-artwork-container flex column">
                <h2>Edit Artwork</h2>
                <ArtworkForm artwork={selectedArtwork} onSave={this.onEditArtwork} isAdd={false}/>
            </section>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
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
)(EditArtwork)