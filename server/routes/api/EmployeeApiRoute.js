const express = require('express')
const router = express.Router()

const EmployeeApiController = require('../../controllers/api/EmployeeApiController')

router.get('/', EmployeeApiController.getEmployees)
router.delete('/:employeeId', EmployeeApiController.deleteEmployee)
router.post('/', EmployeeApiController.createEmployee)
router.get('/:employeeId', EmployeeApiController.getEmployeeById)
router.put('/:employeeId', EmployeeApiController.updateEmployee)

module.exports = router