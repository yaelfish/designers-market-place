import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { loadArtworks } from '../actions/ArtworkActions'
import { connect } from 'react-redux';

class Tags extends Component {

    state = {
        tags: ["photography","illustration","nature","abstract","landscape","portrait","vintage","popart","watercolor"]
    }

    loadArtworks = (tag) => {
        this.props.loadArtworks({tags : tag})
    }
    // to do: render key words dynamically with a loop
    render() {
        return (
            <section className="tags-container">
                <ul>
                    {this.state.tags.map(tag => {
                        return <li onClick={() => this.loadArtworks(tag)} className="tag" key={tag}><NavLink  to={`/artwork?tags=${tag}`} exact>{tag}</NavLink></li>
                        
                    })}
                </ul>
            </section>
    )
    }
}


const mapStateToProps = state => {
    return {
        artworks: state.artwork.artworks,
    };
};
    const mapDispatchToProps =  {
    loadArtworks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);