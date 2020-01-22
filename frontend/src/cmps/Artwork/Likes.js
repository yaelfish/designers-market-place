import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocketService from '../../service/SocketService';
import { loadArtworkById, toggleLikeArtwork } from '../../actions/ArtworkActions';
import like from '../../assets/images/icons/like.png';
import liked from '../../assets/images/icons/like.png';

export default class Likes extends Component {
    state = {
        isLiked: false,
        selectedArtwork: {},
        msg: { from: 'Me', txt: '' },
        msgs: ['hi'],
        topic: 'Love'
    };

    componentDidMount() {
        console.log(this.props);
        this.setState({ selectedArtwork: this.props.selectedArtwork }, this.setIsLiked(this.props.loggedInUser._id) );
        
        // SocketService.setup();
        // SocketService.emit('chat topic', this.state.topic);
        // SocketService.on('chat addMsg', this.addMsg);
    }

    componentWillUnmount() {
        // SocketService.off('chat addMsg', this.addMsg);
        // SocketService.terminate();
    }

    setIsLiked = (currUserId) => {
        const likesArr = this.state.selectedArtwork.likedByUsers;
        const found = likesArr.find(user => user._id === currUserId);
        (found) ? this.setState({ isLiked: true }) : this.setState({ isLiked: false })
    }

    onToggleLike = async () => {
        await this.setState(prevState => ({ isLiked: !prevState.isLiked }))
        await this.updateLiked();
        console.log(this.state.isLiked);
    }

    updateLiked = async () => {
        debugger
        let { loggedInUser } = this.props;
        let { selectedArtwork } = this.state;
        let likes = [...selectedArtwork.likedByUsers];

        if (!this.state.isLiked) likes = likes.filter(user => user._id !== loggedInUser._id)
        else likes.push(loggedInUser)

        selectedArtwork.likedByUsers = likes;
        this.updateArtInStore({ ...selectedArtwork });
    }

    updateArtInStore = (selectedArtwork) => {
        this.props.updateLikedArtInStore(selectedArtwork);
    }


    addMsg = newMsg => {
        this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
    };

    changeTopic = () => {
        SocketService.emit('chat topic', this.state.topic);
    };

    sendMsg = ev => {
        ev.preventDefault();
        SocketService.emit('chat newMsg', this.state.msg.txt);
        this.setState({ msg: { from: 'Me', txt: '' } });
    };

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({ [name]: value }, () => this.changeTopic(value));
    };

    msgHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => {
            return {
                msg: {
                    ...prevState.msg,
                    [name]: value
                }
            };
        });
    };

    render() {
        const { isLiked } = this.state
        let likedByUsersObj = this.state.selectedArtwork.likedByUsers;
        let likedByUsers;
        if (likedByUsersObj) {
            likedByUsers = likedByUsersObj.length;
        }
        return (
            <React.Fragment>
                <div className="likes-container">
                    <h2>Lets Chat About {this.state.topic}</h2>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="topic"
                                value="Love"
                                checked={this.state.topic === 'Love'}
                                onChange={this.handleChange}
                            />
                            Love
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="topic"
                                value="Politics"
                                checked={this.state.topic === 'Politics'}
                                onChange={this.handleChange}
                            />
                            Politics
                        </label>
                    </div>
                    <form onSubmit={this.sendMsg}>
                        <input
                            type="text"
                            value={this.state.msg.txt}
                            onChange={this.msgHandleChange}
                            name="txt"
                        />
                        <button>Send</button>
                    </form>
                    <ul>
                        {this.state.msgs.map((msg, idx) => (
                            <li key={idx}>{msg}</li>
                        ))}
                    </ul>
                </div>

                <div className="like-display">
                    <div className="preview-likes-container flex align-center">
                        <label htmlFor="like-toggle">
                            <img alt="" onClick={this.onToggleLike}
                                className="preview-icon-like"
                                src={isLiked ? liked : like}
                            />
                            {/* <div onClick={this.onToggleLike} className={isLiked ? 'heart is-active' : 'heart'}></div> */}
                        </label>

                        <input type="checkbox" id="like-toggle" />
                        <span className="likes-counter">{likedByUsers}</span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
