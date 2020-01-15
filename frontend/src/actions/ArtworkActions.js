import ArtworkService from '../services/ArtworkService';

export function loadArtworks() {
  return async dispatch => {
    try {
      const artworks = await ArtworkService.query();
      dispatch(_setArtworks(artworks));

    } catch (err) {
      console.log('ArtworkActions: err in loadArtworks', err);
    }
  };
}

export function getArtworkById(artworkId) {
  return async dispatch => {
    try {
      const currArtwork = await ArtworkService.getById(artworkId);
      dispatch(_setCurrArtwork(currArtwork));
    } catch (err) {
      console.log('ArtworkActions: err in addArtwork', err);
    }
  }
}

export function addArtwork(addedArtwork) {
  return async dispatch => {
    try {
      const addedArtwork = await ArtworkService.add(addedArtwork);
      dispatch(_addArtwork(addedArtwork));
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


export function editArtwork(editedArtwork) {
  return async dispatch => {
    try {
      const editedArtwork = await ArtworkService.edit(editedArtwork)
      dispatch(_editArtwork(editedArtwork));
    } catch (err) {
      console.log('ArtworkActions: err in editArtwork', err);
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

function _setCurrArtwork(artwork) {
  return {
    type: 'CURR_ARTWORK',
    artwork
  }
}
