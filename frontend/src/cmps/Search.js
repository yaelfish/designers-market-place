import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArtworks } from '../actions/ArtworkActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Search extends Component {

    state = {
        filterBy: {
            name: '',
            artist: '',
            tags: ''
        },
        selectedFilter: 'name',
        dynamicSearch: false
    }

    componentDidMount() {
        this.loadArtworks();
    }

    loadArtworks = () => {
        this.props.loadArtworks(this.state.filterBy)
    }

    toggleSearch = () => {
        if (this.state.dynamicSearch) {
            this.setState({ dynamicSearch: false })
            document.querySelector(".dynamic-search-input").value = '';
        } else
            this.setState({ dynamicSearch: true })
    }

    handleKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            this.toggleSearch();
            this.props.history.push('/artwork')
        }
    }

    onFilter = (updatedFilterProp) => {
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, ...updatedFilterProp } }), this.loadArtworks);
    }

    changeInput = (ev) => {
        if (!this.props.isHome) {
            this.props.history.push('/artwork')
        }
        const field = ev.target.name;
        const value = ev.target.value;
        this.onFilter({ [field]: value })

    }

    changeSearchFilter = (ev) => {
        const filter = ev.target.value;
        this.setState({ selectedFilter: filter })
        document.querySelector(".searchTerm").value = '';
        this.setState({ filterBy: { name: '', artist: '', tags: '' } })
    }

    render() {
        return (
            <div className="search-wrap">
                <div id="content" className={!this.props.isHome ? "none" : ""} >
                    <input type="text"
                        onKeyPress={this.handleKeyPress}
                        onChange={this.changeInput}
                        name={this.state.selectedFilter}
                        className={(this.state.dynamicSearch) ? "dynamic-search-input square" : "dynamic-search-input"} id="search-input" />
                    <button type="reset"
                        className={(this.state.dynamicSearch) ? "dynamic-search close" : "dynamic-search"}
                        id="search-btn"
                        onClick={this.toggleSearch}>
                    </button>
                </div>

                <div className={this.props.isHome ? "none" : "search"}>
                    <input type="text" className="searchTerm" placeholder="Search" onChange={this.changeInput} name={this.state.selectedFilter} />
                    <select className="search-filter" name="search-filter" onChange={this.changeSearchFilter} >
                        <option value="name">Artwork</option>
                        <option value="artist">Artist</option>

                    </select>
                    <button type="submit" className="searchButton">
                        <FontAwesomeIcon icon={faSearch} />

                    </button>
                </div>
            </div>



        )
    }
}

const mapStateToProps = state => {
    return {
        artworks: state.artwork.artworks,
    };
};
const mapDispatchToProps = {
    loadArtworks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);