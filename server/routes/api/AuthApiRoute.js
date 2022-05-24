const express = require('express')
const router = express.Router()

const AuthApiController = require('../../controllers/api/AuthApiController')
const {authenticateJWTForRefresh, authenticateJWT} = require('../../middlewares/auth-middleware')

router.post('/login', AuthApiController.login, AuthApiController.attachTokensToResponse)
router.post('/refresh', authenticateJWTForRefresh, AuthApiController.refresh, AuthApiController.attachTokensToResponse)
router.post('/logout', authenticateJWT(), AuthApiController.logout)

module.exports = router