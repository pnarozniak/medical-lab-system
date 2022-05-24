const express = require('express')
const router = express.Router()

const DeliveryApiController = require('../../controllers/api/DeliveryApiController')

router.get('/', DeliveryApiController.getDelivery)
router.delete('/:deliveryId', DeliveryApiController.deleteDelivery)
router.post('/', DeliveryApiController.createDelivery)
router.get('/:deliveryId', DeliveryApiController.getDeliveryById)
router.put('/:deliveryId', DeliveryApiController.updateDelivery)
router.put('/:deliveryId/content', DeliveryApiController.updateDeliveryContent)

module.exports = router