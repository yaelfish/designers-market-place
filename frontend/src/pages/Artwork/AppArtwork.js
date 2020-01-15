import React, { Component } from 'react';
import ArtworkService from '../../service/ArtworkService';
import ArtworkList from '../../cmps/Artwork/ArtworkList';
// import Filter from '../cmps/Filter.js';

export default class AppArtwork extends Component {

    state = {
        artworks: [],
        // filterBy: {
        //     name: ''
        // },
        // sortBy: '',
        // sortOrder: 'asc'
    }

    componentDidMount() {
        this.loadArtworks();
    }

    loadArtworks = () => {
        // artworkService.query(this.state.filterBy, this.state.sortBy, this.state.sortOrder)
        ArtworkService.query()
            .then(artworks => this.setState({ artworks }))
            .catch((err) => this.props.history.push('/'));
    }

   

    render() {
        return (
            <div>
                <h1>Artworks</h1>
                <ArtworkList artworks={this.state.artworks} />
            </div>
        )
    }
}
