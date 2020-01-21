import React, { Component } from 'react'
import SocketService from '../../service/SocketService'


export default class Reviews extends Component {
    state = {
        msg: '',
    }

    componentDidMount() {
        SocketService.setup();
        SocketService.emit('chat topic', this.props.selectedArtwork._id);
        SocketService.on('chat addMsg', this.addMsg);
    }

    // componentWillUnmount() {
    //     SocketService.off('chat addMsg', this.addMsg);
    //     SocketService.terminate();
    // }

    msgHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState({ [name]: value })
    };


    sendMsg = (ev, newMsg) => {
        ev.preventDefault();
        this.props.sendMsg(newMsg);
        SocketService.emit('chat newMsg', newMsg);
        this.setState({ msg: '' });
    }

    addMsg = (newMsg) => {
        return (<li className="flex align-center">
            <div className="flex column align-center comment-profile">
                <img src={this.props.loggedInUser.imgUrl}></img>
                <div className="comment-by-user">{this.props.loggedInUser.fullName}</div>
            </div>
            <div>{newMsg}</div>
            <button className="btn delete-review delete" onClick={this.props.onDeleteReview}></button>
        </li>)
    }



    render() {
        return <div className="comments-container">
            Comments:
            <form className="comment-form flex">
                <textarea placeholder="write something..." value={this.state.msg.txt} name="msg" onChange={this.msgHandleChange}></textarea>
                <button onClick={(event) => this.sendMsg(event, this.state.msg)}>Publish</button>
            </form>
            {this.props.reviews.length > 0 && <ul className="comments-area">
                {this.props.reviews.map((review, idx) => (
                    <li className="flex align-center" key={idx}>
                        <div className="flex column align-center comment-profile">
                            <img src={review.byUser.imgUrl}></img>
                            <div className="comment-by-user">{review.byUser.fullName}</div>
                        </div>
                        <div>{review.msg}</div>
                        <button className="btn delete-review delete" onClick={this.props.onDeleteReview}></button>
                    </li>
                ))}
                {this.addMsg}
            </ul>}

        </div>

    }
}