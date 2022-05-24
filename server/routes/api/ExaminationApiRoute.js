const express = require('express')
const router = express.Router()

const ExaminationApiController = require('../../controllers/api/ExaminationApiController')
const { authenticateJWT } = require('../../middlewares/auth-middleware')

router.get('/', authenticateJWT(['admin', 'laborant', 'registrator']), ExaminationApiController.getExaminations)
router.post('/', authenticateJWT(['admin', 'registrator']), ExaminationApiController.createExamination)
router.get('/:examinationId', authenticateJWT(['admin', 'laborant', 'registrator']), ExaminationApiController.getExaminationById)
router.put('/:examinationId', authenticateJWT(['admin', 'laborant', 'registrator']), ExaminationApiController.updateExamination)
router.delete('/:examinationId', authenticateJWT(['admin', 'registrator']), ExaminationApiController.deleteExamination)

module.exports = router