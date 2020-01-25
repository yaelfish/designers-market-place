import React, { Component } from 'react';
import ArtistPurchasesPreview from './ArtistPurchasesPreview';
import { connect } from 'react-redux';
import { loadOrders } from '../../actions/OrderActions'


class ArtistPurchasesList extends Component {
    state =
        {
            purchases: 'sold',
            orderedFromUsers: null,
            totalEarnings: 0
        }

    componentDidMount() {
        this.loadOrders()

    }

    calcEarnings = (totalEarnings) => {
        this.setState({totalEarnings})

    }

    loadOrders = async () => {
        const artistId = this.props.loggedInUser._id
        const orderedFromUsers = await this.props.loadOrders({ artist: artistId });

        this.setState({ orderedFromUsers: this.props.orders })
        return orderedFromUsers
    }


    render() {
        var totalEarnings = 0;
        return (
            <div className="list-cards sold-list">
                {this.state.purchases === 'sold' && this.props.orders && this.props.artworks.map(artwork => {

                    const orderedFromUsers = this.state.orderedFromUsers;
                    var countTimesOrdered = 0;
                    orderedFromUsers.forEach(order => {
                        if (artwork._id === order.artwork._id) return countTimesOrdered++
                    })

                    totalEarnings += [countTimesOrdered*artwork.price];

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
