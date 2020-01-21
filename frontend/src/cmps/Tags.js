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
                        // return <li className="tag" key={tag}><NavLink  to={`/artwork?tags=${tag}`} exact>{tag}</NavLink></li>
                        return <li className="tag" key={tag}><a href={`/artwork?tags=${tag}`}>{tag}</a></li>
                        
                    })}
                </ul>
            </section>
    )
    }
}