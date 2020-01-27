const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { addArtwork, getArtworks, deleteArtwork, editArtwork, getArtworkById } = require('./artwork.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getArtworks)
router.get('/:id', getArtworkById)
router.post('/', requireAuth, addArtwork)
router.delete('/:id', requireAuth, deleteArtwork)
router.put('/:id', requireAuth, editArtwork)

module.exports = router