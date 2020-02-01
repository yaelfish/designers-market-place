
import React, { Component } from 'react';
import { addOrder } from '../../actions/OrderActions';
import { connect } from 'react-redux';


class OrderAdd extends Component {
    state = {
        order: {
            byUser: null,
            artwork: null,
            createdAt: Date.now(),
            isCheckedOut: true,
            quantity: 1
        }

    }

    async componentDidMount() {

        const { props } = this
        const artwork = props.artwork;
        if (props.user) {
            this.setState({ isAddMode: true });
            this.setState(prevState => ({ order: { ...prevState.order, byUser: { _id: props.user._id, fullName: props.user.fullName }, artwork: { _id: artwork._id, name: artwork.name, price: artwork.price, artistId: artwork.artist._id } } }))
        }
    }


    onBuyNow = async () => {
        const { state, props } = this;
        const { order } = state;
        if (props.user) {
            let addedOrder = this.props.addOrder({ ...order })
            this.props.onBuy()
        }
        else {
            this.props.showLoginModal();
        }
        // this.props.history.push('/artwork');
    }


    render() {
        return (
            <button className="add-to-cart submit flex justify-center align-center" onClick={this.onBuyNow}><div>Buy Now</div></button>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
    addOrder
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderAdd)

