const express = require('express')
const router = express.Router()

const SupplierApiController = require('../../controllers/api/SupplierApiController')

router.get('/', SupplierApiController.getSuppliers)
router.delete('/:supplierId', SupplierApiController.deleteSupplier)
router.post('/', SupplierApiController.createSupplier)
router.get('/:supplierId', SupplierApiController.getSupplierById)
router.put('/:supplierId', SupplierApiController.updateSupplier)

module.exports = router