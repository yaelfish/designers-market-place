import React from 'react';
import { Link } from 'react-router-dom';
import CloudinaryService from '../../service/CloudinaryService';

export default class ArtworkForm extends React.Component {
    state = {
        artwork: {
            name: '',
            artist: '',
            imgUrl: [],
            tags: ["nature","modernism"],
            price: 0,
            description: '',
            createdAt: Date.now()
        },
        isAddMode: false,
        imgUrl: ''
    }

     componentDidMount() {
        console.log(this.props);
        if(!this.props.isAdd){
            // const { _id } = this.props.match.params
            this.setState({ isAddMode: false });
            this.setFormDataForEdit();
            // let artwork = this.props.loadArtworkById(_id)
            // console.log(artwork);
            
            // this.setState({artwork: artwork, isAddMode: false});
            // console.log(this.state);
            
        } else {
            this.setState({ isAddMode: true });
            return;
            
            // this.setState({ artwork: this.props.selectedArtwork })
        }
    }

    componentWillUnmount(){
        this.setState({ isAddMode: false });
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.match.params._id !== this.props.match.params._id) {
        if (prevProps.artwork !== this.props.artwork) {
            this.setState({ artwork: this.props.artwork })
        }
            // this.setFormDataForEdit();
            // this.loadArtwork();
            // this.loadArtworkById(prevProps.match.params._id)
        // }
    }

    setFormDataForEdit = () => {
        const { artwork } = this.props;

        if (artwork) {
            this.setState({ artwork })
            console.log(artwork);
        }
    }

    onSave = async (ev) => {
        const { state, props } = this;
        const { artwork } = state;
        ev.preventDefault(); 
        console.log(artwork);
        
        let artworkSent = await props.onSave({ ...artwork })
        console.log(artworkSent);
        console.log(state.isAddMode ? 'Item was added' : 'Item was edited')
        // if(state.isAddMode)  props.history.push('/artwork') 
        // else props.history.push('/artwork') 
        // this.props.history.push(`/artwork/${artwork._id}`)
        // this.props.history.push(`/artwork/${this.state.artwork._id}`)
    }

    // saveItem = ev => {
    //     const { state, props } = this
    //     ev.preventDefault()
    //     props.saveItem(state.item)
    //         .then(res => {
    //             console.log(state.isAddMode ? 'Item was added' : 'Item was edited')
    //             props.history.push('/shop')
    //         })
    // }

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
        this.setState(prevState => ({ artwork: { ...prevState.artwork, [fieldName]: value } }))
        console.log('state',this.state.artwork);
        // console.log('props',this.props.selectedArtwork);
        
    }

    // handleInputChange = (field, val) => {
    //     this.setState(prev => { return {...prev, artwork: { ...prev.artwork, [field]: val } }
    //     })
    // }

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

        // const { handleInputChange } = this
        return (<>
        <form className='container flex column artwork-form' onSubmit={this.onSave}>
            <label>Name:</label>
            <input type="text" placeholder="name" name="name" 
                   onChange={this.onInputChange} value={artwork.name} />
            <label>Artist:</label>
            <input type="text" placeholder="artist" name="artist"
                   onChange={this.onInputChange} value={artwork.artist} />
            <label>Price:</label>
            <input type="number" placeholder="price" name="price"
                   onChange={this.onInputChange} value={artwork.price} />
            <label>Description:</label>
            {/* <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" /> */}
            <textarea placeholder="description" name="description"
                      onChange={this.onInputChange} value={artwork.description}  />
            <label> Upload your image:
                <input onChange={this.onUploadImg} type="file" placeholder="image url" name="imgUrl" />
            </label>
            <img src={artwork.imgUrl} alt="" width="250" />

            <button className="btn submit" type="submit">Submit</button>
            <button className="btn back" onClick={this.goBack}>Back</button>
            {/* <button><Link className="btn back" to={`/artwork`}>Back</Link></button> */}
        </form>
        </>)
    }
}

// const mapStateToProps = (state) => {
//     return {
//         artworks: state.artwork.artworks,
//         selectedArtwork: state.artwork.selectedArtwork
//     }
// }
// const mapDispatchToProps = {
//     loadArtworkById,
//     editArtwork
// }

// export default withRouter(
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(ArtworkForm)
// );