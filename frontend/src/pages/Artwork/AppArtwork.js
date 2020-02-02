import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtworkList from '../../cmps/Artwork/ArtworkList';
import { loadArtworks } from '../../actions/ArtworkActions';
import Tags from '../../cmps/Tags';
import Spinner from '../../cmps/Spinner'


class AppArtwork extends Component {

    state = {
        tags: null
    }

    componentDidMount() {
        this.loadArtworks()
    }



    loadArtworks = () => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const tags =  params.get('tags');
        this.setState({tags});
        (tags)&&this.props.loadArtworks({tags})||(!this.props.artworks)&&this.props.loadArtworks()
    }

    render() {
        return (
            <React.Fragment>
                <main className="container main-app-container">
                    <header>
                        <h2>ART PRINTS</h2>
                        <p>
                            Purchase museum-quality art prints from the world's greatest living artists and iconic brands. Each print is produced using archival inks guaranteed to last for 75 years without fading or loss of color.
                        </p>
                    </header>
                    <Tags />
                   {this.props.artworks?<ArtworkList artworks={this.props.artworks} />:<Spinner></Spinner>}
                </main>
            </React.Fragment>)
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.artwork.artworks,
        loggedInUser: state.user.loggedInUser
    };
};
    const mapDispatchToProps =  {
    loadArtworks,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppArtwork);

