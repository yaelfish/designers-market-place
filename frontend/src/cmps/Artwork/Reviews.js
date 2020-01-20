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
        return <div className="comments-container">
            Comments:
            <form className="comment-form flex">
                <textarea placeholder="write something..." value={this.state.msg.txt} name="msg" onChange={this.msgHandleChange}></textarea>
                <button onClick={(event) => this.addMsg(event, this.state.msg)}>Publish</button>
            </form>
            {this.props.reviews.length > 0 && <ul className="comments-area">
                {this.props.reviews.map((review, idx) => (
                    <li className="flex align-center" key={idx}>
                        <div className="flex column align-center comment-profile">
                            <img src={review.byUser.imgUrl}></img>
                            <div className="comment-by-user">{review.byUser.fullName}</div>
                        </div>
                        <div>{review.msg}</div>
                        <button className="btn delete-review delete" onClick={this.onDeleteReview}></button>
                    </li>

                ))}
            </ul>}

        </div>

    }
}