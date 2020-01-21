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
        let addedReview = {msg:addedMsg, aboutArtworkId:artworkId}
        // addedReview.msg = addedMsg;
        // addedReview.aboutArtworkId = artworkId;
        try {
            addedReview = await ReviewService.add(addedReview);
            return addedReview
        } catch (err) {
            console.log('ArtworkActions: err in addArtwork', err);
        }
    };
}

export function removeReview(reviewId) {
    return async dispatch => {
        try {
            ReviewService.remove(reviewId)
            dispatch(_removeReview(reviewId));
        } catch (err) {
            console.log('ReviewActions: err in removeReview', err);
        }
    }
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

function _removeReview(reviewId) {
    return {
        type: 'REVIEW_REMOVE',
        reviewId
    };
}