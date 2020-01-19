// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import SocketService from '../service/SocketService';
// import { loadArtworkById, toggleLikeArtwork } from '../../actions/ArtworkActions';
// import like from '../../assets/images/icons/like.png';
// import liked from '../../assets/images/icons/like.png';

// export default class Likes extends Component {
//     state = {
//         msg: { from: 'Me', txt: '' },
//         msgs: ['hi'],
//         topic: 'Love'
//     };

//     componentDidMount() {
//         // SocketService.setup();
//         // SocketService.emit('chat topic', this.state.topic);
//         // SocketService.on('chat addMsg', this.addMsg);
//     }

//     componentWillUnmount() {
//         // SocketService.off('chat addMsg', this.addMsg);
//         // SocketService.terminate();
//     }

//     addMsg = newMsg => {
//         this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
//     };

//     changeTopic = () => {
//         SocketService.emit('chat topic', this.state.topic);
//     };

//     sendMsg = ev => {
//         ev.preventDefault();
//         SocketService.emit('chat newMsg', this.state.msg.txt);
//         this.setState({ msg: { from: 'Me', txt: '' } });
//     };

//     handleChange = ev => {
//         const { name, value } = ev.target;
//         this.setState({ [name]: value }, () => this.changeTopic(value));
//     };

//     msgHandleChange = ev => {
//         const { name, value } = ev.target;
//         this.setState(prevState => {
//             return {
//                 msg: {
//                     ...prevState.msg,
//                     [name]: value
//                 }
//             };
//         });
//     };

//     render() {
//         return (
//             <React.Fragment>
//                 <div className="likes-container">
//                     <h2>Lets Chat About {this.state.topic}</h2>
//                     <div>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="topic"
//                                 value="Love"
//                                 checked={this.state.topic === 'Love'}
//                                 onChange={this.handleChange}
//                             />
//                             Love
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="topic"
//                                 value="Politics"
//                                 checked={this.state.topic === 'Politics'}
//                                 onChange={this.handleChange}
//                             />
//                             Politics
//                         </label>
//                     </div>
//                     <form onSubmit={this.sendMsg}>
//                         <input
//                             type="text"
//                             value={this.state.msg.txt}
//                             onChange={this.msgHandleChange}
//                             name="txt"
//                         />
//                         <button>Send</button>
//                     </form>
//                     <ul>
//                         {this.state.msgs.map((msg, idx) => (
//                             <li key={idx}>{msg}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </React.Fragment>
//         );
//     }
// }
