import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Tags extends Component {

    state = {
        tags: ["photography","illustration","nature","abstract","landscape","animals","vintage","pop-art","watercolor"]
    }

    // to do: render key words dynamically with a loop
    render() {
        return (
            <section className="tags-container">
                <ul>
                    {this.state.tags.map(tag => {
                        return <li className="tag" key={tag}><NavLink to={`/artwork?tag=${tag}`} exact>{tag}</NavLink></li>
                    })}
                </ul>
            </section>
    )
    }
}