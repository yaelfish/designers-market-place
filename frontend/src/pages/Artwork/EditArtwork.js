import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadArtworkById, editArtwork } from '../../actions/ArtworkActions'
import ArtworkForm from '../../cmps/Artwork/ArtworkForm'

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
        const art = await this.props.loadArtworkById(_id);
    }

    goBack = () => {
        const { _id } = this.props.match.params;   
        this.props.history.push('/artwork/' + _id)
    }

    onEditArtwork = async (artwork) => {
        await this.props.editArtwork(artwork);
        console.log('onEditArtwork sent',artwork);   
        this.props.history.push('/artwork/' + artwork._id);
    }

    render() {
        if (!this.props.selectedArtwork) return <div className="loading">Loading...</div>
        // const { selectedArtwork } = this.props;
        return (<>
            <section className="container add-artwork-container flex column">
                <h2>Edit Artwork</h2>
                <ArtworkForm artwork={this.props.selectedArtwork} onSave={this.onEditArtwork} isAdd={false}/>
            </section>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        selectedArtwork: state.artwork.selectedArtwork,
        loggedInUser: state.user.loggedInUser
    }
}
const mapDispatchToProps = {
    loadArtworkById,
    editArtwork
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditArtwork)
);