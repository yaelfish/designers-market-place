import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtworkList from '../../cmps/Artwork/ArtworkList';
import { loadArtworks} from '../../actions/ArtworkActions';
import Tags from '../../cmps/Tags';
import ArtistTabs from '../../cmps/Artist/ArtistTabs'


class AppArtwork extends Component {

    state = {
        artistArtworks: []
      }

    componentDidMount() {
        this.props.loadArtworks();
        this.loadArtistArtworks();
        
    }

    loadArtistArtworks = () =>
    {
  
      const artistArtworks = this.props.artworks.filter(artwork => {
        return this.props.loggedInUser._id === artwork.artist._id
      })
      this.setState({artistArtworks})
    }

    render() {
        return (
        <React.Fragment>
      
            <main className="container main-app-container artist-container">
                <header className="artist-header">
                      <h2>{this.props.loggedInUser.fullName}'s Homepage</h2><img className="profile-pic" src={this.props.loggedInUser.imgUrl}></img>
                    <p>
                     Your personal space for all your artworks, statistics and information.
                    </p>
                </header>

                <ArtworkList artworks={this.state.artistArtworks} />
                {/* <ArtistTabs artworks={this.props.artworks} artistUser={this.props.loggedInUser}></ArtistTabs> */}
              
            </main>
            
          

           
            
            </React.Fragment> )
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.artwork.artworks,
        // loggedInUser: {
        //     "_id" : "5e21b63a1c9d44000093752d",
        //     "userName" : "kerryjm2020",
        //     "fullName" : "Kerry James Marshall",
        //     "password" : "1234567890",
        //     "isArtist"	: true,
        //     "imgUrl" : "https://www.americanacademy.de/wp-content/uploads/2017/04/Marshall-Kerry-James-1.jpg"
        //   }
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    loadArtworks,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppArtwork);


