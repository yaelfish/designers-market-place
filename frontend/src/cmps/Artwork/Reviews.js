import React, { Component } from 'react'


export default class Reviews extends Component {
    state = {
        msg: '',
    }
    msgHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState({ [name]: value })
    };


    addMsg = (ev, newMsg) => {
        ev.preventDefault();
        this.props.addMsg(newMsg);
    }



    render() {
        // console.log(this.props.reviews);
        return <div className="comments-container">
             Comments:
            <form className="comment-form flex">
                <textarea className placeholder="write something..." value={this.state.msg.txt} name="msg" onChange={this.msgHandleChange}></textarea>
                <button onClick={(event) => this.addMsg(event, this.state.msg)}>Publish</button>
            </form>
            <ul className="comments-area">
                {this.props.reviews.length > 0 && this.props.reviews.map((review, idx) => (
                    <li key={idx}><div className="comment-by-user">{review.byUser.fullName}</div> {review.msg}</li>
                ))}
            </ul>

        </div>

    }
}