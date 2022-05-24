const express = require('express')
const router = express.Router()

const PatientApiController = require('../../controllers/api/PatientApiController')
const { authenticateJWT } = require('../../middlewares/auth-middleware')

router.get('/', authenticateJWT(['admin', 'laborant', 'registrator']), PatientApiController.getPatients)
router.post('/', authenticateJWT(['admin', 'registrator']), PatientApiController.createPatient)
router.get('/:patientId', authenticateJWT(['admin', 'laborant', 'registrator']), PatientApiController.getPatientById)
router.put('/:patientId', authenticateJWT(['admin', 'registrator']), PatientApiController.updatePatient)
router.delete('/:patientId', authenticateJWT(['admin', 'registrator']), PatientApiController.deletePatient)

module.exports = router