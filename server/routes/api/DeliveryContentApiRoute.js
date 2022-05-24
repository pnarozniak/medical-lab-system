const express = require('express')
const router = express.Router()

const DeliveryContentApiController = require('../../controllers/api/DeliveryContentApiController')

router.post('/', DeliveryContentApiController.createDeliveryContent)

module.exports = router