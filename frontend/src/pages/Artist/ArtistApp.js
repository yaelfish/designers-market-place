import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, animateScroll as scroll } from "react-scroll";
import ArtworkList from '../../cmps/Artwork/ArtworkList';
import { loadArtworks } from '../../actions/ArtworkActions';
import { loadOrders } from '../../actions/OrderActions'
import ArtistPurchasesList from '../../cmps/Artist/ArtistPurchasesList'
import Tags from '../../cmps/Tags';
import ArtistTabs from '../../cmps/Artist/ArtistTabs'
import ScrollTop from '../../assets/images/icons/scrolltop.png'


class AppArtwork extends Component {

    state = {
        artistArtworks: [],
        artworksBoughtByUser: [],
        totalEarnings: 0

    }

    async componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        await this.props.loadArtworks()
        this.loadArtistArtworks();
        this.loadPurchases();
    }

    handleScroll = () => {
        const { prevScrollpos } = this.state;
        const currentScrollPos = window.pageYOffset;
        this.setState({
            prevScrollpos: currentScrollPos,

        });
    };

    updateTotals = (totalEarnings) => {
        this.setState(totalEarnings, console.log('artistartworks', this.state.artistArtworks))


    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);

    }

    loadPurchases = async () => {
        await this.props.loadOrders();
        const userOrders = this.props.orders.filter(order => {
            return order.byUser._id === this.props.loggedInUser._id
        })
        const artworksBoughtByUser = this.props.artworks.filter(artwork => {
            for (let i = 0; i < userOrders.length; i++) {
                if (userOrders[i].artwork._id === artwork._id)
                    return true;
            }
            return false;
        })
        this.setState({ artworksBoughtByUser })
    }

    loadArtistArtworks = async () => {
        const artistArtworks = this.props.artworks.filter(artwork => {
            return this.props.loggedInUser._id === artwork.artist._id
        })
        this.setState({ artistArtworks })
    }

    render() {
        return (
            <React.Fragment>

                <main className="container main-app-container-artist artist-container">
                    {window.pageYOffset !== 0 && <div className="top-scroller" onClick={() => { scroll.scrollToTop() }}><img src={ScrollTop} /></div>}
                    <header className="artist-header">
                        <h2>{this.props.loggedInUser.fullName}'s Homepage</h2><img className="profile-pic" src={this.props.loggedInUser.imgUrl}></img>
                        {this.props.loggedInUser && this.props.loggedInUser.isArtist ? <p>
                            Your personal space for all your artworks, statistics and information.
                    </p> : <p>Check out all the artworks you have purchased so far.</p>}
                    </header>

                    <div className="anchor-links">
                        {/* <a href="#profile">Profile  </a> */}
                        <Link className="anchor-link" activeClass="anchor-active" to="profile" spy={true} smooth={true} offset={-70} duration={500} >Profile</Link>

                        {this.props.loggedInUser && this.props.loggedInUser.isArtist && <Link className="anchor-link" activeClass="anchor-active" to="artwork-list" spy={true} smooth={true} offset={-70} duration={500} >Artworks</Link>}

                        {this.props.loggedInUser && this.props.loggedInUser.isArtist && <Link className="anchor-link" activeClass="anchor-active" to="sold" spy={true} smooth={true} offset={-70} duration={500} >Sold</Link>}

                        <Link className="anchor-link" activeClass="anchor-active" to="purchases" spy={true} smooth={true} offset={-70} duration={500} >Purchases</Link>

                        {/* <a href="#statistics">Statistics </a> */}
                    </div>


                    <div id="profile" className="profile-container">
                        <h2>Profile</h2>
                        <div className="profile-text">
                            <div className="profile-item"><p>Name: {this.props.loggedInUser.fullName}</p></div>
                            <div className="profile-item"><p>Birthdate: October 17, 1955 (age 64 years)</p></div>
                            <div className="profile-item"><p>About: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit, lectus nec volutpat aliquet, mi erat condimentum lorem, in congue magna augue nec odio. Integer iaculis cursus imperdiet. Duis molestie diam volutpat lorem mollis, ut volutpat tellus imperdiet. Duis ac venenatis lacus. Etiam tincidunt urna in semper rutrum. Pellentesque finibus vestibulum nulla vel aliquet. Sed sagittis mi at neque malesuada egestas. Donec ac dapibus magna. Praesent imperdiet libero in erat egestas ultrices. Ut vel aliquet leo.</p></div>
                        </div>
                        <div><button className="profileButton">Edit</button></div>
                    </div>

                    {this.props.loggedInUser && this.props.loggedInUser.isArtist && <div id="artwork-list" className="artist-artworks-list">
                        <h2>Your Artworks</h2>
                        <ArtworkList artworks={this.state.artistArtworks} /></div>}

                    {this.props.loggedInUser && this.props.loggedInUser.isArtist && <div id="sold" className="sold-container">
                        <h2>Sold</h2>
                        <div className="sold-list-titles flex justify-space-around">
                            <div className="sold-list-title artwork-title">Artwork</div>
                            <div className="sold-list-title">Name</div>
                            <div className="sold-list-title">Last Sell</div>
                            <div className="sold-list-title">Likes</div>
                            <div className="sold-list-title">Quantity</div>
                            <div className="sold-list-title">Earnings</div>
                        </div>
                        <ArtistPurchasesList artworks={this.state.artistArtworks} updateTotals={this.updateTotals} />
                        <div className="sales-summary"> <p>Total Earnings: ${this.state.totalEarnings.toLocaleString("USD")}</p>
                        </div>
                    </div>
                    }

                    <div id="purchases" className="artist-artworks-list">
                        <h2>Your Purchases</h2>
                        <ArtworkList artworks={this.state.artworksBoughtByUser} /></div>


                    {/* <div id="statistics">Some Statistics</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div> */}
                    {/* <ArtistTabs artworks={this.props.artworks} artistUser={this.props.loggedInUser}></ArtistTabs> */}


                </main>





            </React.Fragment>)
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.artwork.artworks,
        orders: state.order.orders,
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    loadArtworks,
    loadOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(AppArtwork);


