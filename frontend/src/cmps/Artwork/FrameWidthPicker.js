import React, { Component } from 'react';

export default class FrameWidthPicker extends Component {

    state = {
        framewidth: ['small', 'medium', 'large']
    }

    setFrameWidth = (ev) => {
        this.props.setFrameWidth(ev.target.value);
    }

    render() {
        return (<>
        <div className="width-picker-container flex">
            <div className="frames-options flex no-wrap">
                {this.state.framewidth.map(width => {
                    return <label key={width}
                        htmlFor={width}
                        className={width}>
                            {width}
                    </label>
                })}
            </div>
            <div>{this.state.framewidth.map(width => {
                return <input type="radio"
                    name="width-chooser"
                    id={width}
                    value={width}
                    key={width}
                    onChange={this.setFrameWidth} />
            })}
            </div>
        </div>
        </>)
    }
}
