import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadArtworkById } from '../../actions/ArtworkActions'

class ByArtist extends Component {

    state = {
        artist: ''
    }

    componentDidMount() {
        this.loadArtwork();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            this.loadArtwork();
        }
    }

    loadArtwork = async () => {
        const { _id } = this.props.match.params;
        let currWork = await this.props.loadArtworkById(_id);
        let currArtist = currWork.artist.fullName;
        this.setState({ artist: currArtist });
    }

    render() {
        // if (!this.props.selectedArtwork) return 
        // const { selectedArtwork } = this.props;
        // console.log(selectedArtwork);

        return <React.Fragment>
            <aside className="details-container flex">
                <div className="container details-image-container">
                    {/* <Carousel artSrc={selectedArtwork.imgUrl}/> */}
                    {/* <img src={selectedArtwork.imgUrl} ></img> */}
                    {this.state.artist}
                </div>
            </aside>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        selectedArtwork: state.artwork.selectedArtwork,
        user: state.user
    }
}
const mapDispatchToProps = {
    loadArtworkById
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ByArtist)