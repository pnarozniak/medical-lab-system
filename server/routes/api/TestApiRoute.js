const express = require('express')
const router = express.Router()

const TestApiController = require('../../controllers/api/TestApiController')
const { authenticateJWT } = require('../../middlewares/auth-middleware')

router.get('/', authenticateJWT(['admin', 'laborant', 'registrator']), TestApiController.getTests)
router.post('/', authenticateJWT(['admin', 'laborant']), TestApiController.createTest)
router.get('/:testId', authenticateJWT(['admin', 'laborant', 'registrator']), TestApiController.getTestById)
router.put('/:testId', authenticateJWT(['admin', 'laborant']), TestApiController.updateTest)
router.delete('/:testId', authenticateJWT(['admin', 'laborant']), TestApiController.deleteTest)

module.exports = router