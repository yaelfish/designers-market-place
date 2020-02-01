
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const collection = await dbService.getCollection('Review')
    try {
        var reviews = await collection.aggregate([
            {
                $match: { aboutArtworkId: ObjectId(filterBy.aboutArtworkId) }
            },
            {
                $lookup:
                {
                    from: 'User',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind:
                {
                    path: '$byUser'
                }
            },
            {
                $lookup:
                {
                    from: 'Artwork',
                    localField: 'aboutArtworkId',
                    foreignField: '_id',
                    as: 'aboutArtwork'
                }
            },
            {
                $unwind: {
                    path: '$aboutArtwork'
                }
            }
        ]).toArray()

        reviews = reviews.map(review => {
            delete review.byUserId;
            delete review.aboutArtworkId;
            return review;
        })

        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('Review')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}


async function add(review) {
    review.byUserId = ObjectId(review.byUserId);
    review.aboutArtworkId = ObjectId(review.aboutArtworkId);

    const collection = await dbService.getCollection('Review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


