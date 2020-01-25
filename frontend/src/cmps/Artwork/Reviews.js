import React, { Component } from 'react'
import SocketService from '../../service/SocketService'


export default class Reviews extends Component {
    state = {
        msg: '',
    }

    componentDidMount() {
        SocketService.setup();
        SocketService.emit('chat topic', this.props.selectedArtwork);
        SocketService.on('chat addMsg', this.receiveMsg);
    }

    componentWillUnmount() {
        SocketService.off('chat addMsg', this.addMsg);
        SocketService.terminate();
    }

    msgHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState({ [name]: value })
    };


    sendMsg = async (ev, newMsg) => {
        ev.preventDefault();
        const msgReturned = await this.props.sendMsg(newMsg);
        SocketService.emit('chat newMsg', msgReturned.msg);
        this.receiveMsg();

        this.setState({ msg: '' });
    }

    receiveMsg = (newMsg) => {
        console.log("we are there");

        this.props.loadReviews({ aboutArtworkId: this.props.selectedArtwork });
    }



    render() {
        return <div className="comments-container flex column">
            Comments:
            <form className="comment-form flex">
                <textarea placeholder="write something..." value={this.state.msg} name="msg" onChange={this.msgHandleChange}></textarea>
                <button className="publish" onClick={(event) => this.sendMsg(event, this.state.msg)}>Publish</button>
            </form>
            {this.props.reviews.length > 0 ? <ul className="comments-area">
                {this.props.reviews.map((review, idx) => (
                    <li className="flex align-center" key={idx}>
                        <div className="flex column align-center comment-profile">
                            <img src={review.byUser.imgUrl}></img>
                            <div className="comment-by-user">{review.byUser.userName}</div>
                        </div>
                        <div className="comment-user-msg">{review.msg}</div>
                        {this.props.loggedInUser._id === review.byUser._id && <button className="btn delete-review"
                            onClick={() => this.props.onDeleteReview(review._id)}></button>}
                    </li>
                ))}

            </ul>:<p className="no-comments-msg">No Comments</p>}

        </div>

    }
}