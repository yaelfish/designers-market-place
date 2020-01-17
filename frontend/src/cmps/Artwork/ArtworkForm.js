import React from 'react';
import CloudinaryService from '../../service/CloudinaryService';

export default class ArtworkForm extends React.Component {
    state = {
        artwork: {
            name: '',
            artist: '',
            imgUrl: [],
            // tags: [],
            price: 0,
            description: '',
            createdAt: ''
        }
    }

    componentDidMount() {
        this.setFormDataForEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.artwork !== this.props.artwork) {
            this.setFormDataForEdit();
        }
    }

    setFormDataForEdit() {
        const { artwork } = this.props;

        if (artwork) {
            this.setState({ artwork })
        }
    }

    onSave = () => {
        this.props.onSave(this.state.artwork)
        this.props.history.push(`/artwork/${this.state.artwork._id}`)
    }

    goBack = () => {
        this.props.history.push(`/artwork/${this.props.artwork._id}`)
    }

    onInputChange = (ev) => {
        let fieldName = ev.target.name
        let value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
        this.setState(prevState => ({ artwork: { ...prevState.artwork, [fieldName]: value } }))
    }

    onUploadImg = (ev) => {
        CloudinaryService.uploadImg(ev).then(res => this.setState({ imgUrl: res }));
    }

    render() {
        const { artwork } = this.state
        return <div className='container flex column artwork-form'>
            <label>Name:</label>
            <input type="text" placeholder="name" name="name"
                onChange={this.onInputChange} value={artwork.name}/>
            <label>Artist:</label>
            <input type="text" placeholder="artist" name="artist"
                onChange={this.onInputChange} value={artwork.artist}/>
            <label>Price:</label>
            <input type="number" placeholder="price" name="price"
                onChange={this.onInputChange} value={artwork.price}/>
            <label>Description:</label>
            {/* <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" /> */}
            <textarea/>
            <label> Upload your image:
                <input onChange={this.onUploadImg} type="file" placeholder="image url" name="imgUrl" />
            </label>
            <img src={this.state.imgUrl} alt="" width="250" />

            <button className='btn submit' onClick={this.onSave}>Submit</button>
            <button className='btn back' onClick={this.goBack}>Back</button>
        </div>
    }
}