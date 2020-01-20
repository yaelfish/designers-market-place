
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function getArtworks(filterBy) {
   
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('Artwork')
    try {
        const artworksToshow = await collection.find(criteria).toArray();
        return artworksToshow
    } catch (err) {
        console.log('ERROR: cannot find artworks');
        throw err;
    }
}


async function getArtworkById(ArtworkId) {
    const collection = await dbService.getCollection('Artwork')
    try {
        const artwork = await collection.findOne({ "_id": ObjectId(ArtworkId) })
        return artwork
    } catch (err) {
        console.log(`ERROR: cannot find artwork ${ArtworkId}`)
        throw err;
    }
}


async function editArtwork(editedArtwork) {
    const collection = await dbService.getCollection('Artwork')
    try {
        const artworkId = editedArtwork._id;
        delete editedArtwork._id;
        await collection.updateOne({ "_id": ObjectId(artworkId) }, { $set: editedArtwork })
        editedArtwork._id = artworkId
        return editedArtwork
    } catch (err) {
        console.log(`ERROR: cannot update artwork ${editedArtwork._id}`, err)
        throw err;
    }
}

async function toggleLikeArtwork(artworkId, userId) {
    const collection = await dbService.getCollection('Artwork')
    try {
        // const artworkId = editedArtwork._id;
        // delete editedArtwork._id;

        const toggle = await collection.updateOne({ "_id": ObjectId(artworkId) }, { $set: { "_id": ObjectId(userId)}})
        // editedArtwork._id = artworkId
        return toggle;
    } catch (err) {
        console.log(`ERROR: cannot update artwork ${editedArtwork._id}`, err)
        throw err;
    }
}

async function addArtwork(newArtwork) {
    const collection = await dbService.getCollection('Artwork')
    try {
        await collection.insertOne(newArtwork);
        return newArtwork;
    } catch (newArtwork) {
        console.log(`ERROR: cannot insert artwork`)
        throw err;
    }
}

async function deleteArtwork(artworkId) {
    const collection = await dbService.getCollection('Artwork')
    try {
        return await collection.deleteOne({ "_id": ObjectId(artworkId) })
    } catch (err) {
        console.log(`ERROR: cannot remove artwork ${artworkId}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {

    const criteria = {};

    
    if (filterBy.name) {
        criteria.name = { $regex: `.*${filterBy.name}.*`, $options : 'i' };
    }

    if (filterBy.artist) {
        criteria["artist.fullName"] = { $regex: `.*${filterBy.artist}.*`, $options : 'i' };
    }

    if (filterBy.tags) {
        criteria.tags =  { $regex: `.*${filterBy.tags}.*`, $options : 'i' };
    }

    console.log(criteria)


    // if (filterBy.stock !== 'all') {
    //     if (filterBy.stock === 'in-stock') criteria.inStock = true;
    //     else criteria.inStock = false
    // }
    // if (filterBy.type && filterBy.type !== "none") {
    //     criteria.type = filterBy.type;
    // }

    // if (filterBy.price) {
    //     criteria.price = {$lte : +filterBy.price}
    // }

    return criteria;
}

module.exports = {
    deleteArtwork,
    addArtwork,
    getArtworkById,
    editArtwork,
    getArtworks,
    toggleLikeArtwork
};