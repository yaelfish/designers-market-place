import React from 'react';
import { Link } from 'react-router-dom';
import CloudinaryService from '../../service/CloudinaryService';
import { MultiSelect } from '@progress/kendo-react-dropdowns';

const tagsData = ["photography","illustration","nature","abstract","landscape","animals","vintage","pop-art","watercolor"]


export default class ArtworkForm extends React.Component {
    state = {
        artwork: {
            name: '',
            artist: {
                _id: "u1",
                fullName: "Kerry James Marshall"
            },
            likedByUsers: [],
            imgUrl: [],
            tags: [],
            price: 0,
            description: '',
            createdAt: Date.now()
        },
        isAddMode: false,
        imgUrl: '',
        artistName: ''
    }

     componentDidMount() {
        console.log(this.props);
        if(!this.props.isAdd){
            this.setState({ isAddMode: false });
            this.setFormDataForEdit();
        } else {
            this.setState({ isAddMode: true });
            this.setState(prevState => ({artwork: { ...prevState.artwork, artist : {_id : this.props.artist._id, fullName: this.props.artist.fullName}}}))
            return;
        }
    }

    componentWillUnmount(){
        this.setState({ isAddMode: false });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.artwork !== this.props.artwork) {
            this.setState({ artwork: this.props.artwork })
        }
    }

    onSelectTag = (event) => {
        this.setState( {artwork : {...this.state.artwork, tags : [ ...event.target.value ] }})
        
   
  
    }

    setFormDataForEdit = () => {
        const { artwork } = this.props;
        if (artwork) {
            this.setState({ artwork })
        }
    }

    onSave = async (ev) => {
        const { state, props } = this;
        const { artwork } = state;
        ev.preventDefault(); 
        let artworkSent = await props.onSave({ ...artwork })
        console.log(state.isAddMode ? 'Item was added' : 'Item was edited')
    }

    goBack = () => {
        if (this.state.isAddMode) {
            this.props.history.push('/artwork')
        } else {
            this.props.history.push(`/artwork/${this.props.artwork._id}`)
        }
    }

    onInputChange = (ev) => {
        let fieldName = ev.target.name;
        let value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value;
        if (fieldName === 'artist') {
            this.setState({ artist: value })
            let currArtwork = { ...this.state.artwork }
            currArtwork.artist = {fullName: value};
            this.setState({ currArtwork: currArtwork })
        } else {
            this.setState(prevState => ({ artwork: { ...prevState.artwork, [fieldName]: value } }))
        }
    }

    onUploadImg = (ev) => {
        CloudinaryService.uploadImg(ev).then(res => {
            this.setState( {imgUrl: res} )
            let currArtwork = { ...this.state.artwork }
            currArtwork.imgUrl = res;
            this.setState({ artwork: currArtwork })
        });
    }

    render() {
        const { isAddMode, artwork } = this.state
        return (<>
        <form className='container flex column artwork-form' onSubmit={this.onSave}>
            <label>Name:</label>
            <input type="text" placeholder="name" name="name" 
                   onChange={this.onInputChange} value={artwork.name} />
            {/* TODO: create as dropdown with option to choose different creator name */}
            {/* <input type="hidden" placeholder="artist" name="artist"
                   onChange={this.onInputChange} value={artwork.artist} /> */}
            <label>Price:</label>
            <input type="number" placeholder="price" name="price"
                   onChange={this.onInputChange} value={artwork.price} />
            <label>Description:</label>
            <textarea placeholder="description" name="description"
                      onChange={this.onInputChange} value={artwork.description}  />

<div className="tags-selection">
                <div>
                    <div>Tags:</div>
                    <MultiSelect
                        data={tagsData}
                        onChange={this.onSelectTag}
                        value={this.state.artwork.tags}
                    />
                </div>
            </div>

            <label> Upload your image:
                <input onChange={this.onUploadImg} type="file" placeholder="image url" name="imgUrl" />
            </label>
            <img src={artwork.imgUrl} alt="" width="250" />

            <button className="btn submit" type="submit">Submit</button>
            {/* <button className="btn back" onClick={this.goBack}>Back</button> */}
            <button><Link className="btn back" to={`/artwork`}>Back</Link></button>
        </form>
        </>)
    }
}

