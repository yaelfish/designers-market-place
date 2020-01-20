import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtworkList from '../../cmps/Artwork/ArtworkList';
import { loadArtworks } from '../../actions/ArtworkActions';
import Tags from '../../cmps/Tags';

class AppArtwork extends Component {



    componentDidMount() {
        this.loadArtworks();

    }

    loadArtworks = () => {

        this.props.loadArtworks(this.props.location.filterProps)
    }



    render() {
        return (
            <React.Fragment>

                <main className="container main-app-container">
                    <header>
                        <h2>ART PRINTS {this.props.location.filterProps&&("/ "+this.props.location.filterProps.tags)}</h2>
                        <h4>Hello {this.props.loggedInUser.fullName}</h4>
                        <p>
                            Purchase museum-quality art prints from the world's greatest living artists and iconic brands. Each print is produced using archival inks guaranteed to last for 75 years without fading or loss of color.
                    </p>
                    </header>
                    <Tags />
                    <ArtworkList artworks={this.props.artworks} />
                </main>
            </React.Fragment>)
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.artwork.artworks,
        // loggedInUser: state.user.loggedInUser
        loggedInUser: {
            _id: "5e21b63a1c9d44000093752d",
            userName: "kerryjm2020",
            fullName: "Kerry James Marshall",
            password: "1234567890",
            isArtist: true,
            imgUrl: "http://lionhallattorneys.com.ng/wp-content/uploads/2015/12/empty-profile.png",
            email: "kerryjm2020@gmail.com"
        }
    };
};
const mapDispatchToProps = {
    loadArtworks,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppArtwork);


