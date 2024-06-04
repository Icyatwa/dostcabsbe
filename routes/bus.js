
// bus.js
const express = require('express')
const {
    getBuses,
    getAllBuses,
    getBus,
    createBus,
    deleteBus,
    updateBus
} = require('../controllers/busController')

const router = express.Router()

router.get('/user/:user_id', getBuses);
router.get('/', getAllBuses);
router.get('/:id', getBus)
router.post('/authsBus', createBus)
router.delete('/:id', deleteBus)
router.patch('/:id', updateBus)

module.exports = router