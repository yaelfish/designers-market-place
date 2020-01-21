const initialState = {
  artworks: [],
  selectedArtwork: {}
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_ARTWORKS':
      return { ...state, artworks: action.artworks };
    case 'ARTWORK_ADD':
      return { ...state, artworks: [...state.artworks, action.artwork] };
    case 'LIKE_TOGGLE':
      return { ...state, artworks: [...state.artworks, action.toggleArtworkLike] };
    case 'ARTWORK_EDIT':
      return {
        ...state,
        artworks: state.artworks.map(artwork =>
          artwork._id === action.artwork._id ? action.artwork : artwork
        )
      };
    case 'ARTWORK_REMOVE':
      return { ...state, artworks: state.artworks.filter(artwork => artwork._id !== action.artworkId) }
    case 'CURR_ARTWORK':
      return {
        ...state, selectedArtwork: action.artwork
      }
    default:
      return state;
  }
}
