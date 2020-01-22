const initialState = {
    reviews: [],
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_REVIEWS':
            return { ...state, reviews: action.reviews };
        case 'REVIEW_REMOVE':
            return { ...state, reviews: state.reviews.filter(review => review._id !== action.reviewId) }
        default:
            return state;
    }
}