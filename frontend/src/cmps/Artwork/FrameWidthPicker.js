import React, { Component } from 'react';

export default class FrameWidthPicker extends Component {

    setFrameWidth = (ev) => {
        this.props.setFrameWidth(ev.target.value);
    }

    render() {
        return (<>
            <div className="flex justify-space-around">
                <div className="flex column justify-center">
                    <label htmlFor="thin" className="width-label width-label-thin">
                        <input type="radio" name="width-chooser" className="width-chooser" id="thin" value="thin" onChange={this.setFrameWidth} />
                    </label>
                    <div className="frame-color-description">Thin</div>
                </div>
                <div className="flex column justify-center">
                    <label htmlFor="thick" className="width-label width-label-thick">
                        <input type="radio" name="width-chooser" className="width-chooser" id="thick" value="thick" onChange={this.setFrameWidth} />
                    </label>
                    <div className="frame-color-description">Thick</div>
                </div>
            </div>
        </>)
    }
}
