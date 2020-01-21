import HttpService from './HttpService'

export default {
    query,
    add
}

function query(filterBy) {
    return HttpService.get('review', filterBy)
}

async function add(review) {
    const addedReview = await HttpService.post(`review`, review);
    console.log(addedReview);
    return addedReview;
  }