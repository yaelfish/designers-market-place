const initialState = {
    reviews: [],
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_REVIEWS':
            return { ...state, reviews: action.reviews };
        case 'ADD_REVIEW':
            return { ...state, reviews: [...state.reviews, action.review] };
        default:
            return state;
    }
}