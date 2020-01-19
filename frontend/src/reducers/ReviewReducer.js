const initialState = {
    reviews: [],
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_REVIEWS':
            return { ...state, reviews: action.reviews };
        default:
            return state;
    }
}