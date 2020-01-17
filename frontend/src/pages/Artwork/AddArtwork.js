import React, { Component } from 'react';
import ArtworkForm from '../../cmps/Artwork/ArtworkForm'
import MainNavbar from '../../cmps/MainNavbar';
export default class AddArtwork extends Component {

    render() {
        return (<>
        <MainNavbar/>
        <section className="container add-artwork-container flex column">
            <h2>Add A New Artwork</h2>
            <ArtworkForm/>
        </section>
        </>)
    }
}
