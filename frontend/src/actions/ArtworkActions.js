import ArtworkService from '../service/ArtworkService';
import { loading, doneLoading } from './SystemActions';

export function loadArtworks(filterBy) {
  return async dispatch => {
    try {
      const artworks = await ArtworkService.query(filterBy);
      dispatch(_setArtworks(artworks));
  
    } catch (err) {
      console.log('ArtworkActions: err in loadArtworks', err);
    }
  };
}

export function loadArtworkById(artworkId) {
  return async dispatch => {
    try {
      dispatch(loading());
      const currArtwork = await ArtworkService.getById(artworkId);
      dispatch(_setCurrArtwork(currArtwork));
    } catch (err) {
      console.log('ArtworkActions: err in loadArtworkById', err);
    } finally {
      dispatch(doneLoading());
    }
  }
}

export function addArtwork(addedArtwork) {
  console.log('add artwork action acrivated');
  
  return async dispatch => {
    try {
      const artwork = await ArtworkService.add(addedArtwork);
      dispatch(_addArtwork(artwork));
    } catch (err) {
      console.log('ArtworkActions: err in addArtwork', err);
    }
  };
}


export function removeArtwork(artworkId) {
  return async dispatch => {
    try {
      ArtworkService.remove(artworkId)
      dispatch(_removeArtwork(artworkId));
    } catch (err) {
      console.log('ArtworkActions: err in removeArtwork', err);
    }
  }
}


export function editArtwork(artwork) {
  console.log(artwork);
  
  return async dispatch => {
    try {
      const editArtwork = await ArtworkService.edit(artwork)
      dispatch(_editArtwork(editArtwork));
    } catch (err) {
      console.log('ArtworkActions: err in editArtwork', err);
    }
  }
}

export function toggleLike(artworkId, userId) {
  return async dispatch => {
    try {
      const toggleArtworkLike = await ArtworkService.toggleLike(artworkId, userId)
      console.log('like',toggleArtworkLike);
      
      dispatch(_toggleArtwork(toggleArtworkLike));
    } catch (err) {
      console.log('ArtworkActions: err in toggle Like', err);
    }
  }
}

function _setArtworks(artworks) {
  return {
    type: 'SET_ARTWORKS',
    artworks
  };
}

function _addArtwork(artwork) {
  return {
    type: 'ARTWORK_ADD',
    artwork
  };
}

function _removeArtwork(artworkId) {
  return {
    type: 'ARTWORK_REMOVE',
    artworkId
  };
}


function _editArtwork(editedArtwork) {
  return {
    type: 'ARTWORK_EDIT',
    editedArtwork
  };
}

function _toggleArtwork(toggleArtworkLike) {
  return {
    type: 'LIKE_TOGGLE',
    toggleLike
  };
}

function _setCurrArtwork(artwork) {
  return {
    type: 'CURR_ARTWORK',
    artwork
  }
}
