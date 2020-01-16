import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtworkList from '../../cmps/Artwork/ArtworkList';
import { loadArtworks} from '../../actions/ArtworkActions';
import Tags from '../../cmps/Tags';

class AppArtwork extends Component {

    componentDidMount() {
        this.props.loadArtworks();
    }

    render() {
        return (
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
        )
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



// const gArtworks = [
//     {
//         "_id": "1111111",
//         "artist": {
//             "_id": "u1",
//             "fullName": "Puki Ben David"
//         },
//         "likedByUsers": [
//             {
//                 "_id": "u3",
//                 "fullName": "Ben Muk"
//             }
//         ],
//         "tags": [
//             "river",
//             "nature",
//             "sunset"
//         ],
//         "imgUrl": "https://www.howardshollow.com/canvascolor/IMAGES/modernist/b/2a.jpg",
//         "price": 260,
//         "createdAt": 582930400,
//         "description": "Beautiful river flowing over the sunset.",
//         "comments": [
//             {
//                 "text": "Beautiful picture, great for my living room"
//             }
//         ]
//     },
//     {
//         "_id": "222223",
//         "artist": {
//             "_id": "u2",
//             "fullName": "Shraga Puk"
//         },
//         "likedByUsers": [
//             {
//                 "_id": "u4",
//                 "fullName": "Muki Cohen"
//             }
//         ],
//         "tags": [
//             "lake",
//             "nature",
//             "reflection"
//         ],
//         "imgUrl": "https://i.etsystatic.com/15350345/r/il/ee7c87/1641242091/il_570xN.1641242091_iqg2.jpg",
//         "price": 350,
//         "createdAt": 582930582,
//         "description": "Extraordinary lake during fall time.",
//         "comments": [
//             {
//                 "text": "This picture makes me feel relaxed."
//             }
//         ]
//     },
//     {
//         "_id": "1111114",
//         "artist": {
//             "_id": "u1",
//             "fullName": "Puki Ben David"
//         },
//         "likedByUsers": [
//             {
//                 "_id": "u3",
//                 "fullName": "Ben Muk"
//             }
//         ],
//         "tags": [
//             "river",
//             "nature",
//             "sunset"
//         ],
//         "imgUrl": "https://sw16624.smartweb-static.com/upload_dir/shop/Hilma-af-klint-plakat-poster-ur.jpg",
//         "price": 260,
//         "createdAt": 582930400,
//         "description": "Beautiful river flowing over the sunset.",
//         "comments": [
//             {
//                 "text": "Beautiful picture, great for my living room"
//             }
//         ]
//     },
//     {
//         "_id": "2255222",
//         "artist": {
//             "_id": "u2",
//             "fullName": "Shraga Puk"
//         },
//         "likedByUsers": [
//             {
//                 "_id": "u4",
//                 "fullName": "Muki Cohen"
//             }
//         ],
//         "tags": [
//             "lake",
//             "nature",
//             "reflection"
//         ],
//         "imgUrl": "https://live.staticflickr.com/8474/29428372336_a31ed90fe4_b.jpg",
//         "price": 350,
//         "createdAt": 582930582,
//         "description": "Extraordinary lake during fall time.",
//         "comments": [
//             {
//                 "text": "This picture makes me feel relaxed."
//             }
//         ]
//     },
//     {
//         "_id": "1261111",
//         "artist": {
//             "_id": "u1",
//             "fullName": "Puki Ben David"
//         },
//         "likedByUsers": [
//             {
//                 "_id": "u3",
//                 "fullName": "Ben Muk"
//             }
//         ],
//         "tags": [
//             "river",
//             "nature",
//             "sunset"
//         ],
//         "imgUrl": "https://render.fineartamerica.com/images/rendered/default/print/12.000/7.875/break/images/artworkimages/medium/2/poolside-glamour-slim-aarons.jpg",
//         "price": 260,
//         "createdAt": 582930400,
//         "description": "Beautiful river flowing over the sunset.",
//         "comments": [
//             {
//                 "text": "Beautiful picture, great for my living room"
//             }
//         ]
//     },
//     {
//         "_id": "22772222",
//         "artist": {
//             "_id": "u2",
//             "fullName": "Shraga Puk"
//         },
//         "likedByUsers": [
//             {
//                 "_id": "u4",
//                 "fullName": "Muki Cohen"
//             }
//         ],
//         "tags": [
//             "lake",
//             "nature",
//             "reflection"
//         ],
//         "imgUrl": "https://hips.hearstapps.com/harpersbazaaruk.cdnds.net/17/22/1496228754-david-hockney-portrait-of-an-artist-pool-with-two-figures-1971.jpg",
//         "price": 1200,
//         "createdAt": 582930582,
//         "description": "Extraordinary lake during fall time.",
//         "comments": [
//             {
//                 "text": "This picture makes me feel relaxed."
//             }
//         ]
//     }
// ]