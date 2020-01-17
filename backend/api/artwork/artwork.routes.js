const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { addArtwork, getArtworks, deleteArtwork, editArtwork, getArtworkById } = require('./artwork.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getArtworks)
router.get('/:id', getArtworkById)
router.post('/', addArtwork)
router.delete('/:id', deleteArtwork)
router.put('/:id', editArtwork)

module.exports = router