import React, { Component } from 'react';
import ArtistPurchasesPreview from './ArtistPurchasesPreview';
import { connect } from 'react-redux';
import { loadOrders } from '../../actions/OrderActions'


class ArtistPurchasesList extends Component {
    state =
        {
            purchases: 'sold',
            orderedFromUsers: null,
            totalEarnings: 0,
            numOfArtworks: 0
        }

    componentDidMount() {
        this.loadOrders()

    }

    calcEarnings = () => {
        const orderedFromUsers = [...this.state.orderedFromUsers];
      
        var totalEarnings = 0;
        for (var i=0; i<orderedFromUsers.length; i++){
            totalEarnings += orderedFromUsers[i].artwork.price;
        }
        this.setState({totalEarnings, numOfArtworks: [...this.props.artworks].length})
        console.log(this.state.numOfArtworks)

    }

    loadOrders = async () => {
        const artistId = this.props.loggedInUser._id
        await this.props.loadOrders({ artist: artistId });
        this.setState({ orderedFromUsers: this.props.orders })
        // return orderedFromUsers
        this.calcEarnings();

    }


    render() {
        
        return (
            <div className="list-cards sold-list">
                {this.state.purchases === 'sold' && this.props.orders && this.props.artworks.map(artwork => {

                    const orderedFromUsers = this.state.orderedFromUsers;
                    var countTimesOrdered = 0;
                    orderedFromUsers.forEach(order => {
                        if (artwork._id === order.artwork._id) return countTimesOrdered++
                    })


                    return (countTimesOrdered !== 0 && <ArtistPurchasesPreview key={artwork._id} artwork={artwork} timesSold={countTimesOrdered}>
                    </ArtistPurchasesPreview>)
                })}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loggedInUser: state.user.loggedInUser
    };
};

const mapDispatchToProps = {
    loadOrders
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistPurchasesList)
