const logger = require('../../services/logger.service')
const artworkService = require('./artwork.service')

async function getArtworks(req, res) {
    try {

        const filterBy = req.query
        const artworks = await artworkService.getArtworks(filterBy)
        res.send(artworks)
    } catch (err) {
        logger.error('Cannot get artworks', err);
        res.status(500).send({ error: 'cannot get artworks' })
    }
}

async function getArtworkById(req, res) {
    try {
        const artwork = await artworkService.getArtworkById(req.params.id)
        res.json(artwork);
    }
    catch (err) {
        res.status(500).json({ err })
        logger.error('Cannot get artwork', err);
    }
}
async function addArtwork(req, res) {
    const artwork = req.body;
    try {
        const addedArtwork = await artworkService.addArtwork(artwork)
        res.json(addedArtwork);
    }
    catch (err) {
        res.status(500).json({ err })
        logger.error('Cannot add artwork', err);
    }
}

async function deleteArtwork(req, res) {
    try {
        await artworkService.deleteArtwork(req.params.id)
        res.end();
    }
    catch (err) {
        res.status(500).json({ err })
        logger.error('Cannot delete artwork', err);
    }
}


async function editArtwork(req, res) {
    const artwork = req.body;
    try {
        editedArtwork = await artworkService.editArtwork(artwork)
        res.json(editedArtwork);
    }
    catch (err) {
        res.status(500).json({ err })
        logger.error('Cannot edit artwork', err);
    }
}

module.exports = {
    getArtworks,
    deleteArtwork,
    addArtwork,
    editArtwork,
    getArtworkById
}