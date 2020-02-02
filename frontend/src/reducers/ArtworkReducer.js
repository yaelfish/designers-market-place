const initialState = {
  artworks: null,
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
      return { ...state, artworks: [state.artworks.map(artwork => {
        return (artwork._id === action.editedArtwork._id) ? action.editedArtwork : artwork
      })]};
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
