import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtworkList from '../../cmps/Artwork/ArtworkList';
import { loadArtworks} from '../../actions/ArtworkActions';
import Tags from '../../cmps/Tags';
import MainNavbar from '../../cmps/MainNavbar';
import ArtistTabs from '../../cmps/Artist/ArtistTabs'


class AppArtwork extends Component {

 

    componentDidMount() {
        this.props.loadArtworks();
    }

    render() {
        return (
        <React.Fragment>
        <MainNavbar/>        
            <main className="container main-app-container artist-container">
                <header className="artist-header">
                      <h2>{this.props.user.fullName}'s Homepage</h2><img src={this.props.user.imgUrl}></img>
                    <p>
                     Your personal space for all your artworks, statistics and information.
                    </p>
        
                </header>

                <ArtistTabs artworks={this.props.artworks} user={this.props.user}></ArtistTabs>
              
            </main>
            
          

           
            
            </React.Fragment> )
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.artwork.artworks,
        user: {
            "_id" : "rjf93941jhfie2",
            "userName" : "kerryjm2020",
            "fullName" : "Kerry James Marshall",
            "password" : "1234567890",
            "isArtist"	: true,
            "imgUrl" : "http://lionhallattorneys.com.ng/wp-content/uploads/2015/12/empty-profile.png"
          }
    };
};
const mapDispatchToProps = {
    loadArtworks,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppArtwork);


