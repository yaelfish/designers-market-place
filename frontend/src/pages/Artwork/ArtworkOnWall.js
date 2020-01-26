import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadArtworkById, editArtwork } from '../../actions/ArtworkActions';
import  wall1  from '../../assets/images/template-imgs/wall1.png';
import wall2 from '../../assets/images/template-imgs/wall2.jpg';
import wall3 from '../../assets/images/template-imgs/wall3.jpg';
import ArtTemplate from '../../cmps/Artwork/TemplatesArt/ArtTemplate';
// import  wall2  from '../assets/images/template-imgs/wall3.jpg';

class ArtworkOnWall extends Component {

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
        const art = await this.props.loadArtworkById(_id);
    }

    goBack = () => {
        const { _id } = this.props.match.params;
        this.props.history.push('/artwork/' + _id)
    }

    onEditArtwork = async (artwork) => {
        await this.props.editArtwork(artwork);
        console.log('onEditArtwork sent', artwork);
        this.props.history.push('/artwork/' + artwork._id);
    }

    render() {
        if (!this.props.selectedArtwork) return <div className="loading">Loading...</div>
        const { selectedArtwork } = this.props;
        console.log(selectedArtwork);
        
        return (<>
            <ArtTemplate selectedArtwork={selectedArtwork.imgUrl}/>
            {/* <section className="hang-on-wall-container flex justify-center align-center wrap">
                <div className="carousel-container">
                    <div className="big-img-container picture-mixin">
                        <img className="wall-bg-large" src={selectedArtwork.imgUrl} alt="artwork display on a wall"></img>
                    </div>
                    <div className="small-images-container flex">
                        <div className="picture-mixin" onClick={this.onArtWorkClicked}>
                            <img className="wall-bg-small square-ratio" src={wall2} alt="artwork display on a wall"></img>
                            <img className="wall-bg-small" src={selectedArtwork.imgUrl} alt="artwork display on a wall" width="500" height="500"></img>
                        </div>
                        <div className="picture-mixin" onClick={this.onArtWorkClicked}>
                            <img className="wall-bg square-ratio" src={wall3} alt="artwork display on a wall"></img>
                            <img className="wall-bg" src={selectedArtwork.imgUrl} alt="artwork display on a wall" width="500" height="500"></img>
                        </div>
                    </div>
                </div>
            </section> */}
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        selectedArtwork: state.artwork.selectedArtwork,
        loggedInUser: state.user.loggedInUser
    }
}
const mapDispatchToProps = {
    loadArtworkById,
    editArtwork
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ArtworkOnWall)
);