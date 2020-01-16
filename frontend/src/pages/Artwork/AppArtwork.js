import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtworkList from '../../cmps/Artwork/ArtworkList';
import { loadArtworks} from '../../actions/ArtworkActions';
import Tags from '../../cmps/Tags';
import MainNavbar from '../../cmps/MainNavbar';

class AppArtwork extends Component {

    componentDidMount() {
        this.props.loadArtworks();
    }

    render() {
        return (
        <React.Fragment>
        <MainNavbar/>
        
            <main className="container main-app-container">
                <header>
                    <h2>ART PRINTS</h2>
                    <p>
                        Purchase museum-quality art prints from the world's greatest living artists and iconic brands. Each print is produced using archival inks guaranteed to last for 75 years without fading or loss of color.
                    </p>
                </header>
                <Tags />
                <ArtworkList artworks={this.props.artworks} />
            </main>
            </React.Fragment> )
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.artwork.artworks,
    };
};
const mapDispatchToProps = {
    loadArtworks,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppArtwork);


