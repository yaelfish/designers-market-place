import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ColorPicker from './ColorPicker';
import FrameWidthPicker from './FrameWidthPicker';

class ChooseFrame extends Component {

    state = {
        isEditFrameMode: true,
        currFrame: {
            color: '',
            width: 'small'
        }
    }

    goBack = () => {
        const { _id } = this.props.match.params;
        this.props.history.push('/artwork/' + _id)
    }
  
    setFrameWidth = (width) => {
        this.setState(prevState => ({ currFrame: {...prevState.width, width} }));
    }

    setFrameColor = (color) => {
        this.setState(prevState => ({ currFrame: {...prevState.color, color} }));
    }

    render() {
        const artSrc = this.props.artSrc;
        let editClass = this.state.isEditFrameMode ? '' : 'none';
        return (<>
            <section className={`frame-section-container ${editClass} flex`}>
                
                <div className="frame-form-container flex column justify-center align-center">
                    <header>
                        <h2>Framing</h2>
                        <h3>Choose Your Frame</h3>
                        <button className="btn back" onClick={this.goBack}></button>
                    </header>

                    <ColorPicker setFrameColor={this.setFrameColor}/>
                    
                    {/* <div className="frames-options flex column">
                        <h3 className="thick-title">Choose the thickness of the frame</h3>
                        <FrameWidthPicker setFrameWidth={this.setFrameWidth} />
                    </div> */}
                    <button className="discover submit-frame" onClick={this.goBack}>Submit</button>
                </div>

                <div className="frame-artwork-container flex justify-center align-center">
                    <img
                        className={`${this.state.currFrame.color} ${this.state.currFrame.width}`}
                        src={artSrc}
                        alt="" />

                 
                </div>
            </section>
        </>)
    }
}

export default withRouter(
    connect(
        null
    )(ChooseFrame)
);