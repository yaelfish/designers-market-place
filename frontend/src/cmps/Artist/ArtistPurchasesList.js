import React, { Component } from 'react';
import ArtistPurchasesPreview from './ArtistPurchasesPreview';
import { connect } from 'react-redux';
import { loadOrders } from '../../actions/OrderActions'


class ArtistPurchasesList extends Component {
    state =
        {
            purchases: null,
            orderedFromUsers: null,
            totalEarnings: 0,
            userOrders: null
        }

    componentDidMount() {
        this.setState({purchases : this.props.purchases})
        if (this.props.purchases === 'sold') this.loadOrdersSold()
        if (this.props.purchases === 'bought') this.loadOrdersBought()
    }

    calcEarnings = () => {
        const orderedFromUsers = [...this.state.orderedFromUsers];
        var totalEarnings = 0;
        for (var i=0; i<orderedFromUsers.length; i++){
            totalEarnings += orderedFromUsers[i].artwork.price;
        }
        this.setState({totalEarnings})
        this.props.updateTotalEarnings({totalEarnings})
    }

    loadOrdersSold = async () => {
        const artistId = this.props.loggedInUser._id
        await this.props.loadOrders({ artist: artistId });
        this.setState({ orderedFromUsers: this.props.orders})
        this.calcEarnings();
    }

    
    loadOrdersBought = () => {
        this.setState({ userOrders: this.props.orders})
    }


    render() {
        
        return (
            <div className="list-cards sold-list">
                {this.state.purchases === 'sold' && this.props.orders && this.props.artworks.map(artwork => {

                    const orderedFromUsers = this.state.orderedFromUsers;
                    let lastOrder;
                    var countTimesOrdered = 0;
                    orderedFromUsers.forEach(order => {
                        if (artwork._id === order.artwork._id) return (
                            countTimesOrdered++,
                            lastOrder = order
                        )
                    })


                    return (countTimesOrdered !== 0 && <ArtistPurchasesPreview key={artwork._id} artwork={artwork} timesSold={countTimesOrdered} lastOrder={lastOrder}>
                    </ArtistPurchasesPreview>)
                })}{this.state.purchases === 'bought' && this.props.orders && this.props.artworks.map(artwork => {
                    const userOrders = this.props.orders;
                    let lastOrder;
                    var countTimesOrdered = 0;
                    userOrders.forEach(order => {
                        if (artwork._id === order.artwork._id) return (
                            countTimesOrdered++,
                            lastOrder = order
                        )
                    })


                    return (countTimesOrdered !== 0 && <ArtistPurchasesPreview key={artwork._id} artwork={artwork} timesSold={countTimesOrdered} lastOrder={lastOrder}>
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
