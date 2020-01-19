import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArtworks} from '../actions/ArtworkActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

    class Search extends Component {

    state = {
        filterBy: { 
            name: '',
            artist: '',
            tags: ''
        },
        selectedFilter: 'name'
    }

    componentDidMount() {
        this.loadArtworks();
    }

    loadArtworks = () => {
        this.props.loadArtworks(this.state.filterBy)
    }

    onFilter = (updatedFilterProp) => {
        this.setState(prevState => ({filterBy: {...prevState.filterBy ,...updatedFilterProp}}) ,  this.loadArtworks);
    }


    changeInput =(ev)=>{
        this.props.history.push('/artwork')
        const field = ev.target.name;
        const value = ev.target.value ;
        this.onFilter({[field]: value })
          
    }

    changeSearchFilter = (ev) => {
        const filter = ev.target.value;
        this.setState({selectedFilter : filter})
        document.querySelector(".searchTerm").value = '';
        this.setState({filterBy : {name : '', artist: '', tags: ''}})
    }


    

    render() {
        return (
           
            <div className="wrap">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={this.changeInput} name={this.state.selectedFilter}/>
                    <button type="submit" className="searchButton">
                        <FontAwesomeIcon icon={faSearch} />

                    </button>
                </div>

                <select name="search-filter" onChange={this.changeSearchFilter}>
                          <option value="name">Artwork</option>
                          <option value="artist">Artist</option>
                          <option value="tags">Tags</option>
                        </select>
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