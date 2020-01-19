import ReviewService from '../service/ReviewService';

export function loadReviews(filterBy) {
    return async dispatch => {

        try {
            const reviews = await ReviewService.query(filterBy);
            dispatch(_setReviews(reviews));

        } catch (err) {
            console.log('ReviewsActions: err in loadReviews', err);
        }
    };
}

export function addReview(addedMsg, artworkId) {
    return async dispatch => {
        const addedReview = {}
        addedReview.msg = addedMsg;
        addedReview.aboutArtworkId = artworkId;
        try {
            addedReview = await ReviewService.add(addedReview);
            dispatch(_addReview(addedReview));
        } catch (err) {
            console.log('ArtworkActions: err in addArtwork', err);
        }
    };
}


function _setReviews(reviews) {
    return {
        type: 'SET_REVIEWS',
        reviews
    };
}

function _addReview(review) {
    return {
        type: 'ADD_REVIEW',
        review
    }
}