import React, { Component } from 'react';

export default class ColorPicker extends Component {

    state = {
        frameColors: ['black-wood', 'light-wood', 'simple-black', 'golden', 'simple-white', 'white-wood', 'dark-wood']
    }

    setFrameColor = (ev) => {
        this.props.setFrameColor(ev.target.value);
    }

    render() {
        return (<>
            <div className="frames-options flex">
            <form>
                <div className="flex wrap">{this.state.frameColors.map(color => {
                    return <div key={color} className="flex column justify-space-between align-center">
                            <label key={color} htmlFor={color} 
                            className={`color-picker ${color}`}>
                                <input type="radio"
                                    name="color-chooser"
                                    id={color}
                                    value={color}
                                    key={color}
                                    onChange={this.setFrameColor} />
                            </label>
                            <div className="frame-color-description">{color}</div>
                        </div>
                })}</div>
                {/* <button className="send" onClick={this.onHandleSubmit}>Submit</button> */}
            </form>
            </div>
        </>)
    }
}
