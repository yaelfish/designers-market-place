import React, { Component } from 'react';
import { render } from "react-dom";

import Tabs from './Tabs/Tabs';
import ArtworkList from '../../cmps/Artwork/ArtworkList';



class ArtistTabs extends Component {
  state = {
    artistArtworks: []
  }

  componentDidMount() {
    this.loadArtistArtworks();
}

  loadArtistArtworks = () =>
  {
    
    const artistArtworks = this.props.artworks.filter(artwork => {
      return this.props.user._id === artwork.artist._id
    })
    this.setState({artistArtworks})
  }

  render() {
    return (
      <div>
        {/* <h1>Artist Space</h1> */}
        <Tabs>
          <div label="Artworks">
            <ArtworkList artworks={this.state.artistArtworks} />
          </div>
          <div label="Statistics">
            insert statistics here
        </div>
          <div label="Profile">
            Name: {this.props.user.fullName}
            <div><button className="profileButton">Edit</button></div>
          </div>
        </Tabs>
      </div>
    );
  }

}

export default ArtistTabs