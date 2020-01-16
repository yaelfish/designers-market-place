import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Tags extends Component {

    state = {
        crumbs: ["Shop/Wall Art", "Art Prints", "Hotel Du Cap Eden"]
    }

    render() {
        return (<>
            <nav className="breadcrumb-container">
                <ul>
                    {this.state.crumbs.map(tag => {
                        return <li className="tag" key={tag}><NavLink to={`/artwork?tag=${tag}`} exact>{tag}</NavLink><span className="breadcrumb-separator"> / </span></li>
                        
                    })}
                </ul>
            </nav>
        </>)
    }
}