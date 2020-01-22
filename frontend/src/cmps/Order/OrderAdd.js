
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

        
            this.setState({ isAddMode: true });
            this.setState(prevState => ({order: { ...prevState.order, byUser : {_id : props.user._id, fullName: props.user.fullName}, artwork: {_id : artwork._id, name : artwork.name, price: artwork.price}}}))
          
    }

  
    onBuyNow = async () => {
        const { state, props } = this;
        const { order } = state;
        let addedOrder = this.props.addOrder({ ...order })
        this.props.onBuy()
        // this.props.history.push('/artwork');
    }


    render() {
        console.log('log from render',this.props.artwork)
        return (
            <button className="add-to-cart submit" onClick={this.onBuyNow}>Buy Now</button>
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

